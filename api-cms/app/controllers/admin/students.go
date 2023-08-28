package admin

import (
	"fmt"
	"idist-core/app/collections"
	"idist-core/app/controllers"
	"idist-core/app/providers/loggerProvider"
	"idist-core/const/mongo"
	"idist-core/const/response"
	"net/http"
	"sort"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	mongo2 "go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func ListStudents(c *gin.Context) {
	loggerProvider.GetLogger().Info("[ListStudents]")
	data := bson.M{}
	var err error
	entries := collections.Students{}
	entry := collections.Student{}
	pagination := controllers.BindRequestTable(c, "")
	opts := options.Find().SetSort(bson.D{{"studentid", 1}})
	filter := pagination.CustomFilters(bson.M{})
	if entries, err = entry.Find(filter, opts); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, mongo.NOT_FOUND, err)
	}

	data["entries"] = entries
	controllers.ResponseSuccess(c, http.StatusOK, "Lấy dữ liệu thành công", data)
}

func ReadStudent(c *gin.Context) {
	data := bson.M{}
	var err error
	entryId, _ := primitive.ObjectIDFromHex(c.Param("id"))
	entry := collections.Student{}
	filter := bson.M{
		"_id": entryId,
	}
	fmt.Println(entryId)

	if err = entry.First(filter); err != nil && err != mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusInternalServerError, response.GET_FAIL, err)
	} else if err == mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusNotFound, mongo.NOT_FOUND, err)
	}

	data["entry"] = entry
	controllers.ResponseSuccess(c, http.StatusOK, response.GET_SUCCESS, data)
}

func UpdateStudent(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.Student{}
	exist := collections.Student{}
	entryId, _ := primitive.ObjectIDFromHex(c.Param("id"))

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

func CreateStudent(c *gin.Context) {
	data := bson.M{}
	var err error

	entry := collections.Student{}

	if err = c.ShouldBindBodyWith(&entry, binding.JSON); err != nil {
		controllers.ResponseError(c, http.StatusBadRequest, "Dữ liệu gửi lên lỗi", err.Error())
	}

	if err = entry.Create(); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, "Xử lý dữ liệu lỗi", err)
	}

	data["entry"] = entry

	controllers.ResponseSuccess(c, http.StatusOK, "Đăng ký thành công", data)
}
func DeleteStudent(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.Student{}

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
	controllers.ResponseSuccess(c, http.StatusOK, "Xoá thông tin thành công", data)
}

func SearchStudent(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.Student{}
	entries := collections.Students{}

	var keySearch string

	keySearch = c.Param("key")

	pagination := controllers.BindRequestTable(c, "")
	opts := options.Find().SetSort(bson.D{{"studentid", 1}})

	filter := bson.M{"$text": bson.M{"$search": keySearch}}

	if entries, err = entry.Find(filter, opts); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, "Truy vấn dữ liệu lỗi", err)
	}

	data["entries"] = entries
	data["pagination"] = pagination

	controllers.ResponseSuccess(c, http.StatusOK, "Lấy dữ liệu thành công", data)
}

func SortStudent(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.Student{}
	entries := collections.Students{}
	pagination := BindRequestTable(c, "updated_at")
	filter := pagination.CustomFilters(bson.M{})
	opts := pagination.CustomOptions(options.Find())

	if entries, err = entry.Find(filter, opts); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, "Truy vấn dữ liệu lỗi", err)
	}
	// Sắp xếp danh sách lớp theo trường "Name"
	sort.SliceStable(entries, func(i, j int) bool {
		return entries[i].Name < entries[j].Name
	})
	data["entries"] = entries

	controllers.ResponseSuccess(c, http.StatusOK, "Lấy dữ liệu thành công", data)
}

func GetStudentsByClassID(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.Student{}
	entries := collections.Students{}

	idClass, _ := primitive.ObjectIDFromHex(c.Param("idClass"))

	pagination := controllers.BindRequestTable(c, "")
	opts := options.Find().SetSort(bson.D{{"studentid", 1}})

	filter := bson.M{"class_name": idClass}

	if entries, err = entry.Find(filter, opts); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, "Truy vấn dữ liệu lỗi", err)
	}

	data["entries"] = entries
	data["pagination"] = pagination

	controllers.ResponseSuccess(c, http.StatusOK, "Lấy dữ liệu thành công", data)
}
func GetStudentsNoClass(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.Student{}
	entries := collections.Students{}

	pagination := controllers.BindRequestTable(c, "")
	opts := options.Find().SetSort(bson.D{{"studentid", 1}})

	emptyObjectID := primitive.NilObjectID
	filter := bson.M{"class_name": emptyObjectID}
	if entries, err = entry.Find(filter, opts); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, "Truy vấn dữ liệu lỗi", err)
	}

	data["entries"] = entries
	data["pagination"] = pagination

	controllers.ResponseSuccess(c, http.StatusOK, "Lấy dữ liệu thành công", data)
}
func UpdateClassStudent(c *gin.Context) {
	data := bson.M{}
	var err error
	entry := collections.Student{}
	entryId, _ := primitive.ObjectIDFromHex(c.Param("id"))

	filter := bson.M{
		"_id":        entryId,
		"deleted_at": nil,
	}

	if err = entry.First(filter); err != nil && err != mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusInternalServerError, response.GET_FAIL, err)
	} else if err == mongo2.ErrNoDocuments {
		controllers.ResponseError(c, http.StatusNotFound, mongo.NOT_FOUND, err)
	}

	entry.ClassName, _ = primitive.ObjectIDFromHex(c.Param("idClass"))

	fmt.Print("OKLA", entry.ClassName)

	if err = entry.Update(); err != nil {
		controllers.ResponseError(c, http.StatusInternalServerError, response.UPDATE_FAIL, err)
	}

	data["entry"] = entry
	controllers.ResponseSuccess(c, http.StatusOK, response.UPDATE_SUCCESS, data)

}
