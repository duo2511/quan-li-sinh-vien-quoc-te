<template>
  <div>
    <a-page-header title="Quản trị hệ thống" @back="() => routerBack()">
      <template v-slot:extra>
        <a-button type="info" @click="reload" :disabled="loading">
          <a-icon type="reload" :spin="loading" />
        </a-button>
      </template>
    </a-page-header>
  </div>
</template>

<script>
export default {
  name: "general",
  layout: "admin",
  data: () => ({
    loading: false,
  }),
  computed: {},
  methods: {
    routerBack() {
      this.$router.push({ name: "admin-homepage" });
    },
    reload() {
      self = this;
      self.loading = true;
      setTimeout(() => {
        self.loading = false;
      }, 5000);
    },
  },
};
</script>

<style scoped></style>
