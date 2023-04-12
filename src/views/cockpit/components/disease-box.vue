<template>
  <div class="disease-box">
    <div id="diseaseChart" :style="{ width: '280px', height: '130px' }"></div>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted, reactive } from 'vue'
  import { getCensuDisease } from '@/api/cockpit.ts'

  import * as echarts from 'echarts'

  let echart = echarts

  onMounted(() => {
    getCensuDiseaseData()
  })

  const diseaseObj = reactive({
    list: [],
  })
  const getCensuDiseaseData = async () => {
    const res = await getCensuDisease()

    diseaseObj.list = res.list || []

    initChart()
  }
  onUnmounted(() => {
    echart.dispose
  })

  // 基础配置一下Echarts
  const initChart = () => {
    let chart = echart.init(document.getElementById('diseaseChart'), 'dark')

    // 把配置和数据放这里
    chart.setOption({
      backgroundColor: 'transparent',

      tooltip: {
        trigger: 'item',
      },

      series: [
        {
          type: 'pie',
          radius: ['40%', '60%'],
          data: diseaseObj.list || [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            formatter: '{b} {c}',
          },
        },
      ],
    })
    window.onresize = function () {
      //自适应大小
      chart.resize()
    }
  }
</script>

<style lang="scss" scoped>
  .disease-box {
    #diseaseChart {
      margin: 0 auto;
    }
  }
</style>
