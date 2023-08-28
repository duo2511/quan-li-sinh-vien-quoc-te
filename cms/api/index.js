let config = {
  PostLogout: "/api/v1/admin/logout",
  PostLogin: "/api/v1/auth/login",
  GetProfile: "/api/v1/admin/profile",

  // Users
  ListUsers: "/api/v1/admin/users",
  CreateUser: "/api/v1/admin/users",
  GetUser: "/api/v1/admin/users/{id}",
  UpdateUser: "/api/v1/admin/users/{id}",
  DeleteUser: "/api/v1/admin/users/{id}",

  // Categories
  ListCategories: "/api/v1/admin/categories",
  CreateCategory: "/api/v1/admin/categories",
  GetCategory: "/api/v1/admin/categories/{id}",
  UpdateCategory: "/api/v1/admin/categories/{id}",
  DeleteCategory: "/api/v1/admin/categories/{id}",

  // Tags
  ListTags: "/api/v1/admin/tags",
  CreateTag: "/api/v1/admin/tags",
  GetTag: "/api/v1/admin/tags/{id}",
  UpdateTag: "/api/v1/admin/tags/{id}",
  DeleteTag: "/api/v1/admin/tags/{id}",

  // Provinces
  ListProvinces: "/api/v1/common/provinces",
  CreateProvince: "/api/v1/admin/provinces",
  GetProvince: "/api/v1/admin/provinces/{id}",
  UpdateProvince: "/api/v1/admin/provinces/{id}",
  DeleteProvince: "/api/v1/admin/provinces/{id}",

  // Articles
  ListArticles: "/api/v1/admin/articles",
  CreateArticle: "/api/v1/admin/articles",
  GetArticle: "/api/v1/admin/articles/{id}",
  UpdateArticle: "/api/v1/admin/articles/{id}",
  DeleteArticle: "/api/v1/admin/articles/{id}",
  SearchArticle: "/api/v1/admin/articles/search/{key}",
  SortArticle: "/api/v1/admin/articles/sort",
  // Schools
  ListSchools: "/api/v1/admin/schools",
  CreateSchool: "/api/v1/admin/schools",
  GetSchool: "/api/v1/admin/schools/{id}",
  UpdateSchool: "/api/v1/admin/schools/{id}",
  DeleteSchool: "/api/v1/admin/schools/{id}",

  // Admissions
  ListAdmissions: "/api/v1/admin/admissions",
  CreateAdmission: "/api/v1/admin/admissions",
  GetAdmission: "/api/v1/admin/admissions/{id}",
  UpdateAdmission: "/api/v1/admin/admissions/{id}",
  DeleteAdmission: "/api/v1/admin/admissions/{id}",

  // Students
  ListStudents: "/api/v1/admin/students",
  CreateStudent: "/api/v1/admin/students",
  GetStudent: "/api/v1/admin/students/{id}",
  UpdateStudent: "/api/v1/admin/students/{id}",
  DeleteStudent: "/api/v1/admin/students/{id}",
  SearchStudent: "/api/v1/admin/students/search/{key}",
  GetStudentsByClassID: "/api/v1/admin/studentsClass/{idClass}",
  GetStudentsNoClass: "/api/v1/admin/students/noClass",
  UpdateClassStudent: "/api/v1/admin/students/{id}/{idClass}",
  // Classes

  ListClasses: "/api/v1/admin/classes",
  CreateClass: "/api/v1/admin/classes",
  GetClass: "/api/v1/admin/classes/{id}",
  UpdateClass: "/api/v1/admin/classes/{id}",
  DeleteClass: "/api/v1/admin/classes/{id}",
  SearchClass: "/api/v1/admin/classes/search/{key}",

  // Lecture

  ListLectures: "/api/v1/admin/lectures",
  CreateLecture: "/api/v1/admin/lectures",
  GetLecture: "/api/v1/admin/lectures/{id}",
  UpdateLecture: "/api/v1/admin/lectures/{id}",
  DeleteLecture: "/api/v1/admin/lectures/{id}",

  // Department
  ListDepartments: "/api/v1/admin/departments",
  CreateDepartment: "/api/v1/admin/departments",
  GetDepartment: "/api/v1/admin/departments/{id}",
  UpdateDepartment: "/api/v1/admin/departments/{id}",
  DeleteDepartment: "/api/v1/admin/departments/{id}",

  // SubjectScore
  AllSubjectScores: "/api/v1/admin/subjectscores/all",
  ListSubjectScores: "/api/v1/admin/subjectscores/list/{idstudent}",
  CreateSubjectScore: "/api/v1/admin/subjectscores/{idstudent}",
  GetSubjectScore: "/api/v1/admin/subjectscores/{id}",
  UpdateSubjectScore: "/api/v1/admin/subjectscores/{id}",

  // Subject

  ListSubjects: "/api/v1/admin/subjects",
  GetSubject: "/api/v1/admin/subjects/{id}",

  // Semester

  ListSemesters: "/api/v1/admin/semesters",
  GetSemester: "/api/v1/admin/semeters/{id}",

  // Interns
  ListInterns: "/api/v1/admin/interns",
  CreateIntern: "/api/v1/admin/interns/{idstudent}",
  GetIntern: "/api/v1/admin/interns/{id}",
  UpdateIntern: "/api/v1/admin/interns/{id}",

  // BHYT
  ListBHYTs: "/api/v1/admin/bhyt",
  CreateBHYT: "/api/v1/admin/bhyt/{idstudent}",
  GetBHYT: "/api/v1/admin/bhyt/{id}",
  UpdateBHYT: "/api/v1/admin/bhyt/{id}",

  // Companies

  ListCompanies: "/api/v1/admin/companies",
  GetCompany: "/api/v1/admin/companies/{id}",

  // Tuyen sinh

  CreateTuyenSinh: "/api/v1/common/tuyen-sinh",
};

let api = new Proxy(config, {
  get(target, name) {
    if (name !== "params") {
      return Reflect.get(target, name);
    } else {
      return Reflect.get(target, name);
    }
  },
});

api.params = (name, options) => {
  try {
    let endpoint = api[name];
    for (let value in options) {
      endpoint = endpoint.replace(`{${value}}`, options[value]);
    }
    return endpoint;
  } catch (e) {
    console.log(e);
  }
};

export default api;
