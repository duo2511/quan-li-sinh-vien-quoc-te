<template>
  <div>
    <a-page-header title="Tổng quan" />
    <a-row :gutter="16" justify="center">
      <a-col :xxl="6" :xl="8" :lg="10" :md="12" :sm="24">
        <overview-card />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import OverviewCard from "~/elements/homepage/overview-card";
export default {
  name: "index",
  components: { OverviewCard },
  layout: "admin",
  data: () => ({}),
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
