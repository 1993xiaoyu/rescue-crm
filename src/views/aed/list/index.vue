<template>
  <div class="aed-box">
    <Card />
    <div class="aed-box-search">
      <Search @editDialogShow="aedDialogShow" @searchList="searchList" />
      <List ref="listRef" :searchData="searchData" @emitAed="emitAed" />
    </div>
    <EditDialog
      v-model="editDialogShow"
      ref="editDialogRef"
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

  const searchData = reactive({
    aedId: '',
    aedState: '',
    trainTime: '',
  })
  const listRef = ref()
  const editDialogRef = ref()
  const editDialogShow = ref(false)
  const aedDialogShow = (data) => {
    editDialogShow.value = data
  }

  const searchList = (data) => {
    searchData.aedId = data.aedId || ''
    searchData.aedState = data.aedState || ''
    searchData.trainTime = data.trainTime || ''

    listRef.value.getList()
  }

  const refreshList = () => {
    listRef.value.getList()
  }
  const emitAed = (data) => {
    editDialogShow.value = true
    editDialogRef.value.setDialogData(data)
  }
  onMounted(() => {
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
