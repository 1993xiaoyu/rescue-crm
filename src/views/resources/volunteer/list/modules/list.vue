<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="志愿者ID" fixed="left" />
    <el-table-column prop="volunteerName" label="姓名" width="180" />
    <el-table-column prop="volunteerState" label="人员状态" width="180">
      <template #default="scope">
        <el-tag :type="scope.row.volunteerState ? 'success' : 'warning'">
          {{ scope.row.volunteerState === '0' ? '开启' : '冻结' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="volunteerPhone" label="联系方式" width="180" />
    <el-table-column prop="volunteerOccupation" label="职业" width="180" />
    <!-- 
        <el-table-column prop="rescueTimes" label="救援次数" width="180" /> -->
    <el-table-column prop="trainAddress" label="培训地点" width="180" />
    <el-table-column prop="trainDate" label="培训日期" width="180" />
    <el-table-column label="操作" fixed="right" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="handleDetail(scope.row)"
          >详情</el-button
        >
        <el-button link type="primary" size="small" @click="handleDel(scope.row)">删除</el-button>
      </template>
    </el-table-column>
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
  import { volunteerList, volunteerRemove } from '@/api/volunteer.ts'
  import { ElMessage, ElMessageBox } from 'element-plus'
  const emit = defineEmits(['emitVolunteer'])
  const props = defineProps({
    searchData: {
      type: Object,
      default: () => {},
    },
  })
  const router = useRouter()
  const tableData = ref()
  const pageParams = reactive({
    pageSize: 10,
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
    const res = await volunteerList(params)
    tableData.value = res.list || []
    pageParams.total = res.total || 0
  }

  // 翻页
  const handleCurrentChange = (val) => {
    pageParams.pageNum = val
    getList()
  }

  // 删除
  const handleDel = (item) => {
    ElMessageBox.confirm('确定删除该志愿者吗?')
      .then(() => {
        const params = {
          ids: item.id,
        }

        volunteerRemove(params).then((res) => {
          if (res.code === 0) {
            ElMessage({ type: 'success', message: '删除成功' })
            getList()
          } else {
            ElMessage({
              type: 'error',
              message: res.message || '删除失败,请重试',
            })
          }
        })
      })
      .catch(() => {})
  }

  // 编辑
  const handleEdit = (item) => {
    emit('emitVolunteer', item)
  }
  // 查看详情
  const handleDetail = (item) => {
    router.push({
      name: 'volunteerDetail',
      query: { id: item.id },
    })
  }

  defineExpose({ getList })
</script>
<style lang="scss" scoped>
  .el-pagination {
    margin-top: 30px;
    justify-content: flex-end;
  }
</style>
