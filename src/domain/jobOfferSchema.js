export const jobOfferFields = {
  id: "string",
  title: "string",
  companyName: "string",
  department: "string",
  city: "string_optional",
  area: "string",
  workType: "fixed | seasonal | gigs | any",
  schedule: "string_optional",
  description: "string",
  requirements: "string[]",
  contactUrl: "string_optional",
  source: "internal | external",
  publishedAt: "iso_date",
};

export function normalizeJobOffer(rawOffer) {
  return {
    id: rawOffer.id || `offer-${Date.now()}`,
    title: rawOffer.title || "",
    companyName: rawOffer.companyName || "",
    department: rawOffer.department || "Uruguay",
    city: rawOffer.city || "",
    area: rawOffer.area || "",
    workType: rawOffer.workType || "any",
    schedule: rawOffer.schedule || "",
    description: rawOffer.description || "",
    requirements: Array.isArray(rawOffer.requirements) ? rawOffer.requirements : [],
    contactUrl: rawOffer.contactUrl || "",
    source: rawOffer.source || "external",
    publishedAt: rawOffer.publishedAt || new Date().toISOString(),
  };
}
