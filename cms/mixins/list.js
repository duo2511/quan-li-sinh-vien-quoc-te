import moment from "moment";

export default {
  data: () => ({
    pagination: {
      page: 1,
      length: 12,
      search: "",
    },
  }),
  methods: {
    getData() {},
    moment(data, format = "DD/MM/YYYY HH:mm:ss") {
      if (moment(data).isValid()) {
        return moment(data).utc().format(format);
      }
      return data;
    },
  },
  created() {
    this.getData();
  },
};
