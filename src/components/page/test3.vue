<template>
  <div style="height:100%;width:100%;" class="test3 bgActive collapse simple_page">
    <div style="padding: 0.05rem;height: 100%;">
      <div style="overflow: auto;height: calc(100% - 0.4rem);" class="borderdiv">
        <div style="overflow: auto;height: 100%;" class="pointQyery_div borderdiv">
          <div :key="'coll' + item.name" v-for="(item, index) in tableList" @click="goto(item, index)"
            style="margin-bottom: 0.1rem;cursor: pointer;" :class="index == selectId ? 'bgActiveT' : 'bgActiveF'">
            <div style="height: 0.35rem;line-height: 0.35rem;padding-left: 0.1rem;padding-top: 0.05rem;">
              <div class="dialogtitles" :title="item.name">
                <img :src="require('@/assets/img/map/泵站@2x.png')"
                  style="float: left;margin-right: 0.055rem;width: 0.30rem;margin-top: 0.03rem;" />
                {{ item.name }}
              </div>
              <div style="float: right;margin-right: 0.1rem;">
                <img
                  :src="selectId == index ? require('@/assets/img/map/定位选中.png') : require('@/assets/img/map/定位默认.png')"
                  style="float: right;margin-right: 0.1rem;width: 0.30rem;margin-top: 0.10rem;" />
              </div>
            </div>
            <div style="height:1.1rem;">
              <Row style="margin-top: 0.1rem;">
                <Col :span="12" class="midDiv">
                <div class="midlabel">起点：</div>
                <div class="midvalue">{{ item.startpoint }}</div>
                </Col>
                <Col :span="12" class="midDiv">
                <div class="midlabel">终点：</div>
                <div class="midvalue">{{ item.endpoint }}</div>
                </Col>
                <Col :span="12" class="midDiv">
                <div class="midlabel">主管长度：</div>
                <div class="midvalue">{{ item.linezg != '' && item.linezg != null ?
                  parseFloat(item.linezg).toFixed(2) : '--' }}米</div>
                </Col>
                <Col :span="12" class="midDiv">
                <div class="midlabel">支管长度：</div>
                <div class="midvalue">{{ item.linenotzg != '' && item.linenotzg != null ?
                  parseFloat(item.linenotzg).toFixed(2) : '--' }}米</div>
                </Col>
                <Col :span="12" class="midDiv">
                <div class="midlabel">雨水检查井：</div>
                <div class="midvalue">{{ item.jcj.yscount }}个</div>
                </Col>
                <Col :span="12" class="midDiv">
                <div class="midlabel">污水检查井：</div>
                <div class="midvalue">{{ item.jcj.wscount }}个</div>
                </Col>
              </Row>
            </div>
          </div>
          <div class="borderdiv"
            style="color:#fff;font-size: 0.16rem;vertical-align:middle;text-align: center;margin-top: 0.3rem;"
            v-show="tableList.length == 0">未查到数据</div>
        </div>
      </div>

      <div style="padding-top: 0.1rem;">
        <Page simple show-total :current="page.current" :total="page.total" @on-change="changePage" size="small"
          style="padding-right: 0.1rem;float: right;"></Page>
        <span style="color:#fff;font-size: 0.12rem;padding-left: 0.1rem;">共{{ page.total }}条</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/eventBus.js";
import { MapControl } from "@/components/arcgis_3x_map/js/MapControl.js";

export default {
  name: 'test3',
  components: {},
  data() {
    return {
      page: {
        pageSize: 10, //每页记录数
        current: 1, //当前页码
        total: 0,
        pageList: [
          {
            "qsdw": "水务集团",
            "jcj": {
              "yscount": 0,
              "count": 0,
              "wscount": 0
            },
            "endpoint": "终点",
            "shape": "LINESTRING(120.639684383 31.81893654,120.642785554 31.818971514)",
            "startpoint": "起点",
            "linezg": 293.63934,
            "name": "青龙村泵站",
            "length": 293.64,
            "linenotzg": 0
          },
          {
            "qsdw": "开发区",
            "jcj": {
              "yscount": 0,
              "count": 42,
              "wscount": 42
            },
            "endpoint": "终点",
            "shape": "LINESTRING(120.53353832 31.814566024,120.535166546 31.81448522,120.542722834 31.814061393)",
            "startpoint": "起点",
            "linezg": 1725.5732,
            "name": "华塘路",
            "length": 95856.19999999985,
            "linenotzg": 0
          },
          {
            "qsdw": "开发区",
            "jcj": {
              "yscount": 0,
              "count": 61,
              "wscount": 61
            },
            "endpoint": "终点",
            "shape": "MULTILINESTRING((120.611143166 31.894817738,120.610133187 31.891986096),(120.609187478 31.8887256,120.605873623 31.880057064,120.605365945 31.879908314,120.603061319 31.874042802))",
            "startpoint": "起点",
            "linezg": 2535.6243,
            "name": "农鹿路",
            "length": 1920318.5000000142,
            "linenotzg": 0
          },
          {
            "qsdw": "杨舍镇",
            "jcj": {
              "yscount": 233,
              "count": 250,
              "wscount": 17
            },
            "endpoint": "终点",
            "shape": "LINESTRING(120.502839605 31.88659841,120.507551058 31.885433212,120.509298855 31.88401471,120.522192025 31.879987177,120.530829689 31.877074182,120.531868235 31.875706341,120.536275724 31.874743786)",
            "startpoint": "起点",
            "linezg": 5778.7456,
            "name": "泗阳路",
            "length": 1966968.4000000234,
            "linenotzg": 159.707
          },
          {
            "qsdw": "杨舍镇",
            "jcj": {
              "yscount": 45,
              "count": 83,
              "wscount": 38
            },
            "endpoint": "终点",
            "shape": "LINESTRING(120.534448001 31.856415557,120.535035466 31.858171833,120.535347557 31.861011247)",
            "startpoint": "起点",
            "linezg": 1764.9641,
            "name": "小菜巷弄",
            "length": 78850,
            "linenotzg": 20.79844
          },
          {
            "qsdw": "杨舍镇",
            "jcj": {
              "yscount": 29,
              "count": 48,
              "wscount": 19
            },
            "endpoint": "终点",
            "shape": "LINESTRING(120.545655751 31.866095208,120.543884907 31.865574613,120.543561072 31.865494679,120.542917502 31.865468034)",
            "startpoint": "起点",
            "linezg": 762.3181,
            "name": "向阳弄",
            "length": 16746.820000000014,
            "linenotzg": 6.2696543
          },
          {
            "qsdw": "杨舍镇",
            "jcj": {
              "yscount": 58,
              "count": 58,
              "wscount": 0
            },
            "endpoint": "终点",
            "shape": "LINESTRING(120.538506386 31.868602529,120.538573011 31.869140287,120.540145834 31.869059385,120.540088727 31.868535904)",
            "startpoint": "起点",
            "linezg": 584.3973,
            "name": "茶亭弄",
            "length": 13902.720000000008,
            "linenotzg": 0
          },
          {
            "qsdw": "凤凰镇",
            "jcj": {
              "yscount": 87,
              "count": 176,
              "wscount": 89
            },
            "endpoint": "终点",
            "shape": "MULTILINESTRING((120.667484523 31.754792864,120.668130504 31.754895767),(120.667517158 31.754592621,120.668184535 31.754702684),(120.667566784 31.754409542,120.668311846 31.754523488),(120.667603478 31.754223248,120.668360257 31.754340481),(120.667658191 31.754039842,120.668378694 31.754160164),(120.66771131 31.753856671,120.668423367 31.753975563))",
            "startpoint": "起点",
            "linezg": 857.8368,
            "name": "杜家宕",
            "length": 108115.91999999975,
            "linenotzg": 220.62862
          },
          {
            "qsdw": "塘桥镇",
            "jcj": {
              "yscount": 120,
              "count": 263,
              "wscount": 143
            },
            "endpoint": "终点",
            "shape": "LINESTRING(120.679102395 31.806251461,120.681849028 31.807739545,120.68642779 31.809763335,120.689760594 31.809935033,120.692881076 31.810084372,120.694659662 31.809737307,120.699176973 31.809130567)",
            "startpoint": "起点",
            "linezg": 5642.7764,
            "name": "妙桥中路",
            "length": 872070.660000005,
            "linenotzg": 87.8579
          },
          {
            "qsdw": "杨舍镇",
            "jcj": {
              "yscount": 56,
              "count": 101,
              "wscount": 45
            },
            "endpoint": "终点",
            "shape": "LINESTRING(120.638420343 31.966015521,120.640215125 31.964730744,120.641847685 31.963452438,120.643112776 31.962567679)",
            "startpoint": "起点",
            "linezg": 2617.407,
            "name": "公园路",
            "length": 163715.44000000035,
            "linenotzg": 0
          }
        ]
      },
      selectId: -1, //已选择的编号

      tableList: []
    };
  },
  methods: {
    goto(item, ID) {
      this.selectId = ID;

      // let geometry = "POINT(" + item.x + " " + item.y + ")";
      // let geo = MapControl.WktToAgs(geometry);

      // // MapControl.showExtent(geo, 0);//地图定位

      // var gralyr1 = MapControl.graphicLayers["gralyr1"];
      // var gralyrList = gralyr1.graphics;
      // for (var l = 0; l < gralyrList.length; l++) {
      //   if (gralyrList[l].attributes.id == item.id) {
      //     gralyrList[l].symbol.url = require('@/assets/img/map/ic_flowmeter_online2.png');
      //   } else {
      //     gralyrList[l].symbol.url = require('@/assets/img/map/ic_flowmeter_online1.png');
      //   }
      //   //  MapControl.graphicLayers['gralyr1'].remove(gralyrList[k]) //移除
      // }
      // gralyr1.redraw();

      bus.$emit("botmDetail", "", item, item.title)
    },
    changePage(index) {
      this.page.current = index;
      this.page.total = this.page.pageList.length;

      var _start = (index - 1) * this.page.pageSize;
      var _end = index * this.page.pageSize;
      this.tableList = this.page.pageList.slice(_start, _end);
    },
    loadData() {
      let _this = this;
      this.changePage(1);

      let datalist = JSON.parse(JSON.stringify(this.page.pageList));
      // datalist.forEach(item => {
      //   item.geometry = "POINT(" + item.x + " " + item.y + ")";
      //   let shape = MapControl.WktToAgs(item.geometry);
      //   var obj = {
      //     geometry: shape,
      //     symbol: {
      //       type: "PictureMarkerSymbol", //SimpleMarkerSymbol 或者 PictureMarkerSymbol
      //       image: "ic_flowmeter_online1.png", //图片名称，带文件后缀(类型为PictureMarkerSymbol)
      //       height: 27, //图片高度(类型为PictureMarkerSymbol)
      //       width: 27 //图片宽度(类型为PictureMarkerSymbol)
      //     },
      //     isClear: false, //是否清除当前地图元素f
      //     attributes: item, //元素属性(可选)
      //     layer: "gralyr1",
      //     isdeviation: false
      //   };
      //   MapControl.addGraphic(obj);
      // });

      // var gralyr1 = MapControl.graphicLayers["gralyr1"];
      // gralyr1.onClick = function (val) {
      //   let value = val.graphic.attributes;

      //   let gralyrList = gralyr1.graphics;
      //   for (let k = 0; k < gralyrList.length; k++) {
      //     gralyrList[k].symbol.url = require('@/assets/img/map/ic_flowmeter_online1.png');
      //   }
      //   val.graphic.symbol.url = require('@/assets/img/map/ic_flowmeter_online2.png');
      //   gralyr1.redraw();

      //   // let geo = MapControl.WktToAgs("POINT(" + value.x + " " + value.y + ")");
      //   // MapControl.showExtent(geo, 0);//地图定位
      // };
    }
  },
  mounted() {
    var _this = this;
    this.loadData();
  },
  beforeDestroy() {
    MapControl.setMapClear();
  },
};
</script>

<style lang="less" scoped>
.test3 {
  .dialogtitles {
    font-size: 0.21rem;
    color: #fff;
    width: 3.2rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // position: absolute;
    font-weight: bold;
    float: left;
  }

  .midDiv {
    display: inline-block;
    width: 100%;
    height: 0.35rem;
    line-height: 0.35rem;
    padding-left: 0.1rem;

    .midlabel {
      font-size: 0.15rem;
      display: inline-block;
      color: #40d2ff;
    }

    .midvalue {
      font-size: 0.16rem;
      display: contents;
      color: #ffffff;
    }
  }
}
</style>
