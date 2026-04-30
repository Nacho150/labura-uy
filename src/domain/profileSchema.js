export const profileFields = {
  id: "string",
  name: "string",
  location: "string",
  age: "string_optional",
  experience: "string",
  skills: "string",
  education: "string",
  availability: "string",
  hasTransport: "boolean",
  hasLicense: "boolean",
  workType: "fixed | seasonal | gigs | any",
  interests: "string[]",
  contact: "string_optional",
  createdAt: "iso_date",
};

export function createProfileRecord(profile) {
  return {
    id: crypto.randomUUID?.() || `profile-${Date.now()}`,
    name: profile.name || "",
    location: profile.location || "",
    age: profile.age || "",
    experience: profile.experience || "",
    skills: profile.skills || "",
    education: profile.education || "",
    availability: profile.availability || "",
    hasTransport: profile.hasTransport === "si",
    hasLicense: profile.hasLicense === "si",
    workType: profile.workType || "cualquiera",
    interests: Array.isArray(profile.interests) ? profile.interests : [],
    contact: profile.contact || "",
    createdAt: new Date().toISOString(),
  };
}
