<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="warningId" label="ID" />
    <el-table-column prop="state" label="预警模块" />
    <el-table-column prop="level" label="预警等级" />
    <el-table-column prop="time" label="预警时间" />
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
  import { useRouter } from 'vue-router'
  import { userList } from '@/api/work.ts'
  const props = defineProps({
    searchData: {
      type: Object,
      default: () => {},
    },
  })
  const tableData = ref()
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
    const res = await userList(params)
    tableData.value = res.rows || []
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
