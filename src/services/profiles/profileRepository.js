import { PUBLIC_CONFIG } from "../../env.js";
import { getAuthHeaders, getCurrentUser, getSession } from "../auth/authService.js";

const LOCAL_PROFILES_KEY = "laburaUyProfiles";
const LOCAL_COMPANIES_KEY = "laburaUyCompanyInterest";

function hasSupabase(config = PUBLIC_CONFIG) {
  return Boolean(config.supabaseUrl && config.supabaseAnonKey);
}

function restUrl(table, query = "") {
  return `${PUBLIC_CONFIG.supabaseUrl}/rest/v1/${table}${query}`;
}

async function insertCompanyInterest(payload) {
  if (!hasSupabase()) {
    return saveLocal("companies_interest", payload);
  }

  const response = await fetch(restUrl("companies_interest"), {
    method: "POST",
    headers: {
      apikey: PUBLIC_CONFIG.supabaseAnonKey,
      Authorization: `Bearer ${PUBLIC_CONFIG.supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || "No se pudo guardar en Supabase.");
  }

  return { source: "supabase", record: payload };
}

async function upsertOwnProfile(payload) {
  if (!hasSupabase()) {
    return saveLocal("profiles", payload);
  }

  const session = getSession();
  if (!session?.user?.id) {
    throw new Error("Necesitas iniciar sesion para guardar tu perfil.");
  }

  const record = {
    ...payload,
    user_id: session.user.id,
    email: payload.email || session.user.email || null,
  };

  const existing = await getMyProfile();
  const query = existing?.id ? `?id=eq.${encodeURIComponent(existing.id)}` : "";

  const response = await fetch(restUrl("profiles", query), {
    method: existing?.id ? "PATCH" : "POST",
    headers: {
      ...getAuthHeaders(),
      Prefer: "return=representation",
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || "No se pudo guardar en Supabase.");
  }

  const rows = await response.json().catch(() => []);
  return { source: "supabase", record: rows[0] || record };
}

export async function getMyProfile() {
  if (!hasSupabase()) return null;

  const user = getCurrentUser();
  if (!user?.id) return null;

  const response = await fetch(
    restUrl("profiles", `?select=*&user_id=eq.${encodeURIComponent(user.id)}&limit=1`),
    {
      method: "GET",
      headers: getAuthHeaders(),
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || "No se pudo cargar tu perfil.");
  }

  const rows = await response.json();
  return rows[0] || null;
}

function saveLocal(table, payload) {
  const key = table === "companies_interest" ? LOCAL_COMPANIES_KEY : LOCAL_PROFILES_KEY;
  const previous = JSON.parse(localStorage.getItem(key) || "[]");
  const now = new Date().toISOString();
  const record = {
    id: globalThis.crypto?.randomUUID?.() || `${Date.now()}`,
    ...payload,
    created_at: payload.created_at || now,
    updated_at: now,
  };

  localStorage.setItem(key, JSON.stringify([record, ...previous]));

  return {
    source: "local",
    record,
  };
}

export async function saveProfile(profile, result) {
  const now = new Date().toISOString();
  return upsertOwnProfile({
    full_name: profile.name,
    email: extractEmail(profile.contact),
    phone: extractPhone(profile.contact),
    city: profile.location,
    department: profile.department,
    age: profile.age ? Number(profile.age) || null : null,
    experience_text: profile.experience,
    skills_text: profile.skills,
    education_level: profile.education,
    availability: profile.availability,
    has_transport: profile.hasTransport === "si",
    has_driver_license: profile.hasLicense === "si",
    desired_work_type: profile.workType,
    interested_categories: profile.interests || [],
    recommended_jobs: result.recommendations || [],
    whatsapp_message: result.whatsappMessage,
    mini_cv: result.miniCv,
    updated_at: now,
  });
}

export async function saveCompanyInterest(data) {
  return insertCompanyInterest({
    company_name: data.companyName,
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    city: data.city,
    hiring_needs: data.hiringNeeds,
    created_at: new Date().toISOString(),
  });
}

export function mapStoredProfile(row) {
  if (!row) return null;

  return {
    name: row.full_name || "",
    location: row.city || "",
    department: row.department || "",
    age: row.age ? String(row.age) : "",
    experience: row.experience_text || "",
    skills: row.skills_text || "",
    education: row.education_level || "",
    availability: row.availability || "",
    hasTransport: row.has_transport ? "si" : "no",
    hasLicense: row.has_driver_license ? "si" : "no",
    workType: row.desired_work_type || "cualquiera",
    interests: Array.isArray(row.interested_categories) ? row.interested_categories : [],
    contact: row.phone || row.email || "",
  };
}

function extractEmail(contact) {
  const match = String(contact || "").match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return match ? match[0] : null;
}

function extractPhone(contact) {
  const digits = String(contact || "").replace(/[^\d+]/g, "");
  return digits && !extractEmail(contact) ? digits : null;
}
