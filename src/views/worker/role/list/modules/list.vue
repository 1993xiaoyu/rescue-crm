<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="roleName" label="角色名称" width="120" fixed="left" />
    <el-table-column prop="status" label="状态" width="180">
      <template #default="scope">
        <el-tag :type="scope.row.status ? 'success' : 'warning'">
          {{ scope.row.status === '0' ? '开启' : '停用' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="角色描述" width="180" />
    <el-table-column prop="phoneNumber" label="关联用户数量" />
    <el-table-column prop="updateBy" label="最近操作人" />
    <el-table-column prop="updateTime" label="最近操作时间" />
    <el-table-column label="操作" fixed="right" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>

        <el-button link type="primary" size="small" @click="handleDel(scope.row)">停用</el-button>
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
  import { roleList, roleRemove } from '@/api/work.ts'
  import { ElMessage, ElMessageBox } from 'element-plus'
  const props = defineProps({
    searchData: {
      type: Object,
      default: () => {},
    },
  })
  const router = useRouter()
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
    const res = await roleList(params)
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
    ElMessageBox.confirm('确定停用该角色吗?')
      .then(() => {
        const params = {
          ids: item.roleId,
        }

        roleRemove(params).then((res) => {
          if (res.code === 0) {
            ElMessage({ type: 'success', message: '停用成功' })
            getList()
          } else {
            ElMessage({
              type: 'error',
              message: res.message || '停用失败,请重试',
            })
          }
        })
      })
      .catch(() => {})
  }

  // 编辑
  const handleEdit = (item) => {
    console.log(item, '===item')
    router.push({
      name: 'roleDetail',
      query: { roleId: item.roleId },
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
