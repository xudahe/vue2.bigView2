<template>
    <div class="homepageDiv1" style="width:100%;height: 100%;">
        <div class="circleLeft fade-in-right">
            <homeLeft></homeLeft>
        </div>
        <div class="circleMiddle">
            <div style="height: calc(75% - 0.1rem); margin-bottom: 0.1rem;width:100%;" class="scale-in">
                <homeMiddleTop></homeMiddleTop>
            </div>
            <div style="height: calc(25% - 0.1rem); margin-bottom: 0.1rem;width:100%;" class="fade-in-up">
                <homeMiddleBot></homeMiddleBot>
            </div>
        </div>
        <div class="circleRight fade-in-left">
            <homeRight></homeRight>
        </div>
    </div>
</template>
<script>

import homeLeft from "./homepage1/homeLeft.vue";
import homeMiddleBot from "./homepage1/homeMiddleBot.vue";
import homeMiddleTop from "./homepage1/homeMiddleTop.vue";
import homeRight from "./homepage1/homeRight.vue";
export default {
    name: "homepage1",
    components: {
        homeLeft,
        homeMiddleBot,
        homeMiddleTop,
        homeRight,
    },
    data() {
        return {};
    },
    methods: {},
    mounted() { },
    beforeDestroy() { },
};
</script>
  
<style lang="less"></style>
  