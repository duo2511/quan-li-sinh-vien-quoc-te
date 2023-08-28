<template>
  <a-form-model-item prop="point" name="point" label="Điểm">
    <a-input type="number" v-model:value="entry.avgpoint" placeholder="..." />
  </a-form-model-item>
</template>

<script>
export default {
  name: "point",
  props: {
    value: Object,
  },
  data: () => ({
    entry: {
      avgpoint: null,
    },
  }),
  methods: {},
  created() {
    this.entry = this.value;
  },
  mounted() {},
};
</script>

<style scoped></style>
