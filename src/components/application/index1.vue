<!-- 布局页面 -->
<template>
  <div id="appComponts4" style="width:100%;height: 100%;">
    <!-- 弹出框 -->
    <div v-if="isdialog">
      <v-dialog ref="dialog" v-model="dialog.show" :title="dialog.title" :buttons="dialog.buttons"
        :bodyshow="dialog.bodyshow" @input="detailclose('dialogdetail')">
        <component :is="componentDialog" v-bind:detailData="dialogDetailData"></component>
      </v-dialog>
    </div>

    <!-- 左侧菜单 -->
    <div class="appMenu push-in-right" v-show="menuScale">
      <div :key="index" v-for="(item, index) in menuData" :style="index == 0 ? { margintop: '0.15rem' } : ''"
        @click="changeMenu(item, index)" :class="[(menuFlag == index ? 'menuSel' : 'menuNor'), 'menuCont', 'button22']">
        <div class="menuImg">
          <img :src="menuFlag == index ? item.imgT : item.imgF" class="menuContImg" />
        </div>
        <div class="menuContText"><span :class="menuFlag == index ? 'actives' : ''">{{ item.menuname }}</span></div>
      </div>
    </div>

    <!--伸缩栏-->
    <div :style="{ marginLeft: menuScale ? '-0.20rem' : '-0.05rem' }"
      style="height: 100%;;width: 0.2rem; position: relative;float: left;">
      <div :class="menuScale ? 'imgReturnT' : 'imgReturnF'">
        <div style="position: relative;cursor: pointer;top: 38%;height: 15%;" :title="menuScale ? '收缩' : '展开'"
          @click="menuScale = !menuScale">
        </div>
      </div>
    </div>

    <div class="appCompontsL" :style="{ width: menuScale ? 'calc(100% - 2.2rem)' : 'calc(100% - 0.15rem)' }">
      <!-- 左侧框 -->
      <div class="appCompontsContLeft fade-in-right" :style="{ width: pageWidth + 'rem' }" v-if="showDetailLeft">
        <div class="appCompontsContLeftDiv">
          <div class="titleCont titleContImg">
            <div class="titleContText">{{ titleLeftName }}</div>
            <div class="titleRight">
              <Icon class="closeIcon" type="ios-close-circle-outline" @click="detailclose('leftMenu')" />
            </div>
          </div>
          <div style="width: 100%;height: calc(100% - 0.4rem);">
            <component :is="componentLeft" v-bind:detailData="leftDetailData"></component>
          </div>
        </div>
      </div>

      <!-- 全屏框/半框 -->
      <div class="appCompontsScreen  scale-in" :style="{ width: pageWidth }" v-if="showDetailScreen">
        <div class="appCompontsScreenDiv">
          <div class="titleCont titleContImgT" style="width:100%">
            <div class="titleContText">{{ titleScreenName }}</div>
            <div class="titleRight">
              <Icon class="closeIcon" type="ios-close-circle-outline" @click="detailclose('screendetail')" />
            </div>
          </div>
          <div style="width: 100%;height: calc(100% - 0.4rem);">
            <component :is="componentLeft" v-bind:detailData="screenDetailData"></component>
          </div>
        </div>
      </div>

      <div class="appCompontsRight" :style="{ height: '100%', width: mapWidth, padding: mapPadding }" v-show="isMapShow">
        <!-- 中间地图 -->
        <div class="appCompontsContMap scale-in" :style="{ height: mapHeight, width: '100%' }">
          <!--arcgisMap 上添加滤镜 class="tmap"-->
          <arcgisMap v-if="this.$store.getters.mapitems.length == 0" class="tmap"></arcgisMap>
          <splitView ref="splitView" :items="this.$store.getters.mapitems" v-else></splitView>
        </div>

        <!-- 底部框 -->
        <div class="appCompontsContDetail fade-in-up" :style="{ height: botmHeight, width: '100%' }"
          v-if="showDetailBotm">
          <div class="appCompontsContDetailDiv">
            <div class="titleCont titleContImg" :style="{ borderBottom: botmShow ? '1px solid #0161ba' : 'none' }">
              <div class="titleContText">{{ titleBotmName }}</div>
              <div class="titleRight">
                <Tooltip :content="botmShow ? '收缩' : '展开'" placement="right" style="height: 100%;">
                  <Icon class="closeIcon" :type="botmShow ? 'ios-arrow-dropdown' : 'ios-arrow-dropup'"
                    @click="detailShow('botmdetail', !botmShow)" />
                </Tooltip>
                <Icon class="closeIcon" type="ios-close-circle-outline" @click="detailclose('botmdetail')" />
              </div>
            </div>
            <div style="width: 100%;height: calc(100% - 0.4rem);" v-show="botmShow">
              <component :is="componentBotm" v-bind:detailData="botmDetailData"></component>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧框 -->
      <div class="appCompontsContLeft fade-in-left" :style="{ width: pageWidth + 'rem' }" v-if="showDetailRight">
        <div class="appCompontsContLeftDiv">
          <div class="titleCont titleContImg">
            <div class="titleContText">{{ titleRightName }}</div>
            <div class="titleRight">
              <Icon class="closeIcon" type="ios-close-circle-outline" @click="detailclose('rightdetail')" />
            </div>
          </div>
          <div style="width: 100%;height: calc(100% - 0.4rem);">
            <component :is="componentRight" v-bind:detailData="rightDetailData"></component>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>
  
  
<script>
import bus from "@/eventBus.js";
import { MapControl } from "@/components/arcgis_map/js/MapControl.js";
import arcgisMap from "@/components/arcgis_map/index.vue";
import splitView from "@/components/arcgis_map/split/splitView.vue";
import vDialog from "@/components/dialog/dialog.vue";

export default {
  name: "application",
  components: {
    arcgisMap,
    splitView,
    vDialog
  },
  watch: {
    // 监测路由变化,只要变化了就获取路由参数重新加载菜单
    $route(to, from) {
      var _this = this;
      // to为跳转之后的路由
      _this.oldindex = null;
      var menuid = _this.menuid = this.$route.query.id

      _this.getMenus(menuid);
      _this.detailclose("leftMenu");
      _this.menuFlag = -1;
    }
  },
  props: {},
  data() {
    return {
      dialog: {
        show: false,
        title: {
          text: '',
          className: 'xa-bg-blue'
        },
        bodyshow: true,
      },
      isdialog: false,
      dialogDetailData: {},

      menuid: null,

      menuFlag: -1, //左侧菜单选中标识
      menuData: [], //左侧菜单数据集合
      oldindex: null,

      //组件名称
      componentLeft: "", //左侧框
      componentBotm: "", //底部框
      componentRight: "",//右侧框

      //详情框头部名称
      titleLeftName: "",
      titleBotmName: "",
      titleRightName: "",
      titleScreenName: "",

      leftDetailData: {},
      botmDetailData: {},
      rightDetailData: {},
      screenDetailData: {},

      pageWidth: 4.5, //列表宽度
      mapWidth: '100%',  //中间地图宽度
      mapHeight: '100%', //中间地图高度
      mapPadding: '0.1rem',
      botmHeight: '50%', //底部详情框高度
      botmShow: true,    //底部详情框显示隐藏

      showDetailLeft: false,
      showDetailBotm: false,
      showDetailRight: false,
      showDetailScreen: false,

      isMapShow: true, //显示地图
      menuScale: true, //显示左侧菜单栏
    };
  },
  methods: {
    changeMenu(item, index) {
      //重复点击 不执行
      if (this.oldindex == index && (this.showDetailLeft || this.showDetailRight || this.showDetailBotm || this.showDetailScreen || this.isdialog))
        return;

      MapControl.setMapClear();

      this.initial();
      this.detailclose();

      this.isMapShow = true;
      this.menuFlag = this.oldindex = index;

      switch (item.note) {
        case "左侧":
          this.showDetailLeft = true;
          this.pageWidth = 4.5;
          this.mapWidth = 'calc(100% - ' + (this.pageWidth + 0.2) + 'rem)';
          this.mapPadding = '0.1rem 0.1rem 0.1rem 0';
          this.leftDetailData = item;
          this.titleLeftName = item.menuname;
          this.componentLeft = item.classname;
          break;
        case "右侧":
          this.showDetailRight = true;
          this.pageWidth = 4.5;
          this.mapWidth = 'calc(100% - ' + (this.pageWidth + 0.2) + 'rem)';
          this.mapPadding = '0.1rem 0 0.1rem 0.1rem';
          this.rightDetailData = item;
          this.titleRightName = item.menuname;
          this.componentRight = item.classname;
          this.componentLeft = item.classname;
          break;
        case "下侧":
          this.showDetailBotm = true;
          this.botmShow = true;
          this.botmHeight = '35%';
          this.mapWidth = '100%';
          this.mapHeight = 'calc(100% - ' + (this.botmHeight) + ')';
          this.mapPadding = '0.1rem';
          this.botmDetailData = item;
          this.componentBotm = item.classname;
          this.titleBotmName = item.menuname;
          break;
        case "半屏":
          this.showDetailScreen = true;
          this.pageWidth = 'calc(50% - ' + (0.2) + 'rem)';
          this.mapWidth = 'calc(50% - ' + (0) + 'rem)';
          this.mapPadding = '0.1rem 0.1rem 0.1rem 0';
          this.titleScreenName = item.menuname;
          this.componentLeft = item.classname;
          break;
        case "全屏":
          this.isMapShow = false;
          this.showDetailScreen = true;
          this.pageWidth = 'calc(100% - ' + (0.2) + 'rem)';
          this.screenDetailData = item;
          this.titleScreenName = item.menuname;
          this.componentLeft = item.classname;
          break;
        case "弹出窗":
          this.dialog.show = this.isdialog = true;
          this.dialogDetailData = item;
          this.dialog.title.text = item.menuname;
          this.componentDialog = item.classname;
          setTimeout(() => {
            this.$refs.dialog.retresize();
          }, 200);
          break;
      }
    },
    initial() {
      this.titleLeftName = "";
      this.titleBotmName = "";
      this.titleRightName = "";
      this.titleScreenName = "";
      this.dialog.title.text = "";

      this.leftDetailData = {};
      this.botmDetailData = {};
      this.rightDetailData = {};
      this.screenDetailData = {};
      this.dialogDetailData = {};
    },
    detailclose(type) {
      this.isMapShow = true; //关闭组件时，将地图显示出来
      this.mapHeight = '100%';

      if (type == "leftMenu") {
        this.showDetailLeft = false;
        this.pageWidth = 0;
        this.mapWidth = '100%';
        MapControl.setMapClear();
      }
      else if (type == "botmdetail") {
        this.mapWidth = 'calc(100% - ' + (this.pageWidth + 0.2) + 'rem)';
        this.showDetailBotm = false;
      }
      else if (type == "screendetail") {
        this.mapWidth = '100%';
        this.showDetailScreen = false;
      }
      else if (type == "rightdetail") {
        this.mapWidth = 'calc(100% - ' + (this.pageWidth + 0.2) + 'rem)';
        this.showDetailRight = false;
      } else if (type == "dialogdetail") {
        this.isdialog = false;
      }
      else {
        this.menuScale = true;
        this.pageWidth = 0;
        this.mapWidth = '100%';
        this.showDetailLeft = false;
        this.showDetailRight = false;
        this.showDetailBotm = false;
        this.showDetailScreen = false;
        this.dialog.show = false;
      }
    },
    getMenus(menuid) {
      var _this = this;
      _this.detailclose();
      _this.menuData = [];
      let children = [
        { id: 1, classname: "test1", menuname: "二级菜单", img: "", systemid: 32, note: "左侧" },
        { id: 2, classname: "test2", menuname: "二级菜单", img: "", systemid: 32, note: "左侧" },
        { id: 3, classname: "test3", menuname: "二级菜单", img: "", systemid: 32, note: "右侧" },
        { id: 4, classname: "test", menuname: "二级菜单", img: "", systemid: 32, note: "下侧" },
        { id: 5, classname: "test5", menuname: "二级菜单", img: "", systemid: 32, note: "左侧" },
        { id: 6, classname: "test", menuname: "二级菜单", img: "", systemid: 32, note: "全屏" },
        { id: 7, classname: "test", menuname: "二级菜单", img: "", systemid: 32, note: "半屏" },
        { id: 8, classname: "test6", menuname: "二级菜单", img: "", systemid: 32, note: "弹出窗" },
        { id: 9, classname: "test4", menuname: "二级菜单", img: "", systemid: 32, note: "弹出窗" },
      ]
      for (let l = 0; l < children.length; l++) {
        _this.menuData.push({
          classname: children[l].classname,
          id: children[l].id,
          img: children[l].img,
          menuname: children[l].menuname,
          systemid: children[l].systemid,
          note: children[l].note,
          imgT: "",
          imgF: "",
        })
      }
    },
    detailShow(type, flag) {
      if (type == "botmdetail") {
        this.botmShow = flag;
        this.botmHeight = this.botmShow ? '50%' : '0.4rem';
        this.mapHeight = 'calc(100% - ' + (this.botmHeight) + ')'
      }
    },
  },
  created() {
    this.mapWidth = '100%';
  },
  mounted() {
    let _this = this;

    var menuid = _this.menuid = this.$route.query.id;
    _this.getMenus(menuid);
    _this.menuFlag = -1;

    //左侧菜单切换事件
    bus.$on("changeMenu", function (value) {
      for (let i = 0; i < _this.menuData.length; i++) {
        if (value == _this.menuData[i].menuname || value == _this.menuData[i].id) {
          setTimeout(() => {
            _this.menuFlag = i;
            _this.changeMenu(_this.menuData[i], i)
          }, 200);
        }
      }
    })

    // 返回左侧框
    bus.$on("showLeftMenu", function () {
      _this.showDetailLeft = true;

      _this.mapWidth = 'calc(100% - ' + (_this.pageWidth + 0.2) + 'rem)';
    });

    //底部框
    bus.$on("botmDetail", function (componentName, item, title) {
      _this.showDetailBotm = true;
      _this.botmShow = true;

      _this.botmDetailData = item;
      _this.componentBotm = componentName;
      _this.titleBotmName = title;

      _this.botmHeight = '50%';
      _this.mapHeight = 'calc(100% - ' + (_this.botmHeight) + ')';

      if (_this.showDetailLeft) {
        _this.mapWidth = 'calc(100% - ' + (_this.pageWidth + 0.2) + 'rem)';
      } else if (_this.showDetailRight) {
        _this.mapWidth = 'calc(100% - ' + (_this.pageWidth + 0.2) + 'rem)'
      } else {
        _this.mapWidth = '100%';
        _this.mapPadding = '0.1rem';
      }
    });

    //右侧框
    bus.$on("rightDetail", function (componentName, item, title) {
      _this.showDetailRight = true;
      _this.rightDetailData = item;
      _this.componentRight = componentName;
      _this.titleRightName = title;

      _this.mapWidth = 'calc(100% - ' + (_this.pageWidth * 2 + 0.2 * 2) + 'rem)';
      if (_this.showDetailLeft) {
        _this.mapPadding = '0.1rem 0';
      }
    });

    //关闭详情框
    _this.detailclose();
    bus.$on("detailclose", function (value) {
      _this.detailclose(value);
    });

  },
  beforeDestroy() {
    bus.$off("changeMenu");
    bus.$off("showLeftMenu");
    bus.$off("botmDetail");
    bus.$off("rightDetail");
    bus.$off("detailclose");
  },
}
</script>
  
<style lang="less"></style>
  