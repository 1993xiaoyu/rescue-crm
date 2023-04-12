<template>
  <div class="abnormal-box">
    <el-table :data="abnormalObj.list" stripe style="width: 100%" :border="false">
      <el-table-column prop="name" label="社康/医院" show-overflow-tooltip> </el-table-column>
      <el-table-column prop="status" label="状态" width="70">
        <template #default="scope">
          <span>{{ scope.row.status === 2 ? '不在线' : '在线' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="last_time" label="上次上线时间" width="110" show-overflow-tooltip>
        <template #default="scope">
          <span>{{ parseDate(scope.row.last_time) }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'
  import dayjs from 'dayjs'
  import { getStatusList } from '@/api/cockpit.ts'

  const abnormalObj = reactive({
    list: [],
  })
  const getCensusAbnormalData = async (data) => {
    const params = {
      ...data,
    }
    const res = await getStatusList(params)
    abnormalObj.list = res.clients || []
  }
  const parseDate = (date, format = 'YYYY-MM-DD') => {
    return date ? dayjs(date * 1000).format(format) : '--'
  }

  onMounted(() => {})

  const init = (data) => {
    getCensusAbnormalData(data)
  }

  defineExpose({ init })
</script>

<style lang="scss">
  .abnormal-box {
    .el-table__inner-wrapper::before {
      display: none;
    }
    .el-table tr,
    .el-table th.el-table__cell {
      background-color: #080f22;
      color: #fff;
      line-height: 7px;
      font-size: 7px;
      padding: 5px 0;
    }
    .el-table .el-table__cell {
      padding: 5px 0;
    }
    .el-table td.el-table__cell,
    .el-table th.el-table__cell.is-leaf {
      border-bottom: none;
    }

    thead tr {
      background-image: linear-gradient(
        to right,
        rgba(0, 111, 242, 0),
        rgba(0, 168, 255, 0.2) 51.563%,
        rgba(0, 111, 242, 0)
      );
    }
    .el-table th.el-table__cell {
      background-color: transparent;

      color: #6fc3ff;
    }

    .el-table .cell {
      line-height: 13px;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
      background: rgba(0, 111, 242, 0.1);
      color: '#fff';
    }
  }
</style>

<style lang="scss" scoped></style>
