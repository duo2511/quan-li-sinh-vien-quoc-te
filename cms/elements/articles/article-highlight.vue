<template>
  <a-form-model-item prop="relate_articles" name="relate_articles" label="">
    <a-switch :checked="value.is_highlight" @change="onChange" />
    Bài viết nổi bật
  </a-form-model-item>
</template>

<script>
export default {
  name: "ArticleHighlight",
  data: () => ({}),
  props: {
    value: Object,
  },
  methods: {
    onChange(checked) {
      this.value.is_highlight = checked;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
