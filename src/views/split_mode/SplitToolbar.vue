<script>
var render = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "split-tools" },
    [
      _c("span", { staticStyle: { "margin-left": "5px" } }, [
        _vm._v("分屏对比"),
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "toolbar" },
        _vm._l(_vm.iconList, function (item, index) {
          return _c(
            "span",
            {
              key: index,
              staticClass: "tool-item",
              class: { selected: _vm.isSelect === index },
              on: {
                click: function ($event) {
                  return _vm.toolClick(item.name);
                },
              },
            },
            [_c("i", { staticClass: "iconfont iconfont", class: item.class })]
          );
        }),
        0
      ),
      _vm._v(" "),
      _vm.$store.state.map.splitScreens.length < 6
        ? _c(
          "span",
          {
            staticClass: "tool-item",
            staticStyle: { position: "absolute", right: "80px", top: "0px" },
            on: { click: _vm.addSplitScreen },
          },
          [_c("i", { staticClass: "el-icon-plus" })]
        )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "el-dropdown",
        {
          staticClass: "tool-item",
          staticStyle: {
            position: "absolute",
            right: "50px",
            top: "0px",
            color: "white",
          },
          attrs: { trigger: "click" },
          on: { command: _vm.changeLayout },
        },
        [
          _c("span", { staticClass: "el-dropdown-link" }, [
            _c("i", { staticClass: "el-icon-setting" }),
          ]),
          _vm._v(" "),
          _c(
            "el-dropdown-menu",
            _vm._l(_vm.selectLayout, function (item) {
              return _c(
                "el-dropdown-item",
                {
                  key: item.id,
                  attrs: {
                    // divided: true,
                    command: item.id,
                    value: item.title,
                  },
                },
                [_vm._v(_vm._s(item.title))]
              );
            }),
            1
          ),
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "span",
        {
          staticClass: "tool-item",
          staticStyle: { position: "absolute", right: "20px", top: "0px" },
          on: { click: _vm.quitSplitMode },
        },
        [_c("i", { staticClass: "el-icon-switch-button" })]
      ),
    ],
    1
  );
};
var staticRenderFns = [];

import { loadModules } from "esri-loader";
import EventBus from "@/eventBus";
import { MapControl } from "@/components/arcgis_map/js/MapControl";

var esExports = { render: render, staticRenderFns: staticRenderFns };
export default {
  name: "SplitToolbar",
  ...esExports,
  components: {

  },
  data: function data() {
    return {
      isSelect: -1,
      queryVisible: false,
      iconList: [
        {
          class: "el-icon-warning-outline",
          name: "属性查询",
          key: 0,
        },
        {
          class: "el-icon-zoom-in",
          name: "放大",
        },
        {
          class: "el-icon-zoom-out",
          name: "缩小",
        },
        {
          class: "el-icon-full-screen",
          name: "全图",
        },
        {
          class: "el-icon-delete",
          name: "痕迹清除",
        },
      ],
    };
  },
  computed: {
    selectLayout: function selectLayout() {
      var layouts = [];
      var screens = this.$store.state.map.splitScreens;
      switch (screens.length) {
        case 2:
          for (var i = 1; i < 4; i++) {
            var layout = {
              id: "",
              title: "",
            };
            layout.id = "s2-" + i;
            layout.title = "布局" + i;
            layouts.push(layout);
          }
          break;
        case 3:
          for (var _i = 1; _i < 6; _i++) {
            var _layout = {
              id: "",
              title: "",
            };
            _layout.id = "s3-" + _i;
            _layout.title = "布局" + _i;
            layouts.push(_layout);
          }
          break;
        case 4:
          for (var _i2 = 1; _i2 < 5; _i2++) {
            var _layout2 = {
              id: "",
              title: "",
            };
            _layout2.id = "s4-" + _i2;
            _layout2.title = "布局" + _i2;
            layouts.push(_layout2);
          }
          break;
        case 5:
          for (var _i3 = 1; _i3 < 6; _i3++) {
            var _layout3 = {
              id: "",
              title: "",
            };
            _layout3.id = "s5-" + _i3;
            _layout3.title = "布局" + _i3;
            layouts.push(_layout3);
          }
          break;
        case 6:
          for (var _i4 = 1; _i4 < 8; _i4++) {
            var _layout4 = {
              id: "",
              title: "",
            };
            _layout4.id = "s6-" + _i4;
            _layout4.title = "布局" + _i4;
            layouts.push(_layout4);
          }
          break;
        default:
          break;
      }
      return layouts;
    },
  },
  beforeDestroy: function beforeDestroy() {

  },

  methods: {
    toolClick: function toolClick(name) {
      switch (name) {
        case "属性查询":
          this.attrSearch();
          break;
        case "放大":
          this.getZoomIn();
          break;
        case "缩小":
          this.getZoomOut();
          break;
        case "全图":
          this.getFullExtent();
          break;
        // case "距离测量":
        //   this.setActiveMeasure();
        //   break;
        // case "面积测量":
        //   this.setActiveMeasure();
        //   break;
        case "痕迹清除":
          this.deleteTool();
      }
    },
    attrSearch: function attrSearch() {
      this.queryVisible = !this.queryVisible;
      this.$store.commit("queryVisible", this.queryVisible);
    },
    getZoomIn: function getZoomIn() {
      loadModules(
        ['esri/map', 'esri/toolbars/navigation']).then(
          ([Map, Navigation]) => {

            for (let key in MapControl.mapArr) {
              var navToolbar = MapControl.navToolbar[key];
              navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
            }
          }
        ).catch(err => {
          console.error(err);
        })
    },
    getZoomOut: function getZoomOut() {
      loadModules(
        ['esri/map', 'esri/toolbars/navigation']).then(
          ([Map, Navigation]) => {
            for (let key in MapControl.mapArr) {
              var navToolbar = MapControl.navToolbar[key];
              navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
            }
          }
        ).catch(err => {
          console.error(err);
        })
    },
    getFullExtent: function getFullExtent() {
      // let extent = ;

      // for (let key in MapControl.mapArr) {
      //   let map = MapControl.mapArr[key];

      //   let mapExtent = new esri.geometry.Extent(
      //     extent.xmin,
      //     extent.ymin,
      //     extent.xmax,
      //     extent.ymax,
      //     map.spatialReference
      //   );
      //   map.setExtent(mapExtent);
      // }
    },
    deleteTool: function deleteTool() {
      for (let key in MapControl.mapArr) {
        var navToolbar = MapControl.navToolbar[key];
        if (navToolbar) {
          navToolbar.deactivate();
        }
        let toolbar = MapControl.drawToolbar[key];
        if (toolbar) {
          toolbar.deactivate();
        }
        let editbar = MapControl.editToolbar[key];
        if (editbar) {
          editbar.deactivate();
        }
      }
    },
    quitSplitMode: function quitSplitMode() {
      MapControl.mapArr = {};
      MapControl.MapDestroy();

      this.$store.commit("splitMapId", '');
      this.$store.commit("splitScreens", []);

      EventBus.$emit("quitSplitMode")
    },
    addSplitScreen: function addSplitScreen() {
      var screens = this.$store.state.map.splitScreens;

      // var topicList = this.$store.state.map.topicList;
      var index = screens.length + 1;
      var splitScreen = {
        screenId: "\u5206\u5C4F" + index,
        screenIndex: index,
        featureId: "FEATUREID" //topicList[topicList.length - 1].FEATUREID,
      };
      screens.push(splitScreen);
      // 这里有一个Bug，当分屏先减到一个，再增加的时候，样式因为手写覆盖无法复原，暂用代码重置样式
      /* if (screens.length === 2) {
        document.getElementById('split-map1').style = "width:50%;height:100%;float:left;";
      } */
    },

    //根据布局选择设置分屏样式，CSS能力有限，只能用js了
    changeLayout: function changeLayout(command) {
      var splitElements = [];
      switch (command) {
        case "s2-1":
          /* document.getElementById('split-map1').style = "width:50%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:50%;height:100%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.two-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout3");
          });
          break;
        case "s2-2":
          /* document.getElementById('split-map1').style = "width:100%;height:60%;float:left;";
          document.getElementById('split-map2').style = "width:100%;height:40%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.two-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout3");
            element.classList.add("layout2");
          });
          break;
        case "s2-3":
          /* document.getElementById('split-map1').style = "width:70%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:30%;height:100%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.two-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2");
            element.classList.add("layout3");
          });
          break;
        case "s3-1":
          /* document.getElementById('split-map1').style = "width:70%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:30%;height:50%;float:left;";
          document.getElementById('split-map3').style = "width:30%;height:50%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.three-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout2",
              "layout3",
              "layout4",
              "layout5"
            );
          });
          break;
        case "s3-2":
          /* document.getElementById('split-map1').style = "width:33.3%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:33.3%;height:100%;float:left;";
          document.getElementById('split-map3').style = "width:33.3%;height:100%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.three-screen"
          );
          console.log("splitsss", splitElements);
          splitElements.forEach(function (element) {
            element.classList.remove("layout3", "layout4", "layout5");
            element.classList.add("layout2");
          });
          break;
        case "s3-3":
          /* document.getElementById('split-map1').style = "width:40%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:30%;height:100%;float:left;";
          document.getElementById('split-map3').style = "width:30%;height:100%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.three-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout4", "layout5");
            element.classList.add("layout3");
          });
          break;
        case "s3-4":
          /* document.getElementById('split-map1').style = "width:30%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:40%;height:100%;float:left;";
          document.getElementById('split-map3').style = "width:30%;height:100%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.three-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout3", "layout5");
            element.classList.add("layout4");
          });
          break;
        case "s3-5":
          /* document.getElementById('split-map1').style = "width:100%;height:60%;float:left;";
          document.getElementById('split-map2').style = "width:50%;height:40%;float:left;";
          document.getElementById('split-map3').style = "width:50%;height:40%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.three-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout3", "layout4");
            element.classList.add("layout5");
          });
          break;
        case "s4-1":
          /* document.getElementById('split-map1').style = "width:50%;height:50%;float:left;";
          document.getElementById('split-map2').style = "width:50%;height:50%;float:left;";
          document.getElementById('split-map3').style = "width:50%;height:50%;float:left;";
          document.getElementById('split-map4').style = "width:50%;height:50%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.four-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout3", "layout4");
          });
          break;
        case "s4-2":
          /* document.getElementById('split-map1').style = "width:70%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:30%;height:33.3%;float:left;";
          document.getElementById('split-map3').style = "width:30%;height:33.3%;float:left;";
          document.getElementById('split-map4').style = "width:30%;height:33.3%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.four-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout3", "layout4");
            element.classList.add("layout2");
          });
          break;
        case "s4-3":
          /* document.getElementById('split-map1').style = "width:40%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:20%;height:100%;float:left;";
          document.getElementById('split-map3').style = "width:20%;height:100%;float:left;";
          document.getElementById('split-map4').style = "width:20%;height:100%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.four-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout4");
            element.classList.add("layout3");
          });
          break;
        case "s4-4":
          /* document.getElementById('split-map1').style = "width:100%;height:60%;float:left;";
          document.getElementById('split-map2').style = "width:33.3%;height:40%;float:left;";
          document.getElementById('split-map3').style = "width:33.3%;height:40%;float:left;";
          document.getElementById('split-map4').style = "width:33.3%;height:40%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.four-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout3");
            element.classList.add("layout4");
          });
          break;
        case "s5-1":
          /* document.getElementById('split-map1').style = "width:50%;height:100%;float:left;";
          document.getElementById('split-map2').style = "width:25%;height:50%;float:left;";
          document.getElementById('split-map3').style = "width:25%;height:50%;float:left;";
          document.getElementById('split-map4').style = "width:25%;height:50%;float:left;";
          document.getElementById('split-map5').style = "width:25%;height:50%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.five-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout2",
              "layout3",
              "layout4",
              "layout5"
            );
          });
          break;
        case "s5-2":
          /* document.getElementById('split-map1').style = "width:66.6%;height:50%;float:left;";
          document.getElementById('split-map2').style = "width:33.4%;height:50%;float:left;";
          document.getElementById('split-map3').style = "width:33.3%;height:50%;float:left;";
          document.getElementById('split-map4').style = "width:33.3%;height:50%;float:left;";
          document.getElementById('split-map5').style = "width:33.4%;height:50%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.five-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout3", "layout4", "layout5");
            element.classList.add("layout2");
          });
          break;
        case "s5-3":
          /* document.getElementById('split-map1').style = "width:100%;height:60%;float:left;";
          document.getElementById('split-map2').style = "width:25%;height:40%;float:left;";
          document.getElementById('split-map3').style = "width:25%;height:40%;float:left;";
          document.getElementById('split-map4').style = "width:25%;height:40%;float:left;";
          document.getElementById('split-map5').style = "width:25%;height:40%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.five-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout4", "layout5");
            element.classList.add("layout3");
          });
          break;
        case "s5-4":
          /* document.getElementById('split-map1').style = "width:25%;height:50%;float:left;";
          document.getElementById('split-map2').style = "width:25%;height:50%;position:absolute;top:50%;left:0%;";
          document.getElementById('split-map3').style = "width:50%;height:100%;position:absolute;top:0%;left:25%;";
          document.getElementById('split-map4').style = "width:25%;height:50%;position:absolute;top:0%;left:75%;";
          document.getElementById('split-map5').style = "width:25%;height:50%;position:absolute;top:50%;left:75%;"; */
          splitElements = document.querySelectorAll(
            ".split-container.five-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout3", "layout5");
            element.classList.add("layout4");
          });
          break;
        case "s5-5":
          /* document.getElementById('split-map1').style = "width:66%;height:50%;float:left;";
          document.getElementById('split-map2').style = "width:66%;height:50%;float:left;";
          document.getElementById('split-map3').style = "width:34%;height:33.3%;position:absolute;top:0%;left:66%;";
          document.getElementById('split-map4').style =
          "width:34%;height:33.3%;position:absolute;top:33.3%;left:66%;";
          document.getElementById('split-map5').style =
          "width:34%;height:33.4%;position:absolute;top:66.6%;left:66%;"; */
          splitElements = document.querySelectorAll(
            ".split-container.five-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove("layout2", "layout3", "layout4");
            element.classList.add("layout5");
          });
          break;
        case "s6-1":
          /* document.getElementById('split-map1').style = "width:33.3%;height:50%;float:left;";
          document.getElementById('split-map2').style = "width:33.3%;height:50%;float:left;";
          document.getElementById('split-map3').style = "width:33.3%;height:50%;float:left;";
          document.getElementById('split-map4').style = "width:33.3%;height:50%;float:left;";
          document.getElementById('split-map5').style = "width:33.3%;height:50%;float:left;";
          document.getElementById('split-map6').style = "width:33.3%;height:50%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.six-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout2",
              "layout3",
              "layout4",
              "layout5",
              "layout6",
              "layout7"
            );
          });
          break;
        case "s6-2":
          /* document.getElementById('split-map1').style = "width:50%;height:33.3%;float:left;";
          document.getElementById('split-map2').style = "width:50%;height:33.3%;float:left;";
          document.getElementById('split-map3').style = "width:50%;height:33.3%;float:left;";
          document.getElementById('split-map4').style = "width:50%;height:33.3%;float:left;";
          document.getElementById('split-map5').style = "width:50%;height:33.4%;float:left;";
          document.getElementById('split-map6').style = "width:50%;height:33.4%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.six-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout3",
              "layout4",
              "layout5",
              "layout6",
              "layout7"
            );
            element.classList.add("layout2");
          });
          break;
        case "s6-3":
          /* document.getElementById('split-map1').style = "width:100%;height:60%;float:left;";
          document.getElementById('split-map2').style = "width:20%;height:40%;float:left;";
          document.getElementById('split-map3').style = "width:20%;height:40%;float:left;";
          document.getElementById('split-map4').style = "width:20%;height:40%;float:left;";
          document.getElementById('split-map5').style = "width:20%;height:40%;float:left;";
          document.getElementById('split-map6').style = "width:20%;height:40%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.six-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout2",
              "layout4",
              "layout5",
              "layout6",
              "layout7"
            );
            element.classList.add("layout3");
          });
          break;
        case "s6-4":
          /* document.getElementById('split-map1').style = "width:50%;height:60%;float:left;";
          document.getElementById('split-map2').style = "width:50%;height:60%;float:left;";
          document.getElementById('split-map3').style = "width:25%;height:40%;float:left;";
          document.getElementById('split-map4').style = "width:25%;height:40%;float:left;";
          document.getElementById('split-map5').style = "width:25%;height:40%;float:left;";
          document.getElementById('split-map6').style = "width:25%;height:40%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.six-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout2",
              "layout3",
              "layout5",
              "layout6",
              "layout7"
            );
            element.classList.add("layout4");
          });
          break;
        case "s6-5":
          /* document.getElementById('split-map1').style = "width:66%;height:66%;float:left;";
          document.getElementById('split-map2').style = "width:34%;height:33%;float:right;";
          document.getElementById('split-map3').style = "width:34%;height:33%;float:right;";
          document.getElementById('split-map4').style = "width:33%;height:34%;position:absolute;top:66%;left:0%;";
          document.getElementById('split-map5').style = "width:33%;height:34%;position:absolute;top:66%;left:33%;";
          document.getElementById('split-map6').style = "width:34%;height:34%;position:absolute;top:66%;left:66%;"; */
          splitElements = document.querySelectorAll(
            ".split-container.six-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout2",
              "layout3",
              "layout4",
              "layout6",
              "layout7"
            );
            element.classList.add("layout5");
          });
          break;
        case "s6-6":
          /* document.getElementById('split-map1').style = "width:75%;height:50%;float:left;";
          document.getElementById('split-map2').style = "width:25%;height:50%;float:left;";
          document.getElementById('split-map3').style = "width:25%;height:50%;float:left;";
          document.getElementById('split-map4').style = "width:25%;height:50%;float:left;";
          document.getElementById('split-map5').style = "width:25%;height:50%;float:left;";
          document.getElementById('split-map6').style = "width:25%;height:50%;float:left;"; */
          splitElements = document.querySelectorAll(
            ".split-container.six-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout2",
              "layout3",
              "layout4",
              "layout5",
              "layout7"
            );
            element.classList.add("layout6");
          });
          break;
        case "s6-7":
          /* document.getElementById('split-map1').style = "width:66%;height:50%;float:left;";
          document.getElementById('split-map2').style = "width:66%;height:50%;float:left;";
          document.getElementById('split-map3').style = "width:34%;height:25%;position:absolute;top:0%;left:66%;";
          document.getElementById('split-map4').style = "width:34%;height:25%;position:absolute;top:25%;left:66%;";
          document.getElementById('split-map5').style = "width:34%;height:25%;position:absolute;top:50%;left:66%;";
          document.getElementById('split-map6').style = "width:34%;height:25%;position:absolute;top:75%;left:66%;"; */
          splitElements = document.querySelectorAll(
            ".split-container.six-screen"
          );
          splitElements.forEach(function (element) {
            element.classList.remove(
              "layout2",
              "layout3",
              "layout4",
              "layout5",
              "layout6"
            );
            element.classList.add("layout7");
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>
