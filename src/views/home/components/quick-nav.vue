<template>
  <div class="quick-nav">
    <div class="title">快捷导航</div>
    <div class="content">
      <div v-for="item in quickNavData.list" class="content-item" @click="goItem(item)">
        <img :src="item.icon" class="left-sidebar-item-icon" />
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import RescueCheckedIcon from '@/assets/image/icon/rescue-checked.png'
  import StaffCheckedIcon from '@/assets/image/icon/staff-checked.png'
  import AedCheckedIcon from '@/assets/image/icon/aed-checked.png'
  import PowerCheckedIcon from '@/assets/image/icon/power-checked.png'
  const router = useRouter()

  const quickNavData = reactive({
    list: [
      {
        icon: RescueCheckedIcon,
        title: '救援中心',
        name: 'commandList',
      },
      {
        icon: AedCheckedIcon,
        title: 'AED设备管理',
        name: 'aedList',
      },

      {
        icon: StaffCheckedIcon,
        title: '志愿者管理',
        name: 'volunteerList',
      },
      {
        icon: StaffCheckedIcon,
        title: '一线人员管理',
        name: 'doctorList',
      },
      {
        icon: PowerCheckedIcon,
        title: '预警中心',
        name: 'warningList',
      },
    ],
  })
  const goItem = (item) => {
    router.push({
      name: item.name,
    })
  }
</script>

<style lang="scss" scoped>
  .quick-nav {
    border-radius: 14px;
    background: #ffffff;
    width: 600px;
    box-sizing: border-box;
    padding: 20px;

    .title {
      position: relative;
      color: #333333;
      font-size: 16px;
      line-height: 16px;
      padding-bottom: 24px;
      &::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 10px;
        background: #6975f8;
        border-radius: 0 5px 5px 0;
        left: -20px;
        top: 3px;
      }
    }
    .content {
      display: flex;
      &-item {
        justify-content: space-between;
        width: 20%;
        text-align: center;
        cursor: pointer;
        img {
          margin-bottom: 20px;
        }
      }
    }
  }
</style>
