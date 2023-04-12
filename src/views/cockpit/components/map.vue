<template>
  <div class="country-layer-map">
    <div id="map" class="map"></div>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, onMounted, PropType, watch } from 'vue'
  import { Scene } from '@antv/l7'
  import { CountryLayer } from '@antv/l7-district'
  import { Mapbox } from '@antv/l7-maps'
  import { TrendOption, Colors } from './trend-chart.vue'

  export default defineComponent({
    props: {
      trendData: {
        type: Array as PropType<TrendOption[]>,
        default: () => [],
      },
    },
    setup(props) {
      let layer: CountryLayer

      onMounted(() => {
        const computedProvinceName = computed(() => {
          const trendProvinceName = [] as string[]
          props.trendData.forEach((item) => {
            trendProvinceName.push(item.name)
          })
          return trendProvinceName
        })

        const scene = new Scene({
          id: 'map',
          map: new Mapbox({
            center: [113.918909, 22.56794],
            style: 'blank',
            zoom: 6,
            minZoom: 3,
            maxZoom: 10,
          }),
          logoVisible: false,
        })
        scene.setMapStatus({
          dragEnable: false, // 是否允许地图拖拽
          keyboardEnable: false, // 是否允许形键盘事件
          doubleClickZoom: false, // 双击放大
          zoomEnable: false, // 滚动缩放
          rotateEnable: false, // 旋转
        })
        scene.on('loaded', () => {
          layer = new CountryLayer(scene, {
            data: props.trendData,
            joinBy: ['NAME_CHN', 'name'],
            depth: 1,
            provinceStroke: '#fff',
            cityStroke: '#EBCCB4',
            cityStrokeWidth: 5,
            label: {
              size: 13,
              spacing: 8,
              opacity: 1,
            },
            fill: {
              color: {
                field: 'NAME_CHN',
                values: (name: string) => {
                  if (
                    name === computedProvinceName.value[0] ||
                    name === computedProvinceName.value[1]
                  ) {
                    return Colors[0]
                  }
                  if (
                    name === computedProvinceName.value[2] ||
                    name === computedProvinceName.value[3]
                  ) {
                    return Colors[1]
                  }
                  if (
                    name === computedProvinceName.value[4] ||
                    name === computedProvinceName.value[5]
                  ) {
                    return Colors[2]
                  }
                  if (
                    name === computedProvinceName.value[6] ||
                    name === computedProvinceName.value[7]
                  ) {
                    return Colors[3]
                  }
                  if (
                    name === computedProvinceName.value[8] ||
                    name === computedProvinceName.value[9]
                  ) {
                    return Colors[4]
                  }
                  return '#013954'
                  // return '#001D70';
                },
              },
            },
            autoFit: false,
            popup: {
              enable: true,
              Html: (item) => {
                if (item.dailySales) {
                  return `<span>${item.NAME_CHN}:</span><span>${item.dailySales}</span>`
                }
                return `<span>${item.NAME_CHN}</span>`
              },
            },
          })
          // if (layer) {
          //     layer.on('mouseenter', e => {
          //         const { lngLat } = e;
          //         const { feature } = e;

          //         const html = `<p>\u7701\u4EFD\uFF1A${feature.properties.NAME_CHN}</p>\n
          //               <p>\u5730\u533A\uFF1A${feature.properties?.dailySales}</p>\n`;

          //         const popup = new Popup().setLnglat([lngLat.lng, lngLat.lat]).setHTML(html);
          //         scene.addPopup(popup);
          //     });
          // }
        })
        watch(
          () => props.trendData,
          (value) => {
            if (layer) {
              setTimeout(() => {
                layer.updateData(value)
              }, 500)
            }
          },
        )
      })
      return {
        Colors,
      }
    },
  })
</script>
<style lang="scss">
  .country-layer-map {
    position: relative;
    width: 100%;
    height: 100%;

    .map {
      position: absolute;
      width: 100%;
      height: 100%;
    }

    .rank-list {
      position: absolute;
      right: 0;
      bottom: 16%;
    }
  }
</style>
