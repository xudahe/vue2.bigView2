<template>
  <div style="width: 100%;height: 100%;">
    <div class="split-mode">
      <div class="split-toolbar">
        <SplitToolbar />
      </div>
      <div class="layout-body split">
        <div class="split-container" :class="splitScreenClass(index)" :id="'split-map' + (index + 1)"
          v-for="(item, index) in splitScreens" :key="index">
          <SplitScreen :screenId="item.screenId" :screenIndex="item.screenIndex" :featureId="item.featureId" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import bus from "@/eventBus";
import mapconfig from "@/components/arcgis_map/js/mapconfig";
import { MapControl } from "@/components/arcgis_map/js/MapControl";

import SplitToolbar from "@/views/split_mode/SplitToolbar";
import SplitScreen from "@/views/split_mode/SplitScreen";

export default {
  name: "index",
  components: {
    SplitToolbar,
    SplitScreen,
  },
  data() {
    return {
      startid: "", //记录开始变化的id
      endid: "", //记录变化后的id
    };
  },
  computed: {
    splitScreens() {
      return this.$store.state.map.splitScreens;
    },
    splitScreenClass() {
      return function (index) {
        const splitScreens = this.$store.state.map.splitScreens;
        const screenMode = {
          1: "one-screen",
          2: "two-screen",
          3: "three-screen",
          4: "four-screen",
          5: "five-screen",
          6: "six-screen"
        };
        return `${screenMode[splitScreens.length]} screen${index + 1}`;
      };
    },
  },
  mounted() {
    this.clearMapControl();
    bus.$on("getmapid", this.getmapid);
    bus.$on("ExtentChange", this.ExtentChange);
  },
  beforeRouteLeave(to, from, next) {
    this.clearMapControl();
    bus.$off("getmapid", this.getmapid);
    bus.$off("ExtentChange", this.ExtentChange);
  },
  methods: {
    clearMapControl() {
      mapconfig.MapControl = {}; //置空
      mapconfig.MapControl1 = {}; //置空
    },
    isEmptyObject(obj) {
      for (var key in obj) {
        return false;
      }
      return true;
    },
    isEmptyObject2key(obj, keyname) {
      for (var key in obj) {
        if (key == keyname) return true;
      }
      return false;
    },
    getmapid(value) {
      this.startid = value;
      for (let key in mapconfig.MapControl) {
        if (key == value) mapconfig.MapControl[key] = true;
        else mapconfig.MapControl[key] = false;
      }
    },
    ExtentChange(value) {
      if (!mapconfig.MapControl1[value.id]) return bus.$off("ExtentChange", "off");

      if (
        this.isEmptyObject(mapconfig.MapControl) ||
        !this.isEmptyObject2key(mapconfig.MapControl, value.id)
      ) {
        mapconfig.MapControl[value.id] = false;
        if (
          this.splitScreens.length > 1 &&
          this.splitScreens.length ==
          Object.getOwnPropertyNames(mapconfig.MapControl).length
        ) {
          mapconfig.MapControl[value.id] = true;
          MapControl.ExtentChange(value.event, this.splitScreens);
          bus.$off("ExtentChange", "off");
        }
      }
      if (this.splitScreens.length < 2) {
        return bus.$off("ExtentChange", "off");
      }
      if (this.startid != value.id) {
        return bus.$off("ExtentChange", "off");
      }

      //当鼠标在同一个地图窗口中；地图四角坐标变化，将重置地图窗口同步要素；
      MapControl.ExtentChange(value.event, this.splitScreens);
    },

  }
};
</script>

<style>
.split-mode {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
}

.layout-body {
  position: relative;
  height: 100%;
  margin-left: 70px
}

.layout-body.split {
  margin-left: 0;
  height: calc(100% - 30px)
}


.i-switch {
  font-size: 12px;
  color: #159bff
}

.split-toolbar {
  position: relative;
  display: block;
  height: 30px;
  margin-top: 0;
  line-height: 30px;
  font-size: 18px;
  color: #fff;
  background-color: #1a5a8a
}

.split-tools .roller-tools {
  position: absolute;
  width: 100%
}

.tool-item {
  margin-left: 15px
}

.tool-item:hover {
  cursor: pointer
}

.split-tools .toolbar {
  position: absolute;
  top: 0;
  height: 30px;
  width: 300px;
  margin-left: 150px
}



.tree-switch {
  height: 24px;
  line-height: 24px;
  padding: 0 6px;
  border-radius: 3px;
  cursor: pointer
}

.tree-switch.active {
  background-color: #159bff;
  color: #fff
}


.container {
  min-width: 1280px;
  height: 100vh
}





.split-screen {
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid #000
}

.screen-title {
  position: absolute;
  width: 100%;
  height: 30px;
  color: #fff;
  vertical-align: middle;
  line-height: 30px;
  background-color: rgba(26, 90, 138, .7);
  margin-top: 0;
  left: 0;
  z-index: 2
}

.split-container.one-screen {
  float: left;
  height: 100%;
  width: 100%
}

.split-container.two-screen {
  float: left;
  height: 100%;
  width: 50%
}

.split-container.two-screen.screen1.layout2 {
  float: left;
  height: 60%;
  width: 100%
}

.split-container.two-screen.screen2.layout2 {
  float: left;
  height: 40%;
  width: 100%
}

.split-container.two-screen.screen1.layout3 {
  float: left;
  height: 100%;
  width: 70%
}

.split-container.two-screen.screen2.layout3 {
  float: left;
  height: 100%;
  width: 30%
}

.split-container.three-screen.screen1 {
  float: left;
  height: 100%;
  width: 70%
}

.split-container.three-screen.screen2,
.split-container.three-screen.screen3 {
  float: left;
  height: 50%;
  width: 30%
}

.split-container.three-screen.layout2 {
  float: left;
  height: 100%;
  width: 33.3%
}

.split-container.three-screen.screen1.layout3 {
  float: left;
  height: 100%;
  width: 40%
}

.split-container.three-screen.screen1.layout4,
.split-container.three-screen.screen2.layout3,
.split-container.three-screen.screen3.layout3,
.split-container.three-screen.screen3.layout4 {
  float: left;
  height: 100%;
  width: 30%
}

.split-container.three-screen.screen2.layout4 {
  float: left;
  height: 100%;
  width: 40%
}

.split-container.three-screen.screen1.layout5 {
  float: left;
  height: 60%;
  width: 100%
}

.split-container.three-screen.screen2.layout5,
.split-container.three-screen.screen3.layout5 {
  float: left;
  height: 40%;
  width: 50%
}

.split-container.four-screen {
  float: left;
  height: 50%;
  width: 50%
}

.split-container.four-screen.screen1.layout2 {
  float: left;
  height: 100%;
  width: 70%
}

.split-container.four-screen.screen2.layout2,
.split-container.four-screen.screen3.layout2,
.split-container.four-screen.screen4.layout2 {
  float: left;
  height: 33.3%;
  width: 30%
}

.split-container.four-screen.screen1.layout3 {
  float: left;
  height: 100%;
  width: 40%
}

.split-container.four-screen.screen2.layout3,
.split-container.four-screen.screen3.layout3,
.split-container.four-screen.screen4.layout3 {
  float: left;
  height: 100%;
  width: 20%
}

.split-container.four-screen.screen1.layout4 {
  float: left;
  height: 60%;
  width: 100%
}

.split-container.four-screen.screen2.layout4,
.split-container.four-screen.screen3.layout4,
.split-container.four-screen.screen4.layout4 {
  float: left;
  height: 40%;
  width: 33.3%
}

.split-container.five-screen.screen1 {
  float: left;
  height: 100%;
  width: 50%
}

.split-container.five-screen.screen2,
.split-container.five-screen.screen3,
.split-container.five-screen.screen4,
.split-container.five-screen.screen5 {
  float: left;
  height: 50%;
  width: 25%
}

.split-container.five-screen.screen1.layout2 {
  float: left;
  height: 50%;
  width: 66.6%
}

.split-container.five-screen.screen2.layout2,
.split-container.five-screen.screen5.layout2 {
  float: left;
  height: 50%;
  width: 33.4%
}

.split-container.five-screen.screen3.layout2,
.split-container.five-screen.screen4.layout2 {
  float: left;
  height: 50%;
  width: 33.3%
}

.split-container.five-screen.screen1.layout3 {
  float: left;
  height: 60%;
  width: 100%
}

.split-container.five-screen.screen2.layout3,
.split-container.five-screen.screen3.layout3,
.split-container.five-screen.screen4.layout3 {
  float: left;
  height: 40%;
  width: 25%
}

.split-container.five-screen.screen1.layout4 {
  float: left;
  height: 50%;
  width: 25%
}

.split-container.five-screen.screen2.layout4 {
  position: absolute;
  float: left;
  height: 50%;
  width: 25%;
  top: 50%;
  left: 0
}

.split-container.five-screen.screen3.layout4 {
  position: absolute;
  height: 100%;
  width: 50%;
  top: 0;
  left: 25%
}

.split-container.five-screen.screen4.layout4 {
  position: absolute;
  height: 50%;
  width: 25%;
  top: 0;
  left: 75%
}

.split-container.five-screen.screen5.layout4 {
  position: absolute;
  height: 50%;
  width: 25%;
  top: 50%;
  left: 75%
}

.split-container.five-screen.screen1.layout5,
.split-container.five-screen.screen2.layout5 {
  float: left;
  height: 50%;
  width: 66%
}

.split-container.five-screen.screen3.layout5 {
  position: absolute;
  height: 33.3%;
  width: 34%;
  top: 0;
  left: 66%
}

.split-container.five-screen.screen4.layout5 {
  position: absolute;
  height: 33.3%;
  width: 34%;
  top: 33.3%;
  left: 66%
}

.split-container.five-screen.screen5.layout5 {
  position: absolute;
  height: 33.4%;
  width: 34%;
  top: 66.6%;
  left: 66%
}

.split-container.six-screen {
  float: left;
  height: 50%;
  width: 33.3%
}

.split-container.six-screen.screen1.layout2,
.split-container.six-screen.screen2.layout2,
.split-container.six-screen.screen3.layout2,
.split-container.six-screen.screen4.layout2 {
  float: left;
  height: 33.3%;
  width: 50%
}

.split-container.six-screen.screen5.layout2,
.split-container.six-screen.screen6.layout2 {
  float: left;
  height: 33.4%;
  width: 50%
}

.split-container.six-screen.screen1.layout3 {
  float: left;
  height: 60%;
  width: 100%
}

.split-container.six-screen.screen2.layout3,
.split-container.six-screen.screen3.layout3,
.split-container.six-screen.screen4.layout3,
.split-container.six-screen.screen5.layout3,
.split-container.six-screen.screen6.layout3 {
  float: left;
  height: 40%;
  width: 20%
}

.split-container.six-screen.screen1.layout4,
.split-container.six-screen.screen2.layout4 {
  float: left;
  height: 60%;
  width: 50%
}

.split-container.six-screen.screen3.layout4,
.split-container.six-screen.screen4.layout4,
.split-container.six-screen.screen5.layout4,
.split-container.six-screen.screen6.layout4 {
  float: left;
  height: 40%;
  width: 25%
}

.split-container.six-screen.screen1.layout5 {
  float: left;
  height: 66%;
  width: 66%
}

.split-container.six-screen.screen2.layout5,
.split-container.six-screen.screen3.layout5 {
  float: right;
  height: 33%;
  width: 34%
}

.split-container.six-screen.screen4.layout5 {
  position: absolute;
  height: 34%;
  width: 33%;
  top: 66%;
  left: 0
}

.split-container.six-screen.screen5.layout5 {
  position: absolute;
  height: 34%;
  width: 33%;
  top: 66%;
  left: 33%
}

.split-container.six-screen.screen6.layout5 {
  position: absolute;
  height: 34%;
  width: 34%;
  top: 66%;
  left: 66%
}

.split-container.six-screen.screen1.layout6 {
  float: left;
  height: 50%;
  width: 75%
}

.split-container.six-screen.screen2.layout6,
.split-container.six-screen.screen3.layout6,
.split-container.six-screen.screen4.layout6,
.split-container.six-screen.screen5.layout6,
.split-container.six-screen.screen6.layout6 {
  float: left;
  height: 50%;
  width: 25%
}

.split-container.six-screen.screen1.layout7,
.split-container.six-screen.screen2.layout7 {
  float: left;
  height: 50%;
  width: 66%
}

.split-container.six-screen.screen3.layout7 {
  position: absolute;
  height: 25%;
  width: 34%;
  top: 0;
  left: 66%
}

.split-container.six-screen.screen4.layout7 {
  position: absolute;
  height: 25%;
  width: 34%;
  top: 25%;
  left: 66%
}

.split-container.six-screen.screen5.layout7 {
  position: absolute;
  height: 25%;
  width: 34%;
  top: 50%;
  left: 66%
}

.split-container.six-screen.screen6.layout7 {
  position: absolute;
  height: 25%;
  width: 34%;
  top: 75%;
  left: 66%
}
</style>