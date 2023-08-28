<template>
  <nuxt-link class="top-menu" to="/tuyen-sinh/dang-ky-xet-hoc-ba" style="margin-left: 1rem">
    <img src="~/assets/ptit/logo.jpeg" alt="logo" height="40" />
  </nuxt-link>
</template>

<script>
export default {
  name: "header-logo",
  data: () => ({
    innerWidth: 0,
  }),
  methods: {},
  created() {
    if (process.client) {
      this.innerWidth = window.innerWidth;
    }
  },
  mounted() {},
};
</script>

<style scoped></style>
