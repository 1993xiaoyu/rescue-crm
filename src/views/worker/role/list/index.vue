<template>
  <div class="doctor-box">
    <Search @editDialogShow="editDialogShow" @searchList="searchList" />
    <List ref="listRef" :searchData="searchData" @emitVolunteer="emitVolunteer" />
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import List from './modules/list.vue'
  import Search from './modules/search.vue'

  const searchData = reactive({
    roleName: '',
    status: '',
  })
  const listRef = ref()

  const dialogShow = ref(false)
  const editDialogShow = (data) => {
    dialogShow.value = data
  }

  const searchList = (data) => {
    searchData.roleName = data.roleName || ''
    searchData.status = data.status || ''

    listRef.value.getList()
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
