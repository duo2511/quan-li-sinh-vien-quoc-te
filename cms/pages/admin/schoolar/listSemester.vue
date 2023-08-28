<template>
    <div>
        <a-page-header title="Học Kỳ" @back="() => routerBack()">
            <template v-slot:extra>
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
    }),
    computed: {
        entries() {
            let self = this;
            return this.raw_entries.map((entry) => {
                return {
                    id: entry.id,
                    name: entry.name,
                    
                    actions: (
                        <a-space>

                            <nuxt-link to={{ name: "admin-schoolar-idsemester-list", params: { idsemester: entry.id } }}>
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
                    title: "Học kỳ",
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

        async getData() {
            this.loading = true;
            let response = await this.$store.dispatch("articles/ListSemesters", this.pagination);
            this.raw_entries = response.data.entries;
            this.loading = false;
        }
    },
};
</script>

<style scoped>
</style>
