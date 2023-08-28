<template>
  <a-row style="z-index: 1">
    <a-col
      :xxl="{ span: 8, offset: 8 }"
      :xl="{ span: 10, offset: 7 }"
      :lg="{ span: 12, offset: 6 }"
      :md="{ span: 20, offset: 2 }"
      :sm="{ span: 20, offset: 2 }"
    >
      <a-card style="margin-top: 3rem">
        <div class="text-center">
          <!--          <img src='~/assets/images/idist-logo.svg' alt='' width='128'>-->
          <img src="~/assets/images/ptit-logo.png" alt="" width="128" />
          <h2 class="color-primary mt-20 mb-30">PTIT's Portal Content Management System</h2>
        </div>
        <a-form-model ref="FormLogin" layout="vertical" :rules="rules" :model="entry">
          <a-row>
            <a-col :xxl="{ span: 24 }">
              <div>
                <a-alert type="error" v-if="message !== ''" class="mb-20" :message="message" closable />
              </div>
            </a-col>
            <a-col
              :xxl="{ span: 12, offset: 6 }"
              :xl="{ span: 14, offset: 5 }"
              :lg="{ span: 16, offset: 4 }"
              :md="{ span: 18, offset: 3 }"
              :sm="{ span: 20, offset: 2 }"
            >
              <a-form-model-item prop="username" name="username" label="Tên đăng nhập">
                <a-input v-model:value="entry.username" placeholder="Tên đăng nhập..." />
              </a-form-model-item>
              <a-form-model-item prop="password" name="password" label="Mật khẩu">
                <a-input-password v-model:value="entry.password" placeholder="Nhập mật khẩu" />
              </a-form-model-item>
              <div class="d-flex">
                <a-checkbox class="flex" @change="entry.remember = !entry.remember"> Nhớ đăng nhập </a-checkbox>
                <nuxt-link :to="{ name: 'auth-forgot_password' }">Quên mật khẩu?</nuxt-link>
              </div>
              <div class="mt-10 mb-30">
                <a-button
                  class="ant-btn-block"
                  size="large"
                  :loading="loading"
                  :disabled="loading"
                  type="primary-6"
                  html-type="submit"
                  @click.prevent="SubmitForm"
                >
                  Đăng nhập
                </a-button>
              </div>
            </a-col>
          </a-row>
        </a-form-model>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "Login",
  layout: "auth",
  data: () => ({
    loading: false,
    loadingOIDC: false,
    rules: {
      username: [
        {
          required: true,
          message: "Không được bỏ trống",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Không được bỏ trống",
          trigger: "blur",
        },
      ],
    },
    entry: {
      username: "",
      password: "",
      remember: false,
    },
    message: "",
    message_description: "",
  }),
  methods: {
    async SubmitForm() {
      let self = this;
      this.$refs.FormLogin.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.message = "";
          let response = await this.$store.dispatch("users/PostLogin", this.entry);
          console.log(response);
          if (response === undefined) {
            await self.$toast.show("đăng nhập thành công", { duration: 2000, type: "success" });
            this.loading = false;
          } else if (response && response.code === 200) {
            this.$cookies.set("jwt", response.data.access_token, {
              path: "/",
              maxAge: 60 * 60 * 24,
            });
            await self.$router.push({ name: "admin-homepage" });
            await self.$toast.show("đăng nhập thành công", { duration: 2000, type: "success" });
          } else {
            self.message = response.message;
            self.message_description = response.error;
            this.loading = false;
          }
        }
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped></style>
