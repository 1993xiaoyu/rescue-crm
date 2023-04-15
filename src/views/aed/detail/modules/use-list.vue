<template>
  <div class="tipStyle">暂无此模块，需跟随 腾讯活动</div>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="volunteerName" label="关联救援事件" width="180" />
    <el-table-column prop="volunteerState" label="救援事件时间" />
    <el-table-column prop="volunteerOccupation" label="使用人" />
    <el-table-column prop="volunteerOccupation" label="使用时间" />
    <el-table-column prop="volunteerOccupation" label="归还时间" />
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
    //getList()
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
