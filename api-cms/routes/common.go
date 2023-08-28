package routes

import (
	"idist-core/app/controllers/admin"
	"idist-core/app/middlewares"

	"github.com/gin-gonic/gin"
)

func CommonRoutes(router *gin.RouterGroup) {
	router.GET("/provinces", middlewares.Gate("", ""), admin.ListProvinces)
	router.GET("/provinces/id", middlewares.Gate("", ""), admin.ReadProvince)
	router.PUT("/provinces/id", middlewares.Gate("", ""), admin.UpdateProvince)

	// Subjects
	router.GET("/subjects", middlewares.Gate("", ""), admin.ListSubjects)
	router.GET("/subjects/id", middlewares.Gate("", ""), admin.GetSubject)

	// Semester
	router.GET("/semesters", middlewares.Gate("", ""), admin.ListSemesters)
	router.GET("/semesters/id", middlewares.Gate("", ""), admin.GetSemester)

	router.POST("/tuyen-sinh", middlewares.Gate("", ""), admin.CreateTuyenSinh)

}
