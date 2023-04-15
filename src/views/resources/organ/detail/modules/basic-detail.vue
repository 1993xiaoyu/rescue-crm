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
      title: '机构名称',
      key: 'mechanismName',
    },
    {
      title: '机构状态',
      key: 'stauts',
    },
    {
      title: '机构性质',
      key: 'management',
    },
    {
      title: '机构类别',
      key: 'organizationType',
    },
    {
      title: '机构地址',
      key: 'mechanismAdress',
    },

    {
      title: '机构电话',
      key: 'phone',
    },
    {
      title: '发证机关',
      key: 'sendCard',
    },
    {
      title: '唯一标识',
      key: 'identificationCode',
    },
    {
      title: '法人姓名',
      key: 'legalName',
    },
    {
      title: '法人证件号',
      key: 'legalIccid',
    },
    {
      title: '负责人姓名',
      key: 'chargeName',
    },
    {
      title: '负责人证件号',
      key: 'chargeIccid',
    },
    {
      title: '负责人电话',
      key: 'chargePhone',
    },

    {
      title: '有效期开始',
      key: 'startTime',
    },

    {
      title: '有效期结束',
      key: 'endTime',
    },
    {
      title: '开业日期',
      key: 'openDate',
    },
    {
      title: '下一校验日期',
      key: 'calibrationDate',
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
