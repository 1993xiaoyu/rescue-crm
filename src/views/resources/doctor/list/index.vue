<template>
  <div class="voluteeer-box">
    <Search @emittutor="emittutor" @searchList="searchList" />
    <List ref="listRef" :searchData="searchData" @emittutor="emittutor" />
    <EditDialog
      v-model="editDialogShow"
      ref="editDialogRef"
      @closeEditDialogShow="volunteerDialogShow"
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
    tutorName: '',
    tutorHospital: '',
    tutorDepartment: '',
  })
  const listRef = ref()
  const editDialogRef = ref()
  const editDialogShow = ref(false)
  const volunteerDialogShow = (data) => {
    editDialogShow.value = data
  }

  const searchList = (data) => {
    searchData.tutorName = data.tutorName || ''
    searchData.tutorDepartment = data.tutorDepartment || ''
    searchData.tutorHospital = data.tutorHospital || ''

    listRef.value.getList()
  }

  const refreshList = () => {
    listRef.value.getList()
  }
  const emittutor = (type, data) => {
    editDialogShow.value = true
    editDialogRef.value.setDialogData(type, data)
  }
  onMounted(() => {
    listRef.value.getList()
  })
</script>

<style lang="scss" scoped>
  .voluteeer-box {
    background: #fff;
    padding: 30px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 10px;
  }
</style>
