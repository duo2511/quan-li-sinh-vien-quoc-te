import api from "~/api";

export default {
  async ListAdmissions(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListAdmissions,
      data: pagination,
    });
    return response.data;
  },
  async CreateAdmission(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateAdmission,
      data: entry,
    });

    return response.data;
  },
  async GetAdmission(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetAdmission", { id: entryId }),
    });

    return response.data;
  },
  async UpdateAdmission(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateAdmission", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteAdmission(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteAdmission", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
};
