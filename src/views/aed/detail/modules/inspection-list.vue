<template>
  <div class="tipStyle">暂无此模块，需跟随 巡检功能填充</div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="volunteerName" label="巡检日期" />
    <el-table-column prop="volunteerState" label="巡检负责人" />
    <el-table-column prop="volunteerOccupation" label="更新时间" width="180" />
  </el-table>
  <el-pagination
    v-model:current-page="pageParams.pageNum"
    :page-size="pageParams.pageSize"
    :total="pageParams.total"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue'

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
      ...pageParams,
    }
  }

  // 翻页
  const handleCurrentChange = (val) => {
    pageParams.pageNum = val
    getList()
  }

  onMounted(() => {
    // getList()
  })
</script>
<style lang="scss" scoped>
  .el-pagination {
    margin-top: 30px;
    justify-content: flex-end;
  }
  .tipStyle {
    color: red;
    margin-bottom: 20px;
  }
</style>
