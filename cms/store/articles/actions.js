import api from "~/api";

export default {
  // Articles
  async ListArticles(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListArticles,
      data: pagination,
    });
    return response.data;
  },
  async CreateArticle(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateArticle,
      data: entry,
    });

    return response.data;
  },
  async GetArticle(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetArticle", { id: entryId }),
    });

    return response.data;
  },
  async UpdateArticle(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateArticle", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteArticle(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteArticle", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },

  async SearchArticle(_, keysearch) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("SearchArticle", { key: keysearch }),
    });

    return response.data;
  },
  async SortArticle(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.SortArticle,
      data: pagination,
    });
    return response.data;
  },

  //  Classes
  async CreateClass(_, entry) {
    console.log("call api" + api.CreateClass);
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateClass,
      data: entry,
    });
    console.log(response.data);
    return response.data;
  },
  async ListClasses(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListClasses,
      data: pagination,
    });
    return response.data;
  },
  async GetClass(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetClass", { id: entryId }),
    });

    return response.data;
  },
  async UpdateClass(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateClass", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteClass(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteClass", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async SearchClass(_, keysearch) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("SearchClass", { key: keysearch }),
    });

    return response.data;
  },

  // Departments

  async ListDepartments(_, pagination) {
    console.log("call api" + api.ListDepartments);
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListDepartments,
      data: pagination,
    });
    return response.data;
  },

  //Lecture
  async ListLectures(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListLectures,
      data: pagination,
    });
    return response.data;
  },

  // Student

  async ListStudents(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListStudents,
      data: pagination,
    });
    return response.data;
  },
  async CreateStudent(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.CreateStudent,
      data: entry,
    });

    return response.data;
  },
  async GetStudent(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetStudent", { id: entryId }),
    });

    return response.data;
  },
  async UpdateStudent(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateStudent", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteStudent(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteStudent", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async SearchStudent(_, keysearch) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("SearchStudent", { key: keysearch }),
    });

    return response.data;
  },
  async GetStudentsByClassID(_, id) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetStudentsByClassID", { idClass: id }),
    });

    return response.data;
  },
  async GetStudentsNoClass(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.GetStudentsNoClass,
      data: pagination,
    });
    return response.data;
  },

  async UpdateClassStudent(_, param) {
    let response = await this.$axios.request({
      method: "PUT",
      url: `/api/v1/admin/students/${param.id}/${param.idClass}`,
      data: param,
    });
    return response.data;
  },

  // SubjectScore
  async AllSubjectScores(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.AllSubjectScores,
      data: pagination,
    });
    return response.data;
  },
  async ListSubjectScores(_, id) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("ListSubjectScores", { idstudent: id }),
    });
    return response.data;
  },
  async CreateSubjectScore(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.params("CreateSubjectScore", { idstudent: entry.student }),
      data: entry,
    });

    return response.data;
  },
  async GetSubjectScore(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetSubjectScore", { id: entryId }),
    });

    return response.data;
  },
  async UpdateSubjectScore(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateSubjectScore", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },

  // Subject
  async ListSubjects(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListSubjects,
      data: pagination,
    });
    return response.data;
  },

  // Semester

  async ListSemesters(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListSemesters,
      data: pagination,
    });
    return response.data;
  },

  // Interns
  async ListInterns(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListInterns,
      data: pagination,
    });
    return response.data;
  },
  async CreateIntern(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.params("CreateIntern", { idstudent: entry.studentid }),
      data: entry,
    });

    return response.data;
  },
  async GetIntern(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetIntern", { id: entryId }),
    });

    return response.data;
  },
  async UpdateIntern(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateIntern", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },
  async DeleteIntern(_, entry) {
    let response = await this.$axios.request({
      method: "Delete",
      url: api.params("DeleteIntern", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },

  // BHYT
  async ListBHYTs(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListBHYTs,
      data: pagination,
    });
    return response.data;
  },
  async CreateBHYT(_, entry) {
    let response = await this.$axios.request({
      method: "POST",
      url: api.params("CreateBHYT", { idstudent: entry.studentid }),
      data: entry,
    });

    return response.data;
  },
  async GetBHYT(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetBHYT", { id: entryId }),
    });

    return response.data;
  },
  async UpdateBHYT(_, entry) {
    let response = await this.$axios.request({
      method: "PUT",
      url: api.params("UpdateBHYT", { id: entry.id }),
      data: entry,
    });

    return response.data;
  },

  // company

  async ListCompanies(_, pagination) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.ListCompanies,
      data: pagination,
    });
    return response.data;
  },

  async GetCompany(_, entryId) {
    let response = await this.$axios.request({
      method: "GET",
      url: api.params("GetCompany", { id: entryId }),
    });

    return response.data;
  },
};
