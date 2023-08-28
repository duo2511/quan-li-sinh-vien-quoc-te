<template>
  <a-form-model-item prop="tags" name="tags" label="Từ khoá liên quan">
    <a-select
      mode="multiple"
      show-search
      label-in-value
      v-model:value="value.tag_ids"
      placeholder="Chọn từ khoá..."
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
  name: "ArticleTags",
  props: {
    value: Object,
  },
  data() {
    return {
      entries: [],
      entry: {
        tag_ids: [],
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
      let response = await this.$store.dispatch("tags/ListTags", this.pagination);
      if (response.code === 200) {
        this.entries = response.data.entries.map((e) => {
          return {
            key: e.id,
            title: e.name,
          };
        });
      }
      this.loading = false;
    },
    handleChange(entries) {
      this.value.tag_ids = [];
      entries.map((e) => {
        this.value.tag_ids.push(e.key);
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
