<template>
  <Header :theme="theme" :style="{ position: 'fixed', width: '100%', top: 0, left: 0 }">
    <a-row>
      <a-col :lg="4" :md="8" :sm="12" :xs="18" class="align-center-v navbar-brand">
        <!--        <toggle-menu :theme='theme' />-->
        <header-logo />
      </a-col>

      <template>
        <a-col :lg="14" :md="8" :sm="0" :xs="0">
          <header-search />
        </a-col>
        <a-col :lg="6" :md="8" :sm="0" :xs="0">
          <auth-info />
        </a-col>
      </template>
      <a-col :style="{ position: 'static' }" :md="0" :sm="12" :xs="6">
        <div class="mobile-action">
          <a class="btn-search" @click="handleSearchHide(searchHide)" href="#">
            <idist-feather-icons type="search" v-if="searchHide" />
            <idist-feather-icons type="x" v-else />
          </a>
          <a class="btn-auth" @click="onShowHide(hide)" href="#">
            <idist-feather-icons type="more-vertical" />
          </a>
        </div>
      </a-col>
    </a-row>
    <div class="header-more">
      <a-row>
        <a-col :md="0" :sm="24" :xs="24">
          <div class="small-screen-headerRight">
            <div class="small-screen-search" v-if="!searchHide">
              <header-search />
            </div>
            <div class="small-screen-auth-info" v-if="!hide">
              <auth-info />
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </Header>
</template>

<script>
import { Layout } from "ant-design-vue";
import ToggleMenu from "./partials/toggle-menu";
import HeaderLogo from "@/elements/layouts/admin/idist-header/partials/header-logo";
import HeaderSearch from "@/elements/layouts/admin/idist-header/partials/header-search";
import AuthInfo from "@/elements/layouts/admin/idist-header/partials/auth-info";

const { Header } = Layout;
export default {
  name: "index",
  props: {
    theme: {
      type: String,
      default: () => "light",
    },
  },
  components: { AuthInfo, HeaderSearch, HeaderLogo, ToggleMenu, Header },
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
