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
import apiSetting from "@/api/axios/apiSetting";
import bus from '@/eventBus.js';

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
        var that = this;
        that.text = '登录中...';
        let username = this.$route.params.username;
        let password = this.$route.params.password;

        loadScripts(['./AppSetting.js']).then((e) => {
            that.text = '登录成功!!!';
            setTimeout(function () {
                that.$router.push({
                    name: 'homepage',
                    query: {
                        id: '1'
                    }
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
