<style lang="less"></style>
<template>
    <component :is="classname"></component>
</template>

<script>
import { mapGetters } from "vuex";
import header4 from '@/components/header/index4.vue';
import header3 from '@/components/header/index3.vue';
import header2 from '@/components/header/index2.vue';
import header1 from '@/components/header/index1.vue';

export default {
    components: {
        header4,
        header3,
        header2,
        header1
    },
    computed: {
        ...mapGetters(["templates"])
    },
    data() {
        return {
            classname: "",
        };
    },
    mounted() {
        switch (this.templates) {
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

    },
    created() {
    }
};
</script>

