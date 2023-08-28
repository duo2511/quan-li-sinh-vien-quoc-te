<template>
  <div>
    <a-row :gutter="16">
      <a-col :xxl="20" :xl="19" :lg="18" :md="24" :sm="24">
        <a-form-model ref="FormData" layout="vertical" :model="entry">
          <a-card class="mb-20" title="Tạo hồ sơ Thực tập">
            <a-row :gutter="10">
              <a-col :md="12">
                <a-form-model-item prop="name" name="name" label="Tên sinh viên">
                  <a-input :value="entry2.name"  />
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="studentid" name="studentid" label="Mã sinh viên">
                  <a-input :value="entry2.studentid" />
                </a-form-model-item>
              </a-col>
            <a-col :md="12">
                  <company :value="entry" @update="(e) => (entry = e)" />
            </a-col>
             <a-col :md="12"
                  ><a-form-model-item prop="adress" name="adress" label="Địa chỉ">
                    <a-input v-model:value="entry.company.adress" />
                  </a-form-model-item>
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
              Tạo hồ sơ thực tập
            </a-button>
          </a-card>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import bsonObjectId from 'bson-objectid';
import Company from "@/elements/interns/company";

export default {
  name: "tao-thuc-tap",
  components: {
    Company,
  },
  layout: "admin",
  data: () => ({
    loading: false,
    entry: {
      studentid:'',
      company:{
        id:"",
        name:"",
        adress:"",

      }
    },
    entry2:{
      id:"",
      name: "",
      studentid:"",
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
    }, encodeTag() {
      if (process.client) {
        return window.btoa(unescape(encodeURIComponent(this.entry2)));
      } else {
        return Buffer.from(this.entry2, "utf-8").toString("base64");
      }
    },
    async SubmitForm() {
      this.loading = true;

      this.entry.studentid = this.$route.params.idstudent

      console.log("ok",this.entry.studentid)
      
      let response = await this.$store.dispatch("articles/CreateIntern", this.entry);
      if (response && response.code === 200) {
        this.$toast.show(response.message, { duration: 2000, type: "success" });
      }
      this.loading = false;
    },
    async getData() {
      this.loading = true;
      let response = await this.$store.dispatch("articles/GetStudent", this.$route.params.idstudent);
      this.entry2 = response.data.entry;
      console.log('okas',this.entry2)
      this.loading = false;
    }
  },
  created() {this.getData()}
};
</script>

<style scoped></style>
