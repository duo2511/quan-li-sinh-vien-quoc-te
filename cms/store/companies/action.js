import api from "~/api";

export default {
  async ListCompanies(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListCompanies,
      data: pagination,
    });
    return response.data;
  },

  async GetCompany(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetCompany", { id: entryId }),
    });

    return response.data;
  },
};
