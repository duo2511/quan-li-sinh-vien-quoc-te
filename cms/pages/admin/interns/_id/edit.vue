<template>
  
  <div>
    <a-page-header title="Chọn đơn vị thực tập" @back="() => routerBack()">
          </a-page-header>
    <a-row :gutter="16">
      <a-col :xxl="20" :xl="19" :lg="18" :md="24" :sm="24">
        <a-form-model ref="FormData" layout="vertical" :model="entry">
          <a-card class="mb-20" title="Tạo hồ so thực tập ">
            <a-row :gutter="10">
              <a-col :md="12">
                <a-form-model-item prop="name" name="name" label="Tên sinh viên">
                  <a-input v-model:value="entry2.name" />
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="studentid" name="studentid" label="Mã sinh viên">
                  <a-input v-model:value="entry2.studentid" />
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <Company :value="entry" @update="(e) => (entry = e)" />
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
              Cập nhật
            </a-button>
          </a-card>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>

<script>

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
      id: "",
      studentid: "",
      company:{
        id:"",
        name:"",
        adress: ""
      },
      
    },
    entry2: {
      id: "",
      name: "",
      studentid: "",
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
      this.$router.push({ name: "admin-interns-list" });
    },
    encodeTag() {
      if (process.client) {
        return window.btoa(unescape(encodeURIComponent(this.entry)));
      } else {
        return Buffer.from(this.entry, "utf-8").toString("base64");
      }
    },
    async getData() {
      this.loading = true;
      
      let response = await this.$store.dispatch("articles/GetIntern", this.$route.params.id);
      this.entry = response.data.entry;
      let response2 = await this.$store.dispatch("articles/GetStudent", this.entry.studentid);
      this.entry2 = response2.data.entry;
      this.loading = false;
    },
    async SubmitForm(status = "draft") {
      this.$refs.FormData.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.entry.status = status;
          let response = await this.$store.dispatch("articles/UpdateIntern", this.entry);
          if (response && response.code === 200) {
            this.$toast.show(response.message, { duration: 2000, type: "success" });
            await this.$router.push({ name: "admin-interns-list" });
          }
          this.loading = false;
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
