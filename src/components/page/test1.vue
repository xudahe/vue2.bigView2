<template>
  <div style="height:100%;width:100%;" class="test1 bgActive collapse simple_page">
    <div style="padding: 0.05rem;height: 100%;">
      <div style="overflow: auto;height: calc(100% - 0.4rem);" class="borderdiv">
        <div :class="index == selectId ? 'bgActiveT' : 'bgActiveF bgActive'"
          style="padding:0.05rem;margin-bottom: 0.05rem;cursor:pointer;position: relative;" @click="goto(item, index)"
          v-for="(item, index) in tableList" :key="index" :id="index">
          <div style="display: inline-block;width:100%; height: 0.2rem;">
            <div class="row at-row no-gutter" style="width: 32px;float: left;position: relative;">
              <div class="circle" />
              <label
                style="font-size: 0.12rem;position: absolute; top:0%;left:20%; color:white; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                v-if="index + 1 == 10">{{ index + 1 }}</label>
              <label
                style="font-size: 0.12rem;position: absolute; top:0%;left: 32%; color:white; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                v-else>{{ index + 1 }}</label>
            </div>
            <label style="font-family: '微软雅黑';float: left; font-size: 0.12rem;color: #fff;font-weight: bolder;">{{
                item.title
            }}</label>
            <i class="icon icon-map-pin" style="float:right;color: #2d8cf0;"></i>
          </div>
          <!-- <div style="display: inline-block;position: relative;vertical-align: middle;text-align: center;">
            <div style="width: 0.35rem;height: 0.35rem;border-radius: 50%;background-color: #135e73;"></div>
            <div style="width: 0.25rem;height: 0.25rem;border-radius: 50%;background-color: rgb(0,152,152);position: absolute;top: 0.05rem;left: 0.05rem;"></div>
            <div style="text-align: center;width: 100%;line-height: 0.35rem;position: absolute;top: 0;left: 0;color: #fff;font-size: 0.16rem;">
              {{index+1}}
            </div>
          </div> -->
          <div style="float: left;cursor: pointer;">
            <img :src="require('@/assets/img/暂无图片.png')" v-viewer style="width: 0.5rem;height: 0.55rem;" />
          </div>
          <div style="display: inline-block;cursor: pointer;width: calc(100% - 0.7rem);padding-left: 0.05rem;">
            <Row type="flex" align="middle" style="height: 100%;">
              <Col span="24">
              <span class="resultLable">字段名称：</span>
              <span :title="item.title" class="rsultValue">{{ item.title }}</span>
              </Col>
              <Col span="24">
              <span class="resultLable">字段名称：</span>
              <span :title="item.title" class="rsultValue">{{ item.title }}</span>
              </Col>
              <Col span="24">
              <span class="resultLable">字段名称：</span>
              <span :title="item.title" class="rsultValue">{{ item.title }}</span>
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <div class="row at-row flex-end" style="padding-top: 0.1rem;">
        <Page simple show-total :current="page.current" :total="page.total" @on-change="changePage" size="small"
          style="padding-right: 0.1rem;float: right;"></Page>
        <span style="color:#fff;font-size: 0.12rem;padding-left: 0.1rem;">共{{ page.total }}条</span>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/eventBus.js";
import { MapControl } from "@/components/arcgis_map/js/MapControl.js";

export default {
  name:'test1',
  components: {},
  data() {
    return {
      page: {
        pageSize: 10, //每页记录数
        current: 1, //当前页码
        total: 0,
        pageList: [
          { id: 1, title: "某某1", x: "118.75596318", y: "32.04079632" },
          { id: 2, title: "某某2", x: "118.80705517", y: "32.10048969" },
          { id: 3, title: "某某3", x: "118.80566318", y: "32.10449283" },
          { id: 4, title: "某某4", x: "118.80070507", y: "32.10006197" },
          { id: 5, title: "某某5", x: "118.79423849", y: "32.09702295" },
          { id: 6, title: "某某6", x: "118.89153772", y: "32.05832442" },
          { id: 7, title: "某某7", x: "118.89252052", y: "32.05729316" }
        ]
      },
      selectId: -1, //已选择的编号

      titlename: "缩略图",
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

<style lang="less">
.test1 {
  .circle {
    margin-left: 5px;
    width: 18px;
    height: 18px;
    border-radius: 9px;
    background: red;
    vertical-align: bottom;
  }

  .resultLable {
    font-size: 0.12rem;
    color: rgba(255, 255, 255, 0.5);
    display: block;
    width: 0.6rem;
    overflow: hidden;
    white-space: nowrap;
    float: left;
    text-align: left;
    padding-left: 0.05rem;
  }

  .rsultValue {
    font-size: 0.12rem;
    color: #fff;
    margin-left: 5px;
    display: block;
    float: left;
    text-align: left;

    width: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
