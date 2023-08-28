
<template>
    <a-form-model-item prop="lecture" name="lecture" label="Cố vấn học tập">
        <a-select mode="default" v-model:value="entry.lecture.name" show-search placeholder="Chọn giảng viên..." style="width: 100%"
            :not-found-content="loading ? undefined : null" @search="fetchData" @change="handleChange">
            <a-spin v-if="loading" slot="notFoundContent" size="small" />
            <a-select-option v-for="e in entries" :key="e.key">
                {{ e.title }}
            </a-select-option>
        </a-select>
    </a-form-model-item>
</template>

<script>
import debounce from "lodash/debounce";

export default {
    name: "PageDepartment",
    props: {
        value: Object,
    },
    data() {
        return {
            entries: [],
            entry: {
                lecture: {
                    id:this.value.lecture.id,
                    name:this.value.lecture.name
                },
            },
            loading: true,
            fetchData: debounce(this.getData, 1000),
            pagination: {
                page: 1,
                length: 12,
                search: "",
            },
        };
    },
    methods: {
        async getData(search = "") {
            this.loading = true;
            this.pagination.search = search;
            let response = await this.$store.dispatch("articles/ListLectures", this.pagination);
            this.entries = response.data.entries.map((e) => {
                return {
                    key: e.id,
                    title: e.name,
                };

            });
            this.loading = false;
        },
        handleChange(entry) {
            let self = this;
            this.entries.map((e) => {
                if (entry === e.key) {
                    self.value.lecture.id = e.key;
                    self.value.lecture.name = e.title;

                    return entry;
                }
            });
        },
    },
    created() {

        this.getData();
    },
};
</script>