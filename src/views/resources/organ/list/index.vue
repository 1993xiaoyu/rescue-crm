<template>
  <div class="organ-box">
    <Search @editDialogShow="organDialogShow" @searchList="searchList" />
    <List ref="listRef" :searchData="searchData" @emitOrgan="emitOrgan" />
    <EditDialog
      v-model="editDialogShow"
      ref="editDialogRef"
      @closeEditDialogShow="organDialogShow"
      @refreshList="refreshList"
    />
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import List from './modules/list.vue'
  import Search from './modules/search.vue'
  import EditDialog from '../components/edit-dialog.vue'

  const searchData = reactive({
    stauts: '',
    mechanismName: '',
    management: '',
    organizationType: '',
  })
  const listRef = ref()
  const editDialogRef = ref()
  const editDialogShow = ref(false)
  const organDialogShow = (data) => {
    editDialogShow.value = data
    if (!editDialogShow.value) {
      listRef.value.getList()
    }
  }

  const searchList = (data) => {
    searchData.mechanismName = data.mechanismName || ''
    searchData.stauts = data.stauts || ''
    searchData.organizationType = data.organizationType || ''
    searchData.management = data.management || ''

    listRef.value.getList()
  }

  const refreshList = () => {
    listRef.value.getList()
  }
  const emitOrgan = (data) => {
    editDialogShow.value = true
    editDialogRef.value.setDialogData(data)
  }
  onMounted(() => {
    listRef.value.getList()
  })
</script>

<style lang="scss" scoped>
  .organ-box {
    background: #fff;
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
  }
</style>
