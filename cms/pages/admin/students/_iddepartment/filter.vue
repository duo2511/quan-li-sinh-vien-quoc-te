<template>
    <div>
        <a-page-header title="Danh sách hồ sơ sinh viên" @back="() => routerBack()">
            <template v-slot:extra>

                <div class="create-button-container">
                    <nuxt-link :to="{ name: 'admin-students-create' }">
                        <a-button type="success">
                            <a-icon type="plus" />
                            Tạo mới
                        </a-button>
                    </nuxt-link>
                </div>

            </template>
        </a-page-header>

        <h4>Tổng số sinh viên : {{ countStudents() }}</h4>

        <div class="header-row">
            <div class="search-input-container">
                <input v-model="keysearch" type="text" placeholder="Tìm kiếm" class="search-input" />
                <nuxt-link :to="{ name: 'admin-students-key-search', params: { key: keysearch } }">
                    <a-button type="outline-primary" size="small" class="search-button">
                        <a-icon type="search" />
                    </a-button>
                </nuxt-link>
            </div>

            <div class="department-dropdown-container">
                <a-form-model-item prop="department" name="department">
                    <a-select mode="default" v-model:value="department.name" show-search placeholder="Chọn khoa..."
                        style="width: 100%" :not-found-content="loading ? undefined : null" @search="fetchData"
                        @change="filterByDepartment" class="dropdown-select"> <a-select-option value="" disabled>--Lọc theo
                            khoa--</a-select-option>
                        <a-spin v-if="loading" slot="notFoundContent" size="small" />
                        <a-select-option v-for="e in department_entries" :key="e.key">
                            {{ e.title }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>
            </div>
        </div>



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
        department_entries: [],
        department: {
            id: "",
            name: "",
        },
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
                    class_name: entry.class_name,
                    actions: (
                        <a-space>
                            <nuxt-link to={{ name: "admin-students-id-edit", params: { id: entry.id } }}>
                                <a-button type="outline-primary" size="small">
                                    <a-icon type="edit" />
                                </a-button>
                            </nuxt-link>
                            <a-popconfirm
                                placement="top"
                                title="Xoá hồ sơ sinh viên này?"
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
                    title: "Tên sinh viên",
                },
                {
                    dataIndex: "gender",
                    key: "gender",
                    title: "Giới tính",
                },
                {
                    dataIndex: "studentid",
                    key: "studentid",
                    title: "Mã sinh viên",
                },
                {
                    dataIndex: "department",
                    key: "department",
                    title: "Chuyên Ngành",
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
            this.$router.push({ name: "admin-students-list" });
        },
        countStudents() {
            return this.raw_entries.length;
        },
        filterByDepartment(entry) {
            let self = this;
            this.department_entries.map((e) => {
                if (entry === e.key) {
                    self.department.id = e.key;
                    self.department.name = e.title;

                     this.$router.push({ name: 'admin-students-iddepartment-filter', params: { iddepartment: this.department.id } });
                }
            });
        },
        async getData() {
            this.loading = true;
            let response1 = await this.$store.dispatch("articles/ListDepartments", this.pagination);
            this.department_entries = response1.data.entries.map((e) => {
                return {
                    key: e.id,
                    title: e.name,
                };

            });
            let response = await this.$store.dispatch("articles/ListStudents", this.pagination);
            this.raw_entries = response.data.entries;
            this.raw_entries = this.raw_entries.filter(entry => entry.department.id === this.$route.params.iddepartment)
            this.loading = false;
        },
        async deleteData(entry) {
            this.loading = true;
            let response = await this.$store.dispatch("articles/DeleteStudent", entry);
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

<style scoped>
.header-row {
    display: flex;
    align-items: center;
    justify-content: left;
}

.search-input-container {
    margin-top: 5%;
    margin-left: 4%;
}

.department-dropdown-container {
    margin-top: 5.5%;
    margin-left: 3%;
    width: 18%;
}

.create-button-container {
    margin-left: auto;
}
</style>
