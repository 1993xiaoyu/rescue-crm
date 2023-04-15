<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="userId" label="ID" width="120" fixed="left" />
    <el-table-column prop="userName" label="姓名" width="180" />
    <el-table-column prop="status" label="人员状态" width="180">
      <template #default="scope">
        <el-tag :type="+scope.row.status ? 'warning' : 'success'">
          {{ scope.row.status === '0' ? '开启' : '冻结' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="roles" label="关联角色" width="180">
      <template #default="scope">
        <div>
          {{ scope.row.roles.join(',') }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="phonenumber" label="电话号" width="180" />
    <el-table-column prop="email" label="邮箱" width="180" />

    <el-table-column prop="sex" label="性别"> </el-table-column>

    <el-table-column prop="idiccid" label="身份证号" width="180" />
    <el-table-column prop="createTime" label="创建时间" width="180" />
    <el-table-column label="操作" fixed="right" width="180">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>

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
  import { userList, userRemove } from '@/api/work.ts'
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
    const res = await userList(params)
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
    ElMessageBox.confirm('确定删除该用户吗?')
      .then(() => {
        const params = {
          ids: item.userId,
        }

        userRemove(params).then((res) => {
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

  defineExpose({ getList })
</script>
<style lang="scss" scoped>
  .el-pagination {
    margin-top: 30px;
    justify-content: flex-end;
  }
</style>
