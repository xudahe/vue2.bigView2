<template>
    <div id="appComponts4" style="width:100%;height: 100%;">
        <!-- 弹出窗组件 -->
        <div v-if="isdialog">
            <v-dialog ref="dialog" v-model="dialog.show" :title="dialog.title" :buttons="dialog.buttons"
                :bodyshow="dialog.bodyshow" @input="detailclose('closeDialog')">
                <component :is="componentNameLeft" v-bind:detailData="detailDataLeft"></component>
            </v-dialog>
        </div>

        <!-- 左侧菜单 -->
        <div v-show="showMenu" class="appMenu" :style="{ width: menuwidth + 'rem' }">
            <div class="appMenumain">
                <div style="padding: 0 0.05rem;float: left;cursor: pointer;width: 100%;" :key="index"
                    v-for="(item, index) in menuData">
                    <div style="margin-top: 0.15rem;width: 100%;"
                        :class="[menuFlag == index ? 'appMenuDivsel' : 'appMenuDiv']" @click="changeMenu(item, index)">
                        <div style="display: inline-block;vertical-align: middle;">
                            <img :src="menuFlag == index ? item.imgT : item.imgF" class="menuimg" />
                        </div>

                        <div class="menuContText">
                            <span :class="menuFlag == index ? 'activeT' : 'activeF'">{{ item.menuname }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 左侧框 -->
        <div v-if="showLeft" class="appCompontsLeft fade-in-right" :style="{ width: pageWidth + 'rem' }">
            <div class="appCompontsDiv">
                <div style="position: relative;">
                    <Icon class="close_l" type="ios-close-circle-outline" @click="detailclose('closeleft')" />
                    <div class="appCompontsTitle" style="font-size:0.17rem;">{{ titleLeftName }}</div>
                </div>
                <!-- 组件部分 -->
                <div style="width: 100%;height: calc(100% - 0.4rem);"></div>
                <component :is="componentNameLeft" v-bind:detailData="detailDataLeft"></component>
            </div>
        </div>

        <div class="appCompontsRight" :style="{ width: 19.2 - pageWidth - menuwidth + 'rem' }">
            <!-- 地图部分 -->
            <div class="appCompontsMap scale-in" :style="{ height: showBotm ? '55%' : '100%' }">
                <newMap ref="newMap"></newMap>
            </div>
            <!-- 底部框 -->
            <div v-if="showBotm" class="appCompontsBottom fade-in-up">
                <div class="appCompontsDiv">
                    <Icon class="close" type="ios-close-circle-outline" @click="detailclose('closebottom')" />
                    <div class="appCompontsTitle">{{ titleBotmName }}</div>
                    <div style="width: 100%;height: calc(100% - 0.4rem);">
                        <component :is="componentNameBotm" v-bind:detailData="detailDataBotm"></component>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import bus from "@/eventBus.js";
import vDialog from "@/components/dialog/dialog.vue"
import newMap from "@/components/arcgis_map/index.vue"
export default {
    name: "application4",
    components: {
        vDialog,
        newMap
    },
    watch: {
        // 监测路由变化,只要变化了就获取路由参数重新加载菜单
        $route(to, from) {
            var _this = this;
            // to为跳转之后的路由
            _this.oldindex = null;
            var menuid = _this.menuid = this.$route.query.id

            _this.getMenus(menuid);
            _this.detailclose("closeleft");
            _this.menuFlag = -1;
        }
    },
    props: {},
    data() {
        return {
            menuid: null,

            menuwidth: 2.05,
            pageWidth: 0,

            showMenu: true,
            showLeft: false,
            showBotm: false,

            menuData: [],
            menuFlag: null,
            oldindex: null,

            componentNameLeft: "",
            componentNameBotm: "",

            detailDataLeft: {},
            detailDataBotm: {},

            titleBotmName: "",
            titleLeftName: "",

            dialog: {
                show: false,
                title: {
                    text: '',
                    className: 'xa-bg-blue'
                },
                bodyshow: true,
            },
            isdialog: false
        };
    },
    methods: {
        getMenus(menuid) {
            var _this = this;
            _this.menuData = [{
                classname: 'qwer1',
                id: '1',
                menuname: '菜单',
                note: '左侧',
                imgF: require('@/assets/template/004/img/menus/用户管理.png'),
                imgT: require('@/assets/template/004/img/menus/用户管理s.png'),
            }, {
                classname: 'qwer2',
                id: '2',
                menuname: '菜单',
                note: '全屏',
                imgF: require('@/assets/template/004/img/menus/用户管理.png'),
                imgT: require('@/assets/template/004/img/menus/用户管理s.png'),
            }, {
                classname: 'qwer3',
                id: '3',
                menuname: '菜单',
                note: '弹窗',
                imgF: require('@/assets/template/004/img/menus/用户管理.png'),
                imgT: require('@/assets/template/004/img/menus/用户管理s.png'),
            },];
            _this.menuFlag = null;

            if (_this.menuData.length == 1) {
                _this.menuwidth = 0;
                _this.showMenu = false;
                setTimeout(() => {
                    _this.changeMenu(_this.menuData[0], 0)
                }, 500);
            } else {
                _this.menuwidth = 2.05;
                _this.showMenu = true;
            }
        },
        changeMenu(item, index) {
            //重复点击 不执行
            if (this.oldindex == index && (this.showLeft || this.showLeft || this.isdialog))
                return;

            this.initial();
            this.detailclose();

            this.detailDataLeft = item;
            this.menuFlag = this.oldindex = index;

            if (item.note == '左侧') {
                this.showLeft = true;
                this.pageWidth = 5.14;
                this.titleLeftName = item.menuname;
                this.componentNameLeft = item.classname;

            } else if (item.note == '全屏') {
                this.showLeft = true;
                this.pageWidth = 19.2 - this.menuwidth - 0.1
                this.titleLeftName = item.menuname;
                this.componentNameLeft = item.classname;
            } else if (item.note == '弹窗') {
                this.pageWidth = 0;
                this.dialog.show = this.isdialog = true;
                this.dialog.title.text = item.menuname;
                setTimeout(() => {
                    this.$refs.dialog.retresize();
                }, 200)
            }
        },
        initial() {
            this.detailDataLeft = {};
            this.titleLeftName = "";
            this.componentNameLeft = "";
        },
        detailclose(type) {
            if (type == "closeleft") {
                this.pageWidth = 0;
                this.showLeft = false;
            }
            else if (type == "closebottom") {
                this.showBotm = false;
            } else if (type == "closeDialog") {
                this.isdialog = false;
            }
            else {
                this.showMenu = true;
                this.isdialog = false;
                this.showLeft = false;
                this.showBotm = false;
            }
        },

    },
    mounted() {
        var _this = this;
        var menuid = _this.menuid = this.$route.query.id;
        _this.getMenus(menuid);
        _this.menuFlag = -1;

        _this.detailclose();
        bus.$on("detailclose", _this.detailclose('closebottom'));

        bus.$on("botmDetail", function (value, item, title) {
            _this.showBotm = true;
            _this.detailDataBotm = item;
            _this.componentNameBotm = value;
            _this.titleBotmName = title;
        });

        bus.$on("toolMenu", function (f) {
            if (f == "书签") {
                _this.changeMenu({
                    classname: 'bookmark',
                    id: -1,
                    menuname: '书签',
                    note: '左侧',
                    imgF: require('@/assets/template/004/img/menus/用户管理.png'),
                    imgT: require('@/assets/template/004/img/menus/用户管理s.png'),
                }, -1);
            }
            if (f == "拾取") {
                _this.changeMenu({
                    classname: 'identifydata',
                    id: -1,
                    menuname: '拾取',
                    note: '左侧',
                    imgF: require('@/assets/template/004/img/menus/用户管理.png'),
                    imgT: require('@/assets/template/004/img/menus/用户管理s.png'),
                }, -1);
            }
        })
    },
    created() {
        
    },
    beforeDestroy() {
        bus.$off("detailclose")
        bus.$off("botmDetail")
        bus.$off("toolMenu")
    },
}
</script>

<style lang="less"></style>