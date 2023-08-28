<template>
  <div>children list</div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "CategoryChildren",
  props: {
    parent: Object,
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
