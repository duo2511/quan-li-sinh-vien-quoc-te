<template>
    <div>
        <a-page-header title="Danh sách học bổng" @back="() => routerBack()">
            <template v-slot:extra>
                <input v-model="keysearch" type="text" placeholder="Tìm kiếm" />
                <nuxt-link :to="{ name: 'admin-students-key-search', params: { key: keysearch } }">
                    <a-button type="outline-primary" size="small">
                        <a-icon type="search" />
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
        keysearch: '',
        loading: true,
        raw_entries: [],
        score_entries: [],
        student_score_entries: [],
        totalNumCredits: 0,
    }),
    computed: {
        entries() {
            let self = this;
            let topStudents = this.getTopStudentsPerDepartment();
            return topStudents.map((entry) => {
                return {
                    name: entry.name,
                    gender: entry.gender,
                    birthday: entry.birthday,
                    studentid: entry.studentid,
                    department: entry.department.name,
                    totalcredits: this.getTotalCredits(entry.id) + "/150",
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

        getTotalCredits(idstudent) {

            this.totalNumCredits = 0;
            this.student_score_entries = this.score_entries.filter(score => score.student === idstudent);
            this.student_score_entries = this.student_score_entries.filter(score => score.semester.id=== this.$route.params.idsemester);
            for (let e of this.student_score_entries) {
                this.totalNumCredits += parseInt(e.numcredit);
            }
            return this.totalNumCredits;
        },
        getGPA(idstudent) {

            let GPA = 0.0;
            this.student_score_entries = this.score_entries.filter(score => score.student === idstudent);
           // console.log("3", this.score_entries);
           // console.log("4", this.student_score_entries);
            for (let e of this.student_score_entries) {
                if (e.avgpoint === null) e.avgpoint = 0.0
                GPA += this.convertPoint(parseFloat(e.avgpoint)) * parseFloat(e.numcredit);
                console.log("e", GPA);
            }
            GPA = GPA / this.getTotalCredits(idstudent);

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
        }, getTopStudentsPerDepartment() {
            let departments = {};

            console.log("oknha",this.raw_entries)
            this.raw_entries.forEach((entry) => {
                
                if (departments.hasOwnProperty(entry.department.name)) {
                    let students = departments[entry.department.name];
                    students.push(entry);
                } else {
                    departments[entry.department.name] = [entry];
                }
            });

            let topStudents = [];
            for (let department in departments) {

              //  console.log("oknha1", departments[department])
                let studentsInDepartment = departments[department];

                studentsInDepartment.sort((a, b) => {
                    let gpaA = this.getGPA(a.id);
                   
                    let gpaB = this.getGPA(b.id);
                
                    return parseFloat(gpaB) - parseFloat(gpaA);
                });
               

                let numStudents = Math.ceil(0.5 * studentsInDepartment.length);
                let topStudentsInDepartment = studentsInDepartment.slice(0,2);
                console.log("oknha2", topStudentsInDepartment)
                topStudents.push(...topStudentsInDepartment);
            }
              console.log("oknha21", topStudents)
            return topStudents;
        }
        ,
        async getData() {
            this.loading = true;
            let response = await this.$store.dispatch("articles/AllSubjectScores", this.pagination);
            this.score_entries = response.data.entries;
            let response1 = await this.$store.dispatch("articles/ListStudents", this.pagination);
            this.raw_entries = response1.data.entries;
            this.loading = false;
        }
    },
};
</script>

<style scoped></style>
