<template>
  <div>
   
    <a-row :gutter="16">
      <a-col :xxl="4" :xl="5" :lg="6" :md="24" :sm="24">
        <page-menu />
      </a-col>
      <a-col :xxl="20" :xl="19" :lg="18" :md="24" :sm="24">
        <page-introduction />
        <a-form-model ref="FormData" layout="vertical" :rules="rules" :model="entry">
            <a-card class="mb-20" title="Thông tin hồ sơ">
            <a-row :gutter="10">


              <a-col :md="12">
    <div>
         <a-form-model-item prop="avatar" name="avatar" label="Ảnh sinh viên">
      <div class="image-upload">
        <img :src="entry.avatar" alt="">
      </div>
       <input type="file" id="fileInput" @change="handleFileUpload" > 
     
    </a-form-model-item>
        </div>
        </a-col>
            <a-col :md="12">
            <a-row :gutter="16">
                 <a-col :md="16">
                    <a-form-model-item prop="name" name="name" label="Họ và tên">
                      <a-input v-model:value="entry.name" placeholder="Nhập tên..." />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="8">
                    <a-form-model-item prop="gender" name="gender" label="Giới tính">
                      <a-select ref="select_gender" v-model:value="entry.gender">
                        <a-select-option value="Nam">Nam</a-select-option>
                        <a-select-option value="Nữ">Nữ</a-select-option>
                      </a-select>
                    </a-form-model-item>
                  </a-col></a-row>
            
            </a-col>
            

                <a-col :md="12">
                <a-row :gutter="16">
                <a-col :md="12">
                    <birthday :value="entry" @update="(e) => (entry = e)" />
                  </a-col>
                  <a-col :md="12">
                          <a-form-model-item prop="place_of_birth" name="place_of_birth" label="Nơi sinh">
                            <a-input v-model:value="entry.place_of_birth" placeholder="..." />
                          </a-form-model-item>
                  </a-col>
                </a-row>
                
                </a-col>
               
              
                    
              <a-col :md="12">
                <a-row :gutter="16">
                  <a-col :md="12">
                    <a-form-model-item prop="ethnic" name="ethnic" label="Dân tộc">
                      <a-input v-model:value="entry.ethnic" placeholder="..." />
                    </a-form-model-item>
                  </a-col>
                  <a-col :md="12">
                    <a-form-model-item prop="religion" name="religion" label="Tôn giáo">
                      <a-input v-model:value="entry.religion" placeholder="..." />
                    </a-form-model-item>
                  </a-col>
                </a-row>
              </a-col>
               <a-col :md="12">
                  <a-row :gutter="16">
                    <a-col :md="12">
                      <a-form-model-item prop="studentid" name="studentid" label="Mã sinh viên ">
                          <a-input v-model:value="entry.studentid" placeholder="..." />
                      </a-form-model-item>
                    </a-col>
                     <a-col :md="12">
                  <Department :value="entry" />
                    </a-col> 
                  </a-row>
                </a-col>

                <a-col :md="12">
                    <a-row :gutter="16">
                      <a-col :md="12">
                        <Schoolyear :value="entry"/>
                      </a-col>
                       <a-col :md="12">
                        <a-form-model-item prop="" name="" label="Lớp học ">
                            <a-input disabled placeholder="..." />
                        </a-form-model-item>
                      </a-col> 
                    </a-row>
                  </a-col>
             
               <a-col :md="12">
               <a-row :gutter="16">
                    <a-col :md="12">
                         <a-form-model-item prop="cmnd" name="cmnd" label="Số CMND/CCCD">
                                <a-input v-model:value="entry.cmnd" placeholder="..." />
                          </a-form-model-item>
                          </a-col>
                          <a-col :md="12">
                     <a-form-model-item prop="issued_at" name="issued_at" label="Nơi cấp">
                              <a-input v-model:value="entry.issued_at" placeholder="..." />
                          </a-form-model-item>
                  </a-col>
                        </a-row>
              
              </a-col>
               
              
              <a-col :md="12">
                <a-form-model-item prop="phone" name="phone" label="Điện thoại">
                  <a-input v-model:value="entry.phone" placeholder="Nhập thông tin..." />
                </a-form-model-item>
              </a-col>
            
            </a-row>
          </a-card>
          
          <a-card class="mb-20 text-center">
            <a-button :loading="loading" :disabled="loading" type="primary" html-type="submit"
              @click.prevent="SubmitForm()">
               Tạo hồ sơ
            </a-button>
          </a-card>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Birthday from "@/elements/layouts/pages/birthday";
import Department from "@/elements/classes/classes-department";
import Schoolyear from "@/elements/classes/classes-schoolyear";
export default {
  name: "tao-ho-so-sinh-vien",
  components: {
    Birthday,
    Department,
    Schoolyear,
  },
  layout: "admin",
  data: () => ({
    loading: false,
    entry: {
      avatar:null,
      name: "",
      gender: "",
      birthday: "",
      ethnic: "",
      religion: "",
      place_of_birth: "",
      studentid: "",
      cmnd: "",
      department:{
        id:"",
        name:"",
      },
      schoolyear: "",
      class_name: "",
      issued_at: "",
      phone: "",
    },
    rules: {
      name: [
        {
          required: true,
          message: "Không được bỏ trống",
          trigger: "blur",
        },
      ],
      gender: [
        {
          required: true,
          message: "Không được bỏ trống",
          trigger: "blur",
        },
      ],
      birthday: [
        {
          required: true,
          message: "Không được bỏ trống",
          trigger: "blur",
        },
      ],
    },
  }),
  watch: {
    entry: {
      handler: function () {
        console.log(this.entry);
      },
      deep: true,
    },
  },
  methods: {
    routerBack() {
      this.$router.back();
    },
     handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.entry.avatar = URL.createObjectURL(file);
          console.log("aa121",this.entry.avatar)
        }}},
    async SubmitForm() {
      this.$refs.FormData.validate(async (valid) => {
        if (valid) {
          this.loading = true;


          let response = await this.$store.dispatch("articles/CreateStudent", this.entry);
          if (response && response.code === 200) {
            this.$toast.show(response.message, { duration: 2000, type: "success" });
           await  this.$router.push({ name: "admin-students-list" });
          }
          this.loading = false;
        }
      });
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped>
.image-upload {
  width: 200px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.image-upload img {
  max-width: 100%;
  max-height: 100%;
    width: 180px;
  height: 180px;
}

</style>
