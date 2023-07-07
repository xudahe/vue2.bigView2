<template>
    <div class="homepageDiv2" style="width:100%;height: 100%;">
        <div class="circleLeft fade-in-right">
            <homeLeft></homeLeft>
        </div>
        <div class="circleMiddle">
            <div style="height: calc(100%/3*2 - 0.1rem); margin-bottom: 0.1rem;width:100%;" class="scale-in">
                <homeMiddleTop></homeMiddleTop>
            </div>
            <div style="height: calc(100%/3*1 - 0.1rem); margin-bottom: 0.1rem;width:100%;" class="fade-in-up">
                <homeMiddleBot></homeMiddleBot>
            </div>
        </div>
        <div class="circleRight fade-in-left">
            <homeRight></homeRight>
        </div>
    </div>
</template>

<script>

import homeLeft from "./homepage2/homeLeft.vue";
import homeMiddleBot from "./homepage2/homeMiddleBot.vue";
import homeMiddleTop from "./homepage2/homeMiddleTop.vue";
import homeRight from "./homepage2/homeRight.vue";

export default {
    name: "homepage2",
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
        
    },
    methods: {

    },
    mounted() {

    },
    beforeDestroy() {

    },
};
</script>

<style lang="less"></style>