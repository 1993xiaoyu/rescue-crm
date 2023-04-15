<template>
  <div class="aed-box">
    <Card @searchList="searchList" />
    <div class="aed-box-search">
      <Search @editDialogShow="aedDialogShow" @searchList="searchList" />
      <List ref="listRef" :searchData="searchData" @emitAed="emitAed" />
    </div>
    <EditDialog
      v-model="editDialogShow"
      ref="editDialogRef"
      :enumObj="enumObj"
      @closeEditDialogShow="aedDialogShow"
      @refreshList="refreshList"
    />
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import Card from './modules/card.vue'
  import List from './modules/list.vue'
  import Search from './modules/search.vue'
  import EditDialog from '../components/edit-dialog.vue'
  import { aedStatus, batteryStatus, electrodeStatus } from '@/api/aed'

  const searchData = reactive({
    aedNumber: '',
    installationTime: '',
    quickQuery: '',
  })

  const enumObj = reactive({
    aedStatusList: '',
    batteryStatusList: '',
    electrodeStatusList: '',
  })
  const listRef = ref()
  const editDialogRef = ref()
  const editDialogShow = ref(false)
  const aedDialogShow = (data) => {
    editDialogShow.value = data
  }

  const searchList = (data) => {
    searchData.aedNumber = data.aedNumber || ''
    searchData.installationTime = data.installationTime || ''
    searchData.quickQuery = data.quickQuery || ''
    listRef.value.getList()
  }

  const refreshList = () => {
    listRef.value.getList()
  }
  const emitAed = (data) => {
    editDialogShow.value = true
    editDialogRef.value.setDialogData(data)
  }

  // 请求设备状态
  const getAedStatus = async () => {
    const res = await aedStatus({})
    enumObj.aedStatusList = res.list || []
  }

  // 电池状态
  const getBatteryStatus = async () => {
    const res = await batteryStatus({})
    enumObj.batteryStatusList = res.list || []
  }

  // 电极片状态
  const getElectrodeStatus = async () => {
    const res = await electrodeStatus({})
    enumObj.electrodeStatusList = res.list || []
  }
  onMounted(() => {
    getAedStatus()
    getBatteryStatus()
    getElectrodeStatus()
    listRef.value.getList()
  })
</script>

<style lang="scss" scoped>
  .aed-box {
    width: 100%;
    background: #f5f5f5;
    padding-top: 20px;
  }
  .aed-box-search {
    background: #fff;
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
  }
</style>
