<style lang="less"></style>
<template>
    <component :is="classname"></component>
</template>

<script>

import login2 from '@/components/login/index2.vue';
import login1 from '@/components/login/index1.vue';

export default {
    components: {
        login2,
        login1
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
            classname: "",
        };
    },
    methods: {
        setCmpt() {
            switch (this.theme) {
                case '001':
                    this.classname = 'login1';
                    break;
                case '002':
                    this.classname = 'login2';
                    break;
                case '003':
                    this.classname = 'login1';
                    break;
                case '004':
                    this.classname = 'login1';
                    break;
                default:
                case '001':
                    this.classname = 'login1';
                    break;
            }
        }
    },
    mounted() {
        this.setCmpt();
    },
    beforeDestroy() {
    },
    created() {
    }
};
</script>

