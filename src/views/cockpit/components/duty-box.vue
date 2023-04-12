<template>
  <div class="duty-box">
    <div v-for="item in dutyObj.list" :key="item.id" class="duty-box__item">
      <!-- <img :src="'doctor' + item.avatar" /> -->
      <span class="duty-box__avatar"></span>
      <div class="duty-box__detail">
        <div>
          {{ item.name }}
        </div>
        <span class="duty-box__detail-tip">{{ item.academicTitle }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive, onMounted } from 'vue'

  import { getCensusDuty } from '@/api/cockpit.ts'

  const dutyObj = reactive({
    list: [],
  })

  const getCensusDutyData = async () => {
    const res = await getCensusDuty()
    console.log(res, '===res')
    dutyObj.list = res.list || []
  }
  onMounted(() => {
    getCensusDutyData()
  })
</script>

<style lang="scss" scoped>
  .duty-box {
    padding: 19px 10px;
    display: flex;

    &__item {
      display: inline-flex;
      flex: 1;
      align-items: center;

      .duty-box__avatar {
        display: inline-block;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        margin-right: 5px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        background-color: #2a67b3;
      }

      &:first-child .duty-box__avatar {
        background-image: url('../assets/doctor1.jpg');
      }
      &:nth-child(2) .duty-box__avatar {
        background-image: url('../assets/doctor2.jpeg');
      }
      &:last-child .duty-box__avatar {
        background-image: url('../assets/doctor3.jpg');
      }
    }

    &__detail {
      color: #fff;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &-tip {
        color: rgba(255, 255, 255, 0.65);
        transform: scale(0.7);
        font-size: 12px;
        line-height: 12px;
        transform-origin: left top;
        white-space: nowrap; //让文本不换行，在同一行里面
        overflow: hidden; //让超出的范围进行隐藏
        text-overflow: ellipsis; //超出的部分用省略号表示
      }
    }
  }
</style>
