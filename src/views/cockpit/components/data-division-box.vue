<template>
  <div class="division-box">
    <div class="division-num">
      <div class="division-num__item">
        <div class="division-num__item-title">月累计量(次)</div>
        <div class="division-num__item-num">5247</div>
      </div>
      <div class="division-num__item">
        <div class="division-num__item-title">年累计量(次)</div>
        <div class="division-num__item-num">68,214</div>
      </div>
    </div>
  </div>
  <div class="map-box" id="mapBox" :style="{ width: '680px', height: '330px' }"></div>
</template>

<script setup>
  import { onMounted } from 'vue'

  var map = null

  const initMap = () => {
    map = new BMapGL.Map('mapBox', {
      backgroundColor: [0, 0, 0, 0],
    })
    var point = new BMapGL.Point(113.918909, 22.56794)

    map.centerAndZoom(point, 14)

    //创建地址解析器实例
    var myGeo = new BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      '广州省宝安区人民医院',
      function (point) {
        if (point) {
          map.centerAndZoom(point, 14)
          map.addOverlay(new BMapGL.Marker(point, { title: '广州省宝安区人民医院' }))
        } else {
          alert('您选择的地址没有解析到结果！')
        }
      },
      '广州省',
    )
    //禁止拖拽
    map.disableDragging()
    map.disableDoubleClickZoom()
    map.disablePinchToZoom()
    map.disableKeyboard()
    map.disableScrollWheelZoom()
    //  map.setTilt(50);

    // getBoundary();
  }

  const initMapNew = () => {
    var map = new BMapGL.Map('mapBox')

    map.disableDragging()
    map.disableDoubleClickZoom()
    map.disablePinchToZoom()
    map.disableKeyboard()
    map.disableScrollWheelZoom()

    var myGeo = new BMapGL.Geocoder()
    // 将地址解析结果显示在地图上，并调整地图视野
    myGeo.getPoint(
      '广州省宝安区人民医院',
      function (point) {
        if (point) {
          map.centerAndZoom(point, 13)
          map.addOverlay(new BMapGL.Marker(point, { title: '广州省宝安区人民医院' }))
        } else {
          alert('您选择的地址没有解析到结果！')
        }
      },
      '广州省',
    )

    var bd = new BMapGL.Boundary()
    bd.get('广州省宝安区人民医院', function (rs) {
      var count = rs.boundaries.length //行政区域的点有多少个
      for (var i = 0; i < count; i++) {
        var path = []
        str = rs.boundaries[i].replace(' ', '')
        points = str.split(';')
        for (var j = 0; j < points.length; j++) {
          var lng = points[j].split(',')[0]
          var lat = points[j].split(',')[1]
          path.push(new BMapGL.Point(lng, lat))
        }
        var prism = new BMapGL.Prism(path, 5000, {
          topFillColor: '#5679ea',
          topFillOpacity: 0.5,
          sideFillColor: '#5679ea',
          sideFillOpacity: 0.9,
        })
        map.addOverlay(prism)
      }
    })
    var styleJson = [
      {
        featureType: 'land',
        elementType: 'geometry',
        stylers: {
          color: '#080f22',
        },
      },
      {
        featureType: 'manmade',
        elementType: 'geometry',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'road',
        elementType: 'geometry.fill',
        stylers: {
          color: '#9e7d60ff',
          visibility: 'off',
        },
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#554631ff',
          visibility: 'off',
        },
      },
      {
        featureType: 'districtlabel',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#d69563ff',
          visibility: 'off',
        },
      },
      {
        featureType: 'districtlabel',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#17263cff',
          weight: 3,
          visibility: 'off',
        },
      },
      {
        featureType: 'poilabel',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#d69563ff',
        },
      },
      {
        featureType: 'poilabel',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#17263cff',
          weight: 3,
        },
      },
      {
        featureType: 'subway',
        elementType: 'geometry',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'railway',
        elementType: 'geometry',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'poilabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'subwaylabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'subwaylabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'tertiarywaysign',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'tertiarywaysign',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'provincialwaysign',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'provincialwaysign',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'nationalwaysign',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'nationalwaysign',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'highwaysign',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'highwaysign',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'green',
        elementType: 'geometry',
        stylers: {
          color: '#263b3eff',
        },
      },
      {
        featureType: 'nationalwaysign',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#d0021bff',
        },
      },
      {
        featureType: 'nationalwaysign',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#ffffffff',
        },
      },
      {
        featureType: 'city',
        elementType: 'labels',
        stylers: {
          visibility: 'on',
        },
      },
      {
        featureType: 'city',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'city',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#d69563ff',
        },
      },
      {
        featureType: 'city',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#17263cff',
        },
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#d69563ff',
        },
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#080f22',
        },
      },
      {
        featureType: 'local',
        elementType: 'geometry.fill',
        stylers: {
          color: '#38414eff',
        },
      },
      {
        featureType: 'local',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#ffffff00',
        },
      },
      {
        featureType: 'fourlevelway',
        elementType: 'geometry.fill',
        stylers: {
          color: '#38414eff',
        },
      },
      {
        featureType: 'fourlevelway',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#ffffff00',
        },
      },
      {
        featureType: 'tertiaryway',
        elementType: 'geometry.fill',
        stylers: {
          color: '#38414eff',
        },
      },
      {
        featureType: 'tertiaryway',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#ffffff00',
        },
      },
      {
        featureType: 'tertiaryway',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#759879ff',
        },
      },
      {
        featureType: 'fourlevelway',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#759879ff',
        },
      },
      {
        featureType: 'highway',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#759879ff',
        },
      },
      {
        featureType: 'highway',
        elementType: 'geometry.fill',
        stylers: {
          color: '#9e7d60ff',
        },
      },
      {
        featureType: 'highway',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#554631ff',
        },
      },
      {
        featureType: 'provincialway',
        elementType: 'geometry.fill',
        stylers: {
          color: '#9e7d60ff',
        },
      },
      {
        featureType: 'provincialway',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#554631ff',
        },
      },
      {
        featureType: 'tertiaryway',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#1a2e1cff',
        },
      },
      {
        featureType: 'fourlevelway',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#1a2e1cff',
        },
      },
      {
        featureType: 'highway',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#1a2e1cff',
        },
      },
      {
        featureType: 'nationalway',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#1a2e1cff',
        },
      },
      {
        featureType: 'nationalway',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#759879ff',
        },
      },
      {
        featureType: 'nationalway',
        elementType: 'geometry.fill',
        stylers: {
          color: '#9e7d60ff',
        },
      },
      {
        featureType: 'nationalway',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#554631ff',
        },
      },
      {
        featureType: 'cityhighway',
        elementType: 'geometry.fill',
        stylers: {
          color: '#9e7d60ff',
        },
      },
      {
        featureType: 'cityhighway',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#554631ff',
        },
      },
      {
        featureType: 'arterial',
        elementType: 'geometry.fill',
        stylers: {
          color: '#9e7d60ff',
        },
      },
      {
        featureType: 'arterial',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#554631fa',
        },
      },
      {
        featureType: 'medicallabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'medicallabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'entertainmentlabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'entertainmentlabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'estatelabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'estatelabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'businesstowerlabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'businesstowerlabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'companylabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'companylabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'governmentlabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'governmentlabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'restaurantlabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'restaurantlabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'hotellabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'hotellabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'shoppinglabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'shoppinglabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'lifeservicelabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'lifeservicelabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'carservicelabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'carservicelabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'financelabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'financelabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'otherlabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'otherlabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },

      {
        featureType: 'building',
        elementType: 'geometry.topfill',
        stylers: {
          color: '#2a3341ff',
        },
      },
      {
        featureType: 'building',
        elementType: 'geometry.sidefill',
        stylers: {
          color: '#313b4cff',
        },
      },
      {
        featureType: 'building',
        elementType: 'geometry.stroke',
        stylers: {
          color: '#1a212eff',
        },
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#759879ff',
        },
      },
      {
        featureType: 'road',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#1a2e1cff',
        },
      },
      {
        featureType: 'provincialway',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#759879ff',
        },
      },
      {
        featureType: 'cityhighway',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#759879ff',
        },
      },
      {
        featureType: 'arterial',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#759879ff',
        },
      },
      {
        featureType: 'provincialway',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#1a2e1cff',
        },
      },
      {
        featureType: 'cityhighway',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#1a2e1cff',
        },
      },
      {
        featureType: 'arterial',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#1a2e1cff',
        },
      },
      {
        featureType: 'local',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'manmade',
        elementType: 'labels.text.fill',
        stylers: {
          color: '#d69563ff',
        },
      },
      {
        featureType: 'manmade',
        elementType: 'labels.text.stroke',
        stylers: {
          color: '#17263cff',
        },
      },
      {
        featureType: 'subwaystation',
        elementType: 'geometry',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'transportationlabel',
        elementType: 'labels.icon',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'transportationlabel',
        elementType: 'labels',
        stylers: {
          visibility: 'off',
        },
      },
      {
        featureType: 'estate',
        elementType: 'geometry',
        stylers: {
          color: '#2a3341ff',
        },
      },
    ]
    map.setMapStyleV2({ styleJson: styleJson })
  }
  // const getBoundary = () => {
  //     var bdary = new BMapGL.Boundary();
  //     bdary.get('广州省宝安区', function (rs) {
  //         for (var i = 0; i < rs.boundaries.length; i++) {
  //             var xyArr = rs.boundaries[i].split(';');
  //             var ptArr = [];

  //             for (var j = 0; j < xyArr.length; j++) {
  //                 var tmp = xyArr[j].split(',');
  //                 var pt = new BMapGL.Point(tmp[0], tmp[1]);
  //                 ptArr.push(pt);
  //             }

  //             var mapmask = new BMapGL.MapMask(ptArr, {
  //                 isBuildingMask: true,
  //                 isPoiMask: true,
  //                 isMapMask: true,
  //                 showRegion: 'inside',
  //             });

  //             map.addOverlay(mapmask);

  //             var prism = new BMapGL.Prism(ptArr, 10000, {
  //                 topFillColor: '#5679ea',
  //                 topFillOpacity: 0.7,
  //                 sideFillColor: '#5679ea',
  //                 sideFillOpacity: 1,
  //             });
  //             map.addOverlay(prism);
  //         }
  //         // getRegion();
  //     });
  // };

  // var dataArr = [
  //     {
  //         name: '安顺',
  //         cp: [105.9082, 25.9882],
  //         fillColor: '#002E65',
  //     },
  //     {
  //         name: '贵阳',
  //         cp: [106.6992, 26.7682],
  //         fillColor: '#003A7F',
  //     },
  //     {
  //         name: '遵义',
  //         cp: [106.908, 28.1744],
  //         fillColor: '#0051AF',
  //     },
  //     {
  //         name: '黔东南苗族侗族自治州',
  //         cp: [108.519944, 26.835886],
  //         fillColor: '#006BE9',
  //     },
  //     {
  //         name: '毕节市',
  //         cp: [105.1611, 27.0648],
  //         fillColor: '#1C94EB',
  //     },
  //     {
  //         name: '黔南布依族苗族自治州',
  //         cp: [107.235181, 25.705737],
  //         fillColor: '#61B3FF',
  //     },
  //     {
  //         name: '黔西南布依族苗族自治州',
  //         cp: [105.5347, 25.3949],
  //     },
  //     {
  //         name: '六盘水',
  //         cp: [104.7546, 26.0925],
  //     },
  //     {
  //         name: '铜仁市',
  //         cp: [108.6218, 28.0096],
  //     },
  // ];

  // const getRegion = () => {
  //     dataArr.forEach((element) => {
  //         var bdary = new BMapGL.Boundary();
  //         bdary.get(element['name'], (rs) => {
  //             var count = rs.boundaries.length;
  //             for (let i = 0; i < count; i++) {
  //                 var ply = new BMapGL.Polygon(rs.boundaries[i], {
  //                     strokeWeight: 0.5,
  //                     strokeColor: '#fff',
  //                     fillOpacity: 0.6,
  //                     fillColor: element['fillColor'] || '#006BE9',
  //                 });
  //                 map.addOverlay(ply);
  //             }
  //             // citySetLabel(
  //             //     new BMapGL.Point(element['cp'][0], element['cp'][1]),
  //             //     element['name']
  //             // );
  //         });
  //     });
  // };

  // const citySetLabel = (cityCenter, cityName) => {
  //     var label = new BMapGL.Label(cityName, {
  //         offset: new BMapGL.Size(-20, -10),
  //         position: cityCenter,
  //     });
  //     label.setStyle({
  //         border: 'none',
  //         background: 'transparent',
  //         'font-size': '0.25rem',
  //         color: '#fff',
  //     });
  //     map.addOverlay(label);
  // };

  onMounted(() => {
    initMapNew()
  })
</script>
<style lang="scss">
  .map-box {
    .container-box__title {
      position: absolute;
      top: 0;
      left: 0;
    }
    background-image: none !important;
  }
</style>

<style lang="scss" scoped>
  .division-box {
    .division-num {
      position: absolute;
      top: 32px;
      left: 12px;
      z-index: 100;

      &__item {
        width: 92px;
        height: 45px;
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 7px;
        line-height: 7px;
        color: #fff;
        font-weight: 400;
        background: linear-gradient(rgba(42, 225, 181, 1) 0%, rgba(12, 180, 235, 1) 100%);
        margin-right: 10px;
        border-radius: 4px;
        &:nth-child(2) {
          background: linear-gradient(rgba(249, 198, 97, 1) 0%, rgba(253, 135, 134, 1) 100%);
        }

        &-title {
          font-size: 12px;
          line-height: 12px;
          transform: scale(0.7);
          transform-origin: center;
          &::before {
            content: '';
            display: inline-block;
            width: 15px;
            height: 10px;
            background: url('../assets/vector.png');
            background-repeat: no-repeat;
            background-size: contain;
            margin-right: 3px;
            margin-left: 3px;
          }
        }
        &-num {
          font-size: 14px;
          line-height: 14px;
          margin-top: 5px;
          font-weight: 700;
        }
      }
    }
  }
  #mapBox {
    position: absolute;
    top: 31px;
    left: 1px;
  }
</style>
