<template>
    <div>
        <a-page-header title="Danh sách lớp" @back="() => routerBack()">

            <template v-slot:extra>
                    <a-button @click="navigateToNewPage" type="success">
                        <a-icon type="plus" />
                        Thêm sinh viên
                    </a-button>
            </template>
        </a-page-header>
        <h3>Sĩ số : {{ countStudentinClass() }}</h3>
        <p>Nam : {{ countStudentByGender("Nam") }}</p>
        <p>Nữ : {{ countStudentByGender("Nữ") }}</p>

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
                const formattedBirthday = new Date(entry.birthday).toLocaleDateString();
                return {
                    id: entry.id,
                    name: entry.name,
                    gender: entry.gender,
                    birthday: formattedBirthday,
                    studentid: entry.studentid,
                    department: entry.department.name,
                    class_name: entry.class_name,
                    actions: (
                        <a-space>
                            <a-popconfirm
                                placement="top"
                                title="Xoá sinh viên này khỏi lớp học?"
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
                    dataIndex: "birthday",
                    key: "birthday",
                    title: "Ngày sinh",
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
            let response = await this.$store.dispatch("articles/GetStudentsByClassID", this.$route.params.id);
            this.raw_entries = response.data.entries;
            this.loading = false;
        },
        countStudentinClass() {
            
            return this.raw_entries.length;

        },
        countStudentByGender(gender) {
            
            return this.raw_entries.filter(student => student.gender === gender).length;

        },
        async deleteData(entry) {
            this.loading = true;
            console.log("delete",entry);
            entry.class_name=null;
            let response = await this.$store.dispatch("articles/UpdateStudent", entry);
            if (response && response.code === 200) {
                await this.getData();
            }

            this.$toast.show(response.message, {
                duration: 2000,
                type: response && response.code === 200 ? "success" : "danger",
            });
            this.loading = false;
        },
         navigateToNewPage() {
            let idClass = this.$route.params.id;
             window.location.href = `/admin/classes/${idClass}/NoClassStudent`;
        }
    },
};
</script>

<style scoped></style>
