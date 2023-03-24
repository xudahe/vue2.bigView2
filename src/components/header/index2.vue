<template>
    <div class="header" style="z-index: 99;">
        <div class="homePageTitle">
            <div class="headerdiv" style="width: 6.4rem;text-align: right;">
                <div class="leftTool">
                    <div style="padding-left:0.1rem;color:rgb(75 236 214);">

                    </div>
                </div>
                <div :key="index" :class="[ismeunNumLeft == item.id ? 'menuDiv menuDivL' : 'menuDiv']"
                    v-for="(item, index) in menuDataLeft">
                    <div style="height: 100%" @click="changeMenu_left(item)">
                        <div class="homeMenu" :class="[ismeunNumLeft == item.id ? 'homeMenuTextT' : 'homeMenuTextF']">
                            {{ item.menuname }}
                        </div>
                    </div>
                    <div v-if="index < menuDataLeft.length - 1"
                        style="width: 2px;height: 0.15rem;background-color: #36a8f9;position: absolute;right: 0;top: 0.26rem;border-radius: 0.05rem;">
                    </div>
                </div>
            </div>
            <div class="headerdiv" style="width: 6.4rem;">
                <div class="headerTitle">
                    {{ ptTitle }}
                </div>
            </div>
            <div class="headerdiv" style="width: 6.4rem;">
                <div :key="index" :class="[ismeunNumRight == item.id ? 'menuDiv menuDivL' : 'menuDiv']"
                    v-for="(item, index) in menuDataRight">
                    <div style="height: 100%" @click="changeMenu_Right(item)">
                        <div class="homeMenu" :class="[ismeunNumRight == item.id ? 'homeMenuTextT' : 'homeMenuTextF']">
                            {{ item.menuname }}
                        </div>
                    </div>
                    <div v-if="index < menuDataRight.length - 1"
                        style="width: 2px;height: 0.15rem;background-color: #36a8f9;position: absolute;right: 0;top: 0.26rem;border-radius: 0.05rem;">
                    </div>
                </div>
            </div>

            <ul class="right-menu">
                <li class="eui-nav-item">
                    <Dropdown trigger="click" style="" @on-click='accountSwitches'>
                        <span style='cursor: pointer;color: #fff'>
                            <img src="@/assets/template/004/img/login/头像.png" class="logo-img" />
                            <span style="padding-left: 0.1rem;color: #37a9f9;">{{ loginName }}</span>
                            <Icon type="arrow-down-b"></Icon>
                        </span>
                        <DropdownMenu slot="list" style="color: #ffffff">
                            <DropdownItem name="密码修改">密码修改</DropdownItem>
                            <Dropdown-item name="平台切换">平台切换</Dropdown-item>
                            <Dropdown-item name="账号切换">账号切换</Dropdown-item>
                        </DropdownMenu>
                    </Dropdown>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import bus from "@/eventBus.js";

export default {
    name: "index2",
    components: {
    },
    computed: {
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
                    this.$router.push({
                        name: 'login'
                    });
                    window.location.reload()
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
    beforeDestroy() {

    },
    created() {
        this._getLess("/header/index.less");
    },
};
</script>

<style lang="less"></style>
