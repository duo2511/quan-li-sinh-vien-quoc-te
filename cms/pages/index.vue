<template>
  <div class="text-center" style="padding: 50px 0">
    <a-spin />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "index",
  layout: "admin",
  mounted() {
    this.$router.push({ name: "admin-homepage" });
  },
});
</script>
