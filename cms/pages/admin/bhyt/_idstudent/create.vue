<template>
    <div>
        <a-row :gutter="16">
            <a-col :xxl="20" :xl="19" :lg="18" :md="24" :sm="24">
                <a-form-model ref="FormData" layout="vertical" :model="entry">
                    <a-card class="mb-20" title="Cập nhậy Bảo hiểm y tế">
                        <a-row :gutter="8">
                            <a-row :gutter="10">
                                <a-col :md="12">
                                    <a-form-model-item prop="name" name="name" label="Tên sinh viên">
                                        <a-input :value="entry2.name" />
                                    </a-form-model-item>
                                </a-col>
                                <a-col :md="12">
                                    <a-form-model-item prop="gender" name="gender" label="Mã sinh viên">
                                        <a-input :value="entry2.gender" />
                                    </a-form-model-item>
                                </a-col>
                            </a-row>

                            <a-row :gutter="10">
                            <a-col :md="12">
                                <Birthday :value="entry2" @update="(e) => (entry = e)" />
                            </a-col>
                            <a-col :md="12">
                                        <a-form-model-item prop="issued_at" name="issued_at" label="Nơi sinh">
                                            <a-input :value="entry2.issued_at" />
                                        </a-form-model-item>
                            </a-col>
                            
                            </a-row>
                            

                            <a-row :gutter="10">
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
                            </a-row>
                           
                            <a-row :gutter="10">
                            
                             <a-col :md="12">
                                    <startday :value="entry" />
                                </a-col>
                                <a-col :md="12">
                                    <expiredday :value="entry" />
                                </a-col>
                                
                            </a-row>
                            

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
import Birthday from "@/elements/layouts/pages/birthday";
export default {
    name: "Tao-bhyt",
    components: {
        startday,
        expiredday,
        Birthday,
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
        entry2: {
            id: "",
            name: "",
            gender:"",
            birthday:"",
            issued_at:"",
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
                return window.btoa(unescape(encodeURIComponent(this.entry2)));
            } else {
                return Buffer.from(this.entry2, "utf-8").toString("base64");
            }
        },
        async getData() {
            this.loading = true;
            let response = await this.$store.dispatch("articles/GetStudent", this.$route.params.idstudent);
            this.entry2 = response.data.entry;
           console.log('okas12', this.entry2)
            this.loading = false;
        },
        async SubmitForm() {
            this.loading = true;

            this.entry.studentid = this.$route.params.idstudent


            let response = await this.$store.dispatch("articles/CreateBHYT", this.entry);
            if (response && response.code === 200) {
                this.$toast.show(response.message, { duration: 2000, type: "success" });
            }
            this.loading = false;
                },
                },
    created() {
        this.getData();
    },

};
</script>

<style scoped></style>
