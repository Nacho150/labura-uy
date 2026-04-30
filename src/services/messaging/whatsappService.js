export function createWhatsAppShareUrl(message, phone = "") {
  const baseUrl = phone ? `https://wa.me/${cleanPhone(phone)}` : "https://wa.me/";
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

function cleanPhone(phone) {
  return String(phone).replace(/[^\d]/g, "");
}
