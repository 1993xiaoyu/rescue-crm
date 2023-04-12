<template>
  <div class="map-box">
    <div class="title">事件及资源分部</div>
    <div class="content">
      <div v-for="item in systemData.list" class="content-item">
        <span class="content-item__title">{{ item.title }}</span>
        <span class="content-item__val">{{ item.value }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive } from 'vue'

  const systemData = reactive({
    list: [
      {
        title: '总呼救次数',
        value: 208,
      },
      {
        title: '企鹅急救呼救',
        value: 142,
      },
      {
        title: '120呼救',
        value: 66,
      },
      {
        title: '响应次数',
        value: 140,
      },
      {
        title: '急救车派车次数',
        value: 66,
      },
      {
        title: '志愿者响应',
        value: 20,
      },
    ],
  })
</script>

<style lang="scss" scoped>
  .map-box {
    border-radius: 14px;
    background: #ffffff;
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    .title {
      position: relative;
      color: #333333;
      font-size: 16px;
      line-height: 16px;
      padding-bottom: 24px;
      &::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 10px;
        background: #6975f8;
        border-radius: 0 5px 5px 0;
        left: -20px;
        top: 3px;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      flex-flow: row wrap;
      &-item {
        padding: 13px 20px;
        border-radius: 10px;
        background: #f5f6f8;
        display: inline-flex;
        justify-content: space-between;
        width: 30%;
        margin-bottom: 10px;
        &__title {
          font-size: 13px;
          line-height: 24px;
          color: #666;
        }
        &__val {
          font-size: 24px;
          line-height: 24px;
          color: #000;
        }
      }
    }
  }
</style>
