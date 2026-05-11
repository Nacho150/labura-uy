export const userRepository = {
  async saveProfile(profileRecord) {
    return {
      ok: false,
      reason: "No hay base de datos configurada todavía.",
      plannedRecord: profileRecord,
    };
  },

  async findProfileById() {
    return null;
  },
};
