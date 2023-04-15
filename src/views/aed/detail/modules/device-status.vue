<template>
  <div class="device-status">
    <div
      v-for="key in Object.keys(statusObj)"
      :key="key"
      class="device-status-item"
      :class="statusObj[key].statusText === '正常' ? 'status-normal' : 'status-error'"
    >
      <img
        :src="statusObj[key].statusText === '正常' ? normalIcon : warnIcon"
        class="status-left"
      />
      <div class="status-right">
        <div class="status-right_text" v-if="key !== 'aedLevel'">
          {{ statusObj[key].statusText }}
        </div>
        <div class="status-right_level" v-if="key === 'aedLevel'">
          <span class="status-right_level-text"> {{ levelStyle.width }}</span>
          <div class="status-right_level-reality" :style="levelStyle"></div>
        </div>
        <div class="status-right_title">{{ statusObj[key].title }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { reactive, watch, computed } from 'vue'
  import dayjs from 'dayjs'
  import normalIcon from '@/assets/image/normal.png'
  import warnIcon from '@/assets/image/warn.png'
  const props = defineProps({
    detailObj: {
      type: Object,
      default: () => {
        return {}
      },
    },
  })

  const statusObj = reactive({
    aedStatus: {
      title: '设备状态',
      statusText: '正常',
    },
    batteryStatus: {
      title: '电池状态',
      statusText: '正常',
    },
    electrodeStatus: {
      title: '电极片状态',
      statusText: '正常',
    },

    equipmentDate: {
      title: '保修状态',
      statusText: '在保',
    },
    aedLevel: {
      title: '电池电量',
      statusText: '正常',
      level: 0,
    },
  })

  const levelStyle = computed((): any => {
    const level = statusObj.aedLevel.level
    return {
      width: level + '%',
      background: level > 50 ? '#2DD2BE' : '#FFDC3F',
      color: level > 25 ? '#fff' : '#FF7E00',
    }
  })

  watch(
    () => props.detailObj,
    (value) => {
      const { aedLevel, equipmentDate, electrodeStatus, batteryStatus, aedStatus } = value
      const aedLevelList = aedLevel ? aedLevel.split('/') : []
      const aedPre =
        aedLevelList[0] && aedLevelList[1] ? (aedLevelList[0] / aedLevelList[1]) * 100 : 0

      statusObj.aedStatus.statusText = aedStatus || '正常'
      statusObj.batteryStatus.statusText = batteryStatus || '正常'
      statusObj.electrodeStatus.statusText = electrodeStatus || '正常'
      statusObj.equipmentDate.statusText =
        !dayjs(equipmentDate).isValid() || dayjs().isBefore(dayjs('equipmentDate'))
          ? '异常'
          : '正常'

      statusObj.aedLevel.statusText = aedPre > 50 ? '正常' : '异常'
      statusObj.aedLevel.level = aedPre ? parseInt(aedPre) : 0
    },
    {
      immediate: true,
      deep: true,
    },
  )
</script>
<style lang="scss" scoped>
  .device-status {
    margin-bottom: 40px;
    display: flex;
    gap: 16px;
    &-item {
      width: 188px;
      height: 86px;
      opacity: 07;
      border-radius: 14px;
      background: rgba(244, 248, 251, 0.7);
      padding: 10px 15px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      color: #707077;
      font-size: 13px;
      line-height: 13px;

      .status-left {
        width: 40px;
        height: 40px;
        background-size: contain;
        margin-right: 16px;
      }
      .status-right_text {
        color: #2dd2be;
        font-size: 22px;
        line-height: 22px;
        margin-bottom: 8px;
      }

      .status-right_level {
        width: 100px;
        position: relative;
        border-radius: 29px;
        background: #eff3f6;
        height: 20px;
        margin-bottom: 8px;
        &-reality {
          position: absolute;
          height: 100%;
          border-radius: 29px;
          left: 0;
          top: 0;
          background: #ffdc3f;
        }
        &-text {
          position: absolute;
          left: 5px;
          top: 0;
          color: #fff;
          font-size: 12px;
          line-height: 22px;
          z-index: 2;
        }
      }
    }
    .status-error {
      background: rgba(255, 247, 239, 0.6);
      .status-right_text {
        color: #f31c0d;
      }
    }
  }
</style>
