<!-- 平台 -->
<template>
    <div id="platform" class="platformDiv">
        <component :is="classname"></component>
    </div>
</template>


<script>

import platform4 from "@/components/platform/index4.vue"
import platform3 from "@/components/platform/index3.vue"
import platform2 from "@/components/platform/index2.vue"
import platform1 from "@/components/platform/index1.vue"

export default {
    name: "platform",
    components: {
        platform4,
        platform3,
        platform2,
        platform1
    },
    computed: {
        theme() {
            return this.$store.state.theme.themeName;
        }
    },
    watch: {
        theme: {
            handler: function (newVal) {
                this.setCmpt();
            },
            deep: true
        },
    },
    data() {
        return {
            classname: "platform1",
        };
    },
    methods: {
        setCmpt() {
            switch (this.theme) {
                case '001':
                    this.classname = 'platform1';
                    break;
                case '002':
                    this.classname = 'platform2';
                    break;
                case '003':
                    this.classname = 'platform3';
                    break;
                case '004':
                    this.classname = 'platform4';
                    break;
                default:
                    this.classname = 'platform1';
                    break;
            }
        }
    },
    mounted() {
        this.setCmpt();
    },
    created() {

    },
    beforeDestroy() {
    },
}
</script>

<style lang="less"></style>
