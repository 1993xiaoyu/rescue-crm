<template>
  <div class="voluteeer-box">
    <Search @editDialogShow="volunteerDialogShow" @searchList="searchList" />
    <List ref="listRef" :searchData="searchData" @emitVolunteer="emitVolunteer" />
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
    volunteerName: '',
    volunteerState: '',
    trainDate: '',
  })
  const listRef = ref()
  const editDialogRef = ref()
  const editDialogShow = ref(false)
  const volunteerDialogShow = (data) => {
    editDialogShow.value = data
  }

  const searchList = (data) => {
    searchData.volunteerName = data.volunteerName || ''
    searchData.volunteerState = data.volunteerState || ''
    searchData.trainDate = data.trainDate || ''

    listRef.value.getList()
  }

  const refreshList = () => {
    listRef.value.getList()
  }
  const emitVolunteer = (data) => {
    editDialogShow.value = true
    editDialogRef.value.setDialogData(data)
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
