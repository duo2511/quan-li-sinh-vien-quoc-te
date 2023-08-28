import api from "~/api";

export default function ({ $axios, redirect, $cookies }) {
  $axios.onRequest((config) => {
    // nếu không có access_token mà có refresh_token => refresh
    if (!$cookies.get("access_token") && $cookies.get("refresh_token")) {
      // refresh token
      if (config.url !== api.RefreshToken) {
        $axios.request({
          method: "GET",
          url: api.RefreshToken,
        });
      }
    }

    config.headers.Authorization = "Bearer " + $cookies.get("jwt");

    return config;
  });

  $axios.onResponse((response) => {
    if (response.status === 401) {
      return redirect({ name: "auth-login" });
    }
  });

  $axios.onError((error) => {
    if (error.response && error.response.status === 401 && error.response.config.url === api.PostLogin) {
      return error.response;
    }
    if (error.response.status === 401) {
      return error.response;
    }
    if (error.response.status === 502) {
      error.response.data = {
        message: "API Không hoạt động, liên hệ admin để được hỗ trợ",
        code: 502,
      };
      return error.response;
    }
    return Promise.resolve(false);
  });
}
