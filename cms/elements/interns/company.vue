<template>
  <a-form-model-item prop="company" name="company" label="Công Ty">
    <a-select ref="select_gender" mode="default" v-model:value="entry.company.name" show-search
      placeholder="Chọn công ty..." style="width: 100%" :not-found-content="loading ? undefined : null" @search="fetchData"
      @change="handleChange">
      <a-spin v-if="loading" slot="notFoundContent" size="small" />
      <a-select-option v-for="e in entries" :key="e.key">
        {{ e.title }}
      </a-select-option>
    </a-select>
  </a-form-model-item>

</template>



<script>
import debounce from "lodash/debounce";

export default {
  props: {
    value: Object,
  },
  data() {
    return {
      entries: [],
      entry: {
        company: {
          id: this.value.company.id,
          name: this.value.company.name,
          adress: this.value.company.adress,
        },
      },
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
      
      let response = await this.$store.dispatch("articles/ListCompanies", this.pagination);
      this.entry.company.name = this.value.company.name
      console.log("com", this.value.company)
      this.entries = response.data.entries.map((e) => {
        return {
          key: e.id,
          title: e.name,
          adress:e.adress,
        };

      });
      this.loading = false;
    },
    handleChange(entry) {
      let self = this;
      this.entries.map((e) => {
        if (entry === e.key) {
          self.value.company.id = e.key;
          self.value.company.name = e.title;
          self.value.company.adress = e.adress;

          return entry;
        }
      });
    },
  },
  created() {
    this.entry.company.name = this.value.company.name
    this.getData();
  },
};
</script>
