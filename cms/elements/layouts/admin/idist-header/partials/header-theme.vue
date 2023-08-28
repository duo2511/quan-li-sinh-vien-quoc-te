<template>
  <div class="themes">
    <a to="#" class="head-example" @click="changeTheme">
      <idist-feather-icons v-if="theme === 'light'" type="sun" :size="20" />
      <idist-feather-icons v-else type="moon" :size="20" />
    </a>
  </div>
</template>

<script>
export default {
  name: "header-theme",
  data: () => ({}),
  methods: {
    changeTheme() {
      this.$store.dispatch("layout/changeThemeMode");
    },
  },
  computed: {
    theme() {
      return this.$store.state.layout.theme;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
