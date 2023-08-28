import api from "~/api";

export default {
  async ListProvinces(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListProvinces,
      data: pagination,
    });
    return response.data;
  },
  async CreateProvince(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateProvince,
      data: entry,
    });

    return response.data;
  },
  async GetProvince(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetProvince", { id: entryId }),
    });

    return response.data;
  },
  async UpdateProvince(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateProvince", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteProvince(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteProvince", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
};
