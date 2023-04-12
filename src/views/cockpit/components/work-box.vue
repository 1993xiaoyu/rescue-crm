<template>
  <div class="work-box">
    <div id="myEcharts" :style="{ width: '260px', height: '190px' }"></div>
  </div>
</template>

<script setup>
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
    let chart = echart.init(document.getElementById('myEcharts'), 'dark')

    // 把配置和数据放这里
    chart.setOption({
      backgroundColor: 'transparent',
      xAxis: {
        show: true,
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine: {
          show: true, // 是否显示坐标轴轴线
          lineStyle: {
            color: '#7186A1', // 坐标轴线线的颜色
            width: '1', // 坐标轴线线宽
            type: 'solid', // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
          },
        },
        axisLabel: {
          textStyle: {
            color: '#7186A1',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '1%',
        right: '5%',
        bottom: '3%',
        top: '20px',
        containLabel: true,
      },
      yAxis: {
        show: true,
        type: 'category',
        data: ['响应端', '社康', '医院'],
        axisLine: {
          show: true, // 是否显示坐标轴轴线
          lineStyle: {
            color: '#7186A1', // 坐标轴线线的颜色
            width: '1', // 坐标轴线线宽
            type: 'solid', // 坐标轴线线的类型（solid实线类型；dashed虚线类型；dotted点状类型）
          },
        },
        axisLabel: {
          textStyle: {
            color: '#7186A1',
          },
        },
        axisTick: {
          show: false, // 是否显示坐标轴刻度
        },
      },

      series: [
        {
          name: '掉线',
          type: 'bar',
          label: {
            show: true,
            formatter: '{a} {c}',
            position: 'outside',
            textStyle: { fontSize: 12, color: '#FFE86C' },
          },
          data: [6, 10, 14],
          barWidth: '10px',
          itemStyle: {
            barBorderRadius: [5, 5, 5, 5],
            color: function () {
              const colorItem = ['rgb(238, 137, 60)', 'rgb(255, 233, 109)']
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，分别表示右,下,左,上。例如（0，0，0，1）表示从正上开始向下渐变；如果是（1，0，0，0），则是从正右开始向左渐变。
              // 相当于在图形包围盒中的百分比，如果最后一个参数传 true，则该四个值是绝对的像素位置
              return new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: colorItem[0],
                  },
                  {
                    offset: 1,
                    color: colorItem[1],
                  },
                ],
                false,
              )
            },
          },
        },
        {
          name: '总数',
          type: 'bar',
          label: {
            show: true,
            formatter: '{c}',
            position: 'outside',
            textStyle: { fontSize: 12, color: '#0D97F6' },
          },
          data: [48, 40, 44],
          barWidth: '3px',
          itemStyle: {
            color: '#0D97F6',
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
  .work-box {
    padding-top: 15px;
    #myEcharts {
      margin: 0 auto;
    }
  }
</style>
