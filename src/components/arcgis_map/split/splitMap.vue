<style scoped>
.map-content {
    background: whitesmoke;
}

.shi {
    width: 50px;
    height: 50px;
    position: absolute;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    font-size: 50px;
    color: red;
    z-index: 99999;
    text-align: center;
    line-height: 50px;
    font-weight: 100;
}

#mapType {
    cursor: pointer;
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
    background-color: rgba(249, 248, 248, 0);
}

#mapType:hover {
    width: 120px;
    background-color: rgba(249, 248, 248, 0.8);
}

#mapType:hover .earth {
    right: 60px;
}

#mapType:hover .scape {
    right: 120px;
}

#mapType .mapTypeCard {
    height: 36px;
    width: 53px;
    position: absolute;
    border-radius: 2px;
    bottom: 5px;
    box-sizing: border-box;
    background: url(@/assets/img/maptype.png);
    -webkit-transition: all 0.4s ease;
    transition: all 0.4s ease;
}

.mapTypeCard.active {
    border: 1px solid #3385ff;
}

#mapType .mapTypeCard.active span,
#mapType .mapTypeCard:hover span {
    background-color: #3385ff;
}

#mapType .mapTypeCard span {
    position: absolute;
    bottom: 0;
    right: 0;
    display: inline-block;
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    color: #fff;
    border-top-left-radius: 2px;
}

#mapType .mapTypeCard:hover {
    border: 1px solid #3385ff;
}

#mapType .earth {
    right: 0px;
    z-index: 1;
}

#mapType .normal {
    z-index: 2;
    background-position: 0 0;
    right: 0px;
}

#mapType .earth {
    background-position: 0 -181px;
}
</style>
<template>
    <div :id="id" @mouseover="getmapid" class="map-content">
        <div v-show="this.$store.getters.ishowsz" class="shi">
            <Icon type="ios-add"></Icon>
        </div>
        <div id="mapType">
            <div class="mapTypeCard normal active" id="baselayer0" @click="getLayer('baselayer0')" title="地图">
                <span>地图</span>
            </div>
            <div class="mapTypeCard earth" id="imagelayer0" @click="getLayer('imagelayer0')" title="影像">
                <span>影像</span>
            </div>
        </div>
        <div style="position: absolute;z-index: 3;bottom: 10px;margin-left: 10px;font-size: 16px;font-weight: bolder;">
            {{ this.$store.getters.mapitemsload[id][0].servicename }}</div>
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
                url: mapconfig.arcgisUrl, //指定的arcgis api版本地址
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
                    // const basemapurl = mapconfig.lsbasemap;
                    // const basemaplayer = new esri.layers.ArcGISTiledMapServiceLayer(
                    //     basemapurl
                    // );
                    // basemaplayer.id = basemapurl;
                    // map.addLayer(basemaplayer); //添加底图

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
                        // let mapId = value.map.id;
                        // MapControl.map[mapId] = value.map;
                        // let extent = mapconfig.extent;
                        // that.loadlayer(mapId);
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
        //地图影像切换
        getLayer(id) {
            if (id == "imagelayer0") {
                MapControl.SetLayerbaseloadsplit([
                    { url: "", isshow: false },
                    { url: "", isshow: true }
                ]);
                document.getElementById("imagelayer0").style.zIndex = 2;
                document.getElementById("baselayer0").style.zIndex = 1;
            } else if (id == "baselayer0") {
                MapControl.SetLayerbaseloadsplit([
                    { url: "", isshow: true },
                    { url: "", isshow: false }
                ]);
                document.getElementById("imagelayer0").style.zIndex = 1;
                document.getElementById("baselayer0").style.zIndex = 2;
            }
        },
    },
    mounted() {
        this.createMap();
    }
};
</script>