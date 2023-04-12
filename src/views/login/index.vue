<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-box__left">
        <div class="login-box__left-logo"></div>
        <div class="login-box__left-title"> 5分钟社会救援圈 信息驾驶舱平台 </div>
      </div>
      <div class="login-form">
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import LoginForm from './components/LoginForm.vue'
</script>
<style lang="scss" scoped>
  @import './index';
</style>
