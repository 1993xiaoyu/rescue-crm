<template>
  <div class="duty-box">
    <div v-for="item in doctorList" :key="item.valueKey" class="duty-box__item">
      <span class="duty-box__item-title">
        {{ item.title }}
      </span>
      <span class="duty-box__item-num">{{ formatNum(doctorObj[item.valueKey]) }}</span>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'

  import { getCensusDoctor } from '@/api/cockpit.ts'
  import { formatNum } from '@/utils/index.ts'

  const doctorList = [
    { title: '总数', valueKey: 'totalNum' },
    { title: '急救专家', valueKey: 'specialistNum' },
    { title: '周新增导师', valueKey: 'supervisorNum' },
    { title: '周出勤导师', valueKey: 'traineesNum' },
  ]

  const doctorObj = reactive({
    totalNum: 0,
    specialistNum: 0,
    supervisorNum: 0,
    traineesNum: 0,
  })
  const getCensusDoctorData = async () => {
    const res = await getCensusDoctor()
    const { totalNum, specialistNum, supervisorNum, traineesNum } = res
    doctorObj.totalNum = totalNum
    doctorObj.specialistNum = specialistNum
    doctorObj.supervisorNum = supervisorNum
    doctorObj.traineesNum = traineesNum
  }
  onMounted(() => {
    getCensusDoctorData()
  })
</script>

<style lang="scss" scoped>
  .duty-box {
    padding: 18px 20px 0 20px;
    display: flex;
    flex-wrap: wrap;

    &__item {
      display: inline-flex;
      justify-content: space-between;
      color: #ffffff;
      padding: 0 10px;
      width: 122px;
      box-sizing: border-box;
      line-height: 28px;
      height: 28px;
      background: rgba(16, 139, 219, 0.2);
      border: 1px solid rgb(13, 151, 246);
      margin-bottom: 10px;
      &-title {
        font-size: 7px;
      }

      &-num {
        font-size: 10px;
        font-weight: 700;
      }
      &:nth-child(2n) {
        margin-left: 8px;
      }
    }
  }
</style>
