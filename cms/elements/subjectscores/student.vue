<template>
  <a-form-model-item prop="student" name="student" label="Tên sinh viên">
    <a-input v-model:value="entry.name" placeholder="Tên sinh viên..." />
  </a-form-model-item>
</template>

<script>
export default {
  name: "student",
  props: {
    value: Object,
  },
  data: () => ({
    entry: {
      student: "",
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
