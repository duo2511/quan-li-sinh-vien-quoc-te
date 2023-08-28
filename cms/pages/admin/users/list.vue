<template>
  <div>
    <a-page-header title="Người dùng" @back="() => routerBack()">
      <template v-slot:extra>
        <nuxt-link :to="{ name: 'admin-users-create' }">
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
  mixins: [list],
  layout: "admin",
  computed: {
    entries() {
      let self = this;
      return this.raw_entries.map((entry) => {
        return {
          id: entry.id,
          thumbnail: <a-avatar shape="square" size={64} icon="user" />,
          name: (
            <div>
              <div>{entry.name}</div>
              <div class="small">
                <small>
                  <i>{self.moment(entry.last_active_at)}</i>
                </small>
              </div>
            </div>
          ),
          description: entry.description,
          slug: entry.slug,
          count: <a-tag color="green">{entry.count_articles}</a-tag>,
          actions: (
            <a-space>
              <nuxt-link to={{ name: "admin-users-id-edit", params: { id: entry.id } }}>
                <a-button type="outline-primary" size="small">
                  <a-icon type="edit" />
                </a-button>
              </nuxt-link>
              <a-popconfirm
                placement="top"
                title="Xoá danh mục này?"
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
          title: "Avatar",
        },
        {
          dataIndex: "name",
          key: "name",
          title: "Tên",
        },
        {
          title: "Mô tả",
          dataIndex: "description",
          key: "description",
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
  data: () => ({
    loading: true,
    raw_entries: [],
  }),
  methods: {
    routerBack() {
      this.$router.push({ name: "admin-homepage" });
    },
    async getData() {
      this.loading = true;
      let response = await this.$store.dispatch("users/ListUsers", this.pagination);
      this.raw_entries = response.data.entries;
      this.loading = false;
    },
    async deleteData(entry) {
      this.loading = true;
      let response = await this.$store.dispatch("users/DeleteUser", entry);
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
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
