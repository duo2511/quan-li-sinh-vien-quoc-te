<template>
  <a-form-model-item prop="name" name="name" label="Tên lớp">
    <a-input v-model:value="entry.name" placeholder="Tên lớp..." />
  </a-form-model-item>
</template>

<script>
export default {
  name: "classesname",
  props: {
    value: Object,
  },
  data: () => ({
    entry: {
      name: "",
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
