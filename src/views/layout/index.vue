<style lang="less">
#homemain {
    width: 100%;
    height: 100%;
}
</style>
<template>
    <div id="homemain">
        <component :is="classname"></component>
        <router-view />
    </div>
</template>

<!-- 
    <router-link>   跳转用
    <router-view/>  替换页面组件用 
-->

<script>
import Vue from 'vue';
import bus from "@/eventBus.js";
import NavConfig from "@/router/nav.configCompent.yml";
import header4 from '../../components/header/index4.vue';
import header3 from '../../components/header/index3.vue';
import header2 from '../../components/header/index2.vue';
import header1 from '../../components/header/index1.vue';

export default {
    components: {
        header4,
        header3,
        header2,
        header1
    },
    watch: {
        $route(to, from) {

        }
    },
    data() {
        return {
            classname: "",
        };
    },
    mounted() {
        let theme = this.$store.getters.templates;
        switch (theme) {
            case '001':
                this.classname = 'header1';
                break;
            case '002':
                this.classname = 'header2';
                break;
            case '003':
                this.classname = 'header3';
                break;
            case '004':
                this.classname = 'header4';
                break;
            default:
            case '001':
                this.classname = 'header1';
                break;
        }
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

