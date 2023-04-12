<template>
  <div class="waring-box">
    <el-table :data="waringObj.list" stripe style="width: 100%" :border="false">
      <el-table-column prop="abnormalMode" label="预警模块" show-overflow-tooltip />
      <el-table-column prop="abnormalContent" label="预警内容" width="250" show-overflow-tooltip />
      <el-table-column prop="level" label="预警等级" />
      <el-table-column prop="date" label="预警时间" width="150" show-overflow-tooltip />
    </el-table>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'

  import { getCensusWaring } from '@/api/cockpit.ts'

  const waringObj = reactive({
    list: [
      {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      },
      {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
      },
      {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
      },
      {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
      },
    ],
  })
  const getCensusWaringData = async (data) => {
    // const params = {
    //     access_token: data.access_token || '',
    //     expires_in: data.expires_in || '',
    //     refresh_token: data.refresh_token || '',
    //     uid: data.uid || '',
    //     tenant_id: data.tenantId,
    //     platform: data.platform,
    // };
    const res = await getCensusWaring()

    waringObj.list = res.list || []
  }

  onMounted(() => {
    init()
  })

  const init = (data) => {
    getCensusWaringData(data)
  }

  defineExpose({ init })
</script>

<style lang="scss">
  .waring-box {
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

      .cell {
        padding-left: 15px;
        box-sizing: border-box;
      }
    }
    .el-table .el-table__cell {
      padding: 5px 0;
      box-sizing: border-box;
      .cell {
        padding-left: 15px;
        box-sizing: border-box;
      }
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
