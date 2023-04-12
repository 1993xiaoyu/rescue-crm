<template>
  <div class="voluteer-box">
    <div class="voluteer-box__item item1">
      <div class="item-box">
        <span class="voluteer-box__item-title">今日打卡人数</span>
        <span>{{ formatNum(voluteerObj.todayClockNum) }}</span>
      </div>
    </div>
    <div class="voluteer-box__item item2">
      <div class="item-box">
        <span class="voluteer-box__item-title">今日新增人数</span>
        <span>{{ formatNum(voluteerObj.monthClockNum) }}</span>
      </div>
    </div>

    <div class="voluteer-box__item item3">
      <div class="item-box">
        <span class="voluteer-box__item-title">总人数</span>
        <span>{{ formatNum(voluteerObj.totalVolunteerNum) }}</span>
      </div>
    </div>
    <div class="voluteer-box__item item4">
      <div class="item-box">
        <span class="voluteer-box__item-title">曾参与救援</span>
        <span>{{ formatNum(voluteerObj.rescuedNum) }}</span>
      </div>
    </div>
    <div class="voluteer-box__item item5">
      <div class="item-box">
        <span class="voluteer-box__item-title">月活跃人数</span>
        <span>{{ formatNum(voluteerObj.activedNum) }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, onMounted } from 'vue'

  import { getVolunteerStatistics } from '@/api/cockpit'
  import { formatNum } from '@/utils/index.ts'
  const voluteerObj = reactive({
    todayClockNum: '',
    totalVolunteerNum: '',
    activedNum: '',
    monthClockNum: '',
    rescuedNum: '',
    tenant_id: 1,
  })
  const getCensusVoluteerData = async (data) => {
    const params = {
      ...data,
    }
    console.log(params, '===params')
    const res = await getVolunteerStatistics(params)
    const { total_cnt, total_rescued_cnt } = res.data

    voluteerObj.todayClockNum = total_rescued_cnt
    voluteerObj.totalVolunteerNum = total_cnt
    voluteerObj.activedNum = 0
    voluteerObj.monthClockNum = 0
    voluteerObj.rescuedNum = 0
  }
  const init = (data) => {
    getCensusVoluteerData(data)
  }

  onMounted(() => {})

  defineExpose({ init })
</script>

<style lang="scss" scoped>
  .voluteer-box {
    position: relative;
    color: #fff;
    box-sizing: border-box;
    font-size: 14px;
    font-weight: 700;
    line-height: 21px;

    &__item {
      position: absolute;
      display: inline-block;
      width: 71px;
      height: 101px;
      text-align: center;
      background: url('../assets/voluteer-bg1.png');
      background-repeat: no-repeat;
      background-size: contain;
      display: flex;
      justify-content: center;

      .item-box {
        margin-left: -7px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 20px;
      }

      &-title {
        color: rgba(255, 255, 255, 0.65);

        font-size: 12px;
        line-height: 12px;
        transform: scale(0.7);
        transform-origin: center;
      }
    }

    .item1 {
      top: -20px;
      left: 40px;
    }
    .item2 {
      top: -20px;
      left: 193px;
    }
    .item3 {
      width: 88px;
      height: 136px;
      top: 20px;
      left: 104px;
      background-image: url('../assets/voluteer-bg2.png');
      .item-box {
        margin-top: -20px;
      }
    }
    .item4 {
      top: 80px;
      left: 23px;
    }
    .item5 {
      top: 80px;
      left: 210px;
    }
  }
</style>
