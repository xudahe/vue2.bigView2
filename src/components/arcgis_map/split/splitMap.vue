<style scoped>
.map-content {
    background: whitesmoke;
}
</style>

<template>
    <div :id="id" @mouseover="getmapid" class="map-content">
        <div style="position: absolute;z-index: 3;bottom: 10px;margin-left: 10px;font-size: 16px;font-weight: bolder;">
            {{ this.$store.getters.mapitemsload[id][0].servicename }}
        </div>
    </div>
</template>
<script>
import * as esriLoader from 'esri-loader';
import bus from "../../../eventBus.js";
import { MapControl } from "../js/MapControl";
import mapconfig from "../js/mapconfig";

var map, navToolbar;
export default {
    props: {
        id: String,
        mapType: {
            type: String,
            default: "tiled"
        }
    },
    data() {
        return {
            isshow: true,
        };
    },
    methods: {
        createMap() {
            var that = this;

            //自定义资源加载arcgis
            const options = {
                url: 'https://js.arcgis.com/3.27/init.js', //指定的arcgis api版本地址
                css: true,
            };

            esriLoader.loadCss(); //默认情况下，loadCss()加载最新的样式
            esriLoader.loadModules(
                [
                    "esri/map",
                    "esri/geometry/Extent",
                    "esri/geometry/scaleUtils",
                    "esri/layers/ArcGISTiledMapServiceLayer",
                    "esri/layers/ArcGISDynamicMapServiceLayer"
                ],
                options
            ).then(
                ([
                    Map,
                    Extent,
                    scaleUtils,
                    ArcGISTiledMapServiceLayer,
                    ArcGISDynamicMapServiceLayer
                ]) => {
                    map = new Map(that.id, {
                        logo: false,
                        slider: false
                    });

                    // 3、图层顺序
                    // 图层顺序控制可以在添加layer的时候控制，利用addLayer(layer, index)，其中index就是图层的顺序，从0、1、2、3依次增长，数字越大越靠近用户。
                    // 假如我直接这样写：map.addLayer(featureLayer, 100)；写了100但它index不见得是100，因为它默认添加到最外图层的下一个位置，比如原来有两个图层0、1，添加上述新图层后index会改为2。
                    // 所以不要乱插奥，当然你要是 map.addLayer(featureLayer, 1)，他还是会添加到原来两个图层之间的，这个肯定没问题。

                    const basemapurl = mapconfig.basemap;
                    const basemaplayer = new esri.layers.ArcGISTiledMapServiceLayer(
                        basemapurl
                    );
                    basemaplayer.id = basemapurl;
                    map.addLayer(basemaplayer); //添加底图


                    let graphicLayer1 = new esri.layers.GraphicsLayer();
                    graphicLayer1.id = that.id + "_graphicLayer";
                    map.addLayer(graphicLayer1);
                    MapControl.graphicLayers[graphicLayer1.id] = graphicLayer1;

                    map.on("load", initFunctionality);
                    map.on("mouse-move", function (event) {
                        event.scale = scaleUtils.getScale(map);
                        // bus.$emit("showCoord", event);
                    });
                    map.on("extent-change", function (event) {
                        bus.$emit("ExtentChange", { event: event.extent, id: that.id });
                    });
                    map.on("zoom-end", function (event) {

                    });
                    function initFunctionality(value) {
                        let mapId = value.map.id;
                        MapControl.mapArr[mapId] = value.map;

                        mapconfig.MapControl1[mapId] = true;
                        that.loadlayer(mapId);

                        // let extent = mapconfig.extent;
                        // let mapExtent = new esri.geometry.Extent(
                        //     extent.xmin,
                        //     extent.ymin,
                        //     extent.xmax,
                        //     extent.ymax,
                        //     map.spatialReference
                        // );
                        // value.map.setExtent(mapExtent);
                    }
                }
            ).catch(err => {
                console.error(err);
            });
        },
        getmapid() {
            bus.$emit("getmapid", this.id);
        },
        loadlayer(id) {
            for (let layer in this.$store.getters.mapitemsload) {
                if (id == layer) {
                    MapControl.MapAddSplit(id, this.$store.getters.mapitemsload[layer]);
                }
            }
        },
        showIdentity() {
            this.showident = !this.showident

            if (!this.showident) {
                let _graphic = this.view.id + '_graphicLayer'
                if (MapControl.graphicLayers[_graphic]) {
                    MapControl.graphicLayers[_graphic].clear();
                }
            }
        },
    },
    mounted() {
        this.createMap();
    }
};
</script>