<template>
  <div>
    <a-page-header title="Tạo mới từ khoá" @back="() => routerBack()" />

    <a-card>
      <a-form-model ref="FormData" layout="vertical" :rules="rules" :model="entry">
        <a-row :gutter="16">
          <a-col :xl="12" :sm="24">
            <a-form-model-item prop="name" name="name" label="Từ khoá">
              <a-input v-model:value="entry.name" placeholder="Nhập tên danh mục..." />
            </a-form-model-item>
          </a-col>
          <a-col :xl="12" :sm="24">
            <a-form-model-item prop="hash" name="hash" label="Mã hoá từ khoá">
              <a-input disabled="" :value="encodeTag()" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <div class="mt-10 mb-30">
          <a-button
            :loading="loading"
            :disabled="loading"
            type="primary"
            html-type="submit"
            @click.prevent="SubmitForm"
          >
            Lưu
          </a-button>
          <a-popconfirm placement="top" ok-text="Đồng ý" cancel-text="Không" @confirm="routerBack">
            <template v-slot:title>
              <p>Huỷ tạo mới danh mục?</p>
              <p>Bạn xác nhận huỷ tạo danh mục này...</p>
            </template>
            <a-button type="white" size="default" :outlined="true">Huỷ</a-button>
          </a-popconfirm>
        </div>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import CategoryParent from "~/elements/categories/category-parent";

export default {
  name: "create",
  components: { CategoryParent },
  layout: "admin",
  data: () => ({
    loading: false,
    entry: {
      name: "",
      hash: "",
      is_active: true,
      slug: "",
    },
    rules: {
      name: [
        {
          required: true,
          message: "Không được bỏ trống",
          trigger: "blur",
        },
      ],
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
      this.$router.push({ name: "admin-tags-list" });
    },
    encodeTag() {
      if (process.client) {
        return window.btoa(unescape(encodeURIComponent(this.entry.name)));
      } else {
        return Buffer.from(this.entry.name, "utf-8").toString("base64");
      }
    },
    async SubmitForm() {
      this.loading = true;
      let response = await this.$store.dispatch("tags/CreateTag", this.entry);
      if (response && response.code === 200) {
        this.$toast.show(response.message, { duration: 2000, type: "success" });
      }
      this.loading = false;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
