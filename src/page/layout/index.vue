<style lang="less">
#homemain {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div id="homemain">
        <v-header />
        <router-view />

        <top-theme ref="topTheme"></top-theme>
    </div>
</template>

<!-- 
    <router-link>   跳转用
    <router-view/>  替换页面组件用 
-->

<script>
import Vue from 'vue';
import bus from "@/eventBus.js";
import vHeader from '@/views/header/index.vue';
import topTheme from './top-theme.vue';

export default {
    components: {
        vHeader,
        topTheme,
    },
    watch: {
        $route(to, from) {
            console.log(to)
        }
    },
    data() {
        return {
        };
    },
    mounted() {
        let _this = this;

        _this.$refs.topTheme.box = false;
        bus.$off("topTheme").$on("topTheme", function (params) {
            _this.$refs.topTheme.box = params;
            _this.$refs.topTheme.text = _this.$store.state.theme.themeName;
            _this.$refs.topTheme.gray = document.body.className.indexOf('grayMode') != -1 ? true : false;
        });
    },
    beforeDestroy() {
    },
    methods: {
    },
    created() {
        //全局组件初始化。最终读取src/components下的所有index.vue文件进行组件注册。
        //注意：自动注册组件依赖组件名称，因此，请在封装组件时给组件加上name字段。
        const req = require.context('@/components/page', true, /\.vue$/)
        //全局注册组件
        req.keys().forEach(val => {
            const component = req(val).default
            Vue.component(component.name, component)
        })
    }
};
</script>

