<template>
    <div class="menusDiv">
        <div class="loadDiv">
            <div style="height: 100%;width: 50%;float: left;position: relative">
                <img src="@/assets/template/004/img/login/loading.png"
                    style="width: 5.53rem;height: 7.09rem;position: absolute;right: 0;top: calc((100% - 7.09rem) / 2);" />
            </div>
            <div style="height: 100%;width: 50%;float: left;text-align: left;padding-left: 0.2rem;">
                <div class="text">{{ text }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import apiSetting from "@/api/apiSetting";
import bus from '@/eventBus.js';
import { isNull } from "@/utils/validate";

var publicPath = process.env.BASE_URL;
export default {
    name: "loading",
    components: {},
    data() {
        return {
            text: ''
        };
    },
    methods: {},

    mounted() {
        var _this = this;

        _this.text = '登录中...';
        let themename = this.$route.params.themename;
        let username = this.$route.params.username;
        let password = this.$route.params.password;

        loadScripts([`${publicPath}config/loading.js`]).then((e) => {
            _this.text = '登录成功!!!';

            //后期从接口获取theme值
            _this.$store.commit("SET_THEME_NAME", isNull(themename) ? _this.$store.state.theme.themeName : themename);

            setTimeout(function () {
                _this.$router.push({
                    name: 'homepage',
                    query: { id: '1' }
                });
            }, 500);
        })
    },
    beforeDestroy() { }
};
</script>
<style lang="less" scoped="scoped">
.menusDiv {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-repeat: round;
    background-color: #090540;

    .loadDiv {
        height: 100%;
    }

    .text {
        color: #ffffff;
        font-size: 0.5rem;
        font-weight: 500;
        line-height: 2rem;
        height: 2rem;
        margin-top: calc(~'(100% - 2rem) / 2');
    }
}
</style>
