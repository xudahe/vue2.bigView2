<template>
    <div class="header" style="z-index: 99;position: relative;">
        <div style="width: 6.4rem;float: left;height: 0.75rem;">
            <!-- <div class="headerTitle" style="width: 4.99rem;height: auto;margin-top: 0.14rem;margin-left: 0.7rem;">{{ ptTitle }}</div> -->
            <img src="@/assets/template/004/img/app/灌南县排水管网GIS平台.png"
                style="width: 4.99rem;margin-top: -0.05rem;margin-left: 0.5rem;" />
        </div>
        <div class="right-div" style="float: left;padding-left: 0.8rem;">
            <div :key="index" class="menuDiv" v-for="(item, index) in menuData">
                <div style="height: 100%" @click="changeMenu(item)">
                    <div class="homeMenu" :class="[ismeunNum == item.id ? 'homeMenuTextT' : 'homeMenuTextF']">
                        {{ item.menuname }}
                    </div>
                </div>
                <div v-if="index < menuData.length - 1"
                    style="width: 2px;height: 0.15rem;background-color: #00b0db;position: absolute;right: 0;top: 0.305rem;border-radius: 0.05rem;">
                </div>
            </div>
        </div>
        <div class="right-div"
            style="font-size: 0.17rem;float: left;padding-left: 0.8rem;right: 1.6rem;position: absolute;">
            <div style="padding-right: 0.2rem;float:right;color:rgb(25, 210, 255);font-weight: bold;padding-top: 0.25rem;" id="showTime">
            </div>
            <div
                style="width: 2px;height: 0.35rem;background: #5AF1F7;right:0rem;position: absolute;top: 0.205rem;border-radius: 0.05rem;">
            </div>
        </div>
        <ul class="right-menu">
            <li class="eui-nav-item">
                <Dropdown trigger="hover" style="" @on-click="accountSwitches">
                    <span style="cursor: pointer;color: #fff;font-size: 0.18rem;">
                        <img src="@/assets/template/004/img/login/头像.png" class="logo-img" />
                        <span style="color: #19d2ff;">{{ loginName }}</span>
                        <!-- <Icon type="arrow-down-b"></Icon> -->
                    </span>
                    <DropdownMenu slot="list" style="color: #ffffff">
                        <Dropdown-item name="密码修改">密码修改</Dropdown-item>
                        <Dropdown-item name="主题切换">主题切换</Dropdown-item>
                        <Dropdown-item name="退出登录">退出登录</Dropdown-item>
                    </DropdownMenu>
                </Dropdown>
            </li>
        </ul>
    </div>
</template>

<script>
import bus from "@/eventBus.js";

export default {
    name: "index4",
    components: {

    },
    computed: {
    },
    watch: {
        $route(to, from) {
            var _this = this;
            // to为跳转之后的路由
            this.ismeunNum = null;

            var menuid = this.$route.query.id
            for (let i = 0; i < this.menuData.length; i++) {
                if (menuid == this.menuData[i].id) {
                    this.ismeunNum = menuid;
                }
            }
        }
    },
    data() {
        return {
            loginName: '管理员',
            ptTitle: '',

            ismeunNum: null,
            menuData: [
                { classname: 'homepage', menuname: '综合', id: 1, children: [] },
                { classname: 'application', menuname: '菜单2', id: 2, children: [] },
                { classname: 'application', menuname: '菜单3', id: 3, children: [] },
                { classname: 'application', menuname: '菜单4', id: 4, children: [] },

            ],
        };
    },
    methods: {
        changeMenu(item) {
            this.ismeunNum = item.id;
            this.$router.push({
                name: item.classname,
                query: {
                    id: item.id
                }
            });
        },
        accountSwitches(name) {
            let _this = this;

            switch (name) {
                case "密码修改":

                    break;
                case "主题切换":
                    bus.$emit("topTheme", true);
                    break;
                case "退出登录":
                    this.$Modal.confirm({
                        content: '是否退出系统, 是否继续？',
                        title: '提示',
                        okText: '离开',
                        cancelText: '取消',
                        onOk: function () {
                            // 正常跳转
                            this.$store.dispatch("LogOut").then(() => {
                                _this.$router.push({ path: "/login" });
                            });
                        },
                        onCancel: function () {
                            // 取消跳转
                        }
                    });
                    // window.location.reload()
                    break;
                default:
                    break;
            }
        },
    },
    mounted() {
        // 创建定时器更新最新的时间
        const timer = setInterval(function () {
            let dt = new Date();
            var y = dt.getFullYear();
            var mt = padaDate(dt.getMonth() + 1);
            var day = padaDate(dt.getDate());
            var h = padaDate(dt.getHours()); //获取时
            var m = padaDate(dt.getMinutes()); //获取分
            var s = padaDate(dt.getSeconds()); //获取秒
            document.getElementById("showTime").innerHTML = y + "-" + mt + "-" + day + " " + h + ":" + m + ":" + s;
        }, 1000);

        function padaDate(value) {
            return value < 10 ? "0" + value : value;
        };

        this.$once("hook:beforeDestroy", () => {
            clearInterval(timer);
        });
    },

    created() {

    },
};
</script>

<style lang="less"></style>
