<template>
    <div>
        <a-page-header title="Kết quả học tập" @back="() => routerBack()">
            <template v-slot:extra>

                <a-button @click="navigateToNewPage" type="success">
                    <a-icon type="plus" />
                    Nhập điểm
                </a-button>

            </template>
        </a-page-header>
        <div class="dropdown-container">
                      <a-form-model-item prop="semester" name="semester">
                          <a-select mode="default" v-model:value="semester.name" show-search 
                              style="width: 100%" :not-found-content="loading ? undefined : null" @search="fetchData"
                              @change="filterBySemester" class="dropdown-select"> <a-select-option value="" disabled>--Học kỳ--</a-select-option>
                              <a-spin v-if="loading" slot="notFoundContent" size="small" />
                              <a-select-option v-for="e in semester_entries" :key="e.id">
                                  {{ e.name }}
                              </a-select-option>
                          </a-select>
                      </a-form-model-item>
                  </div>
        
        <a-card>
            <a-table :loading="loading" :columns="columns" :data-source="entries" />
        </a-card>
        <a-card>
            <a-table :loading="loading" :columns="columns2" :data-source="entries2" />
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
        raw_entries2: [],
        semester_entries: [],
        score_entries_by_semester: [],
        semester: {
            id: "",
            name: "",
        },
    }),
    computed: {
        entries() {
            let self = this;
            return this.raw_entries2.map((entry) => {
                return {
                    id: entry.id,
                    subject: entry.subject.name,
                    numcredit: entry.numcredit,
                    semester: entry.semester.name,
                    avgpoint: entry.avgpoint,
                    actions: (
                        <a-space>
                            <nuxt-link to={{ name: "admin-subjectscores-id-edit", params: { id: entry.id } }}>
                                <a-button type="outline-primary" size="small">
                                    <a-icon type="edit" />
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
                    dataIndex: "subject",
                    key: "subject",
                    title: "Môn học",
                },
                {
                    dataIndex: "numcredit",
                    key: "numcredit",
                    title: "Số tín chỉ",
                },
                {
                    dataIndex: "semester",
                    key: "semester",
                    title: "Học Kì",
                },
                {
                    dataIndex: "avgpoint",
                    key: "avgpoint",
                    title: "Điểm trung bình",
                },
                {
                    title: "",
                    key: "actions",
                    dataIndex: "actions",
                    className: "text-right",
                },
            ];
        },
        entries2() {
            let self = this;
            return this.semester_entries.map((entry) => {
                return {

                    name: entry.name,
                    GPA: this.getGPA(entry.id),
                };
            });
        },
        columns2() {
            return [
                {
                    dataIndex: "name",
                    key: "name",
                    title: "Học kì",
                },
                {
                    dataIndex: "GPA",
                    key: "GPA",
                    title: "Điểm trung bình học kì",
                },

            ];
        },
    },
    methods: {
        routerBack() {
            this.$router.push({ name: "admin-subjectscores-ListStudent" });
        },
        getTotalCredits(idsemester) {

            this.totalNumCredits = 0;
            this.score_entries_by_semester = this.raw_entries.filter(score => score.semester.id === idsemester);

            for (let e of this.score_entries_by_semester) {
                this.totalNumCredits += parseInt(e.numcredit);
            }
            return this.totalNumCredits;
        },
        getGPA(idsemester) {

            let GPA = 0.0;
            this.score_entries_by_semester = this.raw_entries.filter(score => score.semester.id === idsemester);
            for (let e of this.score_entries_by_semester) {
                if (e.avgpoint === null) e.avgpoint = 0.0
                GPA += this.convertPoint(parseFloat(e.avgpoint)) * parseFloat(e.numcredit);
                console.log("e", GPA);
            }
            GPA = GPA / this.getTotalCredits(idsemester);

            return GPA.toFixed(2)
        },
        convertPoint(point) {
            let avgpoint;

            if (point >= 9) avgpoint = 4.0
            else if (point >= 8.5 && point < 9) avgpoint = 3.7
            else if (point >= 8.0 && point < 8.5) avgpoint = 3.5
            else if (point >= 7 && point < 8) avgpoint = 3.0
            else if (point >= 6.5 && point < 7) avgpoint = 2.5
            else if (point >= 5.5 && point < 6.5) avgpoint = 2.0
            else if (point >= 5 && point < 5.5) avgpoint = 1.5
            else if (point >= 4 && point < 5) avgpoint = 1.0
            else avgpoint = 0.0
            return avgpoint;
        }, filterBySemester(entry) {
            let self = this;
            this.semester_entries.map((e) => {
                if (entry === e.id) {
                    self.semester.id = e.id;
                    self.semester.name = e.name;

                    this.$router.push({
                        name: 'admin-subjectscores-idstudent-idsemester-filter',
                        params: {
                            idstudent: this.$route.params.idstudent,
                            idsemester: this.semester.id
                        }
                    });
                }
            });
        },
        async getData() {

            this.loading = true;
            let response = await this.$store.dispatch("articles/ListSubjectScores", this.$route.params.idstudent);
            this.raw_entries = response.data.entries;
             this.raw_entries2 = this.raw_entries.filter(entry => entry.semester.id === this.$route.params.idsemester)
            let response2 = await this.$store.dispatch("articles/ListSemesters", this.pagination);
            this.semester_entries = response2.data.entries;
            this.loading = false;
        },
        navigateToNewPage() {
            let idstudent = this.$route.params.idstudent;
            window.location.href = `/admin/subjectscores/${idstudent}/create`;
        }
    },

};
</script>

<style scoped>
.department-dropdown-container {
    margin-top: 7%;
    margin-left: 3%;
    width: 18%;
}</style>
