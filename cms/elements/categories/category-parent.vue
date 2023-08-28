<template>
  <a-select
    mode="default"
    show-search
    label-in-value
    :value="value.parent ? { label: value.parent.name } : undefined"
    placeholder="Chọn danh mục cha..."
    style="width: 100%"
    :filter-option="false"
    :not-found-content="loading ? undefined : null"
    @search="fetchUser"
    @change="handleChange"
  >
    <a-spin v-if="loading" slot="notFoundContent" size="small" />
    <a-select-option v-for="entry in entries" :key="entry.id">
      {{ entry.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "CategoryParent",
  props: {
    value: Object,
  },
  data() {
    return {
      entries: [],
      entry: null,
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
    async getData() {
      this.loading = true;
      let response = await this.$store.dispatch("categories/ListCategories", this.pagination);
      console.log(response);
      if (response.code === 200) {
        this.entries = response.data.entries;
      }
      this.loading = false;
    },
    handleChange(entry) {
      console.log(entry);

      this.entries.map((e) => {
        if (entry.key === e.id) {
          console.log("update entry id ", e.id);
          this.$emit("update", e);
        }
      });
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
};
</script>

<style scoped></style>
