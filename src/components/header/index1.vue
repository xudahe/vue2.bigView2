<template>
    <div class="header" style="z-index: 9;position: relative;">
        <div class="left-div" style="width:33.3%;float: left;height: 100%;">
            <div class="leftTool">
                <div style="padding-left:0.1rem;color:rgb(75 236 214);">

                </div>
            </div>
            <div :key="index" class="menuDiv" :class="{ 'menuDivT': ismeunNumLeft == item.id }"
                v-for="(item, index) in menuDataLeft" @click="changeMenu_left(item)">
                <div style="height: 100%">
                    <div class="homeMenu" :class="[ismeunNumLeft == item.id ? 'homeMenuTextT' : 'homeMenuTextF']">
                        {{ item.menuname }}
                    </div>
                </div>
            </div>
        </div>

        <div class="center-div" style="width:33.3%;float: left;text-align: center;height: 100%;">
            <div style="display: inline-block;height: 100%;cursor: pointer;" @click="goHomepage()">
                <div class="ptname">{{ ptTitle }}</div>
            </div>
        </div>

        <div class="right-div" style="width:33.3%;float: left;height: 100%;">
            <div :key="index" class="menuDiv" :class="{ 'menuDivT': ismeunNumRight == item.id }"
                v-for="(item, index) in menuDataRight" @click="changeMenu_Right(item)">
                <div style="height: 100%">
                    <div class="homeMenu homeMenuRight"
                        :class="[ismeunNumRight == item.id ? 'homeMenuTextT' : 'homeMenuTextF']">
                        {{ item.menuname }}
                    </div>
                </div>
            </div>
            <div class="rightTool">
                <ul class="right-menu" style="display: inline-block;vertical-align: middle;">
                    <li class="eui-nav-item">
                        <Dropdown trigger="click" style="" @on-click='accountSwitches'>
                            <span style="cursor: pointer;color: #fff">
                                <img :src="require('@/assets/template/004/img/login/头像.png')" class="logo-img" />
                                <span>{{ loginName }}</span>
                                <Icon type="arrow-down-b"></Icon>
                            </span>
                            <DropdownMenu slot="list" style="color: #ffffff">
                                <Dropdown-item name="密码修改">密码修改</Dropdown-item>
                                <Dropdown-item name="平台切换">平台切换</Dropdown-item>
                                <Dropdown-item name="退出登录">退出登录</Dropdown-item>
                            </DropdownMenu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
  
<script>

import { MapControl } from "@/components/arcgis_map/js/MapControl.js";

export default {
    name: "index1",
    data() {
        return {
            loginName: '测试管理员',
            ptTitle: '灌南县排水管网GIS平台',

            ismeunNumLeft: null,
            ismeunNumRight: null,

            menuDataLeft: [],
            menuDataRight: [],
            menuList: [
                { classname: 'homepage', menuname: '综合', id: 1, children: [] },
                { classname: 'application', menuname: '菜单2', id: 2, children: [] },
                { classname: 'application', menuname: '菜单3', id: 3, children: [] },
                { classname: 'application', menuname: '菜单4', id: 4, children: [] },
                { classname: 'application', menuname: '菜单5', id: 5, children: [] },
                { classname: 'application', menuname: '菜单6', id: 6, children: [] },
            ],
        };
    },
    watch: {
        // 检测路由变化
        $route(to, from) {
            this.ismeunNumLeft = null;
            this.ismeunNumRight = null;
            var menuid = this.$route.query.id;

            for (let i = 0; i < this.menuDataLeft.length; i++) {
                if (menuid == this.menuDataLeft[i].id) {
                    return this.ismeunNumLeft = menuid;
                }
            }
            for (let j = 0; j < this.menuDataRight.length; j++) {
                if (menuid == this.menuDataRight[j].id) {
                    return this.ismeunNumRight = menuid;
                }
            }
        }
    },
    methods: {
        goHomepage() {
            this.$router.push({
                name: 'homepage',
                query: {
                    id: 1
                }
            });
        },
        getSysList() {
            this.menuDataLeft = [];
            this.menuDataRight = [];

            if (this.menuList.length > 0) {
                var len = this.menuList.length % 2 == 0 ? this.menuList.length / 2 : parseInt(this.menuList.length / 2 + 1);

                for (let k = 0; k < len; k++) {
                    this.menuDataLeft.push({
                        classname: this.menuList[k].classname,
                        id: this.menuList[k].id,
                        menuname: this.menuList[k].menuname,
                        children: this.menuList[k].children
                    })
                }
                for (let l = len; l < this.menuList.length; l++) {
                    this.menuDataRight.push({
                        classname: this.menuList[l].classname,
                        id: this.menuList[l].id,
                        menuname: this.menuList[l].menuname,
                        children: this.menuList[l].children
                    })
                }
            }
        },
        changeMenu_left(item) {
            this.ismeunNumRight = null;
            this.ismeunNumLeft = item.id;

            this.$router.push({
                name: item.classname,
                query: {
                    id: item.id
                }
            });
        },
        changeMenu_Right(item) {
            this.ismeunNumLeft = null;
            this.ismeunNumRight = item.id;

            this.$router.push({
                name: item.classname,
                query: {
                    id: item.id
                }
            });
        },
        accountSwitches(name) {
            switch (name) {
                case "密码修改":

                    break;
                case "平台切换":
                    this.$router.push({
                        name: 'platform'
                    });
                    break;
                case "退出登录":
                    this.$store.dispatch("LogOut").then(() => {
                        this.$router.push({ path: "/login" });
                    });
                    // window.location.reload()
                    break;
                default:
                    break;
            }
        }
    },
    mounted() {
        var _this = this;
        this.getSysList();
    },
    created() {
        this._getLess("/header/index.less");
    },
}
</script>
  
<style lang="less"></style>
  