<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="title" label="操作模块" width="120" fixed="left" />
    <el-table-column prop="operName" label="操作人" />

    <el-table-column prop="errorMsg" label="操作内容" :show-overflow-tooltip="true" />
    <el-table-column prop="operTime" label="操作时间" />
  </el-table>
  <el-pagination
    v-model:current-page="pageParams.pageNum"
    :page-size="pageParams.pageSize"
    layout="total, prev, pager, next"
    :total="pageParams.total"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
  import { ref, reactive, defineExpose } from 'vue'
  import { operlogList } from '@/api/work.ts'
  const props = defineProps({
    searchData: {
      type: Object,
      default: () => {},
    },
  })
  const tableData = ref([])
  const pageParams = reactive({
    pageSize: 20,
    pageNum: 1,
    total: 0,
  })

  // 请求列表
  const getList = async () => {
    const params = {
      ...props.searchData,
      pageSize: pageParams.pageSize,
      pageNum: pageParams.pageNum,
    }
    const res = await operlogList(params)
    console.log(res, '===operlog')
    tableData.value = res.list || []
    pageParams.total = res.total || 0
  }

  // 翻页
  const handleCurrentChange = (val) => {
    pageParams.pageNum = val
    getList()
  }

  defineExpose({ getList })
</script>
<style lang="scss" scoped>
  .el-pagination {
    margin-top: 30px;
    justify-content: flex-end;
  }
</style>
