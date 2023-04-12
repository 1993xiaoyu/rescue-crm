<template>
  <div class="m-info">
    <el-popover width="200px" placement="bottom">
      <template #reference>
        <el-badge :value="3" class="item-info-pop" @click="handleClick">
          <el-icon class="bell header-icon" style="font-size: 20px"><Bell /></el-icon>
        </el-badge>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
  import type { TabsPaneContext } from 'element-plus'

  const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
  }
</script>

<style lang="scss" scoped>
  .m-info {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    margin-right: 20px;
    .item-info-pop {
      display: flex;
      align-items: center;
    }
    .bell {
      color: black;
    }
    .item-child {
      display: flex;
      align-items: center;
      font-size: 13px;
    }
  }
  ::v-deep(.el-divider--horizontal) {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .transverseMenu {
    .bell {
      color: white;
    }
  }
</style>
