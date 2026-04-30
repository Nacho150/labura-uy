export const externalJobSources = {
  async searchMatchingOffers() {
    return {
      ok: false,
      reason: "Las ofertas externas todavia no estan conectadas.",
      offers: [],
    };
  },

  async syncOffers() {
    return {
      ok: false,
      reason: "Pendiente definir fuentes, permisos y frecuencia de actualizacion.",
    };
  },
};
