<template>
  <div class="doctor-box">
    <Search @searchList="searchList" />
    <List ref="listRef" :searchData="searchData" />
  </div>
</template>
<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import List from './modules/list.vue'
  import Search from './modules/search.vue'

  const searchData = reactive({
    userName: '',
    status: '',
    logState: '',
  })
  const listRef = ref()

  const searchList = (data) => {
    searchData.userName = data.userName || ''
    searchData.status = data.status || ''
    searchData.logState = data.logState || ''

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
