<template>
  <div style="height:100%;width:100%;" class="test2 bgActive collapse simple_page">
    <div style="padding: 0.05rem;height: 100%;">

      <div style="overflow: auto;height: calc(100% - 0.4rem);" class="borderdiv">
        <Collapse accordion>
          <Panel style="margin:0.05rem;font-size: 0.12rem;font-weight: bold;" v-for="(item, index) in tableList"
            :key="index" :name="item.title + index">
            {{ item.title }} &nbsp;&nbsp;
            <div style="float:right;margin-right:0.1rem;font-size: 0.12rem;">
              <span>3(台)</span>
            </div>
            <div slot="content" v-for="(itema, indev) in item.children" :key='indev'>
              <div style="cursor:pointer;overflow: hidden;position: relative;padding-left: 0.05rem;"
                @click='expandlist(indev, itema, index)'
                :class="indev + 'a' + index == selectId ? 'bgActiveT' : 'bgActiveF'">
                <div class="midDiv">
                  <div class="midlabel">泵站类型：</div>
                  <div class="midvalue">{{ item.类型 }}</div>
                </div>
                <div class="midDiv">
                  <div class="midlabel">运行时间：</div>
                  <div class="midvalue">{{ item.运行时间 }}</div>
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
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

export default {
  name: 'test2',
  components: {

  },
  data() {
    return {
      page: {
        pageSize: 10, //每页记录数
        current: 1, //当前页码
        total: 0,
        pageList: [
          { title: "某某1", children: [{ name: "某某1", 类型: "雨水泵站", 运行时间: "2023-02-22 10:58:57", }] },
          { title: "某某2", children: [{ name: "某某2", 类型: "污水泵站", 运行时间: "2023-02-22 10:58:57", }] },
          { title: "某某3", children: [{ name: "某某3", 类型: "引水泵站", 运行时间: "2023-02-22 10:58:57", }] },
          { title: "某某4", children: [{ name: "某某4", 类型: "雨水泵站", 运行时间: "2023-02-22 10:58:57", }] },
          { title: "某某5", children: [{ name: "某某5", 类型: "雨水泵站", 运行时间: "2023-02-22 10:58:57", }] },
          { title: "某某6", children: [{ name: "某某6", 类型: "雨水泵站", 运行时间: "2023-02-22 10:58:57", }] },
          { title: "某某7", children: [{ name: "某某7", 类型: "雨水泵站", 运行时间: "2023-02-22 10:58:57", }] },
        ],
      },
      selectId: '', //已选择的编号

      titlename: '缩略图',
      tableList: [],
    };
  },
  methods: {
    expandlist(index, item, indev) {
      this.selectId = index + "a" + indev;

      let listClass = document.getElementsByClassName('ivu-collapse-header');
      for (let i = 0; i < listClass.length; i++) {
        if (i == indev) {
          listClass[i].classList.remove('bgActiveT');
          listClass[i].classList.remove('bgActiveF');
          listClass[i].classList.add('bgActiveT');
        } else {
          listClass[i].classList.remove('bgActiveT');
          listClass[i].classList.remove('bgActiveF');
          listClass[i].classList.add('bgActiveF');
        }
      }

      bus.$emit("rightDetail", "", item, item.name)
    },
    changePage(index) {
      this.page.current = index;
      this.page.total = this.page.pageList.length;

      var _start = (index - 1) * this.page.pageSize;
      var _end = index * this.page.pageSize;
      this.tableList = this.page.pageList.slice(_start, _end);
    },
    loadData() {
      this.changePage(1)

      let listClass = document.getElementsByClassName('ivu-collapse-header');
      setTimeout(function () {
        for (let i = 0; i < listClass.length; i++) {
          listClass[i].classList.remove('bgActive');
          listClass[i].classList.remove('bgActiveF');
          setTimeout(function () {
            listClass[i].classList.add('bgActiveF');
          }, 100)
        }
      }, 500)
    },
  },
  mounted() {
    var _this = this;

    this.loadData()
  },
  beforeDestroy() {

  },
};
</script>

<style lang="less" scoped>
.test2 {
  .midDiv {
    width: 100%;
    height: 35px;
    line-height: 35px;
    padding-left: 0.2rem;

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
