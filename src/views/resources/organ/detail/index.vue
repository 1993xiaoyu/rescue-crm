<template>
  <div class="organ-detail">
    <div class="organ-detail-title">
      机构信息 - {{ mechanismName }}
      <div>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础信息" name="1">
        <BasicDetail :detailObj="detailObj" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
  import { getCurrentInstance, ref, onMounted } from 'vue'
  import { mechanismList } from '@/api/organ'

  import BasicDetail from './modules/basic-detail.vue'
  const instance = getCurrentInstance()
  const { $router, $route } = instance.appContext.config.globalProperties
  const id = $route.query.id
  const mechanismName = $route.query.mechanismName

  const activeName = ref('1')
  const detailObj = ref({})

  // 请求列表
  const getDetail = async () => {
    const params = {
      mechanismName: mechanismName,
      id: id,
      pageSize: 10,
      pageNum: 1,
    }
    const res = await mechanismList(params)
    const currData = res.list || []
    detailObj.value = currData[0] || {}
  }
  const goBack = () => {
    $router.go(-1)
  }

  onMounted(() => {
    getDetail()
  })
</script>

<style lang="scss" scoped>
  .organ-detail {
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
      margin-bottom: 40px;
    }
  }
</style>
