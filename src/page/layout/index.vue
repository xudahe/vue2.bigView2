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
import NavConfig from "@/router/nav.configCompent.yml";
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
        //注册组件
        regeisterComponent(NavConfig) {
            Object.keys(NavConfig).forEach((lang, idx) => {
                const pageNavs = NavConfig[lang];

                pageNavs.forEach(nav => {
                    nav.groups && nav.groups.forEach(group => {
                        group.items.forEach(item => {
                            if (item.details) {
                                item.details.forEach(detail => {
                                    if (detail.pages) {
                                        detail.pages.forEach(page => {
                                            Vue.component(page.name, function (resolve) {
                                                require([`@/${nav.name}/${group.name}/${item.name}/${detail.name}/${page.name}.vue`], resolve);
                                            });
                                        });
                                    }
                                    else {
                                        Vue.component(detail.name, function (resolve) {
                                            require([`@/${nav.name}/${group.name}/${item.name}/${detail.name}.vue`], resolve);
                                        });
                                    }
                                });
                            } else {
                                Vue.component(item.name, function (resolve) {
                                    require([`@/${nav.name}/${group.name}/${item.name}.vue`], resolve);
                                });
                            }
                        });
                    });
                });
            });
        }
    },
    created() {
        // 开始注册组件
        this.regeisterComponent(NavConfig);
        this._getLess('/public.less');
    }
};
</script>

