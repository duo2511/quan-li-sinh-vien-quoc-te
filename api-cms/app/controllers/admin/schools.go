package admin

import (
	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	mongo2 "go.mongodb.org/mongo-driver/mongo"
	"idist-core/app/collections"
	"idist-core/app/controllers"
	"idist-core/app/providers/loggerProvider"
	"idist-core/const/mongo"
	"idist-core/const/response"
	"net/http"
	"strconv"
)

func ListSchools(c *gin.Context) {
	loggerProvider.GetLogger().Info("[ListSchools]")
	data := bson.M{}
	var err error
	entries := collections.Schools{}
	entry := collections.School{}

	pagination := controllers.BindRequestTable(c, "_id")

	filter := pagination.CustomFilters(bson.M{})
	if entries, err = entry.Find(filter); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, mongo.NOT_FOUND, err)
	}
	for i := 0; i < len(entries); i++ {
		entries[i].Preload("districts")
	}
	data["entries"] = entries
	controllers.ResponseSuccess(c, http.StatusOK, "Lấy dữ liệu thành công", data)
}

func ReadSchool(c *gin.Context) {
	data := bson.M{}
	var err error
	entryId, _ := strconv.Atoi(c.Param("id"))
	entry := collections.School{}
	filter := bson.M{
		"_id": entryId,
	}

	if err = entry.First(filter); err != nil && err != mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusInternalServerError, response.GET_FAIL, err)
	} else if err == mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusNotFound, mongo.NOT_FOUND, err)
	}

	data["entry"] = entry
	controllers.ResponseSuccess(c, http.StatusOK, response.GET_SUCCESS, data)
}
func UpdateSchool(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.School{}
	exist := collections.School{}
	entryId, _ := strconv.Atoi(c.Param("id"))

	filter := bson.M{
		"_id":        entryId,
		"deleted_at": nil,
	}

	if err = exist.First(filter); err != nil && err != mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusInternalServerError, response.GET_FAIL, err)
	} else if err == mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusNotFound, mongo.NOT_FOUND, err)
	}

	if err = c.ShouldBindBodyWith(&entry, binding.JSON); err != nil {
		controllers.ResponseError(c, http.StatusConflict, response.GET_FAIL, err)
	}

	if err = entry.Update(); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, response.UPDATE_FAIL, err)
	}

	data["entry"] = entry
	controllers.ResponseSuccess(c, http.StatusOK, response.UPDATE_SUCCESS, data)

}

func CreateSchool(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.School{}

	if err = c.ShouldBindBodyWith(&entry, binding.JSON); err != nil {
		controllers.ResponseError(c, http.StatusConflict, "Dữ liệu gửi lên không chính xác", err)
	}

	if err = entry.Create(); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, "Xử lý dữ liệu lỗi", err)
	}

	data["entry"] = entry

	controllers.ResponseSuccess(c, http.StatusOK, "Tạo mới từ khoá thành công", data)
}

func DeleteSchool(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.School{}

	entryId, _ := primitive.ObjectIDFromHex(c.Param("id"))

	filter := bson.M{
		"deleted_at": nil,
		"_id":        entryId,
	}
	if err = entry.First(filter); err != nil && err != mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusInternalServerError, "Truy vấn dữ liệu lỗi", err)
	} else if err == mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusInternalServerError, "Không tìm thấy dữ liệu", err)
	}

	if err = entry.Delete(); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, "Truy vấn dữ liệu lỗi", err)
	}
	data["entry"] = entry
	controllers.ResponseSuccess(c, http.StatusOK, "Xoá từ khoá thành công", data)
}
