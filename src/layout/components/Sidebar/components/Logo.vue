<template>
  <div class="sidebar-logo-container">
    <transition name="sidebarLogoFadeCl">
      <router-link v-if="isCollapse" key="collapse" class="sidebar-logo-link" to="/">
        <img src="@/assets/image/logo.png" class="sidebar-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img src="@/assets/image/logo.png" class="sidebar-logo" />
        <!-- <h1 class="sidebar-title">信息驾驶平台</h1> -->
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{ isCollapse: boolean }>()
</script>

<style lang="scss" scoped>
  .openSidebar {
    .sidebar-logo {
      width: 80px !important;
      height: 80px !important;
    }
  }
  .sidebarLogoFadeCl-enter-active {
    transition: opacity 2s;
  }
  .sidebarLogoFadeCl-enter-from,
  .sidebarLogoFadeCl-leave-to {
    opacity: 0;
  }
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    height: 120px;
    line-height: 50px;
    background: #04074a;
    text-align: center;
    overflow: hidden;
    padding-top: 20px;

    & .sidebar-logo-link {
      height: 100%;
      width: 100%;

      & .sidebar-logo {
        width: 40px;
        height: 40px;
        vertical-align: middle;
      }
      & .sidebar-title {
        display: inline-block;
        margin: 0;
        color: #fff;
        font-weight: 600;
        margin-left: 12px;
        line-height: 50px;
        font-size: 14px;
        vertical-align: middle;
      }
    }
  }
</style>
