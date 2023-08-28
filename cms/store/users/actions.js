import api from "~/api";

export default {
  async PostLogin({ app }, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.PostLogin,
      data: entry,
    });
    return response.data;
  },
  async GetProfile({ commit }) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.GetProfile,
    });

    commit("SetProfile", response.data);
    return response.data;
  },
  async ListUsers(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListUsers,
      data: pagination,
    });
    return response.data;
  },
  async CreateCategory(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateUser,
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
