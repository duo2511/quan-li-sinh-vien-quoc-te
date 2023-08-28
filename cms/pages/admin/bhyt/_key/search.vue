<template>
    <div>
        <a-page-header title="Danh sách bảo hiểm y tế " @back="() => routerBack()">
        </a-page-header>
        <div class="header-row">
            <div class="search-input-container">
                <input v-model="keysearch" type="text" placeholder="Tìm kiếm" class="search-input" />
                <nuxt-link :to="{ name: 'admin-bhyt-key-search', params: { key: keysearch } }">
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
        keysearch: '',
    }),
    computed: {


        entries() {
            let self = this;


            let i = 0
            return this.student_entries.map((entry) => {
                i++
                const formattedBirthday = new Date(entry.birthday).toLocaleDateString();
                const formattedStartDay = new Date(this.findBHYTByStudentId(entry.id)?.start_day || "").toLocaleDateString();
                const formattedExpiedDay = new Date(this.findBHYTByStudentId(entry.id)?.expired_day || "").toLocaleDateString();
                return {

                    stt: i,
                    name: entry.name,
                    gender: entry.gender,
                    studentid: entry.studentid,
                    birthday: formattedBirthday,
                    bhytid: this.findBHYTByStudentId(entry.id)?.bhytid || "",
                    startday: formattedStartDay,
                    expiredday: formattedExpiedDay,
                    actions: (
                        this.findBHYTByStudentId(entry.id) ? (
                            <a-space>
                                <nuxt-link to={{ name: 'admin-bhyt-id-edit', params: { id: this.findBHYTByStudentId(entry.id).id } }}>
                                    <a-button type="outline-primary" size="small">
                                        <a-icon type="edit" />
                                    </a-button>
                                </nuxt-link>
                            </a-space>
                        ) : (<a-space>
                            <nuxt-link to={{ name: 'admin-bhyt-idstudent-create', params: { idstudent: entry.id } }}>
                                <a-button type="outline-primary" size="small">
                                    <a-icon type="edit" />
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
                    dataIndex: "stt",
                    key: "stt",
                    title: "STT",
                },
                {
                    dataIndex: "name",
                    key: "name",
                    title: "Tên Sinh viên",
                },
                {
                    dataIndex: "gender",
                    key: "gender",
                    title: "Giới tính",
                },
                {
                    dataIndex: "studentid",
                    key: "studentid",
                    title: "Mã Sinh viên",
                }, {
                    dataIndex: "birthday",
                    key: "birthday",
                    title: "Ngày sinh",
                },
                {
                    dataIndex: "bhytid",
                    key: "bhytid",
                    title: "Mã bảo hiểm y tế ",
                }, {
                    dataIndex: "expiredday",
                    key: "expiredday",
                    title: "Giá trị đến",
                },
                {
                    dataIndex: "startday",
                    key: "startday",
                    title: "Thời điểm đủ 5 năm liên tục : Từ",
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
        }, findBHYTByStudentId(studentId) {

            let bhyts = this.raw_entries
            let bhyt = bhyts.find((bhyt) => bhyt.student === studentId)



            return bhyt


        }, filterByDepartment(entry) {
            let self = this;
            this.department_entries.map((e) => {
                if (entry === e.key) {
                    self.department.id = e.key;
                    self.department.name = e.title;

                    this.$router.push({ name: 'admin-bhyt-iddepartment-filter', params: { iddepartment: this.department.id } });
                }
            });
        },
        async getData() {

            this.loading = true;
            let response = await this.$store.dispatch("articles/ListDepartments", this.pagination);
            this.department_entries = response.data.entries.map((e) => {
                return {
                    key: e.id,
                    title: e.name,
                };
            });
            let response1 = await this.$store.dispatch("articles/ListBHYTs", this.pagination);
            this.raw_entries = response1.data.entries;
           
           let response2 = await this.$store.dispatch("articles/SearchStudent", this.$route.params.key);
            this.student_entries = response2.data.entries;
            



            this.loading = false;

        }
    },
    created() {
    }
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
