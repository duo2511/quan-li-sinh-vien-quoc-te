<template>
  <div class="nav-author">
    <a-popover placement="bottomRight" trigger="click">
      <a-avatar src="/no-image.png" :size="32" />
      <template v-slot:content>
        <div class="user-dropdown">
          <figure class="user-dropdown__info">
            <img v-if="!user || !user.avatar" src="~/assets/images/no-image.png" style="width: 45px" alt="" />
            <img v-else :src="user.avatar" alt="" />
            <figcaption>
              <h4>{{ user ? user.name : "" }}</h4>
              <p>{{ user && user.role ? user.role.name : "đang cập nhật" }}</p>
            </figcaption>
          </figure>
          <ul class="user-dropdown__links">
            <li>
              <nuxt-link :to="{ name: 'admin-profile' }">
                <idist-feather-icons type="user" />
                Thông tin
              </nuxt-link>
            </li>
          </ul>
          <a @click="SignOut" class="user-dropdown__bottomAction" href="#">
            <idist-feather-icons v-if="!loadingSignOut" type="log-out" />
            <a-spin v-else />
            Đăng xuất
          </a>
        </div>
      </template>
    </a-popover>
  </div>
</template>

<script>
export default {
  name: "header-user",
  data: () => ({
    loadingSignOut: false,
  }),
  computed: {
    user() {
      return this.$store.state.users.profile ?? null;
    },
  },

  watch: {
    user: {
      handler: function () {
        console.log(this.user);
      },
      deep: true,
    },
  },
  methods: {
    async SignOut() {
      this.loadingSignOut = true;
      let response = await this.$store.dispatch("auth/PostLogout");
      if (response.code === 200) {
        this.$toast.show("Đăng xuất thành công", { type: "success", duration: "3000" });
        this.$router.push({ name: "auth-login" });
      }
      this.loadingSignOut = false;
    },
  },
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
