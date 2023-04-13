<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      fixed
      prop="mechanismName"
      label="机构名称"
      show-overflow-tooltip
      width="280"
    />

    <el-table-column prop="stauts" label="机构状态" width="120" />
    <el-table-column prop="management" label="机构性质" width="180" />
    <el-table-column prop="organizationType" label="机构类别" width="180" />
    <el-table-column prop="mechanismAdress" label="地址" width="280" show-overflow-tooltip />
    <el-table-column prop="administrativeDivision" label="所属区域" />

    <el-table-column prop="phone" label="电话" width="180" />
    <el-table-column prop="calibrationDate" label="批准日期 " width="120" />

    <el-table-column label="操作" fixed="right" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button link type="primary" size="small" @click="handleDetail">详情</el-button>
        <el-button link type="primary" size="small" @click="handleDel(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="currentPage1"
    :page-size="pageParams.pageSize"
    layout="total, prev, pager, next"
    :total="pageParams.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
  import { ref, reactive, defineExpose } from 'vue'
  import { useRouter } from 'vue-router'
  import { mechanismRemove, mechanismList } from '@/api/organ.ts'
  import { ElMessage, ElMessageBox } from 'element-plus'
  const emit = defineEmits(['emitOrgan'])
  const props = defineProps({
    searchData: {
      type: Object,
      default: () => {
        return {}
      },
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
    const res = await mechanismList(params)
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
    ElMessageBox.confirm('确定删除该机构吗?')
      .then(() => {
        const params = {
          mechanismIds: item.mechanismId,
        }

        mechanismRemove(params).then((res) => {
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
    emit('emitOrgan', item)
  }
  // 查看详情
  const handleDetail = (item) => {
    router.push({
      name: 'doctorDetail',
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
