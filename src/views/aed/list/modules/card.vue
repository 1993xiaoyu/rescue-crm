<template>
  <div class="aed-census">
    <div class="aed-card">
      <div
        v-for="item in Object.keys(aedCensusObj)"
        :key="item"
        class="aed-card__item"
        :class="{ 'aed-card__item-active': activeTab === item }"
        @click="quickQuery(item)"
      >
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
<script setup lang="ts">
  import { reactive, onMounted, ref } from 'vue'
  import { aedQuantity } from '@/api/aed'
  const activeTab = ref('aedTotal')
  const emit = defineEmits(['searchList'])

  const aedCensusObj = reactive({
    aedTotal: {
      name: '总台数',
      value: 377,
      tipName: '',
      quickQueryKey: 'aedTotal',
    },
    aedNormal: {
      name: '正常台数',
      value: 263,
      tipName: '正常率',
      tipNum: '',
      quickQueryKey: 'aedNormal',
    },
    aedCheck: {
      name: '自检失败',
      value: 4,
      tipName: '失败率',
      tipNum: '',
      quickQueryKey: 'aedCheck',
    },
    aedWarn: {
      name: '故障台数',
      value: 6,
      tipName: '故障率',
      tipNum: '',
      quickQueryKey: 'aedWarn',
    },
    aedOffline: {
      name: '掉线台数',
      value: 2,
      tipName: '掉线率',
      tipNum: '',
      quickQueryKey: 'aedOffline',
    },
    batteryStatus: {
      name: '电池异常',
      value: 0,
      tipName: '故障率',
      tipNum: '',
      quickQueryKey: 'batteryStatus',
    },
    electrodeStatus: {
      name: '电极片异常',
      value: 0,
      tipName: '故障率',
      tipNum: '',
      quickQueryKey: 'electrodeStatus',
    },
    // overtimeTotal: {
    //   name: '超时巡检台数',
    //   value: 2,
    //   tipName: '超时率',
    //   tipNum: '',
    // },
  })

  const percentNum = (item) => {
    const aedTotal = aedCensusObj.aedTotal.value || ''
    return !aedTotal || !item ? '' : ((item / aedTotal) * 100).toFixed(2) + '%'
  }

  // 请求列表
  const getQuantityData = async () => {
    const res: any = await aedQuantity({})
    const { aedTotal, aedNormal, aedOffline, aedCheck, aedWarn, batteryStatus, electrodeStatus } =
      res
    aedCensusObj.aedTotal.value = aedTotal || 0
    aedCensusObj.aedNormal.tipNum = percentNum(aedNormal) || ''
    aedCensusObj.aedNormal.value = aedNormal || 0
    aedCensusObj.aedOffline.tipNum = percentNum(aedOffline) || ''
    aedCensusObj.aedOffline.value = aedOffline || 0
    aedCensusObj.aedCheck.tipNum = percentNum(aedCheck) || ''
    aedCensusObj.aedCheck.value = aedCheck || 0
    aedCensusObj.aedWarn.tipNum = percentNum(aedWarn) || ''
    aedCensusObj.aedWarn.value = aedWarn || 0
    aedCensusObj.batteryStatus.tipNum = percentNum(batteryStatus) || ''
    aedCensusObj.batteryStatus.value = batteryStatus || 0
    aedCensusObj.electrodeStatus.tipNum = percentNum(electrodeStatus) || ''
    aedCensusObj.electrodeStatus.value = electrodeStatus || 0
  }

  const quickQuery = (key) => {
    activeTab.value = key
    emit('searchList', { quickQuery: aedCensusObj[key].quickQueryKey })
    console.log(key)
  }
  onMounted(() => {
    getQuantityData()
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
      cursor: pointer;
      &-active {
        background: #7175fc;
        color: #fff;
        .aed-card__item-title,
        .aed-card__item-value,
        .aed-card__item-tip {
          color: #fff !important;
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
