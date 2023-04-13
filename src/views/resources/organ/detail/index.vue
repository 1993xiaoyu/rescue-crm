<template>
  <div class="voluteeer-detail">
    <div class="voluteeer-detail-title">
      机构信息 - 刘非凡{{ userId }}
      <div>
        <el-button @click="handle(ruleFormRef)" type="primary">编辑志愿者信息</el-button>
        <el-button @click="handle(ruleFormRef)">删除志愿者</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { getCurrentInstance } from 'vue'
  const instance = getCurrentInstance()
  const { $router, $route } = instance.appContext.config.globalProperties
  const userId = $route.query.userId
  const handle = () => {
    console.log('===')
  }
  const goBack = () => {
    $router.go(-1)
  }
</script>

<style lang="scss" scoped>
  .voluteeer-detail {
    background: #fff;
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
    &-title {
      color: #333333;
      font-size: 28px;
      line-height: 28px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
