<template>
  <div class="aed-box">
    <div v-for="item in aedList" :key="item.valueKey" class="aed-box__item">
      <img :src="item.iconUrl" />
      <div class="aed-box__detail">
        <div class="aed-box__detail-num">
          {{ formatNum(aedObj[item.valueKey]) }}
        </div>
        <div class="aed-box__detail-title">{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'

  //import { getCensusAed } from '@/network/cockpit.js';

  import { getAedStatisticss } from '@/api/cockpit.ts'

  import { formatNum } from '@/utils/index.ts'
  import aedBg1 from '../assets/aed-bg1.png'
  import aedBg2 from '../assets/aed-bg2.png'
  import aedBg3 from '../assets/aed-bg3.png'
  import aedBg4 from '../assets/aed-bg4.png'
  import aedBg5 from '../assets/aed-bg5.png'

  const aedList = [
    { iconUrl: aedBg1, title: '总台数', valueKey: 'aedTootal' },
    { iconUrl: aedBg1, title: '正常台数', valueKey: 'normalNum' },
    { iconUrl: aedBg2, title: '自检失败', valueKey: 'checkingWaringNum' },
    { iconUrl: aedBg3, title: '电池异常', valueKey: 'batteryWaringNum' },
    { iconUrl: aedBg4, title: '掉线数', valueKey: 'disconnectNum' },
    { iconUrl: aedBg5, title: '预警台数', valueKey: 'earlyWarningNum' },
  ]
  const aedObj = reactive({
    aedTootal: 0,
    normalNum: 0,
    checkingWaringNum: 0,
    batteryWaringNum: 0,
    disconnectNum: 0,
    earlyWarningNum: 0,
  })
  const getCensusAedData = async (data) => {
    const params = {
      ...data,
    }
    const res = await getAedStatisticss(params)
    const { total_cnt, normal_cnt, repair_cnt, damage_cnt, disconnectNum, earlyWarningNum } =
      res.data
    aedObj.aedTootal = total_cnt
    aedObj.normalNum = normal_cnt
    aedObj.checkingWaringNum = repair_cnt
    aedObj.batteryWaringNum = damage_cnt
    aedObj.disconnectNum = disconnectNum
    aedObj.earlyWarningNum = earlyWarningNum
  }
  onMounted(() => {})

  const init = (data) => {
    getCensusAedData(data)
  }

  defineExpose({ init })
</script>

<style lang="scss" scoped>
  .aed-box {
    padding: 15px 20px 21px 20px;
    display: flex;

    &__item {
      display: inline-flex;
      flex: 1;
      img {
        width: 30px;
        height: 30px;
        margin-right: 6px;
      }
    }

    &__detail {
      color: #fff;

      &-num {
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 3px;
        background-image: -webkit-linear-gradient(
          rgba(0, 126, 241, 1) 0%,
          rgba(6, 250, 255, 1) 100%
        );

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      &-title {
        font-size: 12px;
        line-height: 12px;
        transform: scale(0.5);
        transform-origin: left top;
      }
    }
  }
</style>
