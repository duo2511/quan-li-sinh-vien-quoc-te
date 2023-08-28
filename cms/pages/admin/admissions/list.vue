<template>
  <div>
    <a-page-header title="Đăng ký tuyển sinh" @back="() => routerBack()">
      <template v-slot:extra>
        <nuxt-link :to="{ name: 'admin-admissions-create' }">
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
    loading: true,
    raw_entries: [],
  }),
  computed: {
    entries() {
      let self = this;
      return this.raw_entries.map((entry) => {
        return {
          key: entry.id,
          id: entry.id,
          name: entry.name,
          domain: entry.domain,
          slug: entry.slug,
          districts: <a-tag color="green">{entry.total_districts}</a-tag>,
          schools: <a-tag color="green">{entry.total_schools}</a-tag>,
          actions: (
            <a-space>
              <a-popconfirm
                placement="top"
                title="Xoá từ khoá này?"
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
          dataIndex: "name",
          key: "name",
          title: "Tên",
        },
        {
          title: "Quận huyện",
          key: "districts",
          dataIndex: "districts",
        },
        {
          title: "Trường học",
          key: "schools",
          dataIndex: "schools",
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
      let response = await this.$store.dispatch("admissions/ListAdmissions", this.pagination);
      this.raw_entries = response.data.entries;
      this.loading = false;
    },
    async deleteData(entry) {
      this.loading = true;
      let response = await this.$store.dispatch("admissions/DeleteAdmission", entry);
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
