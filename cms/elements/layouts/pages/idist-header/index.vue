<template>
  <Header :theme="theme" :style="{ position: 'fixed', width: '100%', top: 0, left: 0 }">
    <a-row>
      <a-col :lg="18" :md="16" :sm="24" :xs="24" class="align-center-v navbar-brand">
        <header-logo />
        <div class="text-right" style="margin-left: 16px">
          <h3>Tri thức - Đạo đức - Sáng tạo</h3>
        </div>
      </a-col>
      <a-col :lg="6" :md="8" :sm="0" :xs="0">
        <auth-info />
      </a-col>
    </a-row>
  </Header>
</template>

<script>
import { Layout } from "ant-design-vue";
import HeaderLogo from "@/elements/layouts/pages/idist-header/partials/header-logo";
import AuthInfo from "@/elements/layouts/pages/idist-header/partials/auth-info";

const { Header } = Layout;
export default {
  name: "index",
  props: {
    theme: {
      type: String,
      default: () => "light",
    },
  },
  components: { AuthInfo, HeaderLogo, Header },
  data: () => ({
    searchHide: true,
    hide: true,
  }),
  methods: {
    handleSearchHide(search) {
      this.searchHide = !search;
      this.hide = true;
    },
    onShowHide(h) {
      this.searchHide = true;
      this.hide = !h;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
