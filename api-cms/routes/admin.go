package routes

import (
	"idist-core/app/controllers/admin"
	"idist-core/app/middlewares"

	"github.com/gin-gonic/gin"
)

func AdminRoutes(router *gin.RouterGroup) {
	router.Use(middlewares.AuthMiddleware().MiddlewareFunc())
	router.GET("/refresh-token", middlewares.AuthMiddleware().RefreshHandler)
	router.GET("/profile", admin.GetProfile)
	router.POST("/logout", middlewares.AuthMiddleware().LogoutHandler)

	// Basic
	router.GET("/provinces", middlewares.Gate("", ""), admin.ListProvinces)
	router.GET("/provinces/id", middlewares.Gate("", ""), admin.ReadProvince)
	router.PUT("/provinces/id", middlewares.Gate("", ""), admin.UpdateProvince)

	router.GET("/districts", middlewares.Gate("", ""), admin.ListDistricts)
	router.GET("/districts/id", middlewares.Gate("", ""), admin.ReadDistrict)
	router.PUT("/districts/id", middlewares.Gate("", ""), admin.UpdateDistrict)

	router.GET("/wards", middlewares.Gate("", ""), admin.ListWards)
	router.GET("/wards/id", middlewares.Gate("", ""), admin.ReadWard)
	router.PUT("/wards/id", middlewares.Gate("", ""), admin.UpdateWard)

	router.GET("/roles", middlewares.Gate("", ""), admin.ListRoles)
	router.POST("/roles", middlewares.Gate("", ""), admin.CreateRole)
	router.GET("/roles/:id", middlewares.Gate("", ""), admin.ReadRole)
	router.PUT("/roles/:id", middlewares.Gate("", ""), admin.UpdateRole)
	router.DELETE("/roles/:id", middlewares.Gate("", ""), admin.DeleteRole)

	router.GET("/users", middlewares.Gate("", ""), admin.ListUsers)
	router.POST("/users", middlewares.Gate("", ""), admin.CreateUser)
	router.GET("/users/:id", middlewares.Gate("", ""), admin.ReadUser)
	router.PUT("/users/:id", middlewares.Gate("", ""), admin.UpdateUser)
	router.DELETE("/users/:id", middlewares.Gate("", ""), admin.DeleteUser)

	// Categories
	router.GET("/categories", middlewares.Gate("", ""), admin.ListCategories)
	router.POST("/categories", middlewares.Gate("", ""), admin.CreateCategory)
	router.GET("/categories/:id", middlewares.Gate("", ""), admin.GetCategory)
	router.PUT("/categories/:id", middlewares.Gate("", ""), admin.UpdateCategory)
	router.DELETE("/categories/:id", middlewares.Gate("", ""), admin.DeleteCategory)

	// Tags
	router.GET("/tags", middlewares.Gate("", ""), admin.ListTags)
	router.POST("/tags", middlewares.Gate("", ""), admin.CreateTag)
	router.GET("/tags/:id", middlewares.Gate("", ""), admin.GetTag)
	router.PUT("/tags/:id", middlewares.Gate("", ""), admin.UpdateTag)
	router.DELETE("/tags/:id", middlewares.Gate("", ""), admin.DeleteTag)

	// Articles
	router.GET("/articles", middlewares.Gate("", ""), admin.ListArticles)
	router.POST("/articles", middlewares.Gate("", ""), admin.CreateArticle)
	router.GET("/articles/:id", middlewares.Gate("", ""), admin.GetArticle)
	router.PUT("/articles/:id", middlewares.Gate("", ""), admin.UpdateArticle)
	router.DELETE("/articles/:id", middlewares.Gate("", ""), admin.DeleteArticle)
	router.GET("/articles/search/:key", middlewares.Gate("", ""), admin.SearchArticle)
	router.GET("/articles/sort", middlewares.Gate("", ""), admin.SortArticle)

	// Schools
	router.GET("/schools", middlewares.Gate("", ""), admin.ListSchools)
	router.POST("/schools", middlewares.Gate("", ""), admin.CreateSchool)
	router.GET("/schools/:id", middlewares.Gate("", ""), admin.ReadSchool)
	router.PUT("/schools/:id", middlewares.Gate("", ""), admin.UpdateSchool)
	router.DELETE("/schools/:id", middlewares.Gate("", ""), admin.DeleteSchool)

	// admission
	router.GET("/admissions", middlewares.Gate("", ""), admin.ListAdmissions)
	router.POST("/admissions", middlewares.Gate("", ""), admin.CreateAdmission)
	router.GET("/admissions/:id", middlewares.Gate("", ""), admin.ReadAdmission)
	router.PUT("/admissions/:id", middlewares.Gate("", ""), admin.UpdateAdmission)
	router.DELETE("/admissions/:id", middlewares.Gate("", ""), admin.DeleteAdmission)

	// Class
	router.GET("/classes", middlewares.Gate("", ""), admin.ListClasses)
	router.POST("/classes", middlewares.Gate("", ""), admin.CreateClass)
	router.GET("/classes/:id", middlewares.Gate("", ""), admin.GetClass)
	router.PUT("/classes/:id", middlewares.Gate("", ""), admin.UpdateClass)
	router.DELETE("/classes/:id", middlewares.Gate("", ""), admin.DeleteClass)
	router.GET("/classes/sort", middlewares.Gate("", ""), admin.SortClass)
	router.GET("/classes/search/:key", middlewares.Gate("", ""), admin.SearchClass)

	// SubjectScore

	router.GET("/subjectscores/all", middlewares.Gate("", ""), admin.AllSubjectScores)
	router.GET("/subjectscores/list/:idstudent", middlewares.Gate("", ""), admin.ListSubjectScores)
	router.POST("/subjectscores/:idstudent", middlewares.Gate("", ""), admin.CreateSubjectScore)
	router.GET("/subjectscores/:id", middlewares.Gate("", ""), admin.GetSubjectScore)
	router.PUT("/subjectscores/:id", middlewares.Gate("", ""), admin.UpdateSubjectScore)
	router.DELETE("/subjectscores/:id", middlewares.Gate("", ""), admin.DeleteSubjectScore)

	// Student

	router.GET("/students", middlewares.Gate("", ""), admin.ListStudents)
	router.POST("/students", middlewares.Gate("", ""), admin.CreateStudent)
	router.GET("/students/:id", middlewares.Gate("", ""), admin.ReadStudent)
	router.PUT("/students/:id", middlewares.Gate("", ""), admin.UpdateStudent)
	router.DELETE("/students/:id", middlewares.Gate("", ""), admin.DeleteStudent)
	router.GET("/students/sort", middlewares.Gate("", ""), admin.SortStudent)
	router.GET("/students/search/:key", middlewares.Gate("", ""), admin.SearchStudent)
	router.GET("/studentsClass/:idClass", middlewares.Gate("", ""), admin.GetStudentsByClassID)
	router.GET("/students/noClass", middlewares.Gate("", ""), admin.GetStudentsNoClass)
	router.PUT("/students/:id/:idClass", middlewares.Gate("", ""), admin.UpdateClassStudent)

	// Intern

	router.GET("/interns", middlewares.Gate("", ""), admin.ListInterns)
	router.POST("/interns/:idstudent", middlewares.Gate("", ""), admin.CreateIntern)
	router.GET("/interns/:id", middlewares.Gate("", ""), admin.GetIntern)
	router.PUT("/interns/:id", middlewares.Gate("", ""), admin.UpdateIntern)
	router.DELETE("/interns/:id", middlewares.Gate("", ""), admin.DeleteIntern)

	// BHYT
	router.GET("/bhyt", middlewares.Gate("", ""), admin.ListBHYTs)
	router.POST("/bhyt/:idstudent", middlewares.Gate("", ""), admin.CreateBHYT)
	router.GET("/bhyt/:id", middlewares.Gate("", ""), admin.GetBHYT)
	router.PUT("/bhyt/:id", middlewares.Gate("", ""), admin.UpdateBHYT)

	// Company
	router.GET("/companies", middlewares.Gate("", ""), admin.ListCompanies)
	router.GET("/companies/:id", middlewares.Gate("", ""), admin.GetCompany)

	// Logs
	router.GET("/logs", middlewares.Gate("", ""), admin.ListLogRecords)

	// Department
	router.GET("/subjects", middlewares.Gate("", ""), admin.ListSubjects)
	// Semester
	router.GET("/semesters", middlewares.Gate("", ""), admin.ListSemesters)

	// Department
	router.GET("/departments", middlewares.Gate("", ""), admin.ListDepartments)

	// Lecture
	router.GET("/lectures", middlewares.Gate("", ""), admin.ListLectures)
}
