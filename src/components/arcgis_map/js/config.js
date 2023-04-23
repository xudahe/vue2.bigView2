/**
 * http://lbs.tianditu.gov.cn/home.html
 * 
 * 2458575640@qq.com 19930914xdH
 * 
 * 在线天地图切片地图地址环境
 * 加载地图时：使用了 {subsDomain}，{col},{row},{level}分别替换服务器列表，瓦片列编号，瓦片行编号，当前缩放级别
 * 天地图瓦片可用子域有八个 subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
 */
export const tdt_vec_c = 
  "http://{subDomain}.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=5003bc22120f9d66a3276a29bf4be1ed";
export const tdt_cva_c =
  "http://{subDomain}.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=5003bc22120f9d66a3276a29bf4be1ed";
export const tdt_img_c =
  "http://{subDomain}.tianditu.gov.cn/img_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=5003bc22120f9d66a3276a29bf4be1ed";
export const tdt_cia_c =
  "http://{subDomain}.tianditu.gov.cn/cia_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=c&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&FORMAT=tiles&tk=5003bc22120f9d66a3276a29bf4be1ed";


/* 在线高德切片地图地址环境 */
export const onlineAMapDigitalURL =
  "http://webst01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}";
export const onlineAMapSatelliteURL =
  "http://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}";
export const onlineAMapAnooMarkerURL =
  "http://webst01.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}";