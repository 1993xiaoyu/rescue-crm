<template>
  <div class="respinseTime-box">
    <div class="respinseTime-box__item item1">
      <div class="item-box">
        <span class="respinseTime-box__item-title">系统响应</span>
        <div> {{ responseTimeObj.averageResponseTime }}<span class="unit-style">秒</span> </div>
      </div>
    </div>
    <div class="respinseTime-box__item item2">
      <div class="item-box">
        <span class="respinseTime-box__item-title">志愿者响应</span>
        <div> {{ responseTimeObj.averageSetOutTime }}<span class="unit-style">分钟</span> </div>
      </div>
    </div>

    <div class="respinseTime-box__item item3">
      <div class="item-box">
        <span class="respinseTime-box__item-title">平均总救援</span>
        <div> {{ responseTimeObj.averageRescueTime }}<span class="unit-style">分钟</span> </div>
      </div>
    </div>
    <div class="respinseTime-box__item item4">
      <div class="item-box">
        <span class="respinseTime-box__item-title">社康响应</span>
        <div> {{ responseTimeObj.averageArriveTime }}<span class="unit-style">分钟</span> </div>
      </div>
    </div>
    <div class="respinseTime-box__item item5">
      <div class="item-box">
        <span class="respinseTime-box__item-title">驾驶舱响应</span>
        <div>
          {{ responseTimeObj.averageArriveHospitalTime }}<span class="unit-style">分钟</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onMounted } from 'vue'

  import { getCensuResponseTime } from '@/api/cockpit.ts'
  const responseTimeObj = reactive({
    averageResponseTime: '',
    averageSetOutTime: '',
    averageRescueTime: '',
    averageArriveTime: '',
    averageArriveHospitalTime: '',
  })
  const getCensuResponseTimeData = async () => {
    const res = await getCensuResponseTime()
    const {
      averageResponseTime,
      averageSetOutTime,
      averageRescueTime,
      averageArriveTime,
      averageArriveHospitalTime,
    } = res
    responseTimeObj.averageResponseTime = averageResponseTime
    responseTimeObj.averageSetOutTime = averageSetOutTime
    responseTimeObj.averageRescueTime = averageRescueTime
    responseTimeObj.averageArriveTime = averageArriveTime
    responseTimeObj.averageArriveHospitalTime = averageArriveHospitalTime
  }
  onMounted(() => {
    getCensuResponseTimeData()
  })
</script>

<style lang="scss" scoped>
  .respinseTime-box {
    position: relative;
    color: #fff;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 900;
    line-height: 21px;

    &__item {
      position: absolute;
      display: inline-block;
      width: 63px;
      height: 44px;
      text-align: center;
      background: url('../assets/response-time-bg1.png');
      background-repeat: no-repeat;
      background-size: contain;
      display: flex;
      justify-content: center;

      .item-box {
        margin-left: -5px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      &-title {
        color: rgba(255, 255, 255, 0.65);
        font-weight: 400;
        font-size: 12px;
        line-height: 12px;
        transform: scale(0.7);
        transform-origin: center;
      }
    }

    .unit-style {
      font-size: 9px;
    }

    .item1 {
      top: 0px;
      left: 41px;
      color: #00ddff;
    }
    .item2 {
      top: 0px;
      left: 192px;
    }
    .item3 {
      width: 188px;
      height: 109px;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background-image: url('../assets/response-time-bg2.png');
      .item-box {
        margin-top: 28px;
        margin-left: 0px;
      }
    }
    .item4 {
      top: 72px;
      left: 20px;
    }
    .item5 {
      top: 73px;
      left: 212px;
    }
  }
</style>
