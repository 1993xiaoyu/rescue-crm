<template>
  <div class="system-box">
    <div class="title">响应系统总览</div>
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
        title: '总数',
        value: 48,
      },
      {
        title: '在线总数',
        value: 43,
      },
      {
        title: '掉线总数',
        value: 5,
      },
    ],
  })
</script>

<style lang="scss" scoped>
  .system-box {
    border-radius: 14px;
    background: #ffffff;
    width: 600px;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
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
      &-item {
        padding: 13px 20px;
        border-radius: 10px;
        background: #f5f6f8;
        display: inline-flex;
        justify-content: space-between;
        width: 30%;
        color: #666;

        &__title {
          font-size: 13px;
          line-height: 24px;
          color: #666;
        }
        &__val {
          font-size: 24px;
          line-height: 24px;
        }
        &:first-child {
          .content-item__val {
            color: #7175fc;
          }
        }
        &:nth-child(2) {
          .content-item__val {
            color: #ff7e00;
          }
        }
      }
    }
  }
</style>
