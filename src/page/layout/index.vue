<style lang="less">
#homemain {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div id="homemain">
        <v-header />
        <router-view style="width:100%;height: calc(100% - 0.79rem);" />
    </div>
</template>

<!-- 
    <router-link>   跳转用
    <router-view/>  替换页面组件用 
-->

<script>
import Vue from 'vue';
import vHeader from '@/views/header/index.vue';

export default {
    components: {
        vHeader,
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
            console.log(component)
            Vue.component(component.name, component)
        })

        this._getLess('/public.less');
    }
};
</script>

