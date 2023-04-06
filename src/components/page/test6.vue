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
            :props="defaultProps" expand-on-click-node="false" @node-expand="filterTopic" draggable :allowDrag="allowDrag"
            :allowDrop="() => false" @node-drag-start="startDragNode" @node-drag-end="endDragNode">
            <div slot-scope="{ data }">
              <div class="inline-block" :class="{ 'tree-left-label': data.FEATURETYPE === 'topic' }">
                <i v-if="data.FEATURETYPE === 'topic' && data.ISEMPTY == false" class="icon i-tree-left"
                  :class="{ 'i-atlas': data.FEATURETYPE === 'topic' }"></i>
                <i v-if="data.FEATURETYPE === 'topic' && data.ISEMPTY == true" class="icon i-tree-left"
                  :class="{ 'i-empty-atlas': data.FEATURETYPE === 'topic' }"></i>
                <span :title="data.FEATURENAME" class="inline-block tree-label" :class="{
                  'font-bold':
                    data.FEATURETYPE === 'dir' ||
                    data.FEATURETYPE === 'parent'
                }" v-show="data.FEATURETYPE !== 'layer'">{{ data.FEATURENAME }}</span>
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
          <div v-for="(item, index) in compareNum" @dragover="onDragOver(item, $event)" @drop="onDragDrop(item, $event)"
            :class="screenClass(item)">
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
  </div>
</template>

<script>

import EventBus from "@/eventBus";
import DragPop from "@/api/mixins/dragPop";
import ArrBase from "@/api/mixins/arrBase";

export default {
  name:'test6',
  mixins: [DragPop, ArrBase],
  components: {

  },
  data() {
    return {
      filterText: "",
      resourceData: [
        {
          "FEATUREID": "FE002385",
          "FEATURENAME": "测试",
          "FEATUREPID": "0",
          "FEATURESINDEX": 0,
          "FEATURETYPE": "parent",
          "ISCOLLETED": false,
          "ISEMPTY": true,
          "LEDGEREXIST": false,
          "ICON": "icon-special",
          "children": [
            {
              "FEATUREID": "FE002395",
              "FEATURENAME": "测试1",
              "FEATUREPID": "FE002385",
              "FEATURESINDEX": 0,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "icon-space",
              "children": [
                {
                  "FEATUREID": "FE002396",
                  "FEATURENAME": "123",
                  "FEATUREPID": "FE002395",
                  "FEATURESINDEX": 0,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": true,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE002398",
                  "FEATURENAME": "道路中心线",
                  "FEATUREPID": "FE002395",
                  "FEATURESINDEX": 0,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            }
          ],
          "className": "icon-special"
        },
        {
          "FEATUREID": "FE001603",
          "FEATURENAME": "现状数据",
          "FEATUREPID": "0",
          "FEATURESINDEX": 1,
          "FEATURETYPE": "parent",
          "ISCOLLETED": false,
          "ISEMPTY": true,
          "LEDGEREXIST": false,
          "ICON": "icon-resources",
          "children": [
            {
              "FEATUREID": "FE001674",
              "FEATURENAME": "基础测绘",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 1,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001683",
                  "FEATURENAME": "空间基准",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001696",
                      "FEATURENAME": "平面控制点",
                      "FEATUREPID": "FE001683",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001697",
                      "FEATURENAME": "高程控制点",
                      "FEATUREPID": "FE001683",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": true,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001684",
                  "FEATURENAME": "基础地理",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002138",
                      "FEATURENAME": "数字线划图",
                      "FEATUREPID": "FE001684",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "dir",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": [
                        {
                          "FEATUREID": "FE002301",
                          "FEATURENAME": "1:1000DLG",
                          "FEATUREPID": "FE002138",
                          "FEATURESINDEX": 19,
                          "FEATURETYPE": "dir",
                          "ISCOLLETED": false,
                          "ISEMPTY": true,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": [
                            {
                              "FEATUREID": "FE002377",
                              "FEATURENAME": "道路中心线",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 0,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": true,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002140",
                              "FEATURENAME": "交通设施线",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 1,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002142",
                              "FEATURENAME": "管线点",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 3,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002151",
                              "FEATURENAME": "植被线",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 5,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002139",
                              "FEATURENAME": "注记",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 7,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002141",
                              "FEATURENAME": "水域面",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 9,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002143",
                              "FEATURENAME": "管线线",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 11,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "icon-space",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002144",
                              "FEATURENAME": "居民地点",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 13,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002145",
                              "FEATURENAME": "居民地线",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 15,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002146",
                              "FEATURENAME": "水系点",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 17,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002150",
                              "FEATURENAME": "植被点",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 19,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002149",
                              "FEATURENAME": "工矿及设施点",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 21,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002148",
                              "FEATURENAME": "水系面",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 23,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002147",
                              "FEATURENAME": "水系线",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 25,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002152",
                              "FEATURENAME": "桥梁点",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 27,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002153",
                              "FEATURENAME": "地表覆盖分类数据",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 29,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002154",
                              "FEATURENAME": "数学基础",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 31,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": false,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            },
                            {
                              "FEATUREID": "FE002303",
                              "FEATURENAME": "ceshi",
                              "FEATUREPID": "FE002301",
                              "FEATURESINDEX": 32,
                              "FEATURETYPE": "topic",
                              "ISCOLLETED": false,
                              "ISEMPTY": true,
                              "LEDGEREXIST": false,
                              "ICON": "",
                              "children": []
                            }
                          ]
                        },
                        {
                          "FEATUREID": "FE002185",
                          "FEATURENAME": "1:10000DLG",
                          "FEATUREPID": "FE002138",
                          "FEATURESINDEX": 21,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": true,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001685",
                  "FEATURENAME": "正射影像",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 5,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002063",
                      "FEATURENAME": "影像数据",
                      "FEATUREPID": "FE001685",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": true,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001686",
                  "FEATURENAME": "数字高程模型",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 6,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001704",
                      "FEATURENAME": "1:2000DEM",
                      "FEATUREPID": "FE001686",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001687",
                  "FEATURENAME": "地理国情普查与监测",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 7,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001705",
                      "FEATURENAME": "句容市地理国情普查",
                      "FEATUREPID": "FE001687",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001688",
                  "FEATURENAME": "地下空间",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 8,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001706",
                      "FEATURENAME": "地下空间调查（暂无）",
                      "FEATUREPID": "FE001688",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001707",
                      "FEATURENAME": "地下管线",
                      "FEATUREPID": "FE001688",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001689",
                  "FEATURENAME": "现状城市三维（暂无）",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 9,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001690",
                  "FEATURENAME": "行政区划",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 10,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002088",
                      "FEATURENAME": "行政区划",
                      "FEATUREPID": "FE001690",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001691",
                  "FEATURENAME": "建成区范围",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 11,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001692",
                  "FEATURENAME": "中心城镇规划范围",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 12,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001693",
                  "FEATURENAME": "规划建设用地界线",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 13,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001694",
                  "FEATURENAME": "电子地图",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 14,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001695",
                  "FEATURENAME": "兴趣点（POI）",
                  "FEATUREPID": "FE001674",
                  "FEATURESINDEX": 15,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001708",
                      "FEATURENAME": "道路名称",
                      "FEATUREPID": "FE001695",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001709",
                      "FEATURENAME": "地名地址",
                      "FEATUREPID": "FE001695",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "FEATUREID": "FE001675",
              "FEATURENAME": "土地资源",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 2,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001710",
                  "FEATURENAME": "土地调查",
                  "FEATUREPID": "FE001675",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001718",
                      "FEATURENAME": "地籍调查",
                      "FEATUREPID": "FE001710",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001739",
                      "FEATURENAME": "年度土地变更调查",
                      "FEATUREPID": "FE001710",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "dir",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": [
                        {
                          "FEATUREID": "FE001740",
                          "FEATURENAME": "地类图斑",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 1,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001740",
                          "FEATURENAME": "地类图斑",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 1,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001751",
                          "FEATURENAME": "基本农田补划图斑",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 2,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001798",
                          "FEATURENAME": "基本农田补划片块",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 3,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001801",
                          "FEATURENAME": "宗地",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 6,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001771",
                          "FEATURENAME": "行政区",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 7,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001773",
                          "FEATURENAME": "城镇村等用地",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 8,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001759",
                          "FEATURENAME": "线状地物",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 9,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001785",
                          "FEATURENAME": "坡度图",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 11,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE001788",
                          "FEATURENAME": "地类界线",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 12,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002177",
                          "FEATURENAME": "耕地",
                          "FEATUREPID": "FE001739",
                          "FEATURESINDEX": 13,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001711",
                  "FEATURENAME": "标准农田",
                  "FEATUREPID": "FE001675",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001813",
                      "FEATURENAME": "标准农田",
                      "FEATUREPID": "FE001711",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001814",
                      "FEATURENAME": "高标准农田",
                      "FEATUREPID": "FE001711",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001712",
                  "FEATURENAME": "征地区片综合价",
                  "FEATUREPID": "FE001675",
                  "FEATURESINDEX": 5,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001713",
                  "FEATURENAME": "土地评价数据",
                  "FEATUREPID": "FE001675",
                  "FEATURESINDEX": 6,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001816",
                      "FEATURENAME": "耕地质量等别年度更新评价",
                      "FEATUREPID": "FE001713",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001817",
                      "FEATURENAME": "耕地后备资源（暂无）",
                      "FEATUREPID": "FE001713",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001714",
                  "FEATURENAME": "低效用地专项调查",
                  "FEATUREPID": "FE001675",
                  "FEATURESINDEX": 7,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001715",
                  "FEATURENAME": "农村存量建设用地调查",
                  "FEATUREPID": "FE001675",
                  "FEATURESINDEX": 8,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001716",
                  "FEATURENAME": "工业用地调查",
                  "FEATUREPID": "FE001675",
                  "FEATURESINDEX": 9,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001821",
                      "FEATURENAME": "工业用地调查",
                      "FEATUREPID": "FE001716",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001717",
                  "FEATURENAME": "开发区土地节约集约利用评价",
                  "FEATUREPID": "FE001675",
                  "FEATURESINDEX": 10,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001676",
              "FEATURENAME": "水资源",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 3,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001825",
                  "FEATURENAME": "河道（暂无）",
                  "FEATUREPID": "FE001676",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001834",
                      "FEATURENAME": "省级河道",
                      "FEATUREPID": "FE001825",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001836",
                      "FEATURENAME": "市级河道",
                      "FEATUREPID": "FE001825",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001826",
                  "FEATURENAME": "湖泊资源（暂无）",
                  "FEATUREPID": "FE001676",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001827",
                  "FEATURENAME": "水库（暂无）",
                  "FEATUREPID": "FE001676",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001828",
                  "FEATURENAME": "饮用水保护区（暂无）",
                  "FEATUREPID": "FE001676",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001829",
                  "FEATURENAME": "河口分布（暂无）",
                  "FEATUREPID": "FE001676",
                  "FEATURESINDEX": 5,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001830",
                  "FEATURENAME": "防洪堤分布",
                  "FEATUREPID": "FE001676",
                  "FEATURESINDEX": 6,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001831",
                  "FEATURENAME": "主要骨干河流",
                  "FEATUREPID": "FE001676",
                  "FEATURESINDEX": 7,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001832",
                  "FEATURENAME": "主要闸站分布",
                  "FEATUREPID": "FE001676",
                  "FEATURESINDEX": 8,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001677",
              "FEATURENAME": "湿地资源",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 4,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001839",
                  "FEATURENAME": "湿地监测（暂无）",
                  "FEATUREPID": "FE001677",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE001838",
                  "FEATURENAME": "湿地保护",
                  "FEATUREPID": "FE001677",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001678",
              "FEATURENAME": "矿产资源",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 5,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001840",
                  "FEATURENAME": "矿产资源分布图",
                  "FEATUREPID": "FE001678",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE001841",
                  "FEATURENAME": "矿产资源开发利用现状图",
                  "FEATUREPID": "FE001678",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001679",
              "FEATURENAME": "森林资源",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 6,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002069",
                  "FEATURENAME": "森林资源分布",
                  "FEATUREPID": "FE001679",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE001843",
                  "FEATURENAME": "森林保护",
                  "FEATUREPID": "FE001679",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001850",
                      "FEATURENAME": "公益林保护",
                      "FEATUREPID": "FE001843",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001844",
                  "FEATURENAME": "名木古树",
                  "FEATUREPID": "FE001679",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE002072",
                  "FEATURENAME": "自然保护区",
                  "FEATUREPID": "FE001679",
                  "FEATURESINDEX": 6,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE001846",
                  "FEATURENAME": "自然公园",
                  "FEATUREPID": "FE001679",
                  "FEATURESINDEX": 7,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001851",
                      "FEATURENAME": "森林公园",
                      "FEATUREPID": "FE001846",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001852",
                      "FEATURENAME": "地质公园",
                      "FEATUREPID": "FE001846",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001853",
                      "FEATURENAME": "湿地公园",
                      "FEATUREPID": "FE001846",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001854",
                      "FEATURENAME": "风景名胜区",
                      "FEATUREPID": "FE001846",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "FEATUREID": "FE001680",
              "FEATURENAME": "地质环境",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 7,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001855",
                  "FEATURENAME": "基础地质",
                  "FEATUREPID": "FE001680",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001861",
                      "FEATURENAME": "1:30万基础地质图",
                      "FEATUREPID": "FE001855",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001856",
                  "FEATURENAME": "城市地质",
                  "FEATUREPID": "FE001680",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001862",
                      "FEATURENAME": "1:30万地质环境限制性评价",
                      "FEATUREPID": "FE001856",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001857",
                  "FEATURENAME": "工程地质",
                  "FEATUREPID": "FE001680",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001863",
                      "FEATURENAME": "1:30万工程地质图",
                      "FEATUREPID": "FE001857",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001858",
                  "FEATURENAME": "水文地质",
                  "FEATUREPID": "FE001680",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001864",
                      "FEATURENAME": "1:30万水文地质图",
                      "FEATUREPID": "FE001858",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001859",
                  "FEATURENAME": "环境地质",
                  "FEATUREPID": "FE001680",
                  "FEATURESINDEX": 5,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001865",
                      "FEATURENAME": "1:5万标准图幅环境地质调查",
                      "FEATUREPID": "FE001859",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001866",
                      "FEATURENAME": "1:30地质遗迹现状图",
                      "FEATUREPID": "FE001859",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001860",
                  "FEATURENAME": "地质灾害",
                  "FEATUREPID": "FE001680",
                  "FEATURESINDEX": 6,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001867",
                      "FEATURENAME": "地质灾害易发区",
                      "FEATUREPID": "FE001860",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001868",
                      "FEATURENAME": "地质灾害隐患点（不稳定斜坡）",
                      "FEATUREPID": "FE001860",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "FEATUREID": "FE002305",
              "FEATURENAME": "水利",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 8,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002306",
                  "FEATURENAME": "水库管理界限",
                  "FEATUREPID": "FE002305",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002307",
                      "FEATURENAME": "水利公共",
                      "FEATUREPID": "FE002306",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002308",
                      "FEATURENAME": "水利工程",
                      "FEATUREPID": "FE002306",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "FEATUREID": "FE001681",
              "FEATURENAME": "公共服务设施",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 9,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001869",
                  "FEATURENAME": "福利设施",
                  "FEATUREPID": "FE001681",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001870",
                  "FEATURENAME": "殡葬设施",
                  "FEATUREPID": "FE001681",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001871",
                  "FEATURENAME": "社区设施",
                  "FEATUREPID": "FE001681",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001872",
                  "FEATURENAME": "应急医疗设施",
                  "FEATUREPID": "FE001681",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001873",
                  "FEATURENAME": "教育设施",
                  "FEATUREPID": "FE001681",
                  "FEATURESINDEX": 5,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001874",
                  "FEATURENAME": "体育设施",
                  "FEATUREPID": "FE001681",
                  "FEATURESINDEX": 6,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001682",
              "FEATURENAME": "历史文化保护",
              "FEATUREPID": "FE001603",
              "FEATURESINDEX": 10,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001875",
                  "FEATURENAME": "文物保护资源",
                  "FEATUREPID": "FE001682",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            }
          ],
          "className": "icon-resources"
        },
        {
          "FEATUREID": "FE001876",
          "FEATURENAME": "规划管控数据",
          "FEATUREPID": "0",
          "FEATURESINDEX": 2,
          "FEATURETYPE": "parent",
          "ISCOLLETED": false,
          "ISEMPTY": true,
          "LEDGEREXIST": false,
          "ICON": "icon-economic-2",
          "children": [
            {
              "FEATUREID": "FE001879",
              "FEATURENAME": "双评价",
              "FEATUREPID": "FE001876",
              "FEATURESINDEX": 1,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "icon-onemap",
              "children": [
                {
                  "FEATUREID": "FE001880",
                  "FEATURENAME": "资源环境承载能力 （暂无）",
                  "FEATUREPID": "FE001879",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-onemap",
                  "children": []
                },
                {
                  "FEATUREID": "FE001881",
                  "FEATURENAME": "国土空间开发适宜性评价 （暂无）",
                  "FEATUREPID": "FE001879",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001882",
              "FEATURENAME": "重要控制线",
              "FEATUREPID": "FE001876",
              "FEATURESINDEX": 2,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002311",
                  "FEATURENAME": "生态空间管控区",
                  "FEATUREPID": "FE001882",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001901",
                  "FEATURENAME": "国土空间三区管制(旧)",
                  "FEATUREPID": "FE001882",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE001902",
                  "FEATURENAME": "生态保护红线(旧)",
                  "FEATUREPID": "FE001882",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE001903",
                  "FEATURENAME": "城镇开发边界(旧)",
                  "FEATUREPID": "FE001882",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE001904",
                  "FEATURENAME": "永久基本农田保护红线(旧)",
                  "FEATUREPID": "FE001882",
                  "FEATURESINDEX": 5,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001883",
              "FEATURENAME": "国土空间规划",
              "FEATUREPID": "FE001876",
              "FEATURESINDEX": 3,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002313",
                  "FEATURENAME": "国土空间近期实施方案",
                  "FEATUREPID": "FE001883",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002314",
                      "FEATURENAME": "规划基本农田保护区",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002315",
                      "FEATURENAME": "规划基本农田调整",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002316",
                      "FEATURENAME": "基期地类图斑",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002320",
                      "FEATURENAME": "基期线状地物",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002318",
                      "FEATURENAME": "土地用途区",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 6,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002319",
                      "FEATURENAME": "建设用地管制区",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002321",
                      "FEATURENAME": "基期地类界线",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 8,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002334",
                      "FEATURENAME": "村镇建设控制区",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 9,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002335",
                      "FEATURENAME": "点状重点建设项目",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 10,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002336",
                      "FEATURENAME": "建设用地管制边界",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 11,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002341",
                      "FEATURENAME": "面状重点建设项目",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 13,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002338",
                      "FEATURENAME": "行政区",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 14,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002339",
                      "FEATURENAME": "行政区界线",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 15,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002340",
                      "FEATURENAME": "线状重点建设项目",
                      "FEATUREPID": "FE002313",
                      "FEATURESINDEX": 16,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001905",
                  "FEATURENAME": "总体规划",
                  "FEATUREPID": "FE001883",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001908",
                      "FEATURENAME": "句容市国土空间总体规划（在编）",
                      "FEATUREPID": "FE001905",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001909",
                      "FEATURENAME": "镇总体规划",
                      "FEATUREPID": "FE001905",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001906",
                  "FEATURENAME": "详细规划",
                  "FEATUREPID": "FE001883",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001910",
                      "FEATURENAME": "详细规划",
                      "FEATUREPID": "FE001906",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001911",
                      "FEATURENAME": "村庄规划",
                      "FEATUREPID": "FE001906",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001912",
                      "FEATURENAME": "镇村布局规划",
                      "FEATUREPID": "FE001906",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001907",
                  "FEATURENAME": "专项规划",
                  "FEATUREPID": "FE001883",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002186",
                      "FEATURENAME": "低效用地再开发",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001913",
                      "FEATURENAME": "生态环境保护规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001914",
                      "FEATURENAME": "城市综合交通规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001915",
                      "FEATURENAME": "轨道交通线网规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001916",
                      "FEATURENAME": "全域旅游规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001917",
                      "FEATURENAME": "全域水系规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 6,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001918",
                      "FEATURENAME": "市政设施类专项规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001919",
                      "FEATURENAME": "地下空间规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 8,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001920",
                      "FEATURENAME": "农业发展规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 9,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001921",
                      "FEATURENAME": "宁句一体化规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 10,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001922",
                      "FEATURENAME": "全市养老产业布局规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 11,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001923",
                      "FEATURENAME": "市区文化设施规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 12,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001924",
                      "FEATURENAME": "市区教育设施规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 13,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001925",
                      "FEATURENAME": "市区体育设施规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 14,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001926",
                      "FEATURENAME": "市区医疗设施规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 15,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001927",
                      "FEATURENAME": "市区社会福利设施规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 16,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001928",
                      "FEATURENAME": "市区电力设施规划",
                      "FEATUREPID": "FE001907",
                      "FEATURESINDEX": 17,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "FEATUREID": "FE001884",
              "FEATURENAME": "已有国土空间相关规划",
              "FEATUREPID": "FE001876",
              "FEATURESINDEX": 4,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001929",
                  "FEATURENAME": "主体功能区规划",
                  "FEATUREPID": "FE001884",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001930",
                  "FEATURENAME": "土地利用规划（旧）",
                  "FEATUREPID": "FE001884",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": [
                    {
                      "FEATUREID": "FE001934",
                      "FEATURENAME": "村镇建设控制区",
                      "FEATUREPID": "FE001930",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001935",
                      "FEATURENAME": "建设用地管制区",
                      "FEATUREPID": "FE001930",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001937",
                      "FEATURENAME": "重点项目布局图点",
                      "FEATUREPID": "FE001930",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001938",
                      "FEATURENAME": "重点项目布局图线",
                      "FEATUREPID": "FE001930",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001939",
                      "FEATURENAME": "重点项目布局图面",
                      "FEATUREPID": "FE001930",
                      "FEATURESINDEX": 6,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002355",
                      "FEATURENAME": "规划基本农田调整",
                      "FEATUREPID": "FE001930",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002357",
                      "FEATURENAME": "土地布局图",
                      "FEATUREPID": "FE001930",
                      "FEATURESINDEX": 8,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001931",
                  "FEATURENAME": "城乡规划",
                  "FEATUREPID": "FE001884",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001940",
                      "FEATURENAME": "总体规划",
                      "FEATUREPID": "FE001931",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001941",
                      "FEATURENAME": "控制性详细规划",
                      "FEATUREPID": "FE001931",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001942",
                      "FEATURENAME": "镇总体规划",
                      "FEATUREPID": "FE001931",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001943",
                      "FEATURENAME": "乡镇控制性详细规划",
                      "FEATUREPID": "FE001931",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001944",
                      "FEATURENAME": "村庄规划",
                      "FEATUREPID": "FE001931",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001945",
                      "FEATURENAME": "镇村布局规划",
                      "FEATUREPID": "FE001931",
                      "FEATURESINDEX": 6,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001946",
                      "FEATURENAME": "城市设计",
                      "FEATUREPID": "FE001931",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001932",
                  "FEATURENAME": "城市五线",
                  "FEATUREPID": "FE001884",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001947",
                      "FEATURENAME": "城市黄线",
                      "FEATUREPID": "FE001932",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001948",
                      "FEATURENAME": "道路红线",
                      "FEATUREPID": "FE001932",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001949",
                      "FEATURENAME": "河道蓝线",
                      "FEATUREPID": "FE001932",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001950",
                      "FEATURENAME": "绿地绿线",
                      "FEATUREPID": "FE001932",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001951",
                      "FEATURENAME": "文物紫线",
                      "FEATUREPID": "FE001932",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001933",
                  "FEATURENAME": "其他规划",
                  "FEATUREPID": "FE001884",
                  "FEATURESINDEX": 5,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001952",
                      "FEATURENAME": "市政规划",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002187",
                      "FEATURENAME": "矿产规划",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "dir",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": [
                        {
                          "FEATUREID": "FE002188",
                          "FEATURENAME": "矿产资源总体规划",
                          "FEATUREPID": "FE002187",
                          "FEATURESINDEX": 1,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": true,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002189",
                          "FEATURENAME": "矿产资源勘查规划",
                          "FEATUREPID": "FE002187",
                          "FEATURESINDEX": 2,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002190",
                          "FEATURENAME": "矿产资源开发利用和保护规划",
                          "FEATUREPID": "FE002187",
                          "FEATURESINDEX": 3,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        }
                      ]
                    },
                    {
                      "FEATUREID": "FE002193",
                      "FEATURENAME": "地质环境规划",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "dir",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": [
                        {
                          "FEATUREID": "FE002194",
                          "FEATURENAME": "地质环境和地质灾害防治规划",
                          "FEATUREPID": "FE002193",
                          "FEATURESINDEX": 1,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002195",
                          "FEATURENAME": "矿山地质环境保护和恢复治理规划",
                          "FEATUREPID": "FE002193",
                          "FEATURESINDEX": 2,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        }
                      ]
                    },
                    {
                      "FEATUREID": "FE001955",
                      "FEATURENAME": "森林规划",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 6,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001956",
                      "FEATURENAME": "林业规划",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001957",
                      "FEATURENAME": "水利规划",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 8,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001958",
                      "FEATURENAME": "历史文化保护",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 9,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001959",
                      "FEATURENAME": "交通规划",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 10,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001960",
                      "FEATURENAME": "其他",
                      "FEATUREPID": "FE001933",
                      "FEATURESINDEX": 11,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE002103",
                  "FEATURENAME": "专项规划",
                  "FEATUREPID": "FE001884",
                  "FEATURESINDEX": 6,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002216",
                      "FEATURENAME": "低效用地再开发",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002217",
                      "FEATURENAME": "生态环境保护规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002218",
                      "FEATURENAME": "城市综合交通规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002246",
                      "FEATURENAME": "中心城区专项规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "dir",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": [
                        {
                          "FEATUREID": "FE002248",
                          "FEATURENAME": "中心城区规划结构",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 1,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002250",
                          "FEATURENAME": "中心城区居住用地及社区组织规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 2,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002252",
                          "FEATURENAME": "中心城区公共管理和公共服务设施规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 3,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002254",
                          "FEATURENAME": "绿地生态系统规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 4,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002256",
                          "FEATURENAME": "中心城区地下空间利用规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 5,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002257",
                          "FEATURENAME": "中心城区空间景观规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 6,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002259",
                          "FEATURENAME": "中心城区供电工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 7,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002261",
                          "FEATURENAME": "中心城区供热工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 8,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002263",
                          "FEATURENAME": "中心城区环卫工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 9,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002265",
                          "FEATURENAME": "中心城区雨水工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 10,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002267",
                          "FEATURENAME": "中心城区污水工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 11,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002269",
                          "FEATURENAME": "中心城区燃气工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 12,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002271",
                          "FEATURENAME": "中心城区给水工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 13,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002273",
                          "FEATURENAME": "中心城区防灾工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 14,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002275",
                          "FEATURENAME": "中心城区通信工程规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 15,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002277",
                          "FEATURENAME": "中心城区土地利用规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 16,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002279",
                          "FEATURENAME": "海绵城市建设分区管控规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 17,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002362",
                          "FEATURENAME": "中心城区综合交通规划",
                          "FEATUREPID": "FE002246",
                          "FEATURESINDEX": 18,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        }
                      ]
                    },
                    {
                      "FEATUREID": "FE002247",
                      "FEATURENAME": "市域专项规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "dir",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": [
                        {
                          "FEATUREID": "FE002281",
                          "FEATURENAME": "市域风貌结构规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 1,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002283",
                          "FEATURENAME": "市域自然与历史文化资源规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 2,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002285",
                          "FEATURENAME": "市域空间结构规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 3,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002287",
                          "FEATURENAME": "市域绿地生态系统规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 4,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002289",
                          "FEATURENAME": "市域村庄布点规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 5,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002291",
                          "FEATURENAME": "市域用地布局规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 6,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002293",
                          "FEATURENAME": "市域产业布局规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 7,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002295",
                          "FEATURENAME": "市域旅游发展规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 8,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002297",
                          "FEATURENAME": "市域市政基础设施规划",
                          "FEATUREPID": "FE002247",
                          "FEATURESINDEX": 9,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        }
                      ]
                    },
                    {
                      "FEATUREID": "FE002219",
                      "FEATURENAME": "轨道交通线网规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 6,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002220",
                      "FEATURENAME": "全域旅游规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002221",
                      "FEATURENAME": "全域水系规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 8,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002222",
                      "FEATURENAME": "市政设施类专项规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 9,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002223",
                      "FEATURENAME": "地下空间规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 10,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002224",
                      "FEATURENAME": "农业发展规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 11,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002225",
                      "FEATURENAME": "宁句一体化规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 12,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002226",
                      "FEATURENAME": "全市养老产业布局规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 13,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002227",
                      "FEATURENAME": "市区文化设施规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 14,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002228",
                      "FEATURENAME": "市区教育设施规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 15,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002229",
                      "FEATURENAME": "市区体育设施规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 16,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002230",
                      "FEATURENAME": "市区医疗设施规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 17,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002231",
                      "FEATURENAME": "市区社会福利设施规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 18,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002232",
                      "FEATURENAME": "市区电力设施规划",
                      "FEATUREPID": "FE002103",
                      "FEATURESINDEX": 19,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ],
          "className": "icon-economic-2"
        },
        {
          "FEATUREID": "FE001877",
          "FEATURENAME": "管理数据",
          "FEATUREPID": "0",
          "FEATURESINDEX": 3,
          "FEATURETYPE": "parent",
          "ISCOLLETED": false,
          "ISEMPTY": true,
          "LEDGEREXIST": false,
          "ICON": "icon-special",
          "children": [
            {
              "FEATUREID": "FE001885",
              "FEATURENAME": "调查监测",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 1,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001961",
                  "FEATURENAME": "自然资源监测（暂无）",
                  "FEATUREPID": "FE001885",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001886",
              "FEATURENAME": "确权登记",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 2,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001962",
                  "FEATURENAME": "自然资源登记",
                  "FEATUREPID": "FE001886",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": [
                    {
                      "FEATUREID": "FE002331",
                      "FEATURENAME": "集体土地所有权登记",
                      "FEATUREPID": "FE001962",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001963",
                  "FEATURENAME": "不动产登记",
                  "FEATUREPID": "FE001886",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001966",
                      "FEATURENAME": "土地承包经营权登记",
                      "FEATUREPID": "FE001963",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001967",
                      "FEATURENAME": "农村",
                      "FEATUREPID": "FE001963",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001968",
                      "FEATURENAME": "城镇",
                      "FEATUREPID": "FE001963",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001964",
                  "FEATURENAME": "不动产权籍调查",
                  "FEATUREPID": "FE001886",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001969",
                      "FEATURENAME": "总调查",
                      "FEATUREPID": "FE001964",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001970",
                      "FEATURENAME": "日常调查",
                      "FEATUREPID": "FE001964",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001965",
                  "FEATURENAME": "争议调处",
                  "FEATUREPID": "FE001886",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001887",
              "FEATURENAME": "自然资源所有者权益（暂无）",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 3,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE001888",
              "FEATURENAME": "耕地保护",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 4,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001971",
                  "FEATURENAME": "土地整治",
                  "FEATUREPID": "FE001888",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001976",
                      "FEATURENAME": "耕地占补平衡",
                      "FEATUREPID": "FE001971",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001977",
                      "FEATURENAME": "万顷良田",
                      "FEATUREPID": "FE001971",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002110",
                      "FEATURENAME": "城乡建设用地增减挂钩",
                      "FEATUREPID": "FE001971",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001978",
                      "FEATURENAME": "旱地改水田地块（暂无）",
                      "FEATUREPID": "FE001971",
                      "FEATURESINDEX": 6,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001979",
                      "FEATURENAME": "耕地质量提升地块（暂无）",
                      "FEATUREPID": "FE001971",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001972",
                  "FEATURENAME": "设施农用地备案",
                  "FEATUREPID": "FE001888",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE001974",
                  "FEATURENAME": "永久基本农田占用、补划",
                  "FEATUREPID": "FE001888",
                  "FEATURESINDEX": 5,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001889",
              "FEATURENAME": "生态修复",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 5,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002112",
                  "FEATURENAME": "矿山生态修复",
                  "FEATUREPID": "FE001889",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE002350",
                  "FEATURENAME": "工矿废弃地复垦",
                  "FEATUREPID": "FE001889",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001890",
              "FEATURENAME": "自然资源开发利用",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 6,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE001982",
                  "FEATURENAME": "用途管制和开发利用",
                  "FEATUREPID": "FE001890",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE001985",
                      "FEATURENAME": "控规调整",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002198",
                      "FEATURENAME": "重点项目",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001986",
                      "FEATURENAME": "建设用地报批",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001987",
                      "FEATURENAME": "临时用地",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002236",
                      "FEATURENAME": "建设项目用地预审与选址意见书",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "dir",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": [
                        {
                          "FEATUREID": "FE002237",
                          "FEATURENAME": "预审",
                          "FEATUREPID": "FE002236",
                          "FEATURESINDEX": 1,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002238",
                          "FEATURENAME": "选址",
                          "FEATUREPID": "FE002236",
                          "FEATURESINDEX": 2,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002239",
                          "FEATURENAME": "预审与选址",
                          "FEATUREPID": "FE002236",
                          "FEATURESINDEX": 3,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": true,
                          "LEDGEREXIST": false,
                          "ICON": "",
                          "children": []
                        }
                      ]
                    },
                    {
                      "FEATUREID": "FE001989",
                      "FEATURENAME": "土地储备",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001990",
                      "FEATURENAME": "规划条件",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 8,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001991",
                      "FEATURENAME": "土地供应",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 9,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001992",
                      "FEATURENAME": "批而未供",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 10,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001993",
                      "FEATURENAME": "供而未用",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 11,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001994",
                      "FEATURENAME": "低效用地再开发",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 12,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001995",
                      "FEATURENAME": "建设用地规划许可证",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 13,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001996",
                      "FEATURENAME": "建设工程设计方案",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 14,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002199",
                      "FEATURENAME": "规划审批",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 16,
                      "FEATURETYPE": "dir",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": [
                        {
                          "FEATUREID": "FE002180",
                          "FEATURENAME": "乡村建设规划许可证",
                          "FEATUREPID": "FE002199",
                          "FEATURESINDEX": 1,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        },
                        {
                          "FEATUREID": "FE002181",
                          "FEATURENAME": "建设工程规划许可",
                          "FEATUREPID": "FE002199",
                          "FEATURESINDEX": 3,
                          "FEATURETYPE": "topic",
                          "ISCOLLETED": false,
                          "ISEMPTY": false,
                          "LEDGEREXIST": false,
                          "ICON": "icon-space",
                          "children": []
                        }
                      ]
                    },
                    {
                      "FEATUREID": "FE001998",
                      "FEATURENAME": "市政审批",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 18,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE001999",
                      "FEATURENAME": "放验线",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 19,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002000",
                      "FEATURENAME": "竣工验收审批",
                      "FEATUREPID": "FE001982",
                      "FEATURESINDEX": 20,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001983",
                  "FEATURENAME": "矿产管理",
                  "FEATUREPID": "FE001890",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002001",
                      "FEATURENAME": "采矿权",
                      "FEATUREPID": "FE001983",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002002",
                      "FEATURENAME": "探矿权",
                      "FEATUREPID": "FE001983",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002003",
                      "FEATURENAME": "绿色矿山管理",
                      "FEATUREPID": "FE001983",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002004",
                      "FEATURENAME": "废弃矿山管理",
                      "FEATUREPID": "FE001983",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002005",
                      "FEATURENAME": "储量登记",
                      "FEATUREPID": "FE001983",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE001984",
                  "FEATURENAME": "林业管理",
                  "FEATUREPID": "FE001890",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002006",
                      "FEATURENAME": "一般林木采伐许可",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002007",
                      "FEATURENAME": "占用林地许可",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 2,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002008",
                      "FEATURENAME": "临时占用林地许可",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 3,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002009",
                      "FEATURENAME": "林业生产占用林地许可",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 4,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002010",
                      "FEATURENAME": "公益林变更调整",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 5,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": false,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002011",
                      "FEATURENAME": "公益林补偿资金",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 6,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002012",
                      "FEATURENAME": "林权证档案",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 7,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002013",
                      "FEATURENAME": "城市综合交通规划",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 8,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002014",
                      "FEATURENAME": "森林植物产地检疫合格证核发",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 9,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002015",
                      "FEATURENAME": "调入省同意省际调运植物和植物产品",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 10,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002016",
                      "FEATURENAME": "应施检疫的森林植物及其产品的备案",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 11,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    },
                    {
                      "FEATUREID": "FE002017",
                      "FEATURENAME": "林木种子种苗自然清查",
                      "FEATUREPID": "FE001984",
                      "FEATURESINDEX": 12,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "FEATUREID": "FE002201",
              "FEATURENAME": "自然资源执法",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 7,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002205",
                  "FEATURENAME": "土地违法案件",
                  "FEATUREPID": "FE002201",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002206",
                      "FEATURENAME": "违法用地地块",
                      "FEATUREPID": "FE002205",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE002203",
                  "FEATURENAME": "矿产资源违法案件",
                  "FEATUREPID": "FE002201",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE002204",
                  "FEATURENAME": "林业违法案件(暂无)",
                  "FEATUREPID": "FE002201",
                  "FEATURESINDEX": 4,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001891",
              "FEATURENAME": "自然资源监管",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 8,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002207",
                  "FEATURENAME": "卫片执法图斑",
                  "FEATUREPID": "FE001891",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": true,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                },
                {
                  "FEATUREID": "FE002208",
                  "FEATURENAME": "城市综合交通规划",
                  "FEATUREPID": "FE001891",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE002028",
                  "FEATURENAME": "地质勘查监管",
                  "FEATUREPID": "FE001891",
                  "FEATURESINDEX": 7,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002032",
                      "FEATURENAME": "地质勘查项目管理（暂无））",
                      "FEATUREPID": "FE002028",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE002029",
                  "FEATURENAME": "自然资源市场监管",
                  "FEATUREPID": "FE001891",
                  "FEATURESINDEX": 8,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002033",
                      "FEATURENAME": "城镇基准地价",
                      "FEATUREPID": "FE002029",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "FEATUREID": "FE001892",
              "FEATURENAME": "防灾减灾",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 9,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002034",
                  "FEATURENAME": "地质灾害防治",
                  "FEATUREPID": "FE001892",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": [
                    {
                      "FEATUREID": "FE002036",
                      "FEATURENAME": "地质灾害监测点",
                      "FEATUREPID": "FE002034",
                      "FEATURESINDEX": 1,
                      "FEATURETYPE": "topic",
                      "ISCOLLETED": false,
                      "ISEMPTY": true,
                      "LEDGEREXIST": false,
                      "ICON": "icon-space",
                      "children": []
                    }
                  ]
                },
                {
                  "FEATUREID": "FE002035",
                  "FEATURENAME": "森林火灾防治（暂无）",
                  "FEATUREPID": "FE001892",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "dir",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001893",
              "FEATURENAME": "行政行为",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 10,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002037",
                  "FEATURENAME": "合同合法性审核",
                  "FEATUREPID": "FE001893",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE002038",
                  "FEATURENAME": "违法用地查处卷宗",
                  "FEATUREPID": "FE001893",
                  "FEATURESINDEX": 2,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                },
                {
                  "FEATUREID": "FE002039",
                  "FEATURENAME": "复议诉讼",
                  "FEATUREPID": "FE001893",
                  "FEATURESINDEX": 3,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": true,
                  "LEDGEREXIST": false,
                  "ICON": "icon-space",
                  "children": []
                }
              ]
            },
            {
              "FEATUREID": "FE001894",
              "FEATURENAME": "信访管理",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 11,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": []
            },
            {
              "FEATUREID": "FE002352",
              "FEATURENAME": "历史文化保护",
              "FEATUREPID": "FE001877",
              "FEATURESINDEX": 12,
              "FEATURETYPE": "dir",
              "ISCOLLETED": false,
              "ISEMPTY": true,
              "LEDGEREXIST": false,
              "ICON": "",
              "children": [
                {
                  "FEATUREID": "FE002353",
                  "FEATURENAME": "历史建筑",
                  "FEATUREPID": "FE002352",
                  "FEATURESINDEX": 1,
                  "FEATURETYPE": "topic",
                  "ISCOLLETED": false,
                  "ISEMPTY": false,
                  "LEDGEREXIST": false,
                  "ICON": "",
                  "children": []
                }
              ]
            }
          ],
          "className": "icon-special"
        },
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
      onDragging: false
    };
  },
  mounted() { },
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
      console.log("currentScreenIndex", newVal);
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