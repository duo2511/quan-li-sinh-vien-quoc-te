<template>
  <div>
    <a-row :gutter="16">
      <a-col :xxl="20" :xl="19" :lg="18" :md="24" :sm="24">
        <a-form-model ref="FormData" layout="vertical" :model="entry">
          <a-card class="mb-20" title="Tạo lớp học">
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
                <classesdepartment :value="entry" />
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
              Tạo lớp
            </a-button>
          </a-card>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import classesname from "@/elements/classes/classes-name";
import classesschoolyear from "@/elements/classes/classes-schoolyear";
 import classeslecture from "@/elements/classes/classes-lecture";
import classesdepartment from "@/elements/classes/classes-department";
import { object } from "vue-types";
export default {
  name: "tao-lop-hoc",
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
      department: {
        id: null,
          name: "",
      },
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
      this.$router.back();
    },
    async SubmitForm() {
      
      this.loading = true;
      let response = await this.$store.dispatch("articles/CreateClass", this.entry);
      if (response && response.code === 200) {
        this.$toast.show(response.message, { duration: 2000, type: "success" });
       // await this.$router.push({ name: "admin-classes-id-edit", params: { id: response.data.entry.id } });
       await this.$router.push({ name: "admin-classes-list" });
      }
      this.loading = false;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
