<template>
  <div>
    <nuxt-link to="#">
      <a-alert class="mb-10" show-icon type="success">
        <template #icon>
          <a-icon type="check-circle" />
        </template>
        <template #message> Điều kiện xét tuyển </template>
      </a-alert>
    </nuxt-link>
    <nuxt-link to="#">
      <a-alert class="mb-10" show-icon type="info">
        <template #icon>
          <a-icon type="check-circle" />
        </template>
        <template #message> Ngành xét tuyển </template>
      </a-alert>
    </nuxt-link>
    <nuxt-link to="#">
      <a-alert class="mb-10" show-icon type="warning">
        <template #icon>
          <a-icon type="check-circle" />
        </template>
        <template #message> Hồ sơ và cách đăng ký </template>
      </a-alert>
    </nuxt-link>
    <nuxt-link to="#">
      <a-alert class="mb-10" show-icon type="error">
        <template #icon>
          <a-icon type="check-circle" />
        </template>
        <template #message> Đăng ký xét tuyển </template>
      </a-alert>
    </nuxt-link>
    <nuxt-link to="#">
      <a-alert class="mb-10" show-icon type="success">
        <template #icon>
          <a-icon type="check-circle" />
        </template>
        <template #message> Hướng dẫn nhập học </template>
      </a-alert>
    </nuxt-link>
    <nuxt-link to="#">
      <a-alert class="mb-10" show-icon type="info">
        <template #icon>
          <a-icon type="check-circle" />
        </template>
        <template #message> Khám phá PTIT </template>
      </a-alert>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "PageMenu",
  data: () => ({}),
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style scoped></style>
