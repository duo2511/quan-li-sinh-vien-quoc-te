<template>
  <a-form-model-item prop="department" name="department" label="Khoa">
    <a-select 
    ref="select_gender"
    mode="default" 
   v-model:value="entry.department.name" 
    show-search 
      placeholder="Chọn khoa..." 
        style="width: 100%"
      :not-found-content="loading ? undefined : null"
        @search="fetchData"
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
  name: "Department",
  props: {
    value: Object,
  },
  data() {
    return {
      entries: [],
      entry: {
        department: {
          id:this.value.department.id,
          name: this.value.department.name,
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
      let response = await this.$store.dispatch("articles/ListDepartments", this.pagination);
      this.entry.department.id = this.value.department.id
      this.entry.department.name = this.value.department.name
      this.entries = response.data.entries.map((e) => {
        return {
          key: e.id,
          title: e.name,
        };
       
      });
      
      console.log('ok',this.entry.department.id);
      this.loading = false;
    },
    handleChange(entry) {
      let self = this;
      this.entries.map((e) => {
        if (entry === e.key) {
          self.value.department.id = e.key;
          self.value.department.name = e.title;

          return entry;
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>