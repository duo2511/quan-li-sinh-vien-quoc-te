<template>
  <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" :mode="mode" :theme="theme">
    <a-menu-item-group key="general">
      <template v-slot:title>
        <p class="sidebar-nav-title">Quản lý</p>
      </template>
      <a-menu-item @click="toggleCollapsed" key="admin-homepage">
        <nuxt-link :to="{ name: 'admin-homepage' }">
          <a-icon type="home" />
          <span> Trang chủ </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-categories">
        <nuxt-link :to="{ name: 'admin-categories-list' }">
          <a-icon type="folder" />
          <span> Danh mục </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-tags">
        <nuxt-link :to="{ name: 'admin-tags-list' }">
          <a-icon type="tag" />
          <span> Từ khoá </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-articles">
        <nuxt-link :to="{ name: 'admin-articles-list' }">
          <a-icon type="file" />
          <span> Bài viết </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-students">
          <nuxt-link :to="{ name: 'admin-students-list' }">
            <a-icon type="" />
            <span> Sinh Viên </span>
          </nuxt-link>
        </a-menu-item>
        <a-menu-item @click="toggleCollapsed" key="admin-classes">
            <nuxt-link :to="{ name: 'admin-classes-list' }">
              <a-icon type="" />
              <span> Lớp học </span>
            </nuxt-link>
          </a-menu-item>
          <a-menu-item @click="toggleCollapsed" key="admin-subjectscores">
              <nuxt-link :to="{ name: 'admin-subjectscores-ListStudent' }">
                <a-icon type="" />
                <span> Quản lý điểm </span>
              </nuxt-link>
            </a-menu-item>
            <a-menu-item @click="toggleCollapsed" key="admin-schoolar">
                <nuxt-link :to="{ name: 'admin-schoolar-listSemester' }">
                  <a-icon type="" />
                  <span> Quản lý Học bổng </span>
                </nuxt-link>
              </a-menu-item>
            <a-menu-item @click="toggleCollapsed" key="admin-interns">
                <nuxt-link :to="{ name: 'admin-interns-list' }">
                  <a-icon type="" />
                  <span> Quản lý thực tập</span>
                </nuxt-link>
              </a-menu-item>
              <a-menu-item @click="toggleCollapsed" key="admin-bhyt">
                  <nuxt-link :to="{ name: 'admin-bhyt-list' }">
                    <a-icon type="" />
                    <span> Quản lý BHYT</span>
                  </nuxt-link>
                </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-redirects">
        <nuxt-link :to="{ name: 'admin-redirects-list' }">
          <a-icon type="branches" />
          <span> Điều hướng </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-menus">
        <nuxt-link :to="{ name: 'admin-menus-list' }">
          <a-icon type="menu" />
          <span> Menu </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-comments">
        <nuxt-link :to="{ name: 'admin-comments-list' }">
          <a-icon type="message" />
          <span> Bình luận </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-users">
        <nuxt-link :to="{ name: 'admin-users-list' }">
          <a-icon type="team" />
          <span> Người dùng </span>
        </nuxt-link>
      </a-menu-item>

      <a-menu-item @click="toggleCollapsed" key="admin-analytics">
        <nuxt-link :to="{ name: 'admin-analytics-list' }">
          <a-icon type="area-chart" />
          <span> Thống kê </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-system">
        <nuxt-link :to="{ name: 'admin-system-general' }">
          <a-icon type="area-chart" />
          <span> Hệ thống </span>
        </nuxt-link>
      </a-menu-item>
    </a-menu-item-group>
    <a-menu-item-group key="ptit">
      <template v-slot:title>
        <p class="sidebar-nav-title">Danh mục</p>
      </template>
      <a-menu-item @click="toggleCollapsed" key="admin-provinces">
        <nuxt-link :to="{ name: 'admin-provinces-list' }">
          <a-icon type="map" />
          <span> Tỉnh thành </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-schools">
        <nuxt-link :to="{ name: 'admin-schools-list' }">
          <a-icon type="map" />
          <span> Trường học </span>
        </nuxt-link>
      </a-menu-item>
      <a-menu-item @click="toggleCollapsed" key="admin-admissions">
        <nuxt-link :to="{ name: 'admin-admissions-list' }">
          <a-icon type="map" />
          <span> Tuyển sinh </span>
        </nuxt-link>
      </a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>
<script>
export default {
  name: "AsideItems",
  props: {
    toggleCollapsed: Function,
    events: Object,
    theme: {
      type: String,
      default: () => "light",
    },
  },
  data: () => ({
    mode: "inline",
    selectedKeys: ["admin-homepage"],
    openKeys: ["admin-homepage"],
    preOpenKeys: ["admin-homepage"],
  }),
  watch: {
    openKeys: {
      handler: function (val, oldVal) {
        this.preOpenKeys = oldVal;
      },
      deep: true,
    },
    "$route.matched": {
      handler: function () {
        this.checkRoute();
      },
      deep: true,
    },
  },
  methods: {
    checkRoute() {
      if (this.$route.matched.length) {
        console.log(this.$route.matched.length, this.$route.matched[0].name);
        this.selectedKeys = [this.$route.matched[0].name];
        this.openKeys = [this.$route.matched[0].name];
        this.preOpenKeys = [this.$route.matched[0].name];
      }
    },
  },
  mounted() {
    this.checkRoute();
  },
};
</script>
