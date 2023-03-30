<template>
    <div style="height:100%;width:100%;" class="test5">

    </div>
</template>
  
<script>

import bus from "@/eventBus.js";
import { MapControl } from "@/components/arcgis_map/js/MapControl.js";

export default {
    components: {
    },
    data() {
        return {
            issplit: false, //是否已经分屏
            items: [
                { serviceurl: "", servicename: "XXXX1" },
                { serviceurl: "", servicename: "XXXX2" },
                { serviceurl: "", servicename: "XXXX3" },
                { serviceurl: "", servicename: "XXXX4" },
                { serviceurl: "", servicename: "XXXX5" },
                { serviceurl: "", servicename: "XXXX6" },
                { serviceurl: "", servicename: "XXXX7" },
                { serviceurl: "", servicename: "XXXX8" },
                { serviceurl: "", servicename: "XXXX9" },
            ],
        };
    },
    methods: {
        changeSwitch(value) {
            this.$store.dispatch('ishowsz', value);
        },
        Splitscreen() {
            if (this.items.length < 2 || this.items.length > 9) {
                this.$Message.error("不能满足分屏要求");
                return;
            }
            this.issplit = true;

            let mapbox = [];
            let layeritem = {};
            for (let i = 0; i < this.items.length; i++) {
                let name = "mapbox" + i;
                layeritem[name] = [this.items[i]];
                mapbox.push(name);
            }

            this.$store.dispatch('mapitems', mapbox);
            this.$store.dispatch('mapitemsload', layeritem);
            this.$store.dispatch('mapitemslayers', this.items);
        },
        //重置
        Reset() {
            this.issplit = false;
            this.items = [];
            this.$store.dispatch('mapitems', []);
            this.$store.dispatch('mapitemsload', {});
            this.$store.dispatch('mapitemslayers', []);
            MapControl.setMapClear();
        },
    },
    mounted() {
        this.Splitscreen();
    },
    beforeDestroy() {
        if (this.issplit) this.Reset();
    }
};
</script>
  
<style lang="less" scoped></style>