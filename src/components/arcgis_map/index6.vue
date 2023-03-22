<style>
.GisServerMap {
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
  <div class="GisServerMap" style="border-radius: 0.1rem;">
    <div id="mapDiv2D" style="width: 50%;height: 100%;float: left" />
    <div id="mapDiv3D" style="width: 50%;height: 100%;float: left" />
  </div>
</template>

<script>
/*
 * 高德地图服务
 */

import * as esriLoader from "esri-loader";
import {
  onlineAMapDigitalURL,
  onlineAMapSatelliteURL,
  onlineAMapAnooMarkerURL
} from "./js/config";

export default {
  name: "GisServerMap",
  components: {},
  data() {
    return {
      currentscale: {}
    };
  },
  methods: {
    //加载地图
    createMap() {
      const mapURL = {
        url: "https://js.arcgis.com/4.7/"
      };
      esriLoader
        .loadModules(
          [
            "esri/Map",
            "esri/Basemap",
            "esri/layers/TileLayer",
            "esri/views/MapView",
            "esri/views/SceneView",
            "dojo/domReady!"
          ],
          mapURL
        )
        .then(([Map, Basemap, TileLayer, MapView, SceneView]) => {
          let layer = new TileLayer({
            url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer"
          });
          //实例化底图对象
          let baseMap = new Basemap({
            baseLayers: [layer],
            title: "Custom Basemap",
            id: "myBasemap"
          });
          //实例化地图对象
          let map = new Map({
            basemap: baseMap
          });
          //实例化view
          //2D
          let view2D = new MapView({
            center: [120.2, 32.1],
            map: map,
            container: "mapDiv2D",
            zoom: 5
          });
          //3D
          let view3D = new SceneView({
            center: [120.2, 32.1],
            map: map,
            container: "mapDiv3D",
            zoom: 1
          });
        });
    }
  },
  mounted() {
    let _this = this;

    _this.createMap();
  },
  beforeDestroy() { }
};
</script>
