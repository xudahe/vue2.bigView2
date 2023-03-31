<style lang="less">
.map-content {
  background: whitesmoke;
  border: 1px solid rgba(223, 226, 235, 0.8);
  width: 100%;
  height: 100%;
}

//start--------------流向溯源css动画--------------
.svgbox {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: visible;
  display: block;
  z-index: 1;
}

.flow {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: flow 50s linear infinite;
}

@keyframes flow {
  from {
    stroke-dasharray: 10, 5;
  }

  to {
    stroke-dasharray: 40, 5;
  }
}

//end--------------流向溯源css动画--------------

.app-right-bottom {
  z-index: 4;
  position: absolute;
  bottom: 10px;
  right: 10px;

  #mapType {
    height: 46px;
    cursor: pointer;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    background-color: rgba(249, 248, 248, 0);
  }

  #mapType:hover {
    width: 120px;
    background-color: rgba(249, 248, 248, 0.8);
  }

  #mapType:hover .earth {
    right: 60px;
  }

  #mapType:hover .scape {
    right: 120px;
  }

  #mapType .mapTypeCard {
    height: 36px;
    width: 53px;
    position: absolute;
    border-radius: 2px;
    top: 5px;
    box-sizing: border-box;
    border: 1px solid rgba(153, 153, 153, 0.42);
    background: url('@/assets/img/maptype.png');
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
  }

  #mapType .mapTypeCard.active span,
  #mapType .mapTypeCard:hover span {
    background-color: #3385ff;
  }

  #mapType .mapTypeCard span {
    position: absolute;
    bottom: 0;
    right: 0;
    display: inline-block;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    color: #fff;
    border-top-left-radius: 2px;
  }

  #mapType .mapTypeCard:hover {
    border: 1px solid #3385ff;
  }

  #mapType .earth {
    right: 0px;
    z-index: 1;
  }

  #mapType .normal {
    z-index: 2;
    background-position: 0 0;
    right: 0px;
  }

  #mapType .earth {
    background-position: 0 -181px;
  }
}

.app-right-top {

  .ivu-btn>i,
  .ivu-btn>span {
    display: block;
    color: #fff;
  }


  .ivu-btn-text {
    border-color: transparent !important;
    color: #fff !important;
  }

  .ivu-btn-text:hover {
    background-color: #00358a !important;
  }

  .toolbar_icos {
    border-top: dashed 1px #cccccc !important;
    padding-top: 4px !important;
  }

  .toolbar_ico {
    // font-size: -0.803222rem;
    color: #fff;
    width: 100% !important;
    height: 48px !important;
    margin-bottom: 1px;
  }

  .Dropdowns_button {
    border: 0px !important;
    width: 100% !important;
    height: 50px !important;
    padding: 4px 0px !important;
    // font-size: -0.803222rem;
    color: #fff;
  }

  .Dropdowns_buttons {
    border-top: dashed 1px #cccccc !important;
  }

  .toolbars {
    display: block;
    background: #fff;
    box-sizing: border-box;
    border-radius: 10px 10px 0px 0px !important;
    box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.15);
    padding: 1px;
    background-color: #0e61b7 !important;
    width: 50px;
  }

  .toolbar-none {
    border-radius: 0px 0px 10px 10px !important;
    padding-bottom: 4px;
  }

  .jiantou {
    position: absolute;
    left: -6px;
    bottom: -4px;
    -webkit-transform: rotate(300deg);
    transform: rotate(315deg);
    font-size: 15px;
  }

  .ivu-dropdown {
    display: inline !important;
  }

  .toolbars .at-btn {
    border: none;
    padding: 2px 5px;
  }

  .at-btn__icon {
    font-size: 15px;
  }
}
</style>
<template>
  <div style="height:100%;width:100%;">
    <Spin size="large" fix v-if="spinShow"></Spin>
    <div class="map-content" :id="mapId" style="position: relative;border-radius: 0.1rem;">
      <bottombar :datasource="currentscale"></bottombar>
      <component :is="current_com" :ref="current_ref"></component>

      <div class="app-right-top" style="position: absolute;right: 0.14rem;top: 0.28rem;z-index: 1;">
        <div class="toolbars">
          <i-button type="text" size="small" @click="expandcoll" :title="istoolvis ? '收缩' : '展开'"
            style="font-size:0.196778rem;width:100%">
            <Icon type="ios-arrow-up" v-show="istoolvis"></Icon>
            <Icon type="ios-arrow-down" v-show="!istoolvis"></Icon>
          </i-button>
        </div>
        <div class="toolbars toolbar-none" style="" v-show="istoolvis">
          <Button-group vertical style="width:100%">
            <i-button size="small" type="text" icon="ios-map-outline" title="图层" @click="layertools"
              class="toolbar_ico toolbar_icos">
              <span style="display:block">图层</span>
            </i-button>
            <i-button size="small" type="text" icon="ios-information-circle-outline" title="拾取" @click="identify"
              class="toolbar_ico toolbar_icos">
              <span style="display:block">拾取</span>
            </i-button>
            <i-button size="small" type="text" icon="ios-bookmark" title="书签" @click="bookmark"
              class="toolbar_ico toolbar_icos">
              <span style="display:block">书签</span>
            </i-button>
            <i-button size="small" type="text" icon="ios-pint" @click="clear" title="清除" class="toolbar_ico toolbar_icos">
              <span style="display:block">清除</span>
            </i-button>
          </Button-group>

          <Dropdown title="辅助分析" trigger="click" @on-click="toolbar" placement="left">
            <i-button type="text" size="small" class="Dropdowns_button Dropdowns_buttons">
              <Icon type="md-arrow-dropleft" class="jiantou" />
              <Icon type="md-git-merge"></Icon>
              <span style="display:block">分析</span>
            </i-button>
            <DropdownMenu slot="list">
              <Dropdown-item name="lxfx">
                <Icon type="md-transgender" size="xs" /> 流向
              </Dropdown-item>
              <Dropdown-item name="syfx">
                <Icon type="md-git-branch" size="xs" /> 溯源
              </Dropdown-item>
              <Dropdown-item name="dmfx">
                <Icon type="logo-dropbox" size="xs" /> 断面
              </Dropdown-item>
              <Dropdown-item name="jjfx">
                <Icon type="logo-dropbox" size="xs" /> 净距
              </Dropdown-item>
              <Dropdown-item name="sxbz">
                <Icon type="logo-dropbox" size="xs" /> 标注
              </Dropdown-item>
            </DropdownMenu>
          </Dropdown>

          <Dropdown title="工具箱" trigger="click" @on-click="toolbarGjx" placement="left">
            <i-button type="text" size="small" class="Dropdowns_button Dropdowns_buttons">
              <Icon type="md-arrow-dropleft" class="jiantou" />
              <Icon type="ios-albums"></Icon>
              <span style="display:block">工具箱</span>
            </i-button>
            <DropdownMenu slot="list">
              <Dropdown-item name="full">
                <Icon type="md-expand" size="xs" /> 全图
              </Dropdown-item>
              <Dropdown-item name="pan">
                <Icon type="ios-hand" size="xs" /> 平移
              </Dropdown-item>
              <Dropdown-item name="zoomin">
                <Icon type="ios-add-circle" size="xs" /> 放大
              </Dropdown-item>
              <Dropdown-item name="zoomout">
                <Icon type="ios-move" size="xs" /> 缩小
              </Dropdown-item>
              <Dropdown-item name="polyline">
                <Icon type="md-repeat" size="xs" /> 测距
              </Dropdown-item>
              <Dropdown-item name="polygon">
                <Icon type="md-resize" size="xs" /> 量面
              </Dropdown-item>
            </DropdownMenu>
          </Dropdown>

        </div>
      </div>

      <div class="app-right-bottom">
        <div id="mapType">
          <div class="mapTypeCard normal" id="wu1" @click="getLayer('wu1')" title="地图">
            <span>地图</span>
          </div>
          <div class="mapTypeCard earth" id="wu2" @click="getLayer('wu2')" title="影像">
            <span>影像</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*
 * 天地图服务
 * 天地图服务Api：http://lbs.tianditu.gov.cn/server/MapService.html
 */
import * as esriLoader from 'esri-loader';
import { MapControl } from "./js/MapControl";
import mapconfig from "./js/mapconfig";
import bus from "@/eventBus.js";
import bottombar from "../arcgis_map/child/bottombar.vue";
import syfxAnalys from "../arcgis_map/child/syfxAnalys.vue";

var map, navToolbar;
export default {
  name: "GisTdtMap",
  components: {
    bottombar,
    syfxAnalys
  },
  props: {
    mapId: {
      type: String,
      default: "mapbox"
    }
  },
  data() {
    return {
      currentscale: {
        mapPoint: {
          x: null,
          y: null
        },
        scale: null
      },

      spinShow: false,
      layerShow: false,
      istoolvis: true,

      current_com: "",
      current_ref: "",
    };
  },
  methods: {
    //加载地图
    createMap() {
      var _this = this;
  
      //不自定义资源加载arcgis，管网加载有时慢会失败
      const options = {
        url: 'https://js.arcgis.com/3.27/init.js', //指定的arcgis api版本地址
        css: true,
      };

      esriLoader.loadCss(); //默认情况下，loadCss()加载最新的样式
      esriLoader.loadModules(
        [
          "dojo/_base/event",
          "dojo/_base/connect",
          "dojo/parser",
          "dojo/on",
          "dojo/_base/Color",
          "esri/map",
          "esri/SpatialReference",
          "esri/geometry/Extent",
          "esri/geometry/scaleUtils",
          "esri/layers/ArcGISTiledMapServiceLayer",
          "esri/layers/ArcGISDynamicMapServiceLayer",
          "esri/tasks/GeometryService",
          "esri/tasks/IdentifyTask",
          "esri/tasks/IdentifyParameters",
          "esri/toolbars/draw",
          "esri/toolbars/navigation",
          "esri/toolbars/edit",
          "dojo/dom-construct",
          "dojo/dom",
          "esri/config",
          "dojo/fx",
          "dojo/domReady!"
        ],
        options
      ).then(
        ([
          event,
          connect,
          parser,
          on,
          Color,
          Map,
          SpatialReference,
          Extent,
          scaleUtils,
          ArcGISTiledMapServiceLayer,
          ArcGISDynamicMapServiceLayer,
          GeometryService,
          IdentifyTask,
          IdentifyParameters,
          Draw,
          Navigation,
          Edit,
          domConstruct,
          dom,
          esriConfig,
          Fx,
        ]) => {
          MapControl.popupinfo = new esri.dijit.Popup(null, document.createElement("div"));
          //加载地图
          map = new Map(_this.mapId, {
            logo: false, // esri logo
            slider: false,
            infoWindow: MapControl.popupinfo,
            SpatialReference: new SpatialReference(4326),
            showLabels: false,
            // zoom: 10, // 缩放级别
            // maxZoom: 18 // 最大缩放级别
          });

          // const basemapurl = mapconfig.basemap + '?token=' + this.$store.getters.GISToken;
          // const basemaplayer = new esri.layers.ArcGISTiledMapServiceLayer(
          //   basemapurl
          // );
          // basemaplayer.id = basemapurl;
          // map.addLayer(basemaplayer); //添加底图

          let navToolbar = new esri.toolbars.Navigation(map);
          let drawToolbar = new esri.toolbars.Draw(map);
          let editToolbar = new esri.toolbars.Edit(map);
          const geometryservice = new esri.tasks.GeometryService(
            mapconfig.GeometryService + '?token=' + this.$store.getters.GISToken
          );

          var graphicLayer1 = new esri.layers.GraphicsLayer();
          graphicLayer1.id = "graphicLayer1";
          map.addLayer(graphicLayer1);
          MapControl.graphicLayers["gralyr1"] = graphicLayer1;

          var graphicLayer2 = new esri.layers.GraphicsLayer();
          graphicLayer2.id = "graphicLayer2";
          map.addLayer(graphicLayer2);
          MapControl.graphicLayers["gralyr2"] = graphicLayer2;

          var graphicLayer3 = new esri.layers.GraphicsLayer();
          graphicLayer3.id = "graphicLayer3";
          map.addLayer(graphicLayer3);
          MapControl.graphicLayers["gralyr3"] = graphicLayer3;

          var graphicLayer4 = new esri.layers.GraphicsLayer();
          graphicLayer4.id = "graphicLayer4";
          map.addLayer(graphicLayer4);
          MapControl.graphicLayers["gralyr4"] = graphicLayer4;

          var graphicLayer5 = new esri.layers.GraphicsLayer();
          graphicLayer5.id = "graphicLayer5";
          map.addLayer(graphicLayer5);
          MapControl.graphicLayers["gralyr5"] = graphicLayer5;

          var carLayer = new esri.layers.GraphicsLayer({
            id: "carLayer"
          });
          map.addLayer(carLayer);

          var lineLayer = new esri.layers.GraphicsLayer({
            id: "lineLayer"
          });
          map.addLayer(lineLayer);

          //地图对象加载完成后执行该方法
          map.on("load", initFunctionality());

          //绑定鼠标在地图上移动事件
          map.on("mouse-move", function (event) {
            event.scale = scaleUtils.getScale(map)

            _this.currentscale = {
              mapPoint: {
                x: event.mapPoint.x,
                y: event.mapPoint.y
              },
              scale: parseInt(event.scale)
            }
            _this.$store.dispatch("mapscale", _this.currentscale);
          });

          //绑定地图缩放事件
          map.on("zoom-end", function (event) {
            event.scale = scaleUtils.getScale(map)

            _this.currentscale.scale = parseInt(event.scale);
            _this.$store.dispatch("mapscale", _this.currentscale);
          });


          function initFunctionality() {
            _this.$store.dispatch("mapload", true);

            MapControl.map[_this.mapId] = map;
            MapControl.isLoad[_this.mapId] = true;
            MapControl.navToolbar[_this.mapId] = navToolbar;
            MapControl.drawToolbar[_this.mapId] = drawToolbar;
            MapControl.editToolbar[_this.mapId] = editToolbar;
            MapControl.GeometryService = geometryservice;

            let extent = mapconfig.extent;
            let mapExtent = new esri.geometry.Extent(
              extent.xmin,
              extent.ymin,
              extent.xmax,
              extent.ymax,
              map.spatialReference
            );
            map.setExtent(mapExtent);

            //css滤镜 修改地图样式
            // document.getElementById("mapbox_tdtLayer").style.filter =
            //   "contrast(75%) sepia(100%) invert(100%) brightness(170%) hue-rotate(2deg) saturate(200%)";
            // document.getElementById("mapbox_tdtAnnoLayer").style.filter =
            //   "contrast(75%) sepia(100%) invert(100%) brightness(170%) hue-rotate(2deg) saturate(200%)";
          }
        }
      ).catch(err => {
        console.error(err);
      });
    },
    getLayer(id) {
      if (id == "wu2") {
        MapControl.SetLayerbaseload([
          {
            url: "", //基础底图
            isshow: false
          },
          {
            url: "", //影像底图
            isshow: true
          }
        ]);
        document.getElementById("wu2").style.zIndex = 2;
        document.getElementById("wu1").style.zIndex = 1;
      } else if (id == "wu1") {
        MapControl.SetLayerbaseload([
          {
            url: "", //基础底图
            isshow: true
          },
          {
            url: "", //影像底图
            isshow: false
          }
        ]);
        document.getElementById("wu2").style.zIndex = 1;
        document.getElementById("wu1").style.zIndex = 2;
      }
    },
    // =================================工具条组件方法================================================
    expandcoll() {
      this.istoolvis = !this.istoolvis;
    },
    // 工具箱
    toolbarGjx(val) {
      // if (MapControl.identifyHandler !== undefined) {
      //   MapControl.identifyHandler.remove();
      // }
      switch (val) {
        case "zoomin":
          MapControl.setMapZoomIn();
          break;
        case "zoomout":
          MapControl.setMapZoomOut();
          break;
        case "full":
          MapControl.setMapFull();
          break;
        case "pan":
          MapControl.setMapPan();
          break;
        case "clear":
          MapControl.setMapClear();
          break;
        case "polyline":
          MapControl.MeasureDraw("polyline");
          break;
        case "polygon":
          MapControl.MeasureDraw("polygon");
          break;
      }
    },
    layertools() {
      //图层显示与隐藏
      this.layerShow = !this.layerShow;
    },
    //拾取
    identify() {
      this.clearCompt()
      bus.$emit('toolMenu', '拾取'); //列表形式
    },
    //书签
    bookmark() {
      MapControl.setMapClear();

      this.clearCompt()
      // this.showCompt("bookmark"); //弹窗形式
      bus.$emit('toolMenu', '书签'); //列表形式
    },
    clear() {
      MapControl.setMapClear();
    },
    toolbar(val) {
      // if (MapControl.identifyHandler !== undefined ) {
      //   MapControl.identifyHandler.remove();
      // }
      switch (val) {
        case "lxfx": //流向
          this.showCompt("syfxAnalys", "流向")
          break;
        case "syfx": //溯源
          this.showCompt("syfxAnalys", "溯源")
          break;
        case "dmfx": //断面
          this.showCompt("dmfxdio")
          break;
        case "jjfx": //净距
          this.showCompt("spacingalanaly")
          break;
        case "sxbz": //标注
          this.showCompt("attributelabel")
          break;
      }
    },
    // =================================弹窗组件方法=================================
    //调用组件中的initial方法
    showCompt(name, type) {
      this.current_com = this.current_ref = name;
      setTimeout(() => {
        if (!this.$refs[name]) this.$refs[name].initial(type)
      }, 500);
    },
    //移除组件
    clearCompt() {
      this.current_com = this.current_ref = "";
    },
  },
  mounted() {
    let _this = this;

    this.$store.dispatch("mapload", false);
    this.clearCompt();
    this.createMap();
  },
  beforeDestroy() {
    MapControl.setMapClear();
    this.clearCompt();
    this.$store.dispatch("mapload", false);
  }
};
</script>
