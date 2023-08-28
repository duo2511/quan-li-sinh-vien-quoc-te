<template>
  <a-form-model-item prop="credit" name="credit" label="Số tín chỉ">
    <a-input type="number" v-model:value="entry.numcredit" placeholder="..." />
  </a-form-model-item>
</template>

<script>
export default {
  name: "credit",
  props: {
    value: Object,
  },
  data: () => ({
    entry: {
      numcredit: "",
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
