<template>
    <div>
        <a-row :gutter="16">
            <a-col :xxl="20" :xl="19" :lg="18" :md="24" :sm="24">
                <a-form-model ref="FormData" layout="vertical" :model="entry">
                    <a-card class="mb-20" title="Cập nhậy Bảo hiểm y tế">
                        <a-row :gutter="10">
                            <a-col :md="12">
                                <a-form-model-item prop="name" name="name" label="Tên sinh viên">
                                    <a-input v-model:value="entryStudent.name" />
                                </a-form-model-item>
                            </a-col>
                            <a-col :md="12">
                                <a-form-model-item prop="studentid" name="studentid" label="Mã sinh viên">
                                    <a-input v-model:value="entryStudent.studentid" />
                                </a-form-model-item>
                            </a-col>
                            <a-col :md="12">
                                    <a-form-model-item prop="bhytid" name="bhytid" label="Mã BHYT">
                                        <a-input v-model:value="entry.bhytid" />
                                    </a-form-model-item>
                             </a-col>
                             <a-col :md="12">
                                        <a-form-model-item prop="issue_place" name="issue_place" label="Nơi ĐK KCB">
                                            <a-input v-model:value="entry.issue_place" />
                                        </a-form-model-item>
                             </a-col>
                             <a-col :md="12">
                                 <startday :value="entry" />
                               </a-col> 
                             <a-col :md="12">
                                     <expiredday :value="entry" />
                             </a-col> 
                           
                        </a-row>
                    </a-card>

                    <a-card class="mb-20 text-center">
                        <a-button :loading="loading" :disabled="loading" type="primary" html-type="submit"
                            @click.prevent="SubmitForm()">
                            Cập nhật
                        </a-button>
                    </a-card>
                </a-form-model>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import startday from "@/elements/bhyt/startday";
import expiredday from "@/elements/bhyt/expiredday";
export default {
    name: "chinh-sua-bhyt",
    components: {
        startday,
        expiredday,
    },
    layout: "admin",
    data: () => ({
        loading: false,
        entry: {
            bhytid: "",
            issue_place: "",
            start_day: "",
            expired_day: "",
        },
        entryStudent: {
            id: "",
            name: "",
            studentid: "",
        },
    }),
    watch: {
        entry: {
            handler: function () {
                console.log(this.entry);
            },
            deep: true,
        },
    },
    methods: {
        routerBack() {
            this.$router.push({ name: "admin-bhyt-list" });
        },
        encodeTag() {
            if (process.client) {
                return window.btoa(unescape(encodeURIComponent(this.entry.name)));
            } else {
                return Buffer.from(this.entry.name, "utf-8").toString("base64");
            }
        },
        async getData() {
            this.loading = true;
            let response = await this.$store.dispatch("articles/GetBHYT", this.$route.params.id);
            this.entry = response.data.entry;
            let response2 = await this.$store.dispatch("articles/GetStudent", this.entry.student);
            this.entryStudent = response2.data.entry;
            this.loading = false;
        },
        async SubmitForm(status = "draft") {
            this.$refs.FormData.validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    this.entry.status = status;
                    let response = await this.$store.dispatch("articles/UpdateBHYT", this.entry);
                    if (response && response.code === 200) {
                        this.$toast.show(response.message, { duration: 2000, type: "success" });
                        await this.$router.push({ name: "admin-bhyt-id-edit", params: { id: response.data.entry.id } });
                    }
                    this.loading = false;
                }
            });
        },
    },
    created() {
        this.getData();
    },
    mounted() { },
};
</script>

<style scoped></style>
