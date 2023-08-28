<template>
  <div id="admin-layout">
    <idist-header :theme="theme" />
    <layout class="layout">
      <idist-menu :theme="theme" />
      <layout class="atbd-main-layout">
        <content id="main-section">
          <Nuxt />
        </content>
        <idist-footer />
      </layout>
    </layout>
  </div>
</template>

<script>
import IdistHeader from "@/elements/layouts/admin/idist-header";
import { Layout } from "ant-design-vue";
import IdistMenu from "@/elements/layouts/admin/idist-menu";
import IdistFooter from "@/elements/layouts/admin/idist-footer";

const { Content } = Layout;

export default {
  name: `AdminLayout`,
  components: { IdistFooter, IdistMenu, IdistHeader, Layout, Content },
  layout: "admin",
  head: {
    title: "CMS IdisT - Blogger",
  },
  middleware: ["authenticated"],
  data: () => ({}),
  computed: {
    theme() {
      return this.$store.state.layout.theme;
    },
  },
  methods: {
    async LoadConfig() {
      get;
    },
  },
  created() {
    if (process.client) {
      if (window.innerWidth < 991) {
        this.$store.dispatch("layout/changeSideNavMode");
      }
    }
  },
  mounted() {
    this.$store.dispatch("users/GetProfile");
  },
};
</script>

<style scoped></style>
