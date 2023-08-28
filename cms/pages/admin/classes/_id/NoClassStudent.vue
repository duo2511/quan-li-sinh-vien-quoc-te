<template>
    <div>
        <a-page-header title="Sinh viên" @back="() => routerBack()">
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
                    class_name: entry.class_name,
                    actions: (
                        <a-space>
                            <a-popconfirm
                                placement="top"
                                title="Thêm sinh viên vào lớp?"
                                ok-text="Đồng ý"
                                cancel-text="Không"
                                onConfirm={() => {
                                    self.UpdateData(entry);
                                }}
                            >
                                <a-button size="medium" >
                                    <a-icon type="plus" />
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
            this.$router.push({ name: "admin-classes-id-classStudent", params: { id: this.$route.params.id } });
        },
        async getData() {
            this.loading = true;
            let response = await this.$store.dispatch("articles/GetStudentsNoClass", this.pagination);
            this.raw_entries = response.data.entries;
            this.loading = false;
        },

        async UpdateData (entry)  {
         this.loading = true;
         //this.entry.status = status;
        
        let param = {
          id : entry.id,
          idClass : this.$route.params.id
        }
        console.log ("oknha",param.idClass)
        let response = await this.$store.dispatch("articles/UpdateClassStudent", param);
        if(response && response.code === 200) {
    this.$toast.show(response.message, { duration: 2000, type: "success" });
    await this.$router.push({ name: "admin-classes-id-classStudent", params: { id: this.$route.params.id } }) }
    
    },
}
     } 
</script>

<style scoped></style>
