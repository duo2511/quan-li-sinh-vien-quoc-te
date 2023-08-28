import api from "~/api";

export default {
  async ListSchools(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListSchools,
      data: pagination,
    });
    return response.data;
  },
  async CreateSchool(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateSchool,
      data: entry,
    });

    return response.data;
  },
  async GetSchool(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetSchool", { id: entryId }),
    });

    return response.data;
  },
  async UpdateSchool(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateSchool", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteSchool(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteSchool", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
};
