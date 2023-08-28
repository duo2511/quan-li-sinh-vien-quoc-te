import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

function findStudentById(studentId) {
  let response = this.$store.dispatch("articles/ListStudents", this.pagination);

  let students = response.data.entries;

  let result = students.find((student) => student.id === studentId).name;

  return result;
}

export { findStudentById };
