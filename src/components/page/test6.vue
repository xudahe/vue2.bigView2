<!-- -->
<template>
  <div class="pop-model custom-compare">
    <div class="custom-compare-content">
      <div class="compare-left">
        <div class="compare-left-search">
          <el-input placeholder="输入关键字查找" v-model="filterText" size="mini" suffix-icon="el-icon-search"></el-input>
        </div>
        <div class="compare-left-list">
          <el-tree ref="tree" :data="resourceData" node-key="FEATUREID" :filter-node-method="filterNode"
            :props="defaultProps" :expand-on-click-node="false" @node-expand="filterTopic" draggable
            :allowDrag="allowDrag" :allowDrop="() => false" @node-drag-start="startDragNode" @node-drag-end="endDragNode">
            <div slot-scope="{ node,data }">
              <div class="inline-block" :class="{ 'tree-left-label': data.FEATURETYPE === 'topic' }"
                @click.stop="toggleNodeExpand(node, data)">

                <Icon type="logo-buffer" style="margin-right: 3px;"
                  v-if="data.FEATURETYPE !== 'dir' && data.FEATURETYPE !== 'parent'" />
                <span :title="data.FEATURENAME" class="inline-block tree-label">{{ data.FEATURENAME }}</span>
              </div>
            </div>
          </el-tree>
        </div>
      </div>
      <div class="compare-right">
        <div class="compare-right-toolbar">
          <el-radio-group v-model="compareMode" size="mini">
            <el-radio-button label="单屏"></el-radio-button>
            <el-radio-button label="双屏"></el-radio-button>
            <el-radio-button label="三屏"></el-radio-button>
            <el-radio-button label="四屏"></el-radio-button>
            <el-radio-button label="五屏"></el-radio-button>
            <el-radio-button label="六屏"></el-radio-button>
            <el-radio-button label="七屏"></el-radio-button>
            <el-radio-button label="八屏"></el-radio-button>
            <el-radio-button label="九屏"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="compare-right-layout" @dragleave="onDragLeave">
          <div v-for="(item, index) in compareNum" :key="index" @dragover="onDragOver(item, $event)"
            @drop="onDragDrop(item, $event)" :class="screenClass(item)">
            <div class="compare-screen-data">
              <div class="screen-data__title">{{ item }}</div>
              <div class="screen-data__id">
                <div>
                  {{ screenTopics[item - 1].topic ? screenTopics[item - 1].topic.FEATUREID : "专题ID" }}
                </div>
              </div>
              <div class="screen-data__name">
                <div>
                  {{ screenTopics[item - 1].topic ? screenTopics[item - 1].topic.FEATURENAME : "专题名" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="custom-compare-bottom">
      <el-button type="primary" size="small" @click="compare($event)">开始对比</el-button>
    </div>

    <Modal v-model="spiltmodal" fullscreen footer-hide :closable="false">
      <splitscreen></splitscreen>
    </Modal>
  </div>
</template>

<script>

import { MapControl } from "@/components/arcgis_map/js/MapControl";
import EventBus from "@/eventBus";
import DragPop from "@/api/mixins/dragPop";
import ArrBase from "@/api/mixins/arrBase";

import splitscreen from "@/views/split_mode/index.vue";

export default {
  name: 'test6',
  mixins: [DragPop, ArrBase],
  components: {
    splitscreen
  },
  data() {
    return {
      filterText: "",
      defaultProps: {},
      resourceData: [
        {
          "FEATUREID": "FE002494",
          "FEATURENAME": "基础底图",
          "FEATUREPID": "0",
          "FEATURESINDEX": 0,
          "FEATURETYPE": "parent",
          "ISCOLLETED": false,
          "ISEMPTY": true,
          "LEDGEREXIST": false,
          "ICON": "icon-resources",
          "children": [
            {
              "FEATUREID": "FE002496",
              "FEATURENAME": "地形图",
              "FEATUREPID": "FE002494",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002479",
              "FEATURENAME": "影像图",
              "FEATUREPID": "FE002494",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-resources",
              "children": []
            }
          ],
          "className": "icon-resources"
        },
        {
          "FEATUREID": "FE002417",
          "FEATURENAME": "土地清册",
          "FEATUREPID": "0",
          "FEATURESINDEX": 0,
          "FEATURETYPE": "parent",
          "ISCOLLETED": false,
          "ISEMPTY": true,
          "LEDGEREXIST": false,
          "ICON": "icon-manage",
          "children": [
            {
              "FEATUREID": "FE002451",
              "FEATURENAME": "控规片区",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002439",
              "FEATURENAME": "供地数据",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002454",
              "FEATURENAME": "项目用地",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002444",
              "FEATURENAME": "地块评估",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002442",
              "FEATURENAME": "储备地块",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002448",
              "FEATURENAME": "控规单元",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002435",
              "FEATURENAME": "征地数据",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002443",
              "FEATURENAME": "出让地块",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002450",
              "FEATURENAME": "控规地块",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002446",
              "FEATURENAME": "征转报批",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002447",
              "FEATURENAME": "拆迁项目",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002453",
              "FEATURENAME": "符合两规可用地块",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002452",
              "FEATURENAME": "控规路网",
              "FEATUREPID": "FE002417",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            }
          ],
          "className": "icon-manage"
        },
        {
          "FEATUREID": "FE002501",
          "FEATURENAME": "综合管网",
          "FEATUREPID": "0",
          "FEATURESINDEX": 0,
          "FEATURETYPE": "parent",
          "ISCOLLETED": false,
          "ISEMPTY": true,
          "LEDGEREXIST": false,
          "ICON": "icon-detail",
          "children": [
            {
              "FEATUREID": "FE002519",
              "FEATURENAME": "综合管沟",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002518",
              "FEATURENAME": "给水_自来水",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002517",
              "FEATURENAME": "给水_原水",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002508",
              "FEATURENAME": "信息与通信_广播",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002513",
              "FEATURENAME": "燃气_天然气",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002507",
              "FEATURENAME": "不明管线",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002511",
              "FEATURENAME": "排水_污水",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002509",
              "FEATURENAME": "信息与通信_有线电视",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002516",
              "FEATURENAME": "电力_路灯",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002502",
              "FEATURENAME": "综合管网",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002510",
              "FEATURENAME": "信息与通信_通讯",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002514",
              "FEATURENAME": "电力_交通信号",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002515",
              "FEATURENAME": "电力_供电",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            },
            {
              "FEATUREID": "FE002512",
              "FEATURENAME": "排水_雨水",
              "FEATUREPID": "FE002501",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "topic",
              "ISCOLLETED": false,
              "ISEMPTY": false,
              "LEDGEREXIST": false,
              "ICON": "icon-detail",
              "children": []
            }
          ],
          "className": "icon-detail"
        }
      ],
      compareNum: 2,
      compareMode: "双屏",
      screenMode: {
        单屏: "one-screen",
        双屏: "two-screen",
        三屏: "three-screen",
        四屏: "four-screen",
        五屏: "five-screen",
        六屏: "six-screen",
        七屏: "seven-screen",
        八屏: "eight-screen",
        九屏: "nine-screen",
      },

      currentScreenIndex: -1,
      currentDraggingTopic: {},
      screenTopics: [{
        id: 1,
        topic: null
      },
      {
        id: 2,
        topic: null
      },
      {
        id: 3,
        topic: null
      },
      {
        id: 4,
        topic: null
      },
      {
        id: 5,
        topic: null
      },
      {
        id: 6,
        topic: null
      },
      {
        id: 7,
        topic: null
      },
      {
        id: 8,
        topic: null
      },
      {
        id: 9,
        topic: null
      }],
      onDragging: false,

      spiltmodal: false,
    };
  },
  mounted() {
    MapControl.mapArr = {};
    MapControl.isSync = {};
    this.$store.commit("splitFlag", false);
    this.$store.commit("splitMapId", '');
    this.$store.commit("splitScreens", []);

    let _this = this;
    EventBus.$off("quitSplitMode").$on("quitSplitMode", function () {
      _this.spiltmodal = false;
    })
  },
  computed: {
    screenClass() {
      return function (item) {
        if (item === this.currentScreenIndex) {
          return `${this.screenMode[this.compareMode]}${item} screen active`;
        }
        return `${this.screenMode[this.compareMode]}${item} screen`;
      };
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },

    compareMode(newVal) {
      const screenNumList = {
        单屏: 1,
        双屏: 2,
        三屏: 3,
        四屏: 4,
        五屏: 5,
        六屏: 6,
        七屏: 7,
        八屏: 8,
        九屏: 9,
      };
      this.compareNum = screenNumList[newVal];
    },

    currentScreenIndex(newVal) {
      // console.log("currentScreenIndex", newVal);
    },

    compareNum(newVal) {
      for (let i = 0; i < this.screenTopics.length; i++) {
        const topicInfo = this.screenTopics[i];
        if (topicInfo.id > newVal) {
          topicInfo.topic = null;
        }
      }
    }
  },
  methods: {
    toggleNodeExpand(node, data) {
      if (data.FEATURETYPE !== "parent") {
        return;
      }
      node.expanded = !node.expanded;
    },
    filterTopic(data, node) {
      if (node.childNodes.length > 0) {
        node.childNodes.forEach(child => {
          if (child.data.FEATURETYPE === "layer") {
            child.visible = false;
          }
          if (
            child.data.FEATURETYPE === "topic" &&
            child.data.ISEMPTY == true
          ) {
            child.visible = false;
          }
        });
      }
    },
    filterNode(value, data, node) {
      if (!value) {
        if (data.FEATURETYPE === "layer") {
          return false;
        } else if (data.FEATURETYPE === "topic" && data.ISEMPTY == true) {
          return false;
        } else {
          return true;
        }
      }

      let result = false;
      if (data.FEATURETYPE == "layer") {
        result = false;
      }
      if (data.FEATURETYPE == "topic" && data.ISEMPTY) {
        result = false;
      }
      if (data.FEATURETYPE == "topic" && data.FEATURENAME.indexOf(value) !== -1) {
        result = true;
      }
      return result;
    },
    getReturnNode(node, nodeList, value) {
      const isPass =
        node.data &&
        node.data.FEATURENAME &&
        node.data.FEATURENAME.indexOf(value) !== -1;

      if (isPass) {
        nodeList.push(isPass);
      }
      if (!isPass && node.level != 1 && node.parent) {
        this.getReturnNode(node.parent, nodeList, value);
      }
    },
    allowDrag(node) {
      if (node.data.FEATURETYPE == "topic") {
        return true;
      }

      return false;
    },
    startDragNode(node, e) {
      this.currentDraggingTopic = node.data;
      this.onDragging = true;
    },
    onDragOver(item, e) {
      e.preventDefault();
      this.currentScreenIndex = item;
    },
    onDragDrop(item, e) {
      e.preventDefault();
      this.screenTopics[item - 1].topic = this.currentDraggingTopic;
      // this.getTopicData(this.currentDraggingTopic, false);
      this.currentScreenIndex = -1;
    },
    onDragLeave(e) {
      this.currentScreenIndex = -1;
    },
    endDragNode(node, endNode, endPosition, e) {
      this.currentDraggingNode = {};
      this.onDragging = false;
    },
    compare(event) {
      console.log("开始对比", event);
      if (event == "time") {
        return;
      }

      const _this = this;

      MapControl.mapArr = {};
      MapControl.isSync = {};
      this.$store.commit("splitFlag", false);
      this.$store.commit("splitMapId", '');
      this.$store.commit("splitScreens", []);


      const splitScreens = [];
      for (let i = 1; i < this.compareNum + 1; i++) {
        const featureId = Math.ceil((Math.random() * 9000) + 1000) + '';  // this.screenTopics[i - 1].topic.FEATUREID;
        const splitScreen = {
          screenId: `分屏${i}`,
          screenIndex: i,
          featureId: featureId
        };
        splitScreens.push(splitScreen);
      }
      this.$store.commit("splitFlag", true);
      this.$store.commit("splitScreens", splitScreens);
      console.log("splitScreenInfo", splitScreens);

      setTimeout(() => {
        _this.spiltmodal = true;
      }, 500);
    }
  }
};
</script>

<style scoped>
.custom-compare {
  height: auto;
  width: 800px;
}

.custom-compare-content {
  position: relative;
  height: 424px;
  background: #f0f0f0;
}

.compare-left {
  position: absolute;
  height: calc(100% + 40px);
  width: 180px;
  border: 1px solid #e5e5e5;
}

.compare-left-list {
  height: calc(100% - 30px);
  border: 1px solid #e5e5e5;
  overflow-y: auto;
  background-color: #fff;
}

.compare-left-search {
  height: 30px;
  line-height: 29px;
}

.compare-right {
  position: absolute;
  height: 100%;
  right: 0;
  width: calc(100% - 180px);
  border: 1px solid #e5e5e5;
}

.custom-compare-bottom {
  height: 40px;
  line-height: 38px;
  padding-left: 460px;
  background: #f0f0f0;
}

.compare-right-toolbar {
  height: 30px;
  line-height: 29px;
  padding-left: 70px;
}

.compare-right-layout {
  position: relative;
  height: calc(100% - 30px);
  border: 1px solid #e5e5e5;
}


/* .active, */
.screen.active {
  border: 1px solid cyan !important;
  transform: scale(0.95);
  box-shadow: 5px 20px 30px rgba(0, 0, 0, 0, 0.2);
  transition: box-shadow 0.5s, transform 0.5s;
}

.screen .compare-screen-data {
  position: relative;
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: hidden;
  box-shadow: 0;
  transform: scale(1);
  transition: box-shadow 0.5s, transform 0.5s;
}

.screen .compare-screen-data .screen-data__title {
  position: absolute;
  height: 20px;
  width: 20px;
  left: 10px;
  top: 10px;
  color: #fff;
  font-size: 20px;
}

.screen .compare-screen-data .screen-data__id {
  position: absolute;
  height: 30px;
  width: 50%;
  left: 25%;
  top: 25%;
  background: #006767;
  text-align: center;
  font-size: 14px;
  color: #fff;
}

.screen .compare-screen-data .screen-data__name {
  position: absolute;
  height: 30px;
  width: 50%;
  left: 25%;
  top: 51%;
  background: #006767;
  text-align: center;
  font-size: 14px;
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.screen .compare-screen-data .screen-data__id div,
.screen .compare-screen-data .screen-data__name div {
  line-height: 200%;
  height: 100%;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.screen .compare-screen-data::before {
  content: "";
  display: block;
  position: absolute;
  height: 0;
  width: 0;
  left: 0;
  top: 0;
  border: 30px solid;
  border-color: #006767 transparent transparent #006767;
  filter: drop-shadow(4px -4px 2px rgba(0, 0, 0, 0.5));
}



/*分屏样式*/
/*1*/
.one-screen1 {
  position: absolute;
  left: 0px;
  width: 100%;
  height: 100%;
  bottom: 0px;
  /*border: 1px solid #e5e5e5;*/
}

/*2*/
.two-screen1 {
  position: absolute;
  left: 0px;
  width: 50%;
  height: 100%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.two-screen2 {
  position: absolute;
  right: 0px;
  width: 50%;
  height: 100%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

/*3*/
.three-screen1 {
  position: absolute;
  left: 0px;
  width: 50%;
  height: 100%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.three-screen2 {
  position: absolute;
  right: 0px;
  width: 50%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.three-screen3 {
  position: absolute;
  right: 0px;
  width: 50%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

/*4*/
.four-screen1 {
  position: absolute;
  left: 0px;
  width: 50%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.four-screen4 {
  position: absolute;
  left: 0px;
  width: 50%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.four-screen2 {
  position: absolute;
  right: 0px;
  width: 50%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.four-screen3 {
  position: absolute;
  right: 0px;
  width: 50%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

/*5*/
.five-screen1 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 100%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.five-screen2 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.five-screen5 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.five-screen3 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.five-screen4 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

/*6*/
.six-screen1 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.six-screen2 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.six-screen3 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.six-screen4 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.six-screen5 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.six-screen6 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

/*7*/
.seven-screen1 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 100%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.seven-screen2 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.seven-screen3 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.seven-screen4 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  top: 33.3%;
  border: 1px solid #e5e5e5;
}

.seven-screen5 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  top: 33.33%;
  border: 1px solid #e5e5e5;
}

.seven-screen6 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.seven-screen7 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

/*8*/
.eight-screen1 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 50%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.eight-screen2 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.eight-screen3 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.eight-screen4 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  top: 33.33%;
  border: 1px solid #e5e5e5;
}

.eight-screen5 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  top: 33.33%;
  border: 1px solid #e5e5e5;
}

.eight-screen6 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.eight-screen7 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.eight-screen8 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 50%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

/*9*/
.nine-screen1 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 33.33%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.nine-screen2 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.nine-screen3 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  top: 0px;
  border: 1px solid #e5e5e5;
}

.nine-screen4 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 33.33%;
  top: 33.33%;
  border: 1px solid #e5e5e5;
}

.nine-screen5 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  top: 33.33%;
  border: 1px solid #e5e5e5;
}

.nine-screen6 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  top: 33.33%;
  border: 1px solid #e5e5e5;
}

.nine-screen7 {
  position: absolute;
  left: 0px;
  width: 33.33%;
  height: 33.33%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.nine-screen8 {
  position: absolute;
  left: 33.33%;
  width: 33.33%;
  height: 33.33%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}

.nine-screen9 {
  position: absolute;
  left: 66.66%;
  width: 33.33%;
  height: 33.33%;
  bottom: 0px;
  border: 1px solid #e5e5e5;
}
</style>