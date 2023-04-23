<style>
.map-content {
  background: whitesmoke;
  border: 1px solid rgba(223, 226, 235, 0.8);
  width: 100%;
  height: 100%;
}

.esriPopupHidden {
  display: none;
}
</style>
<template>
  <div class="map-content" :id="mapId" style="position: relative;border-radius: 0.1rem;"></div>
</template>

<script>
/*
 * 天地图服务
 * 参考地址：https://github.com/zhengjieWeb0520/react-arcgis
 */

import * as esriLoader from "esri-loader";
import {
  tdt_vec_c,
  tdt_cva_c,
} from "./js/config";

export default {
  name: "GisTdtMap",
  components: {},
  props: {
    mapId: {
      type: String,
      default: "mapbox"
    }
  },
  data() {
    return {
      currentscale: {}
    };
  },
  methods: {
    //加载地图
    createMap() {
      var _this = this;

      const options = {
        url: "https://js.arcgis.com/4.7/", // 需使用的arcgis api版本地址
        css: true
      };

      esriLoader
        .loadModules(
          [
            "esri/Map",
            "esri/config",
            "esri/views/MapView",
            "esri/views/SceneView",
            "esri/geometry/Extent",
            "esri/geometry/SpatialReference",
            "esri/geometry/Point",
            "esri/layers/TileLayer",
            "esri/layers/WebTileLayer",
            "esri/layers/support/TileInfo",
            "dojo/domReady!"
          ],
          options
        )
        .then(
          ([
            Map,
            esriConfig,
            MapView,
            SceneView,
            Extent,
            SpatialReference,
            Point,
            TileLayer,
            WebTileLayer,
            TileInfo,
          ]) => {
            /**
             * 实例化坐标系
             * 创建地图，不设置底图，如果设置底图会造成坐标系无法被转换成 ESPG:4326 (WGS1984)
             * 高版本好像不用那么麻烦了：直接就能用（4.15）：
             */
            let spatialReference = new SpatialReference({ wkid: 4326 });
            //实例化初始定位
            var cityCenter = new Point(118.1, 32.8, spatialReference);
            //实例化初始范围
            let extent = new Extent(95.56, 36.28, 125.65, 45.33, spatialReference);

            // 设定瓦片信息，天地图经纬度地图的切片信息全部使用该信息设定
            let tileInfo = new TileInfo({
              dpi: 90.71428571427429,
              rows: 256,
              cols: 256,
              compressionQuality: 0,
              origin: {
                x: -180,
                y: 90
              },
              spatialReference: {
                wkid: 4326
              },
              lods: [
                {
                  level: 2,
                  levelValue: 2,
                  resolution: 0.3515625,
                  scale: 147748796.52937502
                },
                {
                  level: 3,
                  levelValue: 3,
                  resolution: 0.17578125,
                  scale: 73874398.264687508
                },
                {
                  level: 4,
                  levelValue: 4,
                  resolution: 0.087890625,
                  scale: 36937199.132343754
                },
                {
                  level: 5,
                  levelValue: 5,
                  resolution: 0.0439453125,
                  scale: 18468599.566171877
                },
                {
                  level: 6,
                  levelValue: 6,
                  resolution: 0.02197265625,
                  scale: 9234299.7830859385
                },
                {
                  level: 7,
                  levelValue: 7,
                  resolution: 0.010986328125,
                  scale: 4617149.8915429693
                },
                {
                  level: 8,
                  levelValue: 8,
                  resolution: 0.0054931640625,
                  scale: 2308574.9457714846
                },
                {
                  level: 9,
                  levelValue: 9,
                  resolution: 0.00274658203125,
                  scale: 1154287.4728857423
                },
                {
                  level: 10,
                  levelValue: 10,
                  resolution: 0.001373291015625,
                  scale: 577143.73644287116
                },
                {
                  level: 11,
                  levelValue: 11,
                  resolution: 0.0006866455078125,
                  scale: 288571.86822143558
                },
                {
                  level: 12,
                  levelValue: 12,
                  resolution: 0.00034332275390625,
                  scale: 144285.93411071779
                },
                {
                  level: 13,
                  levelValue: 13,
                  resolution: 0.000171661376953125,
                  scale: 72142.967055358895
                },
                {
                  level: 14,
                  levelValue: 14,
                  resolution: 8.58306884765625e-5,
                  scale: 36071.483527679447
                },
                {
                  level: 15,
                  levelValue: 15,
                  resolution: 4.291534423828125e-5,
                  scale: 18035.741763839724
                },
                {
                  level: 16,
                  levelValue: 16,
                  resolution: 2.1457672119140625e-5,
                  scale: 9017.8708819198619
                },
                {
                  level: 17,
                  levelValue: 17,
                  resolution: 1.0728836059570313e-5,
                  scale: 4508.9354409599309
                },
                {
                  level: 18,
                  levelValue: 18,
                  resolution: 5.3644180297851563e-6,
                  scale: 2254.4677204799655
                },
                {
                  level: 19,
                  levelValue: 19,
                  resolution: 2.68220901489257815e-6,
                  scale: 1127.23386023998275
                },
                {
                  level: 20,
                  levelValue: 20,
                  resolution: 1.341104507446289075e-6,
                  scale: 563.616930119991375
                }
              ]
            });
            //矢量底图
            let tdt_vec_c_layer = new WebTileLayer({
              id: "tdt_vec_c",
              title: "天地图矢量底图",
              urlTemplate: tdt_vec_c,
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              tileInfo: tileInfo,
              spatialReference: spatialReference
            });
            //矢量注记
            let tdt_cva_c_layer = new WebTileLayer({
              id: "tdt_cva_c",
              title: "天地图矢量注记",
              urlTemplate: tdt_cva_c,
              subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
              tileInfo: tileInfo,
              spatialReference: spatialReference
            });

            //实例化Map对象    Map 用来管理地图中的所有图层，可以进行添加图层、移除图层等操作。
            let mapControl = new Map({
              //spatialReference:spatialReference,
              basemap: {
                baseLayers: [tdt_vec_c_layer, tdt_cva_c_layer]
              }
            });
            //实例化一个 MapView 对象 (用于显示二维地图)
            let mapView = new MapView({
              map: mapControl,
              container: _this.mapId,  //页面中用于显示二维地图div元素的ID
              // center: cityCenter, // 设置中心点
              extent: extent,
              zoom: 8,   //设置初始显示层级
              ui: {
                components: ["zoom", "compass"]
              }
            });

            mapControl.on("zoom-end", function (event) {
              console.log(event)
              event.scale = scaleUtils.getScale(mapControl)
            });


            mapView.on("pointer-move", (event) => {
              let point = mapView.toMap({ x: event.x, y: event.y });
              //保留三位小数
              let lon = Math.round(point.x * 1000) / 1000;
              let lat = Math.round(point.y * 1000) / 1000;
              console.log(event);
            });

            mapView.on("click", (event) => {
              //保留六位小数
              let lat = Math.round(event.mapPoint.latitude * 1000000) / 1000000;
              let lon = Math.round(event.mapPoint.longitude * 1000000) / 1000000;
              // console.log(lon + " " + lat);
            });

          }
        );
    }
  },
  mounted() {
    let _this = this;

    _this.createMap();
  },
  beforeDestroy() { }
};
</script>
