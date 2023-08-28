<template>
    <div>
        <a-page-header title="Lớp học" @back="() => routerBack()">
            <template v-slot:extra>

                <nuxt-link :to="{ name: 'admin-classes-create' }">
                    <a-button type="success">
                        <a-icon type="plus" />
                        Tạo mới
                    </a-button>
                </nuxt-link>
            </template>
        </a-page-header>
        <h3>Tổng số lớp : {{ countClasses() }}</h3>
      
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
        student_entries: [],
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
                    schoolyear: entry.schoolyear,
                    department: entry.department.name,
                    total: this.countStudentinClass(entry.id),
                    actions: (
                        <a-space>

                            <nuxt-link to={{ name: "admin-classes-id-classStudent", params: { id: entry.id } }}>
                                <a-button type="outline-primary" size="small">
                                    <a-icon type="menu" />
                                </a-button>
                            </nuxt-link>
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
                    title: "Chuyên ngành",
                },
                {
                    dataIndex: "schoolyear",
                    key: "schoolyear",
                    title: "Niên Khóa",
                },
                {
                    dataIndex: "total",
                    key: "total",
                    title: "Sĩ số",
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
        countClasses() {
            return this.raw_entries.length;
        },
      
        countStudentinClass(idClass) {
            console.log('students', this.student_entries)
            return this.student_entries.filter(student => student.class_name === idClass).length;

        }, filterByDepartment(entry) {
            let self = this;
            this.department_entries.map((e) => {
                if (entry === e.key) {
                    self.department.id = e.key;
                    self.department.name = e.title;

                    this.$router.push({ name: 'admin-classes-iddepartment-filter', params: { iddepartment: this.department.id } });
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
            let response2 = await this.$store.dispatch("articles/ListStudents", this.pagination);
            this.student_entries = response2.data.entries;
            let response = await this.$store.dispatch("articles/ListClasses", this.pagination);
            this.raw_entries = response.data.entries;
            this.raw_entries = this.raw_entries.filter(entry => entry.department.id === this.$route.params.iddepartment)
            this.loading = false;
        },
        async deleteData(entry) {
            this.loading = true;
            let response = await this.$store.dispatch("articles/DeleteClass", entry);
            if (response && response.code === 200) {
                await this.getData();
            }


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
    margin-top: 6.5%;
    margin-left: 3%;
    width: 14%;
}

.create-button-container {
    margin-left: auto;
}
</style>
