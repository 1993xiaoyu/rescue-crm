<template>
  <div class="container-box">
    <div class="container-box__title">{{ title }}</div>
    <slot></slot>
  </div>
</template>
<script setup>
  const props = defineProps({
    title: String,
  })
</script>

<style lang="scss" scoped>
  .container-box {
    position: absolute;
    box-sizing: border-box;
    background: rgba(6, 13, 30, 0.3);
    border: 1px solid rgba(0, 136, 207, 0.3);
    margin-bottom: 20px;
    overflow: hidden;
    font-size: 0;
    &__title {
      display: inline-block;
      color: #fff;
      font-size: 10px;
      font-weight: 400;
      line-height: 18px;
      padding: 0px 25px 0px 10px;
      height: 18px;
      background: url('../assets/title-bg.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
</style>
