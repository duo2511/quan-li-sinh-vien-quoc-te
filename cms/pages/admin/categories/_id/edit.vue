<template>
  <div>
    <a-page-header title="Danh mục" @back="() => routerBack()" />
    <a-row :gutter="16">
      <a-col :xxl="16" :lg="16" :md="16" :sm="24">
        <a-card>
          <a-form-model v-if="!loading" ref="FormLogin" layout="vertical" :rules="rules" :model="entry">
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
          <div v-else>
            <a-spin />
          </div>
        </a-card>
      </a-col>
      <a-col :xxl="8" :lg="8" :md="8" :sm="24">
        <category-children :parent="entry" />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import CategoryParent from "~/elements/categories/category-parent";
import CategoryChildren from "~/elements/categories/category-children.vue";

export default {
  name: "edit",
  components: { CategoryChildren, CategoryParent },
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
      let response = await this.$store.dispatch("categories/UpdateCategory", this.entry);

      if (response && response.code === 200) {
        this.routerBack();
      }
      this.$toast.show(response.message, {
        duration: 2000,
        type: response && response.code === 200 ? "success" : "danger",
      });
      this.loading = false;
    },
    async getData() {
      this.loading = true;
      let response = await this.$store.dispatch("categories/GetCategory", this.$route.params.id);
      if (response && response.code === 200) {
        this.entry = response.data.entry;
      }
      this.loading = false;
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
};
</script>

<style scoped></style>
