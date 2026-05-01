import { PUBLIC_CONFIG } from "../../env.js";

const AUTH_SESSION_KEY = "laburaUyAuthSession";

function hasSupabase() {
  return Boolean(PUBLIC_CONFIG.supabaseUrl && PUBLIC_CONFIG.supabaseAnonKey);
}

function authUrl(path) {
  return `${PUBLIC_CONFIG.supabaseUrl}/auth/v1/${path}`;
}

function authHeaders(extra = {}) {
  return {
    apikey: PUBLIC_CONFIG.supabaseAnonKey,
    "Content-Type": "application/json",
    ...extra,
  };
}

function normalizeSession(data) {
  if (!data?.access_token) return null;

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_at: data.expires_at,
    user: data.user,
  };
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(AUTH_SESSION_KEY) || "null");
  } catch {
    return null;
  }
}

export function getCurrentUser() {
  return getSession()?.user || null;
}

export function isAuthConfigured() {
  return hasSupabase();
}

export async function signUp(email, password) {
  if (!hasSupabase()) {
    throw new Error("Supabase no esta configurado todavia.");
  }

  const response = await fetch(authUrl("signup"), {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg || data.error_description || "No se pudo crear la cuenta.");

  const session = normalizeSession(data);
  if (session) saveSession(session);

  return { session, user: data.user };
}

export async function signIn(email, password) {
  if (!hasSupabase()) {
    throw new Error("Supabase no esta configurado todavia.");
  }

  const response = await fetch(authUrl("token?grant_type=password"), {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg || data.error_description || "Email o contrasena incorrectos.");

  const session = normalizeSession(data);
  if (!session) throw new Error("No se pudo iniciar sesion.");
  saveSession(session);

  return session;
}

export function saveSession(session) {
  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
}

export function signOut() {
  localStorage.removeItem(AUTH_SESSION_KEY);
}

export function getAuthHeaders() {
  const session = getSession();
  if (!session?.access_token) {
    throw new Error("Necesitas iniciar sesion para guardar o ver tu perfil.");
  }

  return {
    apikey: PUBLIC_CONFIG.supabaseAnonKey,
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  };
}
