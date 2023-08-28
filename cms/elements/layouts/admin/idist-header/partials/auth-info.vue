<template>
  <div class="info-wrapper">
    <header-message />
    <header-notification />
    <header-settings />
    <header-support />
    <header-theme />
    <header-user />
  </div>
</template>

<script>
import HeaderMessage from "./header-message";
import HeaderNotification from "./header-notification";
import HeaderSettings from "@/elements/layouts/admin/idist-header/partials/header-settings";
import HeaderSupport from "@/elements/layouts/admin/idist-header/partials/header-support";
import HeaderUser from "@/elements/layouts/admin/idist-header/partials/header-user";
import HeaderTheme from "@/elements/layouts/admin/idist-header/partials/header-theme";

export default {
  name: "auth-info",
  components: { HeaderTheme, HeaderUser, HeaderSupport, HeaderSettings, HeaderNotification, HeaderMessage },
  data: () => ({}),
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
