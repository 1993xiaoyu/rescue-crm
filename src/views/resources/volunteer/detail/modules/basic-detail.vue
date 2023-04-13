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
      title: '学员编号',
      key: 'classNo',
    },
    {
      title: '姓名',
      key: 'volunteerName',
    },
    {
      title: '性别',
      key: 'volunteerSex',
    },
    {
      title: '职业',
      key: 'volunteerOccupation',
    },
    {
      title: '学历',
      key: 'volunteerEducation',
    },
    {
      title: '手机号',
      key: 'volunteerPhone',
    },
    {
      title: '所在街道',
      key: 'trainAddress',
    },
    {
      title: '家庭住址',
      key: 'volunteerHomeAddress',
    },
    {
      title: '公司名称',
      key: 'volunteerCompanyName',
    },
    {
      title: '公司地址',
      key: 'volunteerCompanyAddress',
    },
    {
      title: '身份证号',
      key: 'volunteerIdiccid',
    },
    {
      title: '班级编号',
      key: 'classNo',
    },
    {
      title: '培训医院',
      key: 'trainHospital',
    },
    {
      title: '培训地点',
      key: 'trainAddress',
    },
    {
      title: '培训日期',
      key: 'trainDate',
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
      font-size: 14px;

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
