<template>
  <a-form-model-item prop="relate_articles" name="relate_articles" label="Bài viết liên quan">
    <a-select
      mode="multiple"
      show-search
      label-in-value
      v-model:value="value.relate_article_ids"
      placeholder="Chọn bài viết..."
      style="width: 100%"
      :filter-option="false"
      :not-found-content="loading ? undefined : null"
      @search="fetchUser"
    >
      <a-spin v-if="loading" slot="notFoundContent" size="small" />
      <a-select-option v-for="entry in entries" :key="entry.key">
        {{ entry.title }}
      </a-select-option>
    </a-select>
  </a-form-model-item>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "ArticleRelates",
  props: {
    value: Object,
  },
  data() {
    return {
      entries: [],
      entry: {
        relate_article_ids: [],
      },
      loading: true,
      fetchUser: debounce(this.getData, 1000),
      pagination: {
        page: 1,
        length: 12,
        search: "",
      },
    };
  },
  methods: {
    async getData(key = "") {
      this.loading = true;
      this.pagination.search = key;
      let response = await this.$store.dispatch("articles/ListArticles", this.pagination);
      if (response.code === 200) {
        this.entries = response.data.entries.map((e) => {
          return {
            key: e.id,
            title: e.title,
          };
        });
      }
      this.loading = false;
    },
    handleChange(entries) {
      this.value.relate_article_ids = [];
      entries.map((e) => {
        this.value.relate_article_ids.push(e.key);
      });
    },
  },
  created() {
    this.entry = this.value;
    this.getData();
  },
  mounted() {},
};
</script>

<style scoped></style>
