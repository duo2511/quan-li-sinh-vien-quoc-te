<template>
  <nuxt-link class="top-menu" :to="{ name: 'admin-homepage' }" style="margin-left: 1rem">
    <img src="~/assets/images/ptit-logo.png" alt="logo" height="40" />
    <template v-if="innerWidth > 0">
      <span class="color-primary" style="font-weight: 600" v-if="innerWidth > 991"> PTIT CMS </span>
      <span class="color-primary" v-else> PTIT </span>
    </template>
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
