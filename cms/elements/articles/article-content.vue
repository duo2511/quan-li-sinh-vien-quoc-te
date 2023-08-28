<template>
  <a-form-model-item prop="content" name="content" label="">
    <rich-editor v-model:value="value.content" @update="ChangeContent" />
  </a-form-model-item>
</template>

<script>
export default {
  name: "ArticleContent",
  props: {
    value: Object,
  },
  data: () => ({
    entry: {
      content: "",
    },
  }),
  methods: {
    ChangeContent(content) {
      this.entry.content = content;
      this.$emit("update", this.entry);
    },
  },
  created() {
    this.entry = this.value;
  },
  mounted() {},
};
</script>

<style scoped></style>
