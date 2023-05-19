
<!--拴点制图--> 
<style lang="scss">
.mapoutput09sdzt {
  content: '';
  background-color: rgba(230, 230, 230, 0.5);
  backdrop-filter: blur(5px);
}
</style>

<template>
  <div class="mapoutput09sdzt" style="padding: 5px;">
    <div class="MyHeader" style="margin: 0 0 10px 5px;">
      <label style="margin-Top:8px;">拴点输出:</label>
      <Icon v-for="(item, index) in iconList" :key="index" :color="selectIcon == item.value ? 'blue' : ''"
        :type="item.type" size="28" style="margin-Top:5px;margin-left:16px;cursor:pointer;" @click="toolbarGjx(item)"
        :title="item.title" />
    </div>
    <div class="MyTable" style="margin-Top:2px;;margin-left:1px;width:320px;">
      <Table :height="350" :columns="columns" :data="tabledata" border></Table>
    </div>
    <div class="MyFoot" style="margin: 5px ;text-align: center;">
      <Button @click="toolbarGjx('clear')"> 重置 </Button>
      <Button type="info" @click="printUp" style="margin-left: 20px;"> 打印 </Button>
    </div>
    <Spin fix v-show="spinShow">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>正在导出......</div>
    </Spin>
  </div>
</template>
<script>

import { MapControl } from "@/components/arcgis_map/js/MapControl.js";
import bus from '@/eventBus.js';

import * as esriLoader from 'esri-loader';

var identifyHandler;
var hiddfields = "objectid,shape,FEATURECODE,SHAPEONE,syzt,pkstatus,hjpdyj,hjgldh,关联表名";

export default {
  components: {},
  data() {
    return {
      spinShow: false,

      selectIcon: '',
      iconList: [
        { type: 'md-pin', title: '管点', value: 'point' },
        { type: 'logo-yahoo', title: '连线', value: 'line' },
        { type: 'md-undo', title: '撤销', value: 'rest' },
        { type: 'md-trash', title: '清除', value: 'clear' },
      ],
      columns: [
        {
          title: "属性名",
          key: "name",
          align: "center",
          // width: 150,
        },
        {
          title: "属性值",
          key: "value",
          align: "center",
        },
      ],
      tabledata: [],

      initial_point: "", //初始点位

      later_point: [], //终点
      later_lines: [], //线条
    };
  },
  computed: {
    mapurl() {
      let servicesurl = [];

      return servicesurl;
    }//拾取图层
  },
  mounted() {
    // 点   拾取排水或供水管网
    // 线(量距) 点击一个点  和 第一步拾取的管点 用虚线连接  根据坐标计算出距离
    // 撤销   线条一条一条的撤销量距
    // 清除

    this.clear();
  },
  methods: {
    toolbarGjx(item) {
      let _this = this;
      _this.selectIcon = item.value;

      if (identifyHandler != undefined) {
        identifyHandler.remove()
      }

      let map = MapControl.map[MapControl.mapId];
      map.setMapCursor("default");

      switch (item.value) {
        case "point": //取点

          _this.clear();

          esriLoader.loadModules(['esri/tasks/IdentifyTask', 'esri/tasks/IdentifyParameters']).then(([IdentifyTask, IdentifyParameters]) => {
            let map = MapControl.map[MapControl.mapId];
            map.setMapCursor("pointer");

            identifyHandler = map.on('click', function (geo) {

              setTimeout(function () {
                let data = [], attributes = {};

                if (_this.mapurl.length == 0) {
                  let item = {
                    attributes: {
                      物探点号: geo.mapPoint.x + '-' + geo.mapPoint.y,
                      点号: geo.mapPoint.x + '-' + geo.mapPoint.y,
                      类別: "1",
                    },
                    shape: 'POINT (' + geo.mapPoint.x + ' ' + geo.mapPoint.y + ' )',
                  };
                  attributes = item.attributes

                  let geometry = MapControl.WktToAgs(item.shape)
                  _this.showGraphic(geometry, 0, "gralyr2", "#ff0000", 12);
                  _this.initial_point = item.shape;
                }
                else {
                  for (var i = 0; i < _this.mapurl.length; i++) {
                    var identifyTask = new esri.tasks.IdentifyTask(
                      _this.mapurl[i].SERVICEURL
                    );
                    var identifyParams = new esri.tasks.IdentifyParameters();
                    identifyParams.tolerance = 5
                    identifyParams.returnGeometry = true;
                    // identifyParams.layerIds = VisibleLyr[i].layerIds.toString().replace('[', '').replace(']', '').split(',');
                    identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
                    identifyParams.geometry = geo.mapPoint;
                    identifyParams.mapExtent = map.extent;
                    identifyTask.execute(identifyParams, function (results) {

                      let flag = false;
                      if (results.length > 0) {
                        for (let j = 0; j < results.length; j++) {
                          if (!flag) {
                            attributes = results[j].feature.attributes;
                            let geometry = results[j].feature.geometry;

                            if (results[j].geometryType.indexOf('Point') > 0) {
                              flag = true;

                              _this.initial_point = 'POINT (' + geometry.x + ' ' + geometry.y + ' )'
                              _this.showGraphic(geometry, 0, "gralyr2", "#ff0000", 12);
                            }
                          }
                        }
                      }

                      if (!flag || results.length == 0) {
                        // _this.$Message.error('未拾取到管点数据！');

                        let item = {
                          attributes: {
                            物探点号: geo.mapPoint.x + '-' + geo.mapPoint.y,
                            点号: geo.mapPoint.x + '-' + geo.mapPoint.y,
                            类別: "1",
                          },
                          shape: 'POINT (' + geo.mapPoint.x + ' ' + geo.mapPoint.y + ' )',
                        };
                        attributes = item.attributes

                        let geometry = MapControl.WktToAgs(item.shape)
                        _this.showGraphic(geometry, 0, "gralyr2", "#ff0000", 12);

                      } else {
                        map.setMapCursor("default");
                        identifyHandler.remove();
                      }
                    });
                  }
                }

                for (var key in attributes) {
                  let value = '';

                  //隐藏不必要的属性
                  if (hiddfields.indexOf(key) < 0) {
                    if (key == "category" || key == "类別")
                      value = attributes[key] == "1" ? "雨水" : attributes[key] == "2" ? "污水" : attributes[key] == "3" ? "合流" : attributes[key];
                    else
                      value = attributes[key].replace("Null", "");

                    data.push({
                      name: key,
                      value: value,
                    });
                  }
                }
                _this.tabledata = data;

              }, 500)
            });
          })
          break;
        case "line"://连线
          if (_this.tabledata.length == 0 && _this.initial_point != '') {
            return _this.$Message.error('请先拾取管点！');
          }

          let map = MapControl.map[MapControl.mapId];
          map.setMapCursor("pointer");

          identifyHandler = map.on('click', function (geo) {
            // map.setMapCursor("default");
            // identifyHandler.remove();

            //点
            let shape1 = 'POINT (' + geo.mapPoint.x + ' ' + geo.mapPoint.y + ' )'
            // let wkt1 = MapControl.WktToAgs(shape1)
            // MapControl.showGraphic(wkt1, true, 'gralyr2')

            //量距
            _this.outputDistance(_this.initial_point, shape1);

            //连接线
            let shape2 = _this.LINESTRING(_this.initial_point, shape1)
            let wkt2 = MapControl.WktToAgs(shape2);
            _this.showGraphic(wkt2, 0, "gralyr2", "#ff0000");

            _this.later_point.push(shape1);
            _this.later_lines.push(shape2);
          });

          break;
        case "rest": //撤销
          if (MapControl.graphicLayers["gralyr2"] != undefined) {
            MapControl.graphicLayers["gralyr2"].clear();
          }

          //初始点位点
          let wkt = MapControl.WktToAgs(_this.initial_point)
          _this.showGraphic(wkt, 0, "gralyr2", "#ff0000", 12);

          _this.later_point = _this.later_point.splice(0, _this.later_point.length - 1);
          // _this.later_lines = _this.later_lines.splice(0, _this.later_lines.length - 1);

          console.log(_this.later_point)

          if (_this.later_point.length > 0) {
            for (let i = 0; i < _this.later_point.length; i++) {

              // //点
              //let wkt1 = MapControl.WktToAgs(_this.later_point[i]);
              // MapControl.showGraphic(wkt1, true, 'gralyr2')

              //显示量距
              _this.outputDistance(_this.initial_point, _this.later_point[i]);

              //连接线
              let shape2 = _this.LINESTRING(_this.initial_point, _this.later_point[i])
              let wkt2 = MapControl.WktToAgs(shape2);
              _this.showGraphic(wkt2, 0, "gralyr2", "#ff0000");
            }
          }
          break;
        case "clear": //清除
          this.clear();
          break;
      }
    },
    //量距结果
    outputDistance(point1, point2) {

      let geometry = MapControl.WktToAgs(point2)

      let shape1 = point1.replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ')
      let shape2 = point2.replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ')

      let x = Math.abs(Math.abs(parseFloat(shape1[0])) - Math.abs(parseFloat(shape2[0])));
      let y = Math.abs(Math.abs(parseFloat(shape1[1])) - Math.abs(parseFloat(shape2[1])));

      let length = Math.sqrt(x * x + y * y);

      var lengthValue;
      if (length >= 1000) {
        lengthValue = (length / 1000).toFixed(3) + '公里';
      } else {
        lengthValue = length.toFixed(1) + '米';
      }

      var pmsTextBg = new esri.symbol.PictureMarkerSymbol(require("@/assets/img/map/tips.png"), 22, 20);
      pmsTextBg.setOffset(40, -15);
      pmsTextBg.setWidth(lengthValue.length * 10);
      var bgGraphic = new esri.Graphic(geometry, pmsTextBg);
      MapControl.graphicLayers['gralyr2'].add(bgGraphic);

      var font = new esri.symbol.Font();
      font.setSize('11pt');
      font.setFamily('微软雅黑');
      var text = new esri.symbol.TextSymbol(lengthValue);
      text.setFont(font);
      text.setColor(new dojo.Color([0, 0, 0, 255]));
      text.setOffset(40, -20);

      var labelGraphic = new esri.Graphic(geometry, text);
      MapControl.graphicLayers['gralyr2'].add(labelGraphic);
    },
    //两点连接成 一条线
    LINESTRING(point1, point2) {
      let shape1 = point1.replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ')
      let shape2 = point2.replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ')
      let shape = 'LINESTRING (' + shape1[0] + ' ' + shape1[1] + ', ' + shape2[0] + ' ' + shape2[1] + ')'

      return shape;
    },
    //地图高亮显示
    showGraphic(geo, isshowExtent, gralyr, color, size) {
      esriLoader.loadModules(['esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon']).then(([
        Point, Polyline, Polygon
      ]) => {
        let map = MapControl.map[MapControl.mapId];
        var symbol;
        var showExtent;
        switch (geo.type) {
          case 'point':
            geo = new Point(geo);
            var xMin = parseFloat(geo.x) - 50;
            var yMin = parseFloat(geo.y) - 50;
            var xMax = parseFloat(geo.x) + 50;
            var yMax = parseFloat(geo.y) + 50;
            showExtent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, map.spatialReference);
            var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
              size == undefined ? 10 : size, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_CIRCLE,
                new dojo.Color(color == undefined ? [255, 87, 34, 5] : color)),
              new dojo.Color(color == undefined ? [255, 87, 34, 5.25] : color));
            break;
          case 'polyline':
            geo = new Polyline(geo);
            symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
              new dojo.Color(color == undefined ? [0, 255, 255] : color), 3);
            showExtent = geo.getExtent();
            break;
          case 'polygon':
            geo = new Polygon(geo);
            symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
              new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH,
                new dojo.Color(color == undefined ? [0, 255, 255] : color), 3),
              new dojo.Color(color == undefined ? [0, 0, 0, 0.25] : color));
            showExtent = geo.getExtent();
            break;
          case 'extent':
            geo = new Polygon(geo);
            symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
              new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH,
                new dojo.Color(color == undefined ? [0, 255, 255] : color), 3),
              new dojo.Color(color == undefined ? [0, 0, 0, 0.25] : color));
            showExtent = geo.getExtent();
            break;
        }
        if (showExtent != undefined) {
          var tempGra = new esri.Graphic(geo, symbol, null, null);
          MapControl.graphicLayers[gralyr == undefined ? 'gralyr1' : gralyr].add(tempGra);
          if (isshowExtent == undefined)
            map.setExtent(showExtent.expand(0));
        }
      });
    },
    //清除
    clear() {
      this.tabledata = [];
      this.initial_point = "";
      this.later_point = [];
      this.later_lines = [];

      MapControl.setMapClear();

      if (identifyHandler != undefined) {
        identifyHandler.remove()
      }
    },
    formatDateTime(datastr = new Date()) {
      var date = new Date(datastr);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y.toString() + m + d + h + minute + s;
    },
    //打印
    printUp() {
      if (MapControl.graphicLayers["gralyr3"] != undefined) {
        MapControl.graphicLayers["gralyr3"].clear();
      }

      let _this = this;
      _this.selectIcon = '';

      let xPoint = [], yPoint = [];
      let shape = this.initial_point.replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ');
      xPoint.push(parseFloat(shape[0])); yPoint.push(parseFloat(shape[1]));
      for (let i = 0; i < this.later_point.length; i++) {
        let shape1 = this.later_point[i].replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ');
        xPoint.push(parseFloat(shape1[0])); yPoint.push(parseFloat(shape1[1]));
      }

      let xMax = Math.max.apply(null, xPoint) + 10;
      let xMin = Math.min.apply(null, xPoint) - 10;
      let yMax = Math.max.apply(null, yPoint) + 10;
      let yMin = Math.min.apply(null, yPoint) - 10;
      let geom = 'POLYGON((' + xMin + ' ' + yMin + ',' + xMax + ' ' + yMin + ',' + xMax + ' ' + yMax + ',' + xMin + ' ' + yMax + ',' + xMin + ' ' + yMin + '))';

      let wkt = MapControl.WktToAgs(geom)
      this.showGraphic(wkt, 0, "gralyr3");
      MapControl.showExtent(wkt, 0); //定位

      setTimeout(() => {
        this.PrintOutTask();
      }, 1000);
    },
    PrintOutTask() {
      this.spinShow = true;
      let that = this;

      esriLoader
        .loadModules([
          "esri/tasks/PrintTask",
          "esri/tasks/PrintTemplate",
          "esri/tasks/PrintParameters"
        ])
        .then(([PrintTask, PrintTemplate, PrintParameters]) => {
          let map = MapControl.map[MapControl.mapId];

          var printMap = new PrintTask("http://10.10.12.71:6080/arcgis/rest/services/ExportWebMap/GPServer/Export%20Web%20Map");
          //创建地图打印模版
          var template = new PrintTemplate();
          //创建地图的打印参数，参数里面包括：模版和地图
          var params = new PrintParameters();
          //输出图片的空间参考
          printMap.outSpatialReference = map.SpatialReference;
          //打印图片的各种参数
          template.exportOptions = {
            width: map.width,
            height: map.height,
            dpi: 96,//分辨率 ["96", "100", "120"]
          };
          //打印输出的格式
          template.format = "JPG"; // [ PDF, PNG32, PNG8, JPG, GIF, EPS, SVG, SVGZ ]
          //输出地图的布局
          template.layout = "MAP_ONLY";
          PrintTemplate;
          //设置参数地图
          params.map = map;
          //设置参数模版
          params.template = template;
          //运行结果
          printMap.execute(params, function (result) {
            that.spinShow = false;
            console.log(result)
            if (result != null) {
              //网页打开生成的地图
              window.open(result.url, "_blank");
            } else console.error("打印失败");
          });
        })
        .catch(err => {
          console.error(err);
        });

    },
  },
  beforeDestroy() {
    if (identifyHandler != undefined) {
      identifyHandler.remove()
    }
    MapControl.setMapClear();
  }
};
</script>
