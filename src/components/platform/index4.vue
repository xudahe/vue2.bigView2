<!-- 布局页面 -->
<template>
    <div id="platformDiv4" style="width:100%;height: 100%;">


    </div>
</template>
    
    
<script>
import bus from "@/eventBus.js";

export default {
    name: "application",
    components: {

    },
    watch: {
        // 监测路由变化,只要变化了就获取路由参数重新加载菜单
        $route(to, from) {
            var _this = this;
            // to为跳转之后的路由
            var menuid = _this.menuid = this.$route.query.id
            _this.getMenus(menuid);
        }
    },
    props: {},
    data() {
        return {
            menuid: null,


        };
    },
    methods: {
        getMenus(menuid) {

        },
    },
    created() {
    },
    mounted() {
        let _this = this;

        var menuid = _this.menuid = this.$route.query.id;
        _this.getMenus(menuid);
    },
    beforeDestroy() {

    },
}
</script>
    
<style lang="less"></style>
    