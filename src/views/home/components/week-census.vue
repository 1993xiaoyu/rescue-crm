<template>
  <div class="week-box">
    <div class="title">本周救援统计</div>
    <div id="myEcharts" :style="{ width: '600px', height: '260px' }"></div>
  </div>
</template>
<script setup>
  import { reactive } from 'vue'

  import { onMounted, onUnmounted } from 'vue'

  import * as echarts from 'echarts'

  let echart = echarts

  onMounted(() => {
    initChart()
  })

  onUnmounted(() => {
    echart.dispose
  })

  // 基础配置一下Echarts
  const initChart = () => {
    let chart = echart.init(document.getElementById('myEcharts'))

    // 把配置和数据放这里
    chart.setOption({
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        left: '1%',
        right: '10%',
        bottom: '3%',
        containLabel: true,
      },
      legend: {
        data: ['救援次数', 'AED使用', '志愿者参与'],
        right: '8%',
      },
      toolbox: {
        show: true,
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '10月25日',
            '10月26日',
            '10月27日',
            '10月28日',
            '10月29日',
            '10月30日',
            '10月32日',
          ],
          show: true, // 是否显示坐标轴轴线
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '救援次数',
          barWidth: '10px',
          type: 'bar',
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 13.6],
        },
        {
          name: 'AED使用',
          barWidth: '10px',
          type: 'bar',
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 17.6],
        },
        {
          name: '志愿者参与',
          barWidth: '10px',
          type: 'bar',
          data: [1.6, 2.9, 3.0, 24, 23.7, 50.7, 14.6],
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
  .week-box {
    border-radius: 14px;
    background: #ffffff;
    width: 600px;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 20px;
    .title {
      position: relative;
      color: #333333;
      font-size: 16px;
      line-height: 16px;
      padding-bottom: 24px;
      &::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 10px;
        background: #6975f8;
        border-radius: 0 5px 5px 0;
        left: -20px;
        top: 3px;
      }
    }
    .content {
      display: flex;
      justify-content: space-between;
      &-item {
        padding: 13px 20px;
        border-radius: 10px;
        background: #f5f6f8;
        display: inline-flex;
        justify-content: space-between;
        width: 30%;
        color: #666;

        &__title {
          font-size: 13px;
          line-height: 24px;
          color: #666;
        }
        &__val {
          font-size: 24px;
          line-height: 24px;
        }
        &:first-child {
          .content-item__val {
            color: #7175fc;
          }
        }
        &:nth-child(2) {
          .content-item__val {
            color: #ff7e00;
          }
        }
      }
    }
  }
</style>
