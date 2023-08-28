<template>
  <div>
    <a-page-header title="Tạo mới bài viết" @back="() => routerBack()" />

    <a-form-model v-if="!loading" ref="FormData" layout="vertical" :rules="rules" :model="entry">
      <a-row :gutter="16">
        <a-col :xxl="18" :lg="18" :md="18" :sm="24">
          <a-card class="mb-20">
            <a-row :gutter="10">
              <a-col :md="18">
                <article-title :value="entry" />
              </a-col>
              <a-col :md="6">
                <article-slug :value="entry" />
              </a-col>
            </a-row>
            <article-description :value="entry" />
          </a-card>
          <a-card class="mb-20" :body-style="{ padding: ' 0 !important' }">
            <article-content :value="entry" @update="(e) => (entry = e)" />
          </a-card>
          <a-card class="mb-20">
            <article-relates :value="entry" @update="(e) => (entry = e)" />
            <article-tags :value="entry"   @update="(e) => (entry = e)" />
          </a-card>
        </a-col>
        <a-col :xxl="6" :lg="6" :md="6" :sm="24">
          <a-card class="mb-20" :body-style="{ padding: ' 10px !important' }">
            <article-thumbnail :value="entry" @update="(e) => (entry = e)" />
            <article-published-at :value="entry" @update="(e) => (entry = e)" />
            <article-category :value="entry" @update="(e) => (entry = e)" />
          </a-card>
          <a-card class="mb-20">
            <a-button
              :loading="loading"
              :disabled="loading"
              type="primary"
              html-type="submit"
              @click.prevent="SubmitForm('draft')"
            >
              Lưu nháp
            </a-button>
            <a-popconfirm placement="top" ok-text="Đồng ý" cancel-text="Không" @confirm="routerBack">
              <template v-slot:title>
                <p>Huỷ tạo mới bài viết?</p>
                <p>Bạn xác nhận huỷ tạo bài viết này...</p>
              </template>
              <a-button type="white" size="default" :outlined="true">Huỷ</a-button>
            </a-popconfirm>
          </a-card>
          <a-card class="mb-20">
            <article-highlight :value="entry" />
          </a-card>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import CategoryParent from "~/elements/categories/category-parent";
import ArticleTitle from "@/elements/articles/article-title";
import ArticleDescription from "@/elements/articles/article-description";
import ArticleContent from "@/elements/articles/article-content";
import ArticleRelates from "~/elements/articles/article-relates";
import ArticleTags from "~/elements/articles/article-tags";
import ArticleSlug from "~/elements/articles/article-slug";
import ArticleThumbnail from "~/elements/articles/article-thumbnail";
import ArticlePublishedAt from "~/elements/articles/article-published-at";
import ArticleCategory from "~/elements/articles/article-category";
import ArticleHighlight from "~/elements/articles/article-highlight";

export default {
  name: "edit",
  components: {
    ArticleHighlight,
    ArticleCategory,
    ArticlePublishedAt,
    ArticleThumbnail,
    ArticleSlug,
    ArticleTags,
    ArticleRelates,
    ArticleContent,
    ArticleDescription,
    ArticleTitle,
    CategoryParent,
  },
  layout: "admin",
  data: () => ({
    loading: false,
    entry: {
      title: "",
      thumbnail: "",
      description: "",
      slug: "",
      content: "",
      relate_article_ids: [],
      tag_ids:null,
      published_at: null,
      category_id: null,
      category: null,
      is_highlight: false,
      status: "draft",
    },
    rules: {
      title: [
        {
          required: true,
          message: "Không được bỏ trống",
          trigger: "blur",
        },
        {
          min: 10,
          message: "Độ dài tối thiểu 10 ký tự",
          trigger: "blur",
        },
        {
          max: 100,
          message: "Độ dài tối đa 100 ký tự",
          trigger: "blur",
        },
      ],
      description: [
        {
          max: 120,
          message: "Độ dài tối đa 220 ký tự",
          trigger: "blur",
        },
      ],
      content: [
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
      this.$router.push({ name: "admin-articles-list" });
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
      let response = await this.$store.dispatch("articles/GetArticle", this.$route.params.id);
      this.entry = response.data.entry;
      this.loading = false;
    },
    async SubmitForm(status = "draft") {
      this.$refs.FormData.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          this.entry.status = status;
          let response = await this.$store.dispatch("articles/UpdateArticle", this.entry);
          if (response && response.code === 200) {
            this.$toast.show(response.message, { duration: 2000, type: "success" });
            await this.$router.push({ name: "admin-articles-id-edit", params: { id: response.data.entry.id } });
          }
          this.loading = false;
        }
      });
    },
    onSelectedTag(v) {
      this.entry.tag_ids = v;
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
};
</script>

<style scoped></style>
