import api from "~/api";

export default {
  async ListTags(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListTags,
      data: pagination,
    });
    return response.data;
  },
  async CreateTag(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateTag,
      data: entry,
    });

    return response.data;
  },
  async GetTag(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetTag", { id: entryId }),
    });

    return response.data;
  },
  async UpdateTag(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateTag", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteTag(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteTag", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
};
