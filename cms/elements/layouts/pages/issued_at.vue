<template>
  <a-form-model-item prop="issued_at" name="issued_at" label="Ngày cấp">
    <a-date-picker
      class="w-100"
      :value="value.issued_at"
      :placeholder="time"
      @change="changeTime"
      :format="dateFormat"
    />
  </a-form-model-item>
</template>

<script>
import moment from "moment";

export default {
  name: "IssuedAt",
  props: {
    value: Object,
  },
  data: () => ({
    time: "",
    interval: null,
    dateFormat: "DD/MM/YYYY",
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
        this.value.issued_at = null;
      } else {
        this.time = value.format(self.dateFormat).toString();
        this.value.issued_at = value.format(self.dateFormat).toString();
      }
    },
  },
  created() {
    this.time = moment().format(this.dateFormat).toString();
  },
};
</script>

<style scoped></style>
