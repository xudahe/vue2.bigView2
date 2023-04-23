//地图服务配置
const mapconfig = {
  basemap: 'http://58.213.48.106/arcgis/rest/services/NJ08/NJDXT20180830/MapServer', //南京基础底图
  lsbasemap: 'http://58.213.48.104/arcgis/rest/services/NJ08/LS081/MapServer', //溧水

  //在线地图服务： http://map.geoq.cn/arcgis/rest/services
  GeometryService: 'http://58.213.48.106:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer', //ArcGIS Server空间服务
  //GeometryService: 'http://10.10.12.71:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer', //ArcGIS Server空间服务
  MapControl: {}, //用来控制地图是否同步

  extent: { // 初始化定位  --天地图(经纬度)
    xmin: 118.548,
    ymin: 31.900,
    xmax: 119.108,
    ymax: 32.178
  },
};

export default mapconfig