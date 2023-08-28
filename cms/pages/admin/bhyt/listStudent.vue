<template>
    <div>
        <a-page-header title="Chọn sinh viên" @back="() => routerBack()">
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
        keysearch: '',
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
                    gender: entry.gender,
                    birthday: entry.birthday,
                    studentid: entry.studentid,
                    department: entry.department.name,
                    actions: (
                        <a-space>
                            <nuxt-link to={{ name: "admin-bhyt-idstudent-create", params: { idstudent: entry.id } }}>
                                <a-button type="outline-primary" size="small">
                                    Chọn
                                </a-button>
                            </nuxt-link>

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
                    title: "Tên sinh viên",
                },
                {
                    dataIndex: "studentid",
                    key: "studentid",
                    title: "Mã sinh viên",
                },
                {
                    dataIndex: "department",
                    key: "department",
                    title: "Khoa",
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
            this.$router.push({ name: "admin-bhyt-list" });
        },
        async getData() {
            this.loading = true;
            let response = await this.$store.dispatch("articles/ListStudents", this.pagination);
            this.raw_entries = response.data.entries;
            this.loading = false;
        }
    },
};
</script>

<style scoped></style>
