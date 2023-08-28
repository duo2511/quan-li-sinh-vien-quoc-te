<template>
  <div>
    <a-page-header title="Bài viết" @back="() => routerBack()">
      <template v-slot:extra>
         <input v-model="keysearch" type="text" placeholder="Tìm kiếm" />
             <nuxt-link :to="{ name: 'admin-articles-key-search', params: { key: keysearch } }">
            <a-button type="outline-primary" size="small">
                        <a-icon type="search" />
                      </a-button>
              </nuxt-link>
              <nuxt-link :to="{ name: 'admin-articles-sort' }">
            <a-button type="primary">
              Sort
            </a-button>
          </nuxt-link>
        <nuxt-link :to="{ name: 'admin-articles-create' }">
          <a-button type="success">
            <a-icon type="plus" />
            Tạo mới
          </a-button>
        </nuxt-link>
          

                  
      </template>
    </a-page-header>

    <a-card>
      <a-table :loading="loading" :columns="columns" :data-source="entries" />
    </a-card>
  </div>
</template>

<script>
import list from "~/mixins/list";

export default {
  name: "list",
  layout: "admin",
  mixins: [list],
  data: () => ({

    keysearch :'',
    loading: true,
    raw_entries: [],
  }),
  computed: {
    entries() {
      let self = this;
      return this.raw_entries.map((entry) => {
        return {
          id: entry.id,
          thumbnail: <a-avatar shape="square" size={64} icon="user" />,
          title: entry.title,
          slug: entry.slug,
          status: (
            <div>
              <a-tooltip placement="top">
                <template slot="title">
                  <span>
                    {entry.publisher ? entry.publisher.name : "admin"}: {self.moment(entry.published_at)}
                  </span>
                </template>
                <a-tag color="green">Xuất bản</a-tag>
              </a-tooltip>
            </div>
          ),
          actions: (
            <a-space>
              <nuxt-link to={{ name: "admin-articles-id-edit", params: { id: entry.id } }}>
                <a-button type="outline-primary" size="small">
                  <a-icon type="edit" />
                </a-button>
              </nuxt-link>
              <a-popconfirm
                placement="top"
                title="Xoá bài viết này?"
                ok-text="Đồng ý"
                cancel-text="Không"
                onConfirm={() => {
                  self.deleteData(entry);
                }}
              >
                <a-button type="outline-danger" size="small">
                  <a-icon type="delete" />
                </a-button>
              </a-popconfirm>
            </a-space>
          ),
        };
      });
    },
    columns() {
      return [
        {
          dataIndex: "thumbnail",
          key: "thumbnail",
          title: "",
        },
        {
          dataIndex: "title",
          key: "title",
          title: "Tiêu đề",
        },
        {
          title: "Trạng thái",
          dataIndex: "status",
          key: "status",
        },
        {
          title: "Slug",
          dataIndex: "slug",
          key: "slug",
        },
        {
          title: "Bộ đếm",
          key: "count",
          dataIndex: "count",
        },
        {
          title: "",
          key: "actions",
          dataIndex: "actions",
          className: "text-right",
        },
      ];
    },
  },
  methods: {
    routerBack() {
      this.$router.push({ name: "admin-homepage" });
    },
    async getData() {
      this.loading = true;
      let response = await this.$store.dispatch("articles/ListArticles", this.pagination);
      this.raw_entries = response.data.entries;
      this.loading = false;
    },
    async deleteData(entry) {
      this.loading = true;
      let response = await this.$store.dispatch("articles/DeleteArticle", entry);
      if (response && response.code === 200) {
        await this.getData();
      }

      this.$toast.show(response.message, {
        duration: 2000,
        type: response && response.code === 200 ? "success" : "danger",
      });
      this.loading = false;
    },
  },
};
</script>

<style scoped></style>
