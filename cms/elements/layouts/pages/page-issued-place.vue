<template>
  <a-form-model-item prop="issue_place" name="issue_place" label="Nơi cấp">
    <a-select
      mode="default"
      show-search
      label-in-value
      :value="value.issue_pace ? { label: value.issue_pace.name, key: value.issue_pace.id } : undefined"
      placeholder="Chọn Tỉnh/TP..."
      style="width: 100%"
      :filter-option="false"
      :not-found-content="loading ? undefined : null"
      @search="fetchData"
      @change="handleChange"
    >
      <a-spin v-if="loading" slot="notFoundContent" size="small" />
      <a-select-option v-for="e in entries" :key="e.id">
        {{ e.name }}
      </a-select-option>
    </a-select>
  </a-form-model-item>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "PageIssuePlace",
  props: {
    value: Object,
  },
  data() {
    return {
      entries: [],
      loading: true,
      fetchData: debounce(this.getData, 1000),
      pagination: {
        page: 1,
        length: 12,
        search: "",
      },
    };
  },
  methods: {
    async getData(search = "") {
      this.loading = true;
      this.pagination.search = search;
      let response = await this.$store.dispatch("provinces/ListProvinces", this.pagination);
      this.entries = response.data.entries;
      this.loading = false;
    },
    handleChange(entry) {
      let self = this;
      this.entries.map((e) => {
        if (entry.key === e.id) {
          self.value.issue_pace = e;
          self.value.issue_pace_id = e.id;
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
