<template>
  <div class="trend-chart">
    <div class="header">
      <span class="region-header">省份排名</span>
      <span class="daily-header">日净已定量</span>
      <span class="month-header">月净已定量</span>
    </div>
    <div v-for="(item, index) in data" :key="index" class="region-item">
      <div
        :style="{
          backgroundColor: getBgColor(index),
        }"
        class="region-item-block item-index"
      >
        {{ index + 1 }}
      </div>
      <div class="region-item-block item-name">{{ item.name }}</div>
      <div class="region-item-block item-count">
        {{ item.dailySales }}
      </div>
      <div class="region-item-block item-count">
        {{ item.monthSales }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, ref } from 'vue'

  export const Colors = ['#551A8B', '#1E90FF', '#66CDAA', '#25Abde', '#007E99']

  export type TrendOption = {
    name: string
    dailySales: number
    monthSales: string | number
  }
  export default defineComponent({
    props: {
      data: {
        type: Array as PropType<TrendOption[]>,
        default: () => [],
      },
    },
    setup() {
      const getBgColor = (index: number) => {
        const colorIndex = ref(0)
        colorIndex.value = Math.floor(index / 2)
        if (colorIndex.value === 0) {
          return Colors[0]
        }
        if (colorIndex.value === 1) {
          return Colors[1]
        }
        if (colorIndex.value === 2) {
          return Colors[2]
        }
        if (colorIndex.value === 3) {
          return Colors[3]
        }
        if (colorIndex.value === 4) {
          return Colors[4]
        }
        return undefined
      }
      return {
        getBgColor,
      }
    },
  })
</script>
<style lang="scss">
  .trend-chart {
    z-index: 200;
    color: #fff;

    .header {
      display: flex;
      justify-content: space-around;
      flex-wrap: nowrap;
      margin-bottom: 30px;
      margin-left: 40px;
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      letter-spacing: 0;
      font-weight: 600;
      font-weight: bold;
      color: #70afe9;

      .daily-header {
        padding: 0 20px 0 40px;
      }
    }

    .region-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 6px;

      &-block {
        height: 25px;
        line-height: 25px;
        font-size: 0;
        text-align: left;
      }

      .item-index {
        margin-right: 20px;
        border-radius: 4px;
        width: 20px;
        font-size: 14px;
        font-weight: 700;
        text-align: center;
        flex-shrink: 0;
      }

      .item-name {
        font-size: 14px;
        font-weight: bold;
        text-align: left;
        letter-spacing: 0.1em;
        flex: 2;
      }

      .item-count {
        display: inline-block;
        flex: 1;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
</style>
