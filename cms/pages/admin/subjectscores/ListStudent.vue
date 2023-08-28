<template>
    <div>
        <a-page-header title="Danh sách sinh viên" @back="() => routerBack()">
        </a-page-header>

        <div class="header-row">
              <div class="search-input-container">
                <input v-model="keysearch" type="text" placeholder="Tìm kiếm" class="search-input" />
                <nuxt-link :to="{ name: 'admin-subjectscores-key-searchStudent', params: { key: keysearch } }">
                  <a-button type="outline-primary" size="small" class="search-button">
                    <a-icon type="search" />
                  </a-button>
                </nuxt-link>
              </div>
      
              <div class="department-dropdown-container">
                <a-form-model-item prop="department" name="department" >
                  <a-select
                    mode="default"
                    v-model:value="department.name"
                    show-search
                    placeholder="Chọn khoa..."
                    style="width: 100%"
                    :not-found-content="loading ? undefined : null"
                    @search="fetchData"
                    @change="filterByDepartment"
                    class="dropdown-select"
                  > <a-select-option value="" disabled>--Lọc theo khoa--</a-select-option>
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
        score_entries:[],
        student_score_entries: [],
        department_entries:[],
        department: {
            id: "",
            name: "",
        },
        totalNumCredits:0,
    }),
    computed: {
        entries() {
            let self = this;
            return this.raw_entries.map((entry) => {
                return {
                    name: entry.name,
                    gender: entry.gender,
                    birthday: entry.birthday,
                    studentid: entry.studentid,
                    department: entry.department.name,
                    totalcredits: this.getTotalCredits(entry.id)+"/150",
                    GPA: this.getGPA(entry.id),
                    actions: (
                        <a-space>
                            <nuxt-link to={{ name: "admin-subjectscores-idstudent-list", params: { idstudent: entry.id } }}>
                                <a-button type="outline-primary" size="small">
                                    <a-icon type="menu" />
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
                    dataIndex: "totalcredits",
                    key: "totalcredits",
                    title: "Số tín chỉ đạt",
                },
                {
                    dataIndex: "GPA",
                    key: "GPA",
                    title: "GPA",
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

        getTotalCredits(idstudent){
            
             this.totalNumCredits = 0; 
            this.student_score_entries= this.score_entries.filter(score => score.student === idstudent);
            console.log("1",this.score_entries);
            console.log("2", this.student_score_entries);
            for (let e of this.student_score_entries) {
                this.totalNumCredits += parseInt(e.numcredit);
            }
            return this.totalNumCredits;
        },
        getGPA (idstudent) {

            let GPA=0.0;
            this.student_score_entries = this.score_entries.filter(score => score.student === idstudent);
            // console.log("3", this.score_entries);
            // console.log("4", this.student_score_entries);
            for (let e of this.student_score_entries) {
                if(e.avgpoint==="") e.avgpoint=0.0
                GPA += this.convertPoint(parseFloat(e.avgpoint))* parseFloat(e.numcredit);
               // console.log("e", GPA);
            }
            GPA= GPA/this.getTotalCredits(idstudent);

            return GPA.toFixed(2)
        },
        convertPoint(point){
            let avgpoint;
            if (point >=9)  avgpoint=4.0
            else if (point >= 8.5 && point <9 ) avgpoint = 3.7
            else if (point >= 8.0 && point < 8.5 ) avgpoint = 3.5
            else if (point >= 7 && point < 8) avgpoint = 3.0
            else if (point >= 6.5 && point < 7) avgpoint = 2.5
            else if (point >= 5.5 && point < 6.5) avgpoint = 2.0
            else if (point >= 5 && point < 5.5) avgpoint = 1.5
            else if (point >= 4 && point < 5) avgpoint = 1.0
            else  avgpoint = 0.0
            return avgpoint;
        }, filterByDepartment(entry) {
            let self = this;
            this.department_entries.map((e) => {
                if (entry === e.key) {
                    self.department.id = e.key;
                    self.department.name = e.title;

                    this.$router.push({ name: 'admin-subjectscores-iddepartment-filter', params: { iddepartment: this.department.id } });
                }
            });},
        async getData() {
            this.loading = true;
            let response1 = await this.$store.dispatch("articles/ListDepartments", this.pagination);
            this.department_entries = response1.data.entries.map((e) => {
                return {
                    key: e.id,
                    title: e.name,
                };

            });
            let response = await this.$store.dispatch("articles/AllSubjectScores", this.pagination);
            this.score_entries = response.data.entries;
            console.log("1ok", this.score_entries);
            let response2 = await this.$store.dispatch("articles/ListStudents", this.pagination);
            this.raw_entries = response2.data.entries;
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
