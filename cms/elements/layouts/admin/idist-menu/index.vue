<template>
  <sider
    :width="280"
    :style="{
      margin: '63px 0 0 0',
      padding: '15px 15px 155px 15px',
      // overflowY: 'auto',
      height: '100vh',
      position: 'fixed',
      left: 0,
      zIndex: 998,
    }"
    :collapsed="collapsed"
    :theme="theme"
  >
    <perfect-scrollbar
      :options="{
        wheelSpeed: 1,
        swipeEasing: true,
        suppressScrollX: true,
      }"
    >
      <aside-items :toggleCollapsed="toggleCollapsedMobile" :theme="theme" />
    </perfect-scrollbar>
    <div @click="toggleCollapsed" class="menu-collapse-button" style="">
      <a-icon v-if="collapsed" type="right" />
      <a-icon v-else type="left" />
    </div>
  </sider>
</template>

<script>
import { Layout } from "ant-design-vue";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import AsideItems from "./items";

const { Sider } = Layout;
export default {
  name: "index",
  components: { Sider, PerfectScrollbar, AsideItems },
  props: {
    theme: {
      type: String,
      default: () => "light",
    },
  },
  data: () => ({}),
  computed: {
    collapsed() {
      return this.$store.state.layout.collapsedMenu;
    },
  },
  methods: {
    toggleCollapsed() {
      console.log("call toggleCollapsed");
      this.$store.dispatch("layout/changeSideNavMode");
    },
    toggleCollapsedMobile() {
      if (process.client && window.innerWidth < 991) {
        this.$store.dispatch("layout/changeSideNavMode");
      }
    },
  },
  created() {},
  mounted() {},
};
</script>

<style lang="scss">
.ant-layout-sider {
  .ps {
    height: calc(100vh - 100px);
  }
}
</style>
