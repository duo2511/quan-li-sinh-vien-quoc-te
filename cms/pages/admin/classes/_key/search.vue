<template>
    <div>
        <a-page-header title="Lớp học" @back="() => routerBack()">
            <template v-slot:extra>
                <input v-model="keysearch" type="text" placeholder="Tìm kiếm" />
                   <nuxt-link :to="{ name: 'admin-classes-key-search', params: { key: keysearch } }">
                  <a-button type="outline-primary" size="small">
                              <a-icon type="search" />
                            </a-button>
                    </nuxt-link>
                <nuxt-link :to="{ name: 'admin-classes-create' }">
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
    keysearch: '',
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
                    id: entry.id,
                    name: entry.name,
                    schoolyear: entry.schoolyear,
                    department:entry.department.name,
                    actions: (
                        <a-space>
                            <nuxt-link to={{ name: "admin-classes-id-edit", params: { id: entry.id } }}>
                                <a-button type="outline-primary" size="small">
                                    <a-icon type="edit" />
                                </a-button>
                            </nuxt-link>
                            <a-popconfirm
                                placement="top"
                                title="Xoá lớp học này?"
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
                    title: "Tên lớp",
                },
                {
                    dataIndex: "department",
                    key: "department",
                    title: "Chuyên Ngành",
                },
                {
                    dataIndex: "schoolyear",
                    key: "schoolyear",
                    title: "Niên Khóa",
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
            this.$router.push({ name: "admin-classes-list" });
        },
        async getData() {
            this.loading = true;
            let response = await this.$store.dispatch("articles/SearchClass", this.$route.params.key);
            this.raw_entries = response.data.entries;
            this.loading = false;
        },
        async deleteData(entry) {
            this.loading = true;
            let response = await this.$store.dispatch("articles/DeleteClasses", entry);
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
