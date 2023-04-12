<template>
  <div class="respond-box">
    <el-table
      :data="waringObj.list"
      stripe
      style="width: 100%"
      :border="false"
      :header-cell-style="{ paddingLeft: '20px' }"
      :cell-style="{ paddingLeft: '20px' }"
      @row-click="handleRow"
    >
      <el-table-column prop="address" label="救援事件地点" width="170" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="mobile" label="呼救人手机" show-overflow-tooltip />

      <el-table-column prop="emergency_status_str" label="响应状态">
        <template #default="scope">
          <span
            :class="scope.row.emergency_status_str === '已完成' ? 'status-succ' : 'status-load'"
          ></span>
          <span>{{ scope.row.emergency_status_str }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column
                prop="emergency_status_str"
                label="志愿者状态"
                width="150"
            >
                <template #default="scope">
                    <span
                        :class="
                            scope.row.emergency_status_str === '已完成'
                                ? 'status-succ'
                                : 'status-load'
                        "
                    ></span>
                    <span>{{ scope.row.emergency_status_str }}</span>
                </template>
            </el-table-column> -->

      <el-table-column prop="duration" label="已呼救时长" />
    </el-table>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'

  import { getEventList, getEventDetails, getEventStatistics } from '@/api/cockpit.ts'

  const waringObj = reactive({
    list: [],
  })
  const getCensusRespondData = async (data) => {
    const params = {
      ...data,
      page: 1,
      size: 10,
    }
    const res = await getEventList(params)

    waringObj.list = res.data || []
  }

  const handleRow = async (row) => {
    // const res = await getEventDetails({
    //     emergency_id: row.emergency_id,
    //     emergency_type: row.emergency_type,
    // });

    console.log(res, '===getEventDetails')
  }

  const getCensusStatistics = async (data) => {
    const params = {
      ...data,
    }
    const res = await getEventStatistics(params)
  }

  onMounted(() => {})

  const init = (data) => {
    getCensusRespondData(data)
    // getCensusStatistics(data);
  }

  defineExpose({ init })
</script>

<style lang="scss">
  .respond-box {
    .el-table {
      background-color: transparent;
    }
    .el-table__inner-wrapper::before {
      display: none;
    }
    .el-table tr,
    .el-table th.el-table__cell {
      background-color: rgba(8, 15, 34, 0.7);
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
        rgba(0, 168, 255, 0.3) 51.563%,
        rgba(0, 111, 242, 0)
      );
    }
    .el-table th.el-table__cell {
      background-color: transparent;

      color: #6fc3ff;
    }

    .el-table .cell {
      line-height: 13px;
      font-size: 13px;
    }
    .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
      background: rgba(0, 111, 242, 0.1);
      color: '#fff';
    }
  }
</style>

<style lang="scss" scoped>
  .status-succ,
  .status-load {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: rgb(0, 201, 255);
    border-radius: 50%;
    margin-right: 5px;
    vertical-align: bottom;
  }
  .status-load {
    background: rgb(255, 138, 61);
  }
</style>
