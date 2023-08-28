<template>
  <div>
    <a-carousel autoplay>
      <div v-for="(slide, key) in sliders" :key="key">
        <img class="w-100" :src="slide" />
      </div>
    </a-carousel>
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
                <a-form-model-item prop="name" name="name" label="Họ và tên">
                  <a-input v-model:value="entry.name" placeholder="Nhập tên..." />
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="gender" name="gender" label="Giới tính">
                  <a-select ref="select_gender" v-model:value="entry.gender">
                    <a-select-option value="male">Nam</a-select-option>
                    <a-select-option value="female">Nữ</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <birthday :value="entry" @update="(e) => (entry = e)" />
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
                <page-province :value="entry" @update="(e) => (entry = e)" />
              </a-col>
              <a-col :md="12">
                <page-graduation-year :value="entry" @update="(e) => (entry = e)" />
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="academic" name="academic" label="Học lực">
                  <a-select ref="select_gender" v-model:value="entry.academic">
                    <a-select-option value="gioi">Giỏi</a-select-option>
                    <a-select-option value="kha">Khá</a-select-option>
                    <a-select-option value="trungbinh">Trung Bình</a-select-option>
                    <a-select-option value="yeu">Yếu</a-select-option>
                    <a-select-option value="kem">Kém</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="conduct" name="conduct" label="Hạnh kiểm lớp 12">
                  <a-select ref="select_gender" v-model:value="entry.conduct">
                    <a-select-option value="gioi">Giỏi</a-select-option>
                    <a-select-option value="kha">Khá</a-select-option>
                    <a-select-option value="trungbinh">Trung Bình</a-select-option>
                    <a-select-option value="yeu">Yếu</a-select-option>
                    <a-select-option value="kem">Kém</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>

              <a-col :md="12">
                <a-form-model-item prop="class_name" name="class_name" label="Tên lớp 12">
                  <a-input v-model:value="entry.class_name" placeholder="..." />
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="cmnd" name="cmnd" label="Số CMND/CCCD">
                  <a-input v-model:value="entry.cmnd" placeholder="..." />
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <issued-at :value="entry" @update="(e) => (entry = e)" />
              </a-col>
              <a-col :md="12">
                <page-issue-place :value="entry" @update="(e) => (entry = e)" />
              </a-col>
              <a-col :md="24">
                <a-form-model-item prop="address" name="address" label="Hộ khẩu thường trú">
                  <a-input v-model:value="entry.address" placeholder="Nhập thông tin..." />
                  <i>
                    <small> Ghi rõ tên tỉnh (thành phố), huyện (quận), xã (phường) vào ô hộ khẩu thường trú. </small>
                  </i>
                </a-form-model-item>
              </a-col>
              <a-col :md="24">
                <h3>
                  Nơi học THPT hoặc tương đương (ghi tên trường và nơi trường đóng: huyện (quận), tỉnh (thành phố)):
                </h3>
              </a-col>
              <a-col :md="24">
                <a-card class="mb-20">
                  <template #title>
                    <div class="bg-success">Lớp 10</div>
                  </template>
                  <a-row :gutter="16">
                    <a-col :md="12">
                      <a-form-model-item prop="class_10.province" name="class_10.province" label="Tên tỉnh/TP">
                        <a-input v-model:value="entry.class_10.province" placeholder="Nhập thông tin..." />
                      </a-form-model-item>
                    </a-col>
                    <a-col :md="12">
                      <a-form-model-item prop="class_10.school" name="class_10.school" label="Tên trường">
                        <a-input v-model:value="entry.class_10.school" placeholder="Nhập thông tin..." />
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card class="mb-20">
                  <template #title>
                    <div class="bg-success">Lớp 11</div>
                  </template>
                  <a-row :gutter="16">
                    <a-col :md="12">
                      <a-form-model-item prop="class_11.province" name="class_11.province" label="Tên tỉnh/TP">
                        <a-input v-model:value="entry.class_11.province" placeholder="Nhập thông tin..." />
                      </a-form-model-item>
                    </a-col>
                    <a-col :md="12">
                      <a-form-model-item prop="class_11.school" name="class_11.school" label="Tên trường">
                        <a-input v-model:value="entry.class_11.school" placeholder="Nhập thông tin..." />
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card class="mb-20">
                  <template #title>
                    <div class="bg-success">Lớp 12</div>
                  </template>
                  <a-row :gutter="16">
                    <a-col :md="12">
                      <a-form-model-item prop="class_12.province" name="class_12.province" label="Tên tỉnh/TP">
                        <a-input v-model:value="entry.class_12.province" placeholder="Nhập thông tin..." />
                      </a-form-model-item>
                    </a-col>
                    <a-col :md="12">
                      <a-form-model-item prop="class_12.school" name="class_12.school" label="Tên trường">
                        <a-input v-model:value="entry.class_12.school" placeholder="Nhập thông tin..." />
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-card>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="priority_object" name="priority_object" label="Đối tượng ưu tiên tuyển sinh">
                  <a-select ref="select_gender" v-model:value="entry.priority_object">
                    <a-select-option value="00">00</a-select-option>
                    <a-select-option value="01">01</a-select-option>
                    <a-select-option value="02">02</a-select-option>
                    <a-select-option value="03">03</a-select-option>
                    <a-select-option value="04">04</a-select-option>
                    <a-select-option value="05">05</a-select-option>
                    <a-select-option value="06">06</a-select-option>
                    <a-select-option value="07">07</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="khu_vuc" name="khu_vuc" label="Khu vực tuyển sinh">
                  <a-select ref="select_gender" v-model:value="entry.khu_vuc">
                    <a-select-option value="kv1">KV1</a-select-option>
                    <a-select-option value="kv1-nt">KV1-NT</a-select-option>
                    <a-select-option value="kv2">KV2</a-select-option>
                    <a-select-option value="kv3">KV3</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="24">
                <a-form-model-item prop="address_current" name="address_current" label="Địa chỉ nhận giấy báo">
                  <a-input v-model:value="entry.address_current" placeholder="Nhập thông tin..." />
                </a-form-model-item>
              </a-col>
              <a-col :md="24">
                <a-form-model-item prop="email" name="email" label="Địa chỉ email">
                  <a-input v-model:value="entry.email" placeholder="Nhập thông tin..." />
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="phone" name="phone" label="Điện thoại thí sinh">
                  <a-input v-model:value="entry.phone" placeholder="Nhập thông tin..." />
                </a-form-model-item>
              </a-col>
              <a-col :md="12">
                <a-form-model-item prop="parent_phone" name="parent_phone" label="Điện thoại phụ huynh">
                  <a-input v-model:value="entry.parent_phone" placeholder="Nhập thông tin..." />
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="mb-20" title="Thông tin đăng ký">
            <div class="mb-20">
              Sau khi đã đọc và hiểu rõ các quy định về tiêu chí và điều kiện xét tuyển của Nhà trường, tôi đồng ý xét
              tuyển học bạ vào trình độ Đại học như sau: (chọn phương thức xét tuyển)
            </div>

            <div class="mb-20">
              <a-checkbox v-model="entry.average_3_subjects">
                Xét tuyển bằng Tổng điểm Trung bình lớp 12 theo tổ hợp 3 môn
              </a-checkbox>
              <div v-if="entry.average_3_subjects">
                <a-card title="Ngành 1">
                  <a-row :gutter="16">
                    <a-col :md="12">
                      <a-form-model-item prop="nganh_1.name" name="nganh_1.name" label="Ngành xét tuyển">
                        <a-select ref="select_gender" v-model:value="entry.nganh_1.name"> </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col :md="12">
                      <a-form-model-item prop="khu_vuc" name="khu_vuc" label="Tổ hợp môn">
                        <a-select ref="select_gender" v-model:value="entry.nganh_1.to_hop"> </a-select>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card title="Ngành 2">
                  <a-row :gutter="16">
                    <a-col :md="12">
                      <a-form-model-item prop="nganh_2.name" name="nganh_2.name" label="Ngành xét tuyển">
                        <a-select ref="select_gender" v-model:value="entry.nganh_2.name"> </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col :md="12">
                      <a-form-model-item prop="khu_vuc" name="khu_vuc" label="Tổ hợp môn">
                        <a-select ref="select_gender" v-model:value="entry.nganh_2.to_hop"> </a-select>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-card>
                <a-card title="Ngành 3">
                  <a-row :gutter="16">
                    <a-col :md="12">
                      <a-form-model-item prop="nganh_3.name" name="nganh_3.name" label="Ngành xét tuyển">
                        <a-select ref="select_gender" v-model:value="entry.nganh_3.name"> </a-select>
                      </a-form-model-item>
                    </a-col>
                    <a-col :md="12">
                      <a-form-model-item prop="khu_vuc" name="khu_vuc" label="Tổ hợp môn">
                        <a-select ref="select_gender" v-model:value="entry.nganh_3.to_hop"> </a-select>
                      </a-form-model-item>
                    </a-col>
                  </a-row>
                </a-card>
              </div>
            </div>
            <div class="mb-20">
              <a-checkbox v-model="entry.average_3_years">
                Xét tuyển bằng Tổng điểm Trung bình 3 học kỳ (HK1, HK2 năm lớp 11, HK1 năm lớp 12)
              </a-checkbox>
              <div v-if="entry.average_3_years">
                <a-card title="Ngành 1">
                  <a-form-model-item prop="nganh_4.name" name="nganh_4.name" label="Ngành xét tuyển">
                    <a-select ref="select_gender" v-model:value="entry.nganh_4.name"> </a-select>
                  </a-form-model-item>
                </a-card>
                <a-card title="Ngành 2">
                  <a-form-model-item prop="nganh_5.name" name="nganh_5.name" label="Ngành xét tuyển">
                    <a-select ref="select_gender" v-model:value="entry.nganh_5.name"> </a-select>
                  </a-form-model-item>
                </a-card>
                <a-card title="Ngành 3">
                  <a-form-model-item prop="nganh_6.name" name="nganh_6.name" label="Ngành xét tuyển">
                    <a-select ref="select_gender" v-model:value="entry.nganh_6.name"> </a-select>
                  </a-form-model-item>
                </a-card>
              </div>
            </div>
            <div class="mb-20">
              <strong>Lưu ý:</strong> Thí sinh có thể chọn một trong hai hoặc chọn cả hai để tăng cơ hội trúng tuyển
            </div>
          </a-card>
          <a-card class="mb-20" title="Thông tin khảo sát">
            <div class="text-center">
              <strong> Bạn biết đến HUTECH thông qua các kênh nào sau đây? (có thể click chọn nhiều kênh) </strong>
            </div>
            <a-row :gutter="16">
              <a-col :md="12" v-for="(khaosat, key) in entry.khao_sat" :key="key" class="mb-10">
                <a-checkbox v-model="khaosat.value">
                  {{ khaosat.name }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-card>
          <a-card class="mb-20 text-center">
            <a-button
              :loading="loading"
              :disabled="loading"
              type="primary"
              html-type="submit"
              @click.prevent="SubmitForm()"
            >
              Đăng ký
            </a-button>
          </a-card>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import PageMenu from "@/elements/layouts/pages/menu/page-menu";
import PageIntroduction from "@/elements/layouts/pages/page-introduction";
import ArticleTitle from "@/elements/articles/article-title";
import Birthday from "@/elements/layouts/pages/birthday";
import PageProvince from "@/elements/layouts/pages/page-province";
import PageGraduationYear from "@/elements/layouts/pages/page-graduation-year";
import IssuedAt from "@/elements/layouts/pages/issued_at";
import PageIssuePlace from "@/elements/layouts/pages/page-issued-place";

export default {
  name: "dang-ky-xet-hoc-ba",
  components: {
    PageIssuePlace,
    IssuedAt,
    PageGraduationYear,
    PageProvince,
    Birthday,
    ArticleTitle,
    PageMenu,
    PageIntroduction,
  },
  layout: "page",
  data: () => ({
    sliders: ["/uploads/default/files/banner_hocba.png"],
    loading: false,
    entry: {
      name: "",
      gender: "",
      birthday: "",
      ethnic: "",
      religion: "",
      graduation_year: 2022,
      cmnd: "",
      issued_at: "",
      issue_place: null,
      issue_place_id: 0,
      province: null,
      province_id: 0,
      academic: "",
      conduct: "",
      class_name: "",
      class_10: {
        province_id: 0,
        school: "",
      },
      class_11: {
        province_id: 0,
        school: "",
      },
      class_12: {
        province_id: 0,
        school: "",
      },
      email: "",
      phone: "",
      parent_phone: "",
      priority_object: "",
      average_3_subjects: false,
      average_3_years: false,
      nganh_1: {
        name: "",
        to_hop: "",
      },
      nganh_2: {
        name: "",
        to_hop: "",
      },
      nganh_3: {
        name: "",
        to_hop: "",
      },
      nganh_4: {
        name: "",
        to_hop: "",
      },
      nganh_5: {
        name: "",
        to_hop: "",
      },
      nganh_6: {
        name: "",
        to_hop: "",
      },
      khao_sat: [
        {
          name: "Cẩm nang hướng nghiệp của HUTECH",
          value: false,
        },
        {
          name: "Chương trình tư vấn tại các trường THPT",
          value: false,
        },
        {
          name: "Sổ tay HUTECH",
          value: false,
        },
        {
          name: "Ngày hội Tư vấn tuyển sinh",
          value: false,
        },
        {
          name: "Thông tin trên báo giấy",
          value: false,
        },
        {
          name: "Người thân, bạn bè",
          value: false,
        },
        {
          name: "Thông tin trên truyền hình",
          value: false,
        },
        {
          name: "Định hướng của thầy cô",
          value: false,
        },
        {
          name: "Cẩm nang tuyển sinh của các báo",
          value: false,
        },
        {
          name: "Bài viết trên các trang báo mạng",
          value: false,
        },
        {
          name: "Cuộc thi do HUTECH tổ chức",
          value: false,
        },
        {
          name: "Banner trên các trang báo mạng",
          value: false,
        },
        {
          name: "Tìm kiếm trên Google, Cốc cốc,...",
          value: false,
        },
        {
          name: "Website HUTECH",
          value: false,
        },
        {
          name: "Facebook",
          value: false,
        },
        {
          name: "Zalo",
          value: false,
        },
        {
          name: "Youtube",
          value: false,
        },
        {
          name: "Instagram",
          value: false,
        },
        {
          name: "TikTok",
          value: false,
        },
      ],
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
      description: [
        {
          max: 120,
          message: "Độ dài tối đa 220 ký tự",
          trigger: "blur",
        },
      ],
      content: [
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
    async SubmitForm() {
      this.$refs.FormData.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let response = await this.$store.dispatch("tuyenSinh/CreateTuyenSinh", this.entry);
          if (response && response.code === 200) {
            this.$toast.show(response.message, { duration: 2000, type: "success" });
            window.reload();
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

<style scoped></style>
