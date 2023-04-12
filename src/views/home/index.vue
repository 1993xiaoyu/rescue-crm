<template>
  <div class="home-box">
    <div>
      <QuickNav />
      <System />
      <Rescue />
      <WeekCensus />
    </div>
    <div class="right-box">
      <Map />
    </div>
  </div>
</template>
<script setup lang="ts">
  import QuickNav from './components/quick-nav.vue'
  import System from './components/system.vue'
  import Rescue from './components/rescue.vue'
  import WeekCensus from './components/week-census.vue'
  import Map from './components/map.vue'

  const goTo = (url) => {
    window.open(url, '_blank')
  }
</script>

<style scoped lang="scss">
  @import './index';
</style>
