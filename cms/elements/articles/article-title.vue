<template>
  <a-form-model-item prop="title" name="title" label="Tiêu đề">
    <a-input v-model:value="entry.title" placeholder="Nhập tiêu đề bài viết..." />
  </a-form-model-item>
</template>

<script>
export default {
  name: "ArticleTitle",
  props: {
    value: Object,
  },
  data: () => ({
    entry: {
      title: "",
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
