<template>
  <div class="error-list">
    <div class="title">响应系统异常清单</div>
    <div class="content">
      <div v-for="(item, index) in tableData" :key="index" class="content_item">
        <div>{{ item.title }}</div>
        <div>{{ item.status }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const tableData = ref([
    {
      title: '救援中心',
      status: '掉线',
    },
    {
      title: 'AED设备管理',
      status: '掉线',
    },

    {
      title: '志愿者管理',
      status: '掉线',
    },
    {
      title: '一线人员管理',
      status: '掉线',
    },
    {
      title: '预警中心',
      status: '掉线',
    },
    {
      title: '预警中心',
      status: '掉线',
    },
  ])
</script>

<style lang="scss" scoped>
  .error-list {
    flex: 1;
    border-radius: 14px;
    background: #ffffff;
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
      &_item {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #eee;
        padding: 10px;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          left: -2px;
          top: 17px;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #6975f8;
        }
      }
    }
  }
</style>
