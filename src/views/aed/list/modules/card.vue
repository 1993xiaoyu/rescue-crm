<template>
  <div class="aed-census">
    <div class="aed-card">
      <div v-for="item in Object.keys(aedCensusObj)" :key="item" class="aed-card__item">
        <div class="aed-card__item-title">
          {{ aedCensusObj[item].name }}
          <div v-if="aedCensusObj[item].tipNum" class="aed-card__item-tip">
            {{ aedCensusObj[item].tipName }}{{ aedCensusObj[item].tipNum }}
          </div>
        </div>
        <div class="aed-card__item-value">
          {{ aedCensusObj[item].value }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive } from 'vue'
  const aedCensusObj = reactive({
    total: {
      name: '总台数',
      value: 377,
      tipName: '',
    },
    normalTotal: {
      name: '正常台数',
      value: 263,
      tipName: '正常率',
      tipNum: '71.88%',
    },
    errorTotal: {
      name: '自检失败',
      value: 4,
      tipName: '故障率',
      tipNum: '71.88%',
    },
    batteryErrorTotal: {
      name: '电池/电极片异常',
      value: 100,
      tipName: '故障率',
      tipNum: '71.88%',
    },
    warnTotal: {
      name: '预警台数',
      value: 6,
      tipName: '预警率',
      tipNum: '71.88%',
    },
    offlineTotal: {
      name: '掉线台数',
      value: 2,
      tipName: '掉线率',
      tipNum: '71.88%',
    },
    overtimeTotal: {
      name: '超时巡检台数',
      value: 2,
      tipName: '超时率',
      tipNum: '71.88%',
    },
  })
</script>

<style lang="scss" scoped>
  .aed-census {
    width: 100%;
    overflow: scroll;
    padding-left: 20px;
  }
  .aed-card {
    width: 1800px;
    display: inline-flex;
    margin-bottom: 22px;
    &__item {
      width: 280px;
      box-sizing: border-box;
      padding: 12px 16px;
      height: 98px;
      border-radius: 14px;
      background: #ffffff;
      margin-right: 22px;
      font-size: 14px;
      color: #000;
      &:first-child {
        background: #7175fc;
        color: #fff;
        .aed-card__item-title {
          color: #fff;
        }
      }
      &-value {
        font-size: 32px;
        font-weight: bold;
      }
      &-title {
        display: flex;
        justify-content: space-between;
        color: #333;
      }
      &:nth-child(2) {
        .aed-card__item-tip {
          color: #2dd2be;
        }
      }
      &:nth-child(3) {
        .aed-card__item-tip,
        .aed-card__item-value {
          color: #ff7e00;
        }
      }
      &:nth-child(4) {
        .aed-card__item-tip,
        .aed-card__item-value {
          color: #ff7e00;
        }
      }
      &:nth-child(5) {
        .aed-card__item-tip,
        .aed-card__item-value {
          color: #ffd100;
        }
      }
      &:nth-child(6) {
        .aed-card__item-tip,
        .aed-card__item-value {
          color: #858585;
        }
      }
      &:nth-child(7) {
        .aed-card__item-tip,
        .aed-card__item-value {
          color: #858585;
        }
      }
    }
  }
</style>
