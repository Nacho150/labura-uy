export const userRepository = {
  async saveProfile(profileRecord) {
    return {
      ok: false,
      reason: "No hay base de datos configurada todavia.",
      plannedRecord: profileRecord,
    };
  },

  async findProfileById() {
    return null;
  },
};
