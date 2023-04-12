<template>
  <div class="full-box" v-loading.fullscreen.lock="fullscreenLoading">
    <div
      class="cockpit-box"
      :style="{
        transform: `scale(${scaleValue})`,
      }"
    >
      <div class="center-box">
        <div class="center-box__title">5分钟急救圈信息驾驶舱平台</div>
      </div>
      <div class="cockpit-detail">
        <div class="ssv-box" v-if="userInfoRef.username">
          <SSV @handleTokenInfo="handleTokenInfo" />
        </div>
        <ContainerBox class="box1" title="志愿者统计">
          <VoluteerBox ref="voluteerBoxRef" />
        </ContainerBox>

        <ContainerBox class="box2" title="今日值班人员">
          <DutyBox />
        </ContainerBox>

        <ContainerBox class="box3" title="急救导师-急救专家">
          <DoctorBox />
        </ContainerBox>

        <ContainerBox class="box4" title="AED盘点">
          <AedBox ref="aedBoxRef" />
        </ContainerBox>

        <ContainerBox class="box5" title="响应系统状态">
          <WorkBox ref="workBoxRef" />
        </ContainerBox>

        <ContainerBox class="box6" title="响应异常清单">
          <AbnormalBox ref="abnormalBoxRef" />
        </ContainerBox>
        <ContainerBox title="实时救援监控" class="map-box box7">
          <!-- <DataDivisionBox /> -->
          <MigrationCharts height="100%" width="100%" id="migration" />
        </ContainerBox>

        <ContainerBox class="box8" title="待响应事件">
          <RespondBox ref="respondBoxRef" />
        </ContainerBox>

        <ContainerBox title="紧急救援现场" class="scene-box box9">
          <SceneBox />
        </ContainerBox>

        <ContainerBox class="box10" title="响应时间统计">
          <ResponseTimeBox />
        </ContainerBox>

        <ContainerBox class="box11" title="累计疾病分类">
          <DiseaseBox />
        </ContainerBox>

        <ContainerBox class="box12" title="预警信息">
          <WaringBox ref="waringBoxRef" />
        </ContainerBox>
      </div>

      <div class="test-text">测试版</div>
    </div>
  </div>
</template>
<script setup>
  import { ref, onBeforeUnmount, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getQueryObject } from '@/utils/index.ts'

  import SSV from './components/ssv.vue'
  import ContainerBox from './components/container-box.vue'
  import VoluteerBox from './components/volunteer-box.vue'
  import DutyBox from './components/duty-box.vue'
  import DoctorBox from './components/doctor-box.vue'
  import AedBox from './components/aed-box.vue'
  import WorkBox from './components/work-box.vue'
  import AbnormalBox from './components/abnormal-box.vue'
  import RespondBox from './components/respond-box.vue'

  import SceneBox from './components/scene-box.vue'
  import WaringBox from './components/waring-box.vue'

  import ResponseTimeBox from './components/response-time-box.vue'
  import DiseaseBox from './components/disease-box.vue'
  import MigrationCharts from '@/components/DataScreen/migrationEcharts/index.vue'
  // import DataDivisionBox from './components/data-division-box.vue'
  // import MapData from './components/map.vue'

  const router = useRouter()

  const voluteerBoxRef = ref()
  const aedBoxRef = ref()
  const workBoxRef = ref()
  const abnormalBoxRef = ref()
  const respondBoxRef = ref()

  const tokenInfo = ref({})
  const INIT_CLIENT_WIDTH = 1920
  const scaleValue = ref(1)
  const computedScaleValue = () => {
    scaleValue.value = document.documentElement.clientWidth / INIT_CLIENT_WIDTH
  }
  const TenantUserInfo = localStorage.getItem('TenantUserInfo')
  const userInfo = TenantUserInfo ? JSON.parse(TenantUserInfo) : {}
  const userInfoRef = ref({ ...userInfo })
  const fullscreenLoading = ref(false)

  const componentInit = () => {
    const commonParams = {
      access_token: tokenInfo.value.access_token || '',
      expires_in: tokenInfo.value.expires_in || '',
      refresh_token: tokenInfo.value.refresh_token || '',
      uid: tokenInfo.value.uid || '',
      tenant_id: tokenInfo.value.tenantId,
      platform: tokenInfo.value.platform,
      active: getQueryObject().env || 'test',
    }

    voluteerBoxRef.value?.init(commonParams)
    aedBoxRef.value?.init(commonParams)
    abnormalBoxRef.value?.init(commonParams)
    respondBoxRef.value?.init(commonParams)
  }

  let initTimer = null

  const handleTokenInfo = (data) => {
    tokenInfo.value = data

    fullscreenLoading.value = false
    componentInit()
    if (!initTimer) {
      initTimer = setInterval(() => {
        componentInit()
      }, 10000)
    }
  }

  window.addEventListener('resize', computedScaleValue)

  onMounted(() => {
    fullscreenLoading.value = true
    computedScaleValue()
    if (!userInfoRef.value.username) {
      router.push({ name: 'login' })
    }
  })

  onBeforeUnmount(() => {
    if (initTimer) {
      clearInterval(initTimer)
      initTimer = null
    }
    window.removeEventListener('resize', computedScaleValue)
  })
</script>

<style lang="scss">
  .cockpit-box {
    .anchorBL {
      display: none;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
      background-color: #080f22;
    }
    .el-table__empty-block {
      background-color: #080f22;
    }
  }
</style>
<style lang="scss" scoped>
  .full-box {
    width: 100%;
    height: 100%;
    background: linear-gradient(
      rgba(8, 15, 34, 1) 0%,
      rgba(11, 18, 39, 1) 27.286%,
      rgba(10, 17, 37, 1) 100%
    );
    user-select: none;
  }
  .cockpit-box {
    width: 1920px;
    height: 670px;
    overflow: auto;
    transform-origin: left top;
    box-sizing: border-box;

    .center-box {
      position: absolute;
      top: 0;
      left: 470px;
      width: 980px;
      height: 540px;
      background: url(./assets/center-bg.png);
      background-repeat: no-repeat;
      background-size: cover;
      &__title {
        font-size: 18px;
        line-height: 18px;
        color: #fff;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .cockpit-detail {
      position: absolute;
      width: 1920px;
      height: 540px;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
    }
  }
  .box1 {
    width: 295px;
    height: 220px;
    left: 10px;
  }

  .box2 {
    width: 295px;
    height: 91px;
    left: 315px;
  }

  .box3 {
    width: 295px;
    height: 120px;
    top: 100px;
    left: 315px;
  }

  .box4 {
    width: 600px;
    height: 92px;
    top: 232px;
    left: 10px;
  }

  .box5 {
    width: 295px;
    height: 256px;
    top: 340px;
    left: 10px;
    background-color: rgba(10, 17, 37, 1);
  }

  .box6 {
    width: 295px;
    height: 256px;
    top: 340px;
    left: 315px;
    background-color: rgba(10, 17, 37, 1);
  }

  .box7 {
    width: 680px;
    height: 323px;
    // top: 120px;
    left: 620px;
  }

  .box8 {
    width: 680px;
    height: 256px;
    top: 340px;
    left: 620px;
    background-color: rgba(10, 17, 37, 1);
  }

  .box9 {
    width: 602px;
    height: 156px;
    // top: 120px;
    left: 1310px;
  }

  .box10 {
    width: 295px;
    height: 156px;
    top: 167px;
    left: 1310px;
  }

  .box11 {
    width: 295px;
    height: 156px;
    top: 167px;
    left: 1615px;
    background-color: rgba(10, 17, 37, 1);
  }

  .box12 {
    width: 602px;
    height: 256px;
    top: 340px;
    left: 1310px;
  }
  .test-text {
    position: fixed;
    left: 200px;
    font-size: 30px;
    color: red;
  }
  .ssv-box {
    position: fixed;
    z-index: 22;
  }
</style>
