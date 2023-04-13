<template>
  <div class="home-box">
    <div class="lefet-box">
      <QuickNav />
      <System />
      <Rescue />
      <WeekCensus />
    </div>
    <div class="right-box">
      <Map />
      <div class="right-box__bottom">
        <ErrorList />
        <WarnList />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import QuickNav from './components/quick-nav.vue'
  import System from './components/system.vue'
  import Rescue from './components/rescue.vue'
  import WeekCensus from './components/week-census.vue'
  import Map from './components/map.vue'
  import ErrorList from './components/error-list.vue'
  import WarnList from './components/warn-list.vue'
</script>

<style scoped lang="scss">
  @import './index';
</style>
