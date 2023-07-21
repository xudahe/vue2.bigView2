<template>
  <div style="height:100%;width:100%;" class="test1 bgActive collapse simple_page">
    <div style="padding: 0.05rem;height: 100%;">
      <div style="overflow: auto;height: calc(100% - 0.4rem);" class="borderdiv">
        <div style="overflow: auto;height: 100%;" class="pointQyery_div borderdiv">
          <div :key="'coll' + index" v-for="(item, index) in tableList" @click="goto(item, index)"
            style="margin-bottom: 0.1rem;cursor: pointer;padding: 0.1rem 0;"
            :class="index == selectId ? 'bgActiveT' : 'bgActiveF'">
            <div style="height: 30px;line-height: 30px;padding-left: 0.1rem;">
              <div class="dialogtitles" :title="item.name">{{ item.名称 }}</div>
              <!-- <div style="float: right;margin-right: 0.1rem;" :style="{ color: item.状态 == '0' ? 'red' : '#00ff37' }">
                {{ item.状态 == '0' ? '关闭' : '运行' }}
              </div> -->
            </div>
            <Row style="margin-top: 0.1rem;">
              <Col :span="12" class="midDiv">
              <div class="midlabel">瞬时流量：</div>
              <div class="midvalue">{{ item.瞬时流量 }} m³/h</div>
              </Col>
              <Col :span="12" class="midDiv">
              <div class="midlabel">前池液位：</div>
              <div class="midvalue">{{ item.前池液位 }} m</div>
              </Col>
              <Col :span="24" class="midDiv">
              <div class="midlabel">更新时间：</div>
              <div class="midvalue">{{ item.更新时间 }}</div>
              </Col>
            </Row>
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
  name: 'test1',
  components: {},
  data() {
    return {
      page: {
        pageSize: 10, //每页记录数
        current: 1, //当前页码
        total: 0,
        pageList: [
          { id: 1, 名称: "第一污水处理厂", 瞬时流量: "14061.06", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.56725078 + ' ' + 31.86439618 + ' )' },
          { id: 2, 名称: "第二污水处理厂", 瞬时流量: "14061.06", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.50900393 + ' ' + 31.88058599 + ' )' },
          { id: 3, 名称: "第三污水处理厂", 瞬时流量: "14061.06", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.58104364 + ' ' + 31.89622211 + ' )' },
          { id: 4, 名称: "乐余片区污水处理厂", 瞬时流量: "1406106", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.69277791 + ' ' + 31.91568027 + ' )' },
          { id: 5, 名称: "锦丰片区污水处理厂", 瞬时流量: "14061.06", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.60801190 + ' ' + 31.93865659 + ' )' },
          { id: 6, 名称: "城南污水处理厂", 瞬时流量: "14061.06", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.55808153 + ' ' + 31.82806306 + ' )' },
          { id: 7, 名称: "塘桥片区污水处理厂", 瞬时流量: "14061.06", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.60843196 + ' ' + 31.81217365 + ' )' },
          { id: 8, 名称: "金港片区污水处理厂", 瞬时流量: "14061.06", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.41325767 + ' ' + 31.93841953 + ' )' },
          { id: 9, 名称: "常明沙区污水处理厂", 瞬时流量: "14061.06", 前池液位: "4.79", 更新时间: "2023-02-22 10:58:57", shape: 'POINT (' + 120.76748367 + ' ' + 31.86266532 + ' )' },
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

      bus.$emit("botmDetail", "", item, item.title);
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
.test1 {

  .dialogtitles {
    font-size: 0.21rem;
    color: #fff;
    width: 3.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    // position: absolute;
    font-weight: bold;
    float: left;
  }

  .midDiv {
    width: 100%;
    height: 30px;
    line-height: 30px;
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
