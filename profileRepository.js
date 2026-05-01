import { PUBLIC_CONFIG } from "../../env.js";

const LOCAL_PROFILES_KEY = "laburaUyProfiles";
const LOCAL_COMPANIES_KEY = "laburaUyCompanyInterest";

function hasSupabase(config) {
  return Boolean(config.supabaseUrl && config.supabaseAnonKey);
}

async function insertSupabase(table, payload) {
  const config = PUBLIC_CONFIG;

  if (!hasSupabase(config)) {
    return saveLocal(table, payload);
  }

  const response = await fetch(`${config.supabaseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(details || "No se pudo guardar en Supabase.");
  }

  return {
    source: "supabase",
    record: payload,
  };
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
  return insertSupabase("profiles", {
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
    created_at: now,
    updated_at: now,
  });
}

export async function saveCompanyInterest(data) {
  return insertSupabase("companies_interest", {
    company_name: data.companyName,
    contact_name: data.contactName,
    email: data.email,
    phone: data.phone,
    city: data.city,
    hiring_needs: data.hiringNeeds,
    created_at: new Date().toISOString(),
  });
}

function extractEmail(contact) {
  const match = String(contact || "").match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return match ? match[0] : null;
}

function extractPhone(contact) {
  const digits = String(contact || "").replace(/[^\d+]/g, "");
  return digits && !extractEmail(contact) ? digits : null;
}
