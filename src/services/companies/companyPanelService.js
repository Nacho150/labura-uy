export const companyPanelService = {
  async listCompanyLeads() {
    return {
      ok: false,
      reason: "El panel de empresas todavia no esta implementado.",
      leads: [],
    };
  },

  async createJobPostDraft(jobPost) {
    return {
      ok: false,
      reason: "Falta base de datos y autenticacion de empresas.",
      draft: jobPost,
    };
  },
};
