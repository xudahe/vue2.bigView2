<!--溯源or流向-->
<style lang="less">
.ivu-table .demo-table-info-cell-age {
  background-color: #ff6600 !important;
  color: #fff;
}
</style>

<template>
  <div>
    <v-dialog ref="dialog" v-model="dialog.show" :title="dialog.title" :buttons="dialog.buttons" :bodyshow="dialog.bodyshow" @input="close">
      <div style="width: auto;min-height:50px;max-height:auto;overflow:overlay;">
        <Row style="width: auto;margin: 10px;color:#fff">
          <Col span="24">
          <Button type="info" @click="selectpoint" style="margin-right: 20px;" :disabled="disabled">拾取</Button>
          <Button v-if="name == '溯源'" type="info" @click="analysis" style="margin-right: 20px;">分析</Button>
          <Button type="error" @click="clear">重置</Button>
          <span style="width: 200px;height: 32px;float: right;text-align: center;line-height: 32px;">{{'一共经过'+page.total+'条管线'}}</span>
          </Col>
        </Row>
        <Row v-show="page.total>0" style="width:500px;">
          <Col span="24" style="padding: 10px;padding-top:0px">
          <div class="flowtoanaly_table">
            <Table border stripe :columns="columns" highlight-row :data="tableData" @on-row-click='selectitem' :height='page.total>5?200:0'></Table>
            <Page :total="page.total" :page-size="page.PageSize" :current="page.currentPage" @on-change="updatePage" ref="page" style="float: right;margin-top: 5px;"></Page>
          </div>
          </Col>
        </Row>
      </div>
    </v-dialog>
  </div>
</template>
<script>
import vDialog from "@/components/dialog/dialog.vue"
import { MapControl } from "@/components/arcgis_map/js/MapControl.js";
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
          className: "xa-bg-blue"
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
      columns: [
        {
          key: "序号",
          title: "序号",
          align: "center",
          width: 65,
        },
        {
          key: "类别",
          title: "管线类别",
          align: "center",
          width: 100,
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
      mapconfigLayer:[],// this.$store.state.user.userinfo.ServerUrl,

      name: "",
      mapDragEvent: {},
      mapChangeEvent: {},

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
      this.$refs.dialog.retresizeTool()
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
      let VisibleLyr = this.GetVisibleMapServers();
      var _this = this;
      MapControl.QueryByPoint3(_this, VisibleLyr, this.name);
      bus.$on('identify3', this.identify3);
    },
    //获取可见地图服务
    GetVisibleMapServers() {
      let id = this.$store.state.user.serviceId;
      let index = 0;
      for (let i = 0; i < this.mapconfigLayer.length; i++) {
        let event = this.mapconfigLayer[i];
        if (event.id == id) {
          index = i;
        }
      }
      let MapLayers = this.mapconfigLayer[index];
      let VisibleLyr = [];
      this.Loop(MapLayers, VisibleLyr);
      return VisibleLyr;
    },
    Loop(MapLayers, Record) {
      for (let i = 0; i < MapLayers.children.length; i++) {
        let _layer = MapLayers.children[i];
        if (
          _layer.serviceurl != undefined &&
          _layer.serviceurl != ""
        ) {
          let lyr = [];
          lyr.name = _layer.servicename;
          lyr.Address = _layer.serviceurl;
          lyr.layerIds = _layer.identlyids;
          Record.push(lyr);
        }
      }
    },
    updatePage(index) {
      this.page.currentPage = index;
      var _start = (index - 1) * this.page.PageSize;
      var _end = index * this.page.PageSize;
      this.tableData = this.page.pageList.slice(_start, _end);
    },
    identify3(results) {
      if (results.length > 0) {
        this.wtdh = '';
        if (this.name == "流向") {
          this.wtdh = results[0].nodeid;
          this.analysis();
        }
        if (this.name == "溯源") {
          results.forEach(item => {
            this.wtdh += '|' + item.nodeid;
          });
        }
      }
    },
    analysis() {
      bus.$emit('newmapcontrols_spinShow', true);

      let _self = this;
      _self.tableData = [];
      _self.page.pageList = [];
      _self.page.total = 0;

      if (this.wtdh == "") {
        this.disabled = false;
        bus.$emit('newmapcontrols_spinShow', false);
        return;
      };

      this.$http(ApiSetting.FlowTracing, {
        wtdh: this.wtdh,
        Tracing: this.name == '流向' ? false : true
      }).then(
        res => {
          this.disabled = false;
          bus.$emit('newmapcontrols_spinShow', false);

          let map = MapControl.map[MapControl.mapId];
          map.setMapCursor("default");
          MapControl.identifyHandler.remove();

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
            this.mapDragEvent = map.on("mouse-drag", function (e) {
              _self.AnimationFlow(source, e.movementX, e.movementY);
            });
            this.mapChangeEvent = map.on("extent-change", function (e) {
              _self.AnimationFlow(source, 0, 0);
            });

            bus.$off("identify3");
          } else {
            // _self.$Message.error(res.data.source);
            // _self.selectpoint();
          }
        },
        error => {
          this.disabled = false;
          bus.$emit('newmapcontrols_spinShow', false);
          // _self.$Message.error(error);
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
          if (data[i].类别 == 1) line.stroke({
            color: "#0070ff",
            width: 5
          });
          else if (data[i].类别 == 2)
            line.stroke({
              color: "#a83800",
              width: 5
            });
          else if (data[i].类别 == 3)
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
          if (data[i].类别 == 1) line.stroke({
            color: "#0070ff",
            width: 5
          });
          else if (data[i].类别 == 2)
            line.stroke({
              color: "#a83800",
              width: 5
            });
          else if (data[i].类别 == 3)
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
      this.wtdh = ""
      this.tableData = []
      this.page.pageList = [];
      this.page.total = 0;

      this.disabled = false;

      // if (MapControl.identifyHandler !== undefined) {
      //   MapControl.identifyHandler.remove();
      // }

      if (document.getElementById("svgbox") !== null) {
        document.getElementById("svgbox").innerHTML = "";
      }
      let map = MapControl.map[MapControl.mapId];

      try {
        map.on("mouse-drag", function (e) { });
        map.on("extent-change", function (e) { });
        this.mapChangeEvent.remove();
        this.mapDragEvent.remove();

        this.mapDragEvent = map.on("mouse-drag", function (e) { });
        this.mapChangeEvent = map.on("extent-change", function (e) { });
      } catch (e) { }

      bus.$emit('newmapcontrols_spinShow', false);
      bus.$off("identify3");
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
