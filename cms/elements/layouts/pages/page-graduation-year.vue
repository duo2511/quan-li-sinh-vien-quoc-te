<template>
  <a-form-model-item prop="graduation_year" name="graduation_year" label="Năm tốt nghiệp">
    <a-select
      mode="default"
      show-search
      label-in-value
      :value="{ key: value.graduation_year, label: value.graduation_year }"
      placeholder="Chọn năm..."
      style="width: 100%"
      :filter-option="false"
      :not-found-content="loading ? undefined : null"
      @search="fetchData"
      @change="handleChange"
    >
      <a-spin v-if="loading" slot="notFoundContent" size="small" />
      <a-select-option v-for="e in entries" :key="e.key">
        {{ e.label }}
      </a-select-option>
    </a-select>
  </a-form-model-item>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "PageGraduationYear",
  props: {
    value: Object,
  },
  data() {
    return {
      entries: [],
      loading: true,
      fetchData: debounce(this.getData, 100),
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
      this.entries = [];
      for (let i = 2000; i < 2022; i++) {
        if (i.toString().indexOf(search) !== -1) {
          this.entries.push({
            key: i,
            label: i,
          });
        }
      }
      this.loading = false;
    },
    handleChange(entry) {
      console.log(entry);
      this.value.graduation_year = entry.key;
    },
  },
  created() {
    this.getData();
  },
};
</script>
