import api from "~/api";

export default {
  async ListCategories(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListCategories,
      data: pagination,
    });
    return response.data;
  },
  async CreateCategory(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateCategory,
      data: entry,
    });

    return response.data;
  },
  async GetCategory(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetCategory", { id: entryId }),
    });

    return response.data;
  },
  async UpdateCategory(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateCategory", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteCategory(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteCategory", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
};
