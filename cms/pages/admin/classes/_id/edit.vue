<template>
  <div>
    <a-page-header title="Danh sách lớp học" @back="() => routerBack()" />

    <a-form-model v-if="!loading" ref="FormData" layout="vertical" :rules="rules" :model="entry">
      <a-card class="mb-20" title="Sửa lớp học">
        <a-row :gutter="10">
          <a-col :md="12">
            <classesname :value="entry" />
          </a-col>
          <a-col :md="12">
            <classesschoolyear :value="entry" />
          </a-col>
          <a-col :md="12">
            <classeslecture :value="entry" @update="(e) => (entry = e)" />
          </a-col>

          <a-col :md="12">
            <classesdepartment :value="entry" @update="(e) => (entry = e)" />
          </a-col>
        </a-row>
      </a-card>

      <a-card class="mb-20 text-center">
        <a-button
          :loading="loading"
          :disabled="loading"
          type="primary"
          html-type="submit"
          @click.prevent="SubmitForm()"
        >
          Cập nhật lớp
        </a-button>
      </a-card>
    </a-form-model>
  </div>
</template>

<script>
import classesname from "@/elements/classes/classes-name";
import classesschoolyear from "@/elements/classes/classes-schoolyear";
import classeslecture from "@/elements/classes/classes-lecture";
import classesdepartment from "@/elements/classes/classes-department";
export default {
  name: "cap-nhat-lop-hoc",
  components: {
    classesname,
    classesschoolyear,
    classeslecture,
    classesdepartment,
  },
  layout: "admin",
  data: () => ({
    loading: false,
    entry: {
      name: "",
      schoolyear: "",
        lecture: {
        id: null,
        name: "",
      },
      department: null,
    },
  }),
  watch: {
    entry: {
      handler: function () {
        console.log(this.entry);
      },
      deep: true,
    },
  },
  methods: {
    routerBack() {
      this.$router.push({ name: "admin-classes-list" });
    },
    encodeTag() {
      if (process.client) {
        return window.btoa(unescape(encodeURIComponent(this.entry.name)));
      } else {
        return Buffer.from(this.entry.name, "utf-8").toString("base64");
      }
    },
    async getData() {
      this.loading = true;
      let response = await this.$store.dispatch("articles/GetClass", this.$route.params.id);
      this.entry = response.data.entry;
      this.loading = false;
      console.log("hello ", this.entry.department.name)
    },
    async SubmitForm(status = "draft") {
      this.$refs.FormData.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.entry.status = status;
          let response = await this.$store.dispatch("articles/UpdateClass", this.entry);
          if (response && response.code === 200) {
            this.$toast.show(response.message, { duration: 2000, type: "success" });
            await this.$router.push({ name: "admin-classes-list" });
          }
          this.loading = false;
        }
      });
    },
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped></style>
