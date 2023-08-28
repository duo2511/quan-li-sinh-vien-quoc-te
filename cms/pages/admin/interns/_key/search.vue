<template>
    <div>
        <a-page-header title="Danh sách thực tập" @back="() => routerBack()">
        </a-page-header>

        <div class="header-row">
            <div class="search-input-container">
                <input v-model="keysearch" type="text" placeholder="Tìm kiếm" class="search-input" />
                <nuxt-link :to="{ name: 'admin-interns-key-search', params: { key: keysearch } }">
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
        loading: true,
        raw_entries: [],
        student_entries: [],
        department_entries: [],
        department: {
            id: "",
            name: "",
        },
        keysearch: "",
    }),
    computed: {


        entries() {
            let self = this;



            return this.student_entries.map((entry) => {

                return {
                    name: entry.name,
                    studentid: entry.studentid,
                    department: entry.department.name,
                    company: this.findInternByStudentId(entry.id)?.company.name || "Chưa có",
                    actions: (
                        this.findInternByStudentId(entry.id) ? (
                            <a-space>
                                <nuxt-link to={{ name: 'admin-interns-id-edit', params: { id: this.findInternByStudentId(entry.id).id } }}>
                                    <a-button type="outline-primary" size="small">
                                        <a-icon type="edit" />
                                    </a-button>
                                </nuxt-link>
                            </a-space>
                        ) : (<a-space>
                            <nuxt-link to={{ name: 'admin-interns-idstudent-create', params: { idstudent: entry.id } }}>
                                <a-button type="outline-primary" size="small">
                                    <a-icon type="create" /> Tạo Mới
                                </a-button>
                            </nuxt-link>
                        </a-space>)
                    ),
                };
            });
        },
        columns() {
            return [
                {
                    dataIndex: "name",
                    key: "name",
                    title: "Tên Sinh viên",
                },
                {
                    dataIndex: "studentid",
                    key: "studentid",
                    title: "Mã Sinh viên",
                },
                {
                    dataIndex: "department",
                    key: "department",
                    title: "Chuyên ngành",
                },
                {
                    dataIndex: "company",
                    key: "company",
                    title: "Đơn vị thực tập",
                },
                {
                    title: "",
                    key: "actions",
                    dataIndex: "actions",
                    className: "text-right",
                }
            ];
        },
    },
    methods: {
        routerBack() {
            this.$router.push({ name: "admin-homepage" });
        }, findInternByStudentId(studentId) {
            let interns = this.raw_entries
            let intern = interns.find((i) => i.studentid === studentId)
            console.log("intern :", intern)
            return intern

        }, filterByDepartment(entry) {
            let self = this;
            this.department_entries.map((e) => {
                if (entry === e.key) {
                    self.department.id = e.key;
                    self.department.name = e.title;

                    this.$router.push({ name: 'admin-interns-iddepartment-filter', params: { iddepartment: this.department.id } });
                }
            });
        },
        async getData() {

            this.loading = true;

            let response2 = await this.$store.dispatch("articles/ListDepartments", this.pagination);
            this.department_entries = response2.data.entries.map((e) => {
                return {
                    key: e.id,
                    title: e.name,
                };

            });
            let response = await this.$store.dispatch("articles/ListInterns", this.pagination);
            this.raw_entries = response.data.entries;
            console.log("internlist", this.raw_entries)
            let response1 = await this.$store.dispatch("articles/SearchStudent", this.$route.params.key);

            this.student_entries = response1.data.entries;
            console.log("Studentlist", this.student_entries)
            this.loading = false;
        }
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
    margin-top: 7%;
    margin-left: 3%;
    width: 18%;
}

.create-button-container {
    margin-left: auto;
}
</style>



