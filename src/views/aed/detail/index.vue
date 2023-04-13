<template>
  <div class="voluteeer-detail">
    <div class="voluteeer-detail-title">
      设备详情 - {{ aedNumber }}
      <div>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="1">
        <BasicDetail :detailObj="detailObj" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
  import { getCurrentInstance, onMounted, ref } from 'vue'
  import { mechanismList } from '@/api/organ.ts'

  import BasicDetail from './modules/basic-detail.vue'

  const instance = getCurrentInstance()
  const { $router, $route } = instance.appContext.config.globalProperties
  const aedNumber = $route.query.aedNumber

  const goBack = () => {
    $router.go(-1)
  }

  const activeName = ref('1')
  const detailObj = ref({})

  // 请求列表
  const getDetail = async () => {
    const params = {
      aedNumber: aedNumber,
      pageSize: 10,
      pageNum: 1,
    }
    const res = await mechanismList(params)
    const currData = res.list || []
    detailObj.value = currData[0] || {}
  }

  const handleClick = (tab) => {
    console.log(tab)
  }

  onMounted(() => {
    getDetail()
  })
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
