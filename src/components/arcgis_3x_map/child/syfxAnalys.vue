<!--溯源or流向-->
<style lang="less">
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600 !important;
  color: #fff;
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
</style>

<template>
  <div ref="syfxAnalys">
    <v-dialog ref="dialog" v-model="dialog.show" :title="dialog.title" :buttons="dialog.buttons"
      :bodyshow="dialog.bodyshow" @input="close">
      <div style="width: auto;min-height:50px;max-height:auto;overflow:overlay;">
        <Row style="width: auto;margin: 10px;color:#fff">
          <Col span="24">
          <Button type="info" @click="selectpolygon" style="margin-right: 20px;" :disabled="disabled1">绘制</Button>
          <Button type="info" @click="selectpoint" style="margin-right: 20px;" :disabled="disabled">拾取</Button>
          <Button type="info" @click="analysis" style="margin-right: 20px;" :disabled="disabled11">分析</Button>
          <Button type="error" @click="clear">清除</Button>
          <span v-show="page.total > 0"
            style="width: auto;height: 32px;float: right;text-align: center;line-height: 32px;margin-left: 10px;">
            {{ '一共经过' + page.total + '条管线' }}</span>
          </Col>
        </Row>
        <Row v-show="page.total > 0" style="width:500px;">
          <Col span="24" style="padding: 10px;padding-top:0px">
          <div class="flowtoanaly_table">
            <Table border stripe :columns="columns" highlight-row :data="tableData" @on-row-click='selectitem'
              :height='page.total > 5 ? 200 : 0'></Table>
            <Page :total="page.total" :page-size="page.PageSize" :current="page.currentPage" @on-change="updatePage"
              ref="page" style="float: right;margin-top: 5px;"></Page>
          </div>
          </Col>
        </Row>
      </div>
    </v-dialog>
  </div>
</template>
<script>

import vDialog from "@/components/dialog/dialog.vue"
import { MapControl } from "@/components/arcgis_3x_map/js/MapControl.js";
import apiSetting from '@/api/apiSetting.js';
import bus from "@/eventBus.js";


export default {
  components: { vDialog },
  data() {
    return {
      dialog: {
        show: true,
        title: {
          text: "",
          className: "xa-bg-blue" //标题样式类名，包含`background`、`color`即可
        },
        bodyshow: true
      },
      page: {
        pageList: [],
        PageSize: 10,
        currentPage: 1,
        total: 0
      },
      disabled: false,
      disabled1: false,
      disabled11: true,
      columns: [
        {
          key: "序号",
          title: "序号",
          align: "center",
          width: 65,
        },

        {
          title: "管线类别",
          key: "类别",
          align: "center",
          width: 100,
          // render: (h, params) => {
          //   let value = params.row.类别;
          //   switch (params.row.类别) {
          //     case 1:
          //       value = "雨水管";
          //       break;
          //     case 2:
          //       value = "污水管";
          //       break;
          //     case 3:
          //       value = "合流管";
          //       break;
          //   }
          //   return h("span", value);
          // }
        },
        {
          key: "管径",
          title: "管径",
          align: "center",
          width: 100,
        },
        {
          key: "材质",
          title: "材质",
          align: "center",
          width: 100,
        },
        {
          key: "起点埋深",
          title: "起点埋深",
          align: "center",
          width: 100,
        },
        {
          key: "终点埋深",
          title: "终点埋深",
          align: "center",
          width: 100,
        },
        {
          title: "要素代码",
          key: "要素代码",
          align: "center",
          width: 120
        },
      ],
      tableData: [],
      mapconfigLayer: [], // this.$store.state.user.userinfo.ServerUrl,

      name: "",
      mapDragEvent: null,
      mapChangeEvent: null,

      wtdh: "",
    };
  },
  mounted() {
    this.initial("流向")
  },
  methods: {
    initial(name) {
      this.clear()

      this.name = name;
      this.dialog.show = true
      this.$refs.dialog.retresize()
      if (name == "流向") {
        this.dialog.title.text = "流向分析"
      }
      if (name == "溯源") {
        this.dialog.title.text = "溯源分析"
      }
    },
    selectpoint() {
      this.clear()
      this.disabled = true;
      this.disabled11 = false;
      let VisibleLyr = this.GetVisibleMapServers();
      var _this = this;
      MapControl.QueryByPoint3(_this, VisibleLyr, this.name);
      bus.$off("identify3").$on('identify3', this.identify3);
    },
    selectpolygon() {
      this.clear()
      this.disabled = false;
      this.disabled1 = true;
      bus.$on("mapDrawresult", this.CheckGeometryString);
      MapControl.mapDraw("extent", true);
    },
    CheckGeometryString(value) {
      var _Self = this;
      let VisibleLyr = _Self.GetVisibleMapServers();
      if (!value) {
        this.$Message.error("绘制出的范围面有误,请重新绘制！");
      }

      esriLoader.loadModules(['esri/tasks/IdentifyTask', 'esri/tasks/IdentifyParameters']).then(([IdentifyTask, IdentifyParameters]) => {
        let map = MapControl.map[MapControl.mapId];
        // map.graphics.clear();
        map.setMapCursor("pointer");

        let result = [];
        let wkt1 = MapControl.WktToAgs(value.gwkt)

        var identifyParams = new esri.tasks.IdentifyParameters();
        identifyParams.tolerance = 1;
        identifyParams.returnGeometry = true;
        identifyParams.layerIds = VisibleLyr[i].layerIds.toString().replace('[', '').replace(']', '').split(',');
        identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
        identifyParams.geometry = wkt1;
        identifyParams.mapExtent = map.extent;

        for (var i = 0; i < VisibleLyr.length; i++) {
          var identifyTask = new esri.tasks.IdentifyTask(VisibleLyr[i].url);
          identifyTask.execute(identifyParams, function (results) {
            let flag = false;
            if (results.length > 0) {
              for (let j = 0; j < results.length; j++) {
                let attributes = results[j].feature.attributes;

                if (results[j].geometryType.indexOf('Point') > 0 && attributes.wtdh != undefined) {
                  flag = true;
                  if (_Self.name == '流向' && result.length == 0) {
                    result.push(attributes);
                    MapControl.GetTxtSymbols(results[j].feature.geometry, '起', 0, 14, '#f7f7f7');
                  } else if (_Self.name == '溯源') {
                    result.push(attributes);
                    MapControl.GetTxtSymbols(results[j].feature.geometry, '终', 0, 14, '#f7f7f7');
                  }
                }
              }
            }
            if (!flag) {
              _Self.$Message.error('未拾取到管点数据！');
            } else {
              map.setMapCursor("default");
              _Self.identify3(result)
            }
          });
        }

      })

    },
    //获取可见地图服务(当前打开的图层服务)
    GetVisibleMapServers() {
      let map = MapContfup.layerIds, layerUrls = [];
      for (let i = 0; i < layerIds.length; i++) {
        var sublay = map.getLayer(layerIds[i]);
        if (sublay != undefined) {
          layerUrls.push({ url: sublay.url })
        }
      }
      console.log(layerUrls)
      return layerUrls;
    },
    updatePage(index) {
      this.page.currentPage = index;
      var _start = (index - 1) * this.page.PageSize;
      var _end = index * this.page.PageSize;
      this.tableData = this.page.pageList.slice(_start, _end);
    },
    identify3(results) {
      if (results.length > 0) {
        this.disabled11 = false;
        this.wtdh = '';
        if (this.name == "流向") {
          this.wtdh = results[0].wtdh;
          // this.analysis();
        } else if (this.name == "溯源") {
          results.forEach(item => {
            this.wtdh += '|' + item.wtdh;
          });
        }
      }
    },
    analysis() {
      bus.$emit('map_spinShow', true);

      let _self = this;
      _self.tableData = [];
      _self.page.pageList = [];
      _self.page.total = 0;

      if (this.wtdh == "") {
        this.disabled = this.disabled1 = false;
        bus.$emit('map_spinShow', false);
        return;
      };
      return;

      this.$http(apiSetting.FlowTracing, {
        wtdh: this.wtdh,
        Tracing: _self.name == '流向' ? false : true
      }).then(
        res => {
          this.disabled = this.disabled1 = false;
          this.disabled11 = true;
          bus.$emit('map_spinShow', false);

          let map = MapControl.map[MapControl.mapId];
          map.setMapCursor("default");
          if (MapControl.identifyHandler !== undefined) {
            MapControl.identifyHandler.remove();
          }

          if (res.data.success == true) {
            this.isclear = true;
            const map = MapControl.map[MapControl.mapId];
            let x_array = [];
            let y_array = [];
            let source = res.data.source.管线;

            if (source.length == 0) return this.$Message.info('暂无数据！');

            for (let i = 0; i < source.length; i++) {
              source[i].序号 = i + 1;
              const geometry = MapControl.WktToAgs(source[i].空间位置);
              const STARTPOINT_X = parseFloat(geometry.paths[0][0][0]);
              const STARTPOINT_Y = parseFloat(geometry.paths[0][0][1]);
              const ENDPOINT_X = parseFloat(geometry.paths[0][1][0]);
              const ENDPOINT_Y = parseFloat(geometry.paths[0][1][1]);
              x_array.push(STARTPOINT_X, ENDPOINT_X);
              y_array.push(STARTPOINT_Y, ENDPOINT_Y);
            }

            _self.page.pageList = source;
            _self.page.total = source.length;
            _self.updatePage(1);

            // MapControl.setPolylinesExtent(x_array, y_array);
            _self.AnimationFlow(source, 0, 0);
            _self.mapDragEvent = map.on("mouse-drag", function (e) {
              _self.AnimationFlow(source, e.movementX, e.movementY);
            });
            _self.mapChangeEvent = map.on("extent-change", function (e) {
              _self.AnimationFlow(source, 0, 0);
            });
          } else {

          }
        },
        error => {
          this.disabled = this.disabled1 = false;
          bus.$emit('map_spinShow', false);
        }
      )
    },
    //SVG实现水流效果
    AnimationFlow(data, x, y) {
      if (document.getElementById("svgbox") == null) {
        const divbox = document.createElement("div");
        divbox.id = "svgbox";
        divbox.className = "svgbox";
        document.getElementById(MapControl.mapId + "_layers").appendChild(divbox);
      } else {
        document.getElementById("svgbox").innerHTML = "";
      }

      let draw = SVG("svgbox").size("100%", "100%");
      const map = MapControl.map[MapControl.mapId];
      for (let i = 0; i < data.length; i++) {
        const geometry = MapControl.WktToAgs(data[i].空间位置);
        const STARTPOINT_X = parseFloat(geometry.paths[0][0][0]);
        const STARTPOINT_Y = parseFloat(geometry.paths[0][0][1]);
        const ENDPOINT_X = parseFloat(geometry.paths[0][1][0]);
        const ENDPOINT_Y = parseFloat(geometry.paths[0][1][1]);
        const screenPoint1 = map.toScreen(
          new esri.geometry.Point(
            STARTPOINT_X,
            STARTPOINT_Y,
            map.spatialReference
          )
        );
        const screenPoint2 = map.toScreen(
          new esri.geometry.Point(ENDPOINT_X, ENDPOINT_Y, map.spatialReference)
        );
        let lx = data[i].流向;
        if (lx == 0) {
          let line = draw.polyline([
            [screenPoint1.x + x, screenPoint1.y + y],
            [screenPoint2.x + x, screenPoint2.y + y]
          ]);
          if (data[i].类别 == '雨水') line.stroke({
            color: "#0070ff",
            width: 5
          });
          else if (data[i].类别 == '污水')
            line.stroke({
              color: "#a83800",
              width: 5
            });
          else if (data[i].类别 == '合流')
            line.stroke({
              color: "#a900e6",
              width: 5
            });
          else line.stroke({
            color: "#ff0000",
            width: 5
          });
          line.attr("class", "flow"); //水流样式
        } else {
          let line = draw.polyline([
            [screenPoint2.x + x, screenPoint2.y + y],
            [screenPoint1.x + x, screenPoint1.y + y]
          ]);
          if (data[i].类别 == '雨水') line.stroke({
            color: "#0070ff",
            width: 5
          });
          else if (data[i].类别 == '污水')
            line.stroke({
              color: "#a83800",
              width: 5
            });
          else if (data[i].类别 == '合流')
            line.stroke({
              color: "#a900e6",
              width: 5
            });
          else line.stroke({
            color: "#ff0000",
            width: 5
          });
          line.attr("class", "flow"); //水流样式
        }
      }
    },
    selectitem(item, index) {
      let map = MapControl.map[MapControl.mapId];

      MapControl.setMapClear(0);
      let geo = MapControl.WktToAgs(item.空间位置);
      MapControl.showGeometry(geo, 1);

      let showExtent = geo.getExtent();
      map.setExtent(showExtent.expand(0));
    },
    clear() {
      let _this = this;

      this.wtdh = ""
      this.tableData = []
      this.page.pageList = [];
      this.page.total = 0;

      this.disabled = this.disabled1 = false;
      this.disabled11 = true;

      if (document.getElementById("svgbox") !== null) {
        document.getElementById("svgbox").innerHTML = "";
      }

      try {
        // _this.mapids.on("mouse-drag", function (e) { });
        // _this.mapids.on("extent-change", function (e) { });
        _this.mapChangeEvent.remove();
        _this.mapDragEvent.remove();
        _this.mapChangeEvent.on("mouse-drag", function (e) { });
        _this.mapDragEvent.on("extent-change", function (e) { });
      } catch (e) { }

      bus.$emit('map_spinShow', false);
      MapControl.setMapClear();
    },
    close() {
      this.clear()
      this.dialog.show = false
      MapControl.setMapClear()
    },
  },
  beforeDestroy() {
    this.clear()
  },
};
</script>
