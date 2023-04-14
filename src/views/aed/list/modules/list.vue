<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="aedNumber" label="设备序列号" width="180" fixed="left" />
    <el-table-column prop="aedStatus" label="设备状态" width="100">
      <template #default="scope">
        <span
          :class="{
            'aedStatus-normal': scope.row.aedStatus === '正常',
            'aedStatus-error': scope.row.aedStatus.indexOf('故障') > -1,
            'aedStatus-warn': scope.row.aedStatus.indexOf('预警') > -1,
          }"
        >
          {{ scope.row.aedStatus }}
        </span>
      </template>
    </el-table-column>

    <el-table-column prop="aedLevel" label="电池电量" width="130">
      <template #default="scope">
        <div class="aedlevel-box">
          <div :style="levelStyle(scope.row.aedLevel)" class="aedlevel-box__real">
            <span>{{ levelStyle(scope.row.aedLevel).width }}</span>
          </div>
        </div>
      </template>
    </el-table-column>

    <el-table-column prop="aedNo" label="AED柜号" width="180" />
    <el-table-column prop="aedModel" label="设备型号" width="180" />
    <el-table-column prop="equipmentBrand" label="品牌" width="180" />

    <el-table-column prop="aedPosition" label="所属地址" width="180" show-overflow-tooltip />
    <el-table-column prop="aedPosition" label="安装地址" width="180" show-overflow-tooltip />
    <el-table-column prop="cishu" label="使用次数" width="180" />

    <el-table-column prop="preTime" label="上次使用时间" width="180" />
    <el-table-column prop="administrators" label="设备管理员" width="180" />
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
  import { aedRemove, aedList } from '@/api/aed'
  import { ElMessage, ElMessageBox } from 'element-plus'
  const emit = defineEmits(['emitAed'])
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
    const res = await aedList(params)
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
    ElMessageBox.confirm('确定删除该AED吗?')
      .then(() => {
        const params = {
          ids: item.id,
        }

        aedRemove(params).then((res) => {
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
    emit('emitAed', item)
  }
  // 查看详情
  const handleDetail = (item) => {
    router.push({
      name: 'aedDetail',
      query: { id: item.aedId, aedNumber: item.aedNumber },
    })
  }

  const levelStyle = (item) => {
    const levelList = item.split('/')
    const percentage = (levelList[0] / levelList[1]) * 100
    return {
      width: parseInt(percentage) + '%',
      background: percentage > 50 ? '#2DD2BE' : '#FFDC3F',
      color: percentage > 25 ? '#fff' : '#FF7E00',
    }
  }
  defineExpose({ getList })
</script>
<style lang="scss" scoped>
  .el-pagination {
    margin-top: 30px;
    justify-content: flex-end;
  }
  .aedStatus-normal {
    color: #2dd2be;
    background: rgba(45, 210, 190, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
  }
  .aedStatus-warn {
    color: #ffdc3f;
    background: rgba(45, 210, 190, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
  }
  .aedStatus-error {
    color: #ff7e00;
    background: rgba(255, 126, 0, 0.1);
    padding: 3px 8px;
    border-radius: 4px;
  }
  .aedlevel-box,
  .aedlevel-box__real {
    position: relative;
    width: 100%;
    border-radius: 29px;
    background: #eff3f6;
    height: 22px;
  }
  .aedlevel-box__real {
    position: absolute;
    top: 0;
    left: 0;
    span {
      font-size: 12px;
      line-height: 22px;
      padding-left: 4px;
      display: inline-block;
      vertical-align: top;
      transform: scale(0.8);
      white-space: nowrap;
    }
  }
</style>
