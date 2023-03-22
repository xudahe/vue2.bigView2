<style lang="less"></style>
<template>
    <div class="homePageDiv" >
        <div class="circleLeft fade-in-right">
            <homeLeft></homeLeft>
        </div>
        <div class="circleMiddle">
            <div style="height:75%;width:100%;" class="scale-in">
                <homeMiddleTop></homeMiddleTop>
            </div>
            <div style="height:25%;width:100%;" class="fade-in-up">
                <homeMiddleBot></homeMiddleBot>
            </div>
        </div>
        <div class="circleRight fade-in-left">
            <homeRight></homeRight>
        </div>
    </div>
</template>

<script>

import homeLeft from "./homepage3/homeLeft.vue";
import homeMiddleBot from "./homepage3/homeMiddleBot.vue";
import homeMiddleTop from "./homepage3/homeMiddleTop.vue";
import homeRight from "./homepage3/homeRight.vue";

export default {
    name: "homepage3",
    components: {
        homeLeft,
        homeMiddleBot,
        homeMiddleTop,
        homeRight,
    },
    data() {
        return {


        };
    },
    created() {
        this._getLess('/view/homepage.less');
    },
    methods: {

    },
    mounted() {

    },
    beforeDestroy() {

    },
};
</script>


