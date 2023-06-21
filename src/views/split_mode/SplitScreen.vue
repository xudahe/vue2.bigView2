<template>
  <div class="split-screen">
    <div class="screen-title">
      <span class="screen-id">{{ screenId }}</span>
      <div class="screen-name" :title="featureName">
        {{ featureName }}
      </div>

      <el-switch v-model="linkageSwitch" v-bind:width="30" active-color="#13ce66" active-text="联动" @change="changeLinkage"
        style="position: absolute;right: 60px;height: 30px;line-height: 20px;color: #fff;"></el-switch>
      <el-dropdown trigger="click" @command="handleCommand" style="position: absolute; right: 10px">
        <span class="el-dropdown-link" style="background: white">
          <i class="el-icon-caret-bottom el-icon--middle"></i>
        </span>
        <span class="delete-screen" @click="deleteScreen">
          <i class="el-icon-minus el-icon-middle"></i>
        </span>
        <el-dropdown-menu slot="dropdown" v-if="!showAllTopic" style="width: 236px">

        </el-dropdown-menu>
        <el-dropdown-menu slot="dropdown" v-if="showAllTopic">

        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <Spin fix v-show="spinShow">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
    </Spin>

    <div class="screen-view" :id="domId" @mouseover="getmapid">
      <div v-if="queryVisible" id="mode-center" style="visibility: visible;">
        <div style="height: 100%;width: 100%;" @click="showIdentity">
          <i :class="showident ? 'el-icon-d-arrow-right' : 'el-icon-warning-outline'" style="font-size: 20px;"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loadModules } from "esri-loader";
import bus from "@/eventBus";
import mapconfig from "@/components/arcgis_map/js/mapconfig";
import { MapControl } from "@/components/arcgis_map/js/MapControl";

export default {
  props: {
    screenId: String,
    screenIndex: Number,
    featureId: String
  },
  components: {
  },
  data() {
    return {
      domId: `screen-view${this.screenIndex}`,
      featureName: "供地数据",
      linkageSwitch: true,
      topicList: this.$store.state.map.topicList,
      showAllTopic: false,
      view: null,

      showident: false,
      spinShow: true,
    };
  },
  mounted() {
    this.showident = false
    this.$store.commit("queryVisible", false);

    this.$nextTick(() => {
      setTimeout(() => {
        this.createView();
      }, this.screenIndex * 1000);
    })
  },
  computed: {
    queryVisible() {
      return this.$store.state.map.queryVisible;
    }
  },
  watch: {
    topicList: {
      handler: function (newVal) {

      },
      deep: true
    },
    featureId(newVal) {

    },
  },
  methods: {
    getmapid() {
      if (this.view) {
        this.$store.commit("splitMapId", this.view.id);
        bus.$emit('getmapid', this.view.id);
      }
    },
    createView() {
      console.log("screenIndex:", this.screenIndex, "  createview:", this.featureId);

      let _this = this;
      const domNode = document.getElementById(this.domId);

      const options = {
        url: mapconfig.jsapi
      };

      const basemapurl = "https://map.geoq.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer";

      // MapControl.CreateMapView(domNode, _this.domId, options, basemapurl)
      //   .then((map) => {
      //     _this.view = map;

      //     let navToolbar = new esri.toolbars.Navigation(map);
      //     let drawToolbar = new esri.toolbars.Draw(map);
      //     let editToolbar = new esri.toolbars.Edit(map);
      //     const geometryservice = new esri.tasks.GeometryService(
      //       mapconfig.GeometryService
      //     );

      //     map.on("load", initFunctionality);

      //     function initFunctionality(value) {
      //       _this.spinShow = false;
      //       _this.resetLayerViews(_this.featureId);

      //       let mapId = value.map.id;
      //       MapControl.mapArr[mapId] = value.map;

      //       mapconfig.MapControl1[mapId] = true;

      //       MapControl.isLoad[mapId] = true;
      //       MapControl.navToolbar[mapId] = navToolbar;
      //       MapControl.drawToolbar[mapId] = drawToolbar;
      //       MapControl.editToolbar[mapId] = editToolbar;
      //       MapControl.GeometryService = geometryservice;

      //       let extent = mapconfig.extent;
      //       let mapExtent = new esri.geometry.Extent(
      //         extent.xmin,
      //         extent.ymin,
      //         extent.xmax,
      //         extent.ymax,
      //         map.spatialReference
      //       );
      //       map.setExtent(mapExtent);

      //       MapControl.ExtentChanges[mapId] = map.on("extent-change", function (event) {
      //         if (mapconfig.MapControl1[mapId]) {
      //           bus.$emit('ExtentChange', { event: event.extent, id: _this.domId });
      //         }
      //       })
      //     }
      //   })
      //   .then(() => {

      //   });
    },
    //加载服务
    resetLayerViews(featureId) {
      if ([null, undefined, ""].indexOf(this.view) !== -1) {
        return;
      }

    },
    showIdentity() {
      this.$store.commit("splitMapId", this.view.id);

      this.showident = !this.showident

      if (!this.showident) {
        let _graphic = this.view.id + '_graphicLayer'
        if (MapControl.graphicLayers[_graphic]) {
          MapControl.graphicLayers[_graphic].clear();
        }
      }
    },

    changeLinkage(value) {
      this.view.linkageSwitch = value;
      mapconfig.MapControl1[this.view.id] = value;
    },

    handleCommand(command) {
      var map = MapControl.mapArr[this.view.id];
      let layerIds = JSON.parse(JSON.stringify(map.layerIds));
      for (let i = 1; i < layerIds.length; i++) {
        var layer = map.getLayer(layerIds[i]);
        if (layer) {
          map.removeLayer(layer);
        }
      }

      this.featureId = command.id;
    },


    deleteScreen() {
      const splitScreens = this.$store.state.map.splitScreens;
      for (let i = this.screenIndex; i < MapControl.mapArr.length - 1; i++) {
        this.$set(splitScreens[i - 1], "featureId", splitScreens[i].featureId);
      }

      splitScreens.pop();
      this.resetLayout(splitScreens.length);
      console.log("splitScreens", splitScreens);
      this.$store.commit("splitScreens", splitScreens);

    },

    //当删除分屏时重置分屏布局
    //TODO: 后续将改造此方法，使用CSS样式切换实现，暂先用JS代码设置样式
    resetLayout(splitNumber) {
      const splitElements = document.querySelectorAll(".split-container");
      splitElements.forEach(element => {
        element.classList.remove(
          "layout2",
          "layout3",
          "layout4",
          "layout5",
          "layout6",
          "layout7"
        );
      });
    }
  },
  beforeDestroy() {
  }
}
</script>

<style scoped>
.split-screen>>>.esri-ui-top-right.esri-ui-corner {
  top: 20px;
}

.split-screen>>>.el-select .el-input__inner {
  width: 100px;
}

.screen-id {
  margin-left: 5px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.screen-name {
  display: inline-block;
  width: 120px;
  margin-left: 20px;
  text-align: center;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.screen-title>>>.el-select .el-input__inner {
  height: 16px;
  width: 100px;
  border-radius: 8px;
  font-size: xx-small;
  padding-left: 8px;
  padding-right: 8px;
  vertical-align: super;
}

.screen-title>>>.el-select .el-select__caret {
  height: 16px;
  width: 16px;
  font-size: 8px;
  line-height: 16px;
}

.screen-title>>>.el-select .el-input__suffix-inner {
  height: 16px;
  line-height: 16px;
  vertical-align: super;
}

.screen-name:hover {
  cursor: pointer;
}

.delete-screen {
  background: #fff;
  margin-left: 5px;
}

.screen-view {
  height: 100%;
  width: 100%;
  z-index: 1;
}


#mode-center {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 34px;
  border-radius: 10px;
  box-shadow: 1px 2px 1px rgba(0, 0, 0, .15);
  float: right;
  z-index: 99;
  position: absolute;
  margin-top: 40px;
  right: 10px;
  background: #fff;
  cursor: pointer;
}
</style>
</style>
