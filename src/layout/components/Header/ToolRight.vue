<template>
  <div class="m-tool-right">
    <Remind />
    <Avatar />
  </div>
</template>

<script lang="ts" setup>
  import Remind from './components/Remind.vue'
  import Avatar from './components/Avatar.vue'
</script>

<style lang="scss" scoped>
  .m-tool-right {
    display: flex;
    align-items: center;
    .item-children {
      margin-right: 22px;
    }
  }
</style>
