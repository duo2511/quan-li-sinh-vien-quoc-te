import api from "~/api";

export default {
  async GetOidc() {
    let response = await this.$axios.request({
      method: "GET",
      url: api.GetOidc,
    });
    return response.data;
  },
  async CodeAuthorization(_, code) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CodeAuthorization,
      data: {
        code: code,
      },
    });
    return response.data;
  },
  async PostLogout() {
    let response = await this.$axios.request({
      method: "POST",
      url: api.PostLogout,
    });
    return response.data;
  },
};
