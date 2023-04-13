<template>
  <div class="doctor-box">
    <Search @editDialogShow="editDialogShow" @searchList="searchList" />
    <List ref="listRef" :searchData="searchData" @emitVolunteer="emitVolunteer" />
    <EditDialog v-model="dialogShow" ref="editDialogRef" @closeEditDialogShow="editDialogShow" />
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import List from './modules/list.vue'
  import Search from './modules/search.vue'
  import EditDialog from '../components/edit-dialog.vue'

  const searchData = reactive({
    userName: '',
    status: '',
  })
  const listRef = ref()
  const editDialogRef = ref()

  const dialogShow = ref(false)
  const editDialogShow = (data) => {
    dialogShow.value = data
  }

  const searchList = (data) => {
    searchData.userName = data.userName || ''
    searchData.status = data.status || ''

    listRef.value.getList()
  }

  const emitVolunteer = (data) => {
    dialogShow.value = true
    editDialogRef.value.setDialogData(data)
  }
  onMounted(() => {
    listRef.value.getList()
  })
</script>

<style lang="scss" scoped>
  .doctor-box {
    background: #fff;
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
  }
</style>
