<template>
  <div>
    <a-row :gutter="16">
      <a-col :xxl="20" :xl="19" :lg="18" :md="24" :sm="24">
        <a-form-model ref="FormData" layout="vertical" :model="entry">
          <a-card class="mb-20" title="Bảng điểm môn">
            <a-row :gutter="10">

              <a-col :md="12">
                <subject :value="entry" />
              </a-col>
              <a-col :md="12">
                <credit :value="entry" />
              </a-col>
               <a-col :md="12">
                  <department :value="entry" />
                </a-col>
                 <a-col :md="12">
                  <semester :value="entry" />
                </a-col>
              <a-col :md="12">
                <lecture :value="entry" />
              </a-col>

              <a-col :md="12">
                <point :value="entry" />
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
              Tạo bảng điểm
            </a-button>
          </a-card>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import subject from "@/elements/subjectscores/subject";
import credit from "@/elements/subjectscores/credit";
import lecture from "@/elements/subjectscores/lecture";
import point from "@/elements/subjectscores/point";
import department from "@/elements/subjectscores/department";
import semester from "@/elements/subjectscores/semester";

export default {
  name: "tao-bang-diem",
  components: {
    subject,
    credit,
    lecture,
    department,
    semester,
    point,
  },
  layout: "admin",
  data: () => ({
    loading: false,
    entry: {
      student: null,
      subject: {
        id: null,
        name: "",
      },
      semester: {
        id: null,
        name: "",
      },
      numcredit:null,
       lecture: {
        id: null,
        name: "",
      },
      department: {
        id: null,
        name: "",
      },
      avgpoint:null,
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
      this.$refs.FormData.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.entry.student= this.$route.params.idstudent
          console.log('cre',this.entry)
          let response = await this.$store.dispatch("articles/CreateSubjectScore", this.entry);
          if (response && response.code === 200) {
            this.$toast.show(response.message, { duration: 2000, type: "success" });
          }
          this.loading = false;
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
