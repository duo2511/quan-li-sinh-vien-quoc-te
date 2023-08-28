<template>
  <div id="page-layout">
    <idist-header />
    <layout class="layout container">
      <content id="main-section" class="page-section">
        <Nuxt />
      </content>
    </layout>
    <idist-footer />
  </div>
</template>

<script>
import IdistHeader from "@/elements/layouts/pages/idist-header";
import { Layout } from "ant-design-vue";
import IdistFooter from "@/elements/layouts/pages/idist-footer";

export default {
  name: "page",
  components: {
    IdistFooter,
    IdistHeader,
    Layout,
  },
  data: () => ({}),
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style lang="scss">
.page-section {
  margin-top: 64px;
}
</style>
