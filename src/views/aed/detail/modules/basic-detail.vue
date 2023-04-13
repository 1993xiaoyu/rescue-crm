<template>
  <div class="basic-detail">
    <div v-for="item in detailList" :key="item.key" class="basic-detail__item">
      <span class="basic-detail__item-title">{{ item.title }}</span>
      <span class="basic-detail__item-val">{{ detailObj[item.key] || '--' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    detailObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
  })

  const detailList = [
    {
      title: '设备序列号',
      key: 'aedNumber',
    },
    {
      title: 'AED柜号',
      key: 'aedNo',
    },
    {
      title: '品牌',
      key: 'equipmentBrand',
    },
    {
      title: '使用次数',
      key: 'tutorHospital',
    },
    {
      title: '安装时间',
      key: 'installationTime',
    },

    {
      title: '安装厂商',
      key: 'tutorDepartment',
    },
    {
      title: '安装地址',
      key: 'aedPosition',
    },
    {
      title: '安装位置',
      key: 'tutorHomeAddress',
    },
    {
      title: '资金来源',
      key: 'capitalSource',
    },
    {
      title: '设备管理员',
      key: 'administrators',
    },
    {
      title: '管理员手机号',
      key: 'administratorsPhone',
    },
    {
      title: '管理单位座机',
      key: 'administratorsLandline',
    },
    {
      title: '保修期至',
      key: 'tutorBirthday',
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
