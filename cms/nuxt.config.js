export default {
  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || "0.0.0.0",
  },
  dev: process.env.NODE_ENV !== "production",
  loading: {
    color: "blue",
    height: "1px",
  },
  publicRuntimeConfig: {
    baseApi: process.env.API_ENDPOINT || "/",
    buildVersion: "",
  },
  privateRuntimeConfig: {},
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "core-cms",
    htmlAttrs: {
      lang: "vi",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "/ckfinder/ckfinder.js" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/less/antd", "~/assets/less/custom", "vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"],
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/antd-ui", "@/plugins/axios"],
  toast: {
    position: "top-right",
    register: [
      {
        name: "my-error",
        message: "Oops...Something went wrong",
        options: {
          type: "error",
        },
      },
    ],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "nuxt-animejs",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/style-resources",
    "cookie-universal-nuxt",
    "@nuxtjs/toast",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_ENDPOINT,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    devtools: true,
    parallel: false,
    optimizeCSS: true,
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
        sassOptions: {},
      },
    },
  },
};
