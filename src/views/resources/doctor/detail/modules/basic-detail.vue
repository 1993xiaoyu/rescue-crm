<template>
  <div class="basic-detail">
    <div v-for="item in detailList" :key="item.key" class="basic-detail__item">
      <span class="basic-detail__item-title">{{ item.title }}</span>
      <span class="basic-detail__item-val">{{ detailObj[item.key] || '--' }}</span>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    detailObj: {
      type: Object,
      default: () => {},
    },
  })

  const detailList = [
    {
      title: '姓名',
      key: 'tutorName',
    },
    {
      title: '性别',
      key: 'tutorSex',
    },
    {
      title: '医院',
      key: 'tutorHospital',
    },
    {
      title: '手机号',
      key: 'tutorPhone',
    },

    {
      title: '科室',
      key: 'tutorDepartment',
    },
    {
      title: '职称',
      key: 'tutorEducation',
    },

    {
      title: '出生日期',
      key: 'tutorBirthday',
    },
    {
      title: '家庭地址',
      key: 'tutorHomeAddress',
    },
  ]
</script>

<style lang="scss" scoped>
  .basic-detail {
    margin-top: 30px;
    &__item {
      width: 50%;
      display: inline-block;
      vertical-align: top;
      margin-bottom: 20px;

      &-title {
        color: #707077;
        width: 102px;
        display: inline-block;
      }
      &-val {
        color: #000;
      }
    }
  }
</style>
