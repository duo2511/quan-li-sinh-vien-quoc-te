<template>
  <a-form-model-item prop="published_at" name="published_at" label="Thời gian xuất bản">
    <a-date-picker
      show-time
      :value="value.published_at"
      :placeholder="time"
      @change="changeTime"
      :format="dateFormat"
    />
  </a-form-model-item>
</template>

<script>
import moment from "moment";

export default {
  name: "ArticlePublishedAt",
  props: {
    value: Object,
  },
  data: () => ({
    time: "",
    interval: null,
    dateFormat: "HH:mm DD/MM/YYYY",
  }),
  watch: {
    time: {
      handler: function () {
        console.log(this.time);
      },
      deep: true,
    },
  },
  methods: {
    setTimeNow() {
      let self = this;
      this.interval = setInterval(function () {
        if (self.has_change) {
          clearInterval(self.interval);
        } else {
          self.time = moment().format(self.dateFormat).toString();
        }
      }, 1000);
    },
    changeTime(value) {
      this.has_change = true;
      if (value == null) {
        this.has_change = false;
        this.setTimeNow();
        this.value.published_at = null;
      } else {
        this.time = value.format(self.dateFormat).toString();
        this.value.published_at = value.format(self.dateFormat).toString();
      }
    },
  },
  created() {
    this.setTimeNow();
  },
};
</script>

<style scoped></style>
