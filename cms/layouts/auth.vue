<template>
  <div id="auth-layout">
    <auth-header />
    <div class="auth-content">
      <Nuxt />
    </div>
    <auth-footer />
    <auth-helper />
    <img
      src="~/assets/images/layout-element-1.png"
      :style="setElementPosition()"
      v-anime="{ rotate: 360, duration: 3000 }"
      alt=""
    />
    <img
      src="~/assets/images/layout-element-2.png"
      :style="setElementPosition()"
      v-anime="{ translateX: 180, duration: 3000 }"
      alt=""
    />
    <img
      src="~/assets/images/layout-element-3.png"
      :style="setElementPosition()"
      v-anime="{ rotate: 360, duration: 3000 }"
      alt=""
    />
    <img
      src="~/assets/images/layout-element-4.png"
      :style="setElementPosition()"
      v-anime="{ rotate: 360, duration: 3000 }"
      alt=""
    />
  </div>
</template>

<script>
import AuthHeader from "@/elements/layouts/auth/auth-header";
import AuthFooter from "@/elements/layouts/auth/auth-footer";
import AuthHelper from "@/elements/layouts/auth/auth-helper";

export default {
  name: "LayoutAuth",
  components: { AuthHelper, AuthFooter, AuthHeader },
  layout: "auth",
  middleware: ["unauthenticated"],
  data: () => ({}),
  created() {},
  mounted() {},
  methods: {
    setElementPosition() {
      return {
        top: Math.floor(Math.random() * 30) + "vh",
        right: Math.floor(Math.random() * 30) + "vw",
        position: "absolute",
      };
    },
  },
};
</script>

<style scoped></style>
