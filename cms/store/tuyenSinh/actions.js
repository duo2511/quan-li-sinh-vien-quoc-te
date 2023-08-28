import api from "~/api";

export default {
  async CreateTuyenSinh(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateTuyenSinh,
      data: entry,
    });

    return response.data;
  },
};
