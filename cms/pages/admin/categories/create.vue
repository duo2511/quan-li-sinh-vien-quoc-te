<template>
  <div>
    <a-page-header title="Danh mục" @back="() => routerBack()" />

    <a-card>
      <a-form-model ref="FormData" layout="vertical" :rules="rules" :model="entry">
        <a-row :gutter="16">
          <a-col :xl="12" :sm="24">
            <a-form-model-item prop="name" name="name" label="Tên danh mục">
              <a-input v-model:value="entry.name" placeholder="Nhập tên danh mục..." />
            </a-form-model-item>
          </a-col>
          <a-col :xl="12" :sm="24">
            <a-form-model-item prop="slug" name="slug" label="Slug danh mục">
              <a-input v-model:value="entry.slug" placeholder="Nhập slug danh mục..." />
            </a-form-model-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :xl="12" :sm="24">
            <a-form-model-item prop="is_active" name="is_active" label="Hiển thị">
              <a-switch v-model:value="entry.is_active" />
            </a-form-model-item>
          </a-col>
          <a-col :xl="12" :sm="24">
            <a-form-model-item prop="parent" name="parent" label="Danh mục cha">
              <category-parent v-model:value="entry" @update="(e) => (entry.parent = e)" />
            </a-form-model-item>
          </a-col>
          <a-col :sm="24">
            <a-form-model-item prop="description" name="description" label="Mô tả">
              <a-textarea v-model:value="entry.description" placeholder="Nhập mô tả danh mục..." />
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
      description: "",
      is_active: true,
      parent: null,
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
      this.$router.push({ name: "admin-categories-list" });
    },
    async SubmitForm() {
      this.loading = true;
      let response = await this.$store.dispatch("categories/CreateCategory", this.entry);
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
