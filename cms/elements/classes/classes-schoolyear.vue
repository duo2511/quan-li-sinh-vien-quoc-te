<template>
  <a-form-model-item prop="schoolyear" name="schoolyear" label="Khóa">
    <a-select ref="select_gender" v-model:value="entry.schoolyear">
      <a-select-option value="2019-2024">2019-2024</a-select-option>
      <a-select-option value="2020-2025">2020-2025</a-select-option>
      <a-select-option value="2021-2026">2021-2026</a-select-option>
      <a-select-option value="2022-2027">2022-2027</a-select-option>
    </a-select>
  </a-form-model-item>
</template>

<script>
export default {
  name: "classesschoolyear",
  props: {
    value: Object,
  },
  data: () => ({
    entry: {
      schoolyear: "",
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
