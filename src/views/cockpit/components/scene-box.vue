<template>
  <div class="scene-box">
    <div class="scene-box__left">
      <img :src="sceneBg" />
    </div>
    <div class="scene-box__right">
      <img :src="centerBg" />
    </div>
    <!-- <div
            class="scene-box__right"
            id="sceneRoute"
            :style="{ width: '600px', height: '313px' }"
        ></div>-->
  </div>
</template>
<script setup>
  import { onMounted } from 'vue'
  import sceneBg from '../assets/scene-bg.jpeg'
  import centerBg from '../assets/road.jpg'
  var map = null
  const initMap = () => {
    map = new BMapGL.Map('sceneRoute')
    map.centerAndZoom(new BMapGL.Point(116.404, 39.915), 11)
    var local = new BMapGL.LocalSearch(map, {
      renderOptions: { map: map },
    })
    local.search('广东省深圳市宝安区新安街道海裕社区宝源南路201号')
    //禁止拖拽
    map.disableDragging()
    map.disableDoubleClickZoom()
    map.disablePinchToZoom()
    map.disableKeyboard()
    map.disableScrollWheelZoom()
    map.clearOverlays()
  }
  // const initMap = () => {
  //     map = new BMapGL.Map('sceneRoute');
  //     //设置地图的中心点如合肥的坐标
  //     let point = new BMapGL.Point(116.404, 39.915);
  //     var p1 = new BMapGL.Point(116.301934, 39.977552);
  //     var p2 = new BMapGL.Point(116.508328, 39.919141);

  //     var driving = new BMapGL.DrivingRoute(map, {
  //         renderOptions: { map: map, autoViewport: true },
  //     });
  //     driving.search(p1, p2);

  //     // 初始化地图，设置中心点坐标和地图级别
  //     map.centerAndZoom(point, 13);
  //     //禁止拖拽
  //     map.disableDragging();
  //     map.disableDoubleClickZoom();
  //     map.disablePinchToZoom();
  //     map.disableKeyboard();
  //     map.disableScrollWheelZoom();
  // };
  onMounted(() => {
    // initMap();
  })
</script>
<style lang="scss">
  .scene-box {
    .container-box__title {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
</style>
<style lang="scss" scoped>
  .scene-box {
    display: flex;
    .container-box__title {
      position: absolute;
      top: 0;
      left: 0;
    }
    &__left {
      img {
        width: 300px;
        height: 170px;
      }
    }
    &__right {
      img {
        width: 320px;
        height: 170px;
      }
    }
  }
</style>
