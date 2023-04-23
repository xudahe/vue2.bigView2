/**
 * 地图管理
author: Yuankang
 *
 */

import * as esriLoader from 'esri-loader';
import bus from '../../../eventBus.js';
import * as transformUtils from './mapTran.js';
import mapconfig from './mapconfig'
export const MapControl = {};
const tips = require('@/assets/img/map/tips.png');

MapControl.popupinfo; //地图窗口

/**
 * 地图是否加载完毕
 * @type {{}}
 */
MapControl.isLoad = {};

/**
 * 地图列表
 * @type {{}}
 */
MapControl.map = [];

/**
 * 地图工具
 * @type {{}}
 */
MapControl.navToolbar = {};

/**
 * 地图标绘层
 */
MapControl.graphicLayers = {};

/**
 * 地图编辑工具
 */
MapControl.editToolbar = {};

/**
 * Geometry服务
 */
MapControl.GeometryService = {};

MapControl.MenuForMap = {};

MapControl.mapId = 'mapbox';

// identify点击事件
MapControl.identifyHandler = {};

/**
 * 地图绘制事件
 */
MapControl.drawToolbar = {};
var MouseMoveEventHandler;
var doSpaceDrawEventHandler;
var doAttMapDrawEventHandler;
/**
 * 地图点击事件
 */
var domapOnclickEventHandler;

var centerPoint;

/**
 * 设置初始化地图全图
 * @param mapId
 */
MapControl.setMapFull = function () {
  let map = MapControl.map[MapControl.mapId];
  let extent = mapconfig.extent;

  esriLoader.loadModules(
    ['esri/map', 'esri/geometry/Extent', 'esri/toolbars/navigation']).then(
    ([Map, Extent]) => {
      let mapExtent = new esri.geometry.Extent(
        extent.xmin,
        extent.ymin,
        extent.xmax,
        extent.ymax,
        map.spatialReference
      );
      map.setExtent(mapExtent);

      var navToolbar = MapControl.navToolbar[MapControl.mapId];
      navToolbar.deactivate();
    }
  ).catch(err => {
    console.error(err);
  })
};
MapControl.RefreshExtend = function () {
  let map = MapControl.map[MapControl.mapId];
  //  let cPoint = map.extent.getCenter();
  let extent = map.extent;
  let mapExtent = new esri.geometry.Extent(
    extent.xmin,
    extent.ymin,
    extent.xmax,
    extent.ymax,
    map.spatialReference
  );
  map.setExtent(mapExtent);
};

/**
 * 地图放大
 * @param mapId
 */
MapControl.setMapZoomIn = function () {
  esriLoader.loadModules(['esri/map', 'esri/toolbars/navigation']).then(([Map, Navigation]) => {
    var navToolbar = MapControl.navToolbar[MapControl.mapId];
    navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
  }).catch(err => {
    console.error(err);
  })
};

/**
 * 地图缩小
 * @param mapId
 */
MapControl.setMapZoomOut = function () {
  esriLoader.loadModules(['esri/map', 'esri/toolbars/navigation']).then(([Map, Navigation]) => {
    var navToolbar = MapControl.navToolbar[MapControl.mapId];
    navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
  }).catch(err => {
    console.error(err);
  })
};

/**
 * 地图平移
 * @param mapId
 */
MapControl.setMapPan = function () {
  esriLoader.loadModules(['esri/map', 'esri/toolbars/navigation']).then(([Map, Navigation]) => {
    var navToolbar = MapControl.navToolbar[MapControl.mapId];
    navToolbar.activate(esri.toolbars.Navigation.PAN);
  }).catch(err => {
    console.error(err);
  })
};

/**
 * 上一视图
 * @param mapId
 */
MapControl.setMapZoomToPrev = function () {
  esriLoader.loadModules(['esri/map', 'esri/toolbars/navigation']).then(([Map, Navigation]) => {
    var navToolbar = MapControl.navToolbar[MapControl.mapId];
    navToolbar.zoomToPrevExtent();
  }).catch(err => {
    console.error(err);
  })
};

/**
 * 下一视图
 * @param mapId
 */
MapControl.setMapZoomToNext = function () {
  esriLoader.loadModules(['esri/map', 'esri/toolbars/navigation']).then(([Map, Navigation]) => {
    var navToolbar = MapControl.navToolbar[MapControl.mapId];
    navToolbar.zoomToNextExtent();
  }).catch(err => {
    console.error(err);
  })
};

/**
 * 全图显示
 * @param mapId
 */
MapControl.setMapZoomToFull = function () {
  esriLoader.loadModules(['esri/map', 'esri/toolbars/navigation']).then(([Map, Navigation]) => {
    var navToolbar = MapControl.navToolbar[MapControl.mapId];
    navToolbar.zoomToFullExtent();
  }).catch(err => {
    console.error(err);
  })
};

/**
 * 清除
 * @param mapId
 */
MapControl.setMapClear = function (value) {
  let map = MapControl.map[MapControl.mapId];
  if (value !== undefined) {
    if (value == 1) {
      MapControl.graphicLayers['gralyr1'].clear();
    } else if (value == 2) {
      MapControl.graphicLayers['gralyr1'].clear();
      MapControl.graphicLayers['gralyr2'].clear();
    } else if (value == 3) {
      MapControl.graphicLayers['gralyr1'].clear();
      MapControl.graphicLayers['gralyr2'].clear();
      MapControl.graphicLayers['gralyr3'].clear();
    } else if (value == 4) {
      MapControl.graphicLayers['gralyr1'].clear();
      MapControl.graphicLayers['gralyr2'].clear();
      MapControl.graphicLayers['gralyr3'].clear();
      MapControl.graphicLayers['gralyr4'].clear();
    } else if (value == 5) {
      MapControl.graphicLayers['gralyr1'].clear();
      MapControl.graphicLayers['gralyr2'].clear();
      MapControl.graphicLayers['gralyr3'].clear();
      MapControl.graphicLayers['gralyr4'].clear();
      MapControl.graphicLayers['gralyr5'].clear();
    }
  } else {
    for (let i = 0; i < 5; i++) {
      let gralyr = MapControl.graphicLayers['gralyr' + (i + 1)]
      if (gralyr != undefined) {
        gralyr.clear();
        gralyr.onMouseOver = function (val) {};
        gralyr.onMouseOut = function (val) {};
        gralyr.onClick = function (val) {};
      }
    }
  }

  if (map && map.graphics != undefined) {
    map.graphics.clear();
  }

  if (doSpaceDrawEventHandler !== undefined) {
    doSpaceDrawEventHandler.remove();
  }
  if (domapOnclickEventHandler !== undefined) {
    domapOnclickEventHandler.remove();
  }
  if (doAttMapDrawEventHandler !== undefined) {
    doAttMapDrawEventHandler.remove();
  }
  if (doMeasureEventHandler !== undefined) {
    doMeasureEventHandler.remove();
  }
  if (doLengthsCompleteHandler !== undefined) {
    doLengthsCompleteHandler.remove();
  }
  if (doAreasAndLengthsCompleteHandler !== undefined) {
    doAreasAndLengthsCompleteHandler.remove();
  }

  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  if (toolbar) {
    toolbar.deactivate();
  }
  let editbar = MapControl.editToolbar[MapControl.mapId];
  if (editbar) {
    editbar.deactivate();
  }
  if (map) {
    map.infoWindow.hide();

    if (map.getLayer("lineLayer") != undefined) {
      map.getLayer("lineLayer").clear();
    }
    if (map.getLayer("carLayer") != undefined) {
      map.getLayer("carLayer").clear();
    }
  }
  // if (MapControl.identifyHandler) {
  //   MapControl.identifyHandler.remove();
  // }
};

/**
 * 移除identify点击事件
 */
MapControl.identifyHandlerRemove = function () {
  if (MapControl.identifyHandler) {
    MapControl.identifyHandler.remove();
  }
}

//定位
MapControl.PointTo = function (x, y) {
  esriLoader.loadModules(['esri/map', 'esri/geometry/Point']).then(([Map, Point]) => {
    let map = MapControl.map[MapControl.mapId];
    // var xMin = parseFloat(x) - 0.005;
    // var yMin = parseFloat(y) - 0.005;
    // var xMax = parseFloat(x) + 0.005;
    // var yMax = parseFloat(y) + 0.005;
    // var showExtent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, map.spatialReference);
    // map.setExtent(showExtent.expand(0.1));
    map.centerAndZoom(new Point(x, y), 7);
  })
}

/**
 *加载服务
 *@param mapId item
 */
MapControl.addservice = function (item) {
  let map = MapControl.map[MapControl.mapId];
  if (item.ISADD == 'true') {
    if (item.type == 'tiled') {
      let titleLayer = new esri.layers.ArcGISTiledMapServiceLayer(item.url);
      titleLayer.id = item.SERVICENAME;
      map.addLayer(titleLayer);
    } else if (item.type == 'dynamic') {
      let dynamicLayer = new esri.layers.ArcGISDynamicMapServiceLayer(item.url);
      dynamicLayer.id = item.SERVICENAME;
      map.addLayer(dynamicLayer);
    } else if (item.type == 'image') {
      let imageLayer = new esri.layers.ArcGISImageServiceLayer(item.url);
      imageLayer.id = item.SERVICENAME;
      map.addLayer(imageLayer);
    }
  } else {
    var curLyr = map.getLayer(item.SERVICENAME);
    if (curLyr) map.removeLayer(curLyr);
  }

  bus.$emit('refreshlyr');
};

/**
 *获取地图服务以及打开的图层服务
 */
MapControl.GetMapLayers = function () {
  let map = MapControl.map[MapControl.mapId];
  return map.layerIds;

  // var layerInfo = [];
  // dojo.forEach(map.layerIds,function(id){
  //     var layer = map.getLayer(id);
  //     layerInfo.push('id: ' + layer.id + ' visible: ' + layer.visible + ' opacity: ' + layer.opacity + '<br />');
  // });
};

/**
 *改变地图服务顺序
 */
MapControl.changeLayer = function (item, newIndex) {
  let map = MapControl.map[MapControl.mapId];
  let allcount = map.layerIds.length;
  var selLyr = map.getLayer(item.serviceurl);
  if (selLyr) {
    var mapindex = allcount - newIndex - 1;
    map.reorderLayer(selLyr, mapindex);
  }

  //alert(map.layerIds);
};

/**
 *地图高亮显示
 */
MapControl.showGraphic = function (geo, issolid, gralyr, isshowExtent, color) {
  esriLoader.loadModules(
    ['esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon']).then(
    ([Point, Polyline, Polygon]) => {
      let map = MapControl.map[MapControl.mapId];
      var symbol;
      var showExtent;
      switch (geo.type) {
        case 'point':
          geo = new Point(geo);
          var xMin = geo.x - 0.000005;
          var yMin = geo.y - 0.000005;
          var xMax = geo.x + 0.000005;
          var yMax = geo.y + 0.000005;
          showExtent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, map.spatialReference);
          var symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, 10, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_CIRCLE, new dojo.Color(color ? color : [255, 87, 34, 5])), new dojo.Color([255, 87, 34, 5.25]));
          break;
        case 'polyline':
          geo = new Polyline(geo);
          symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color(color ? color : [255, 0, 0]), 3);
          showExtent = geo.getExtent();
          break;
        case 'polygon':
          geo = new Polygon(geo);
          symbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(issolid == undefined || issolid == 10 ? esri.symbol.SimpleLineSymbol.STYLE_DASH : esri.symbol.SimpleFillSymbol.STYLE_SOLID, new dojo.Color(color ? color : [255, 0, 0, 0.8]), 3), new dojo.Color([30, 144, 255, 0.2]));
          showExtent = geo.getExtent();
          break;
        case 'extent':
          geo = new Polygon(geo);
          symbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color(color ? color : [255, 0, 0]), 3), new dojo.Color([255, 87, 34, 0.35]));
          showExtent = geo.getExtent();
          break;
      }
      if (showExtent !== undefined) {
        var tempGra = new esri.Graphic(geo, symbol, null, null);
        MapControl.graphicLayers[gralyr == undefined ? 'gralyr1' : gralyr].add(tempGra);
        if (isshowExtent == undefined) map.setExtent(showExtent.expand(1.5));
      }
    }
  ).catch(err => {
    console.error(err);
  })
};


/**
 * Geometry高亮显示
 */
MapControl.showGeometry = function (geo, isshowExtent, gralyr, color, clear, size, att, extent, outline) {
  esriLoader.loadModules(['esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon']).then(([Point, Polyline, Polygon]) => {
    if (clear == undefined) MapControl.graphicLayers[gralyr == undefined ? 'gralyr3' : gralyr].clear();
    let map = MapControl.map[MapControl.mapId];
    var symbol;
    var showExtent;
    if (geo.type != undefined && geo.type != '') {
      switch (geo.type) {
        case 'point':
          geo = new Point(geo);
          var xMin = parseFloat(geo.x) - 0.000005;
          var yMin = parseFloat(geo.y) - 0.000005;
          var xMax = parseFloat(geo.x) + 0.000005;
          var yMax = parseFloat(geo.y) + 0.000005;
          showExtent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, map.spatialReference);
          var symbol = null;
          if (outline && outline == true) {
            //去掉圆点外边框
            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, size == undefined ? 15 : size, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_NULL, new dojo.Color(color == undefined ? [0, 255, 0, 5] : color)), new dojo.Color(color == undefined ? [0, 255, 0, 5.25] : color));
          } else {
            //默认显示
            symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, size == undefined ? 15 : size, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_CIRCLE, new dojo.Color(color == undefined ? [0, 255, 0, 5] : color)), new dojo.Color(color == undefined ? [0, 255, 0, 5.25] : color));
          }
          break;
        case 'polyline':
          geo = new Polyline(geo);
          symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(color == undefined ? [0, 255, 255] : color), 3);
          showExtent = geo.getExtent();
          break;
        case 'polygon':
          geo = new Polygon(geo);
          symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color([0, 255, 255]), 3), new dojo.Color([0, 0, 0, 0.35]));
          showExtent = geo.getExtent();
          break;
      }
    }

    if (showExtent != undefined) {
      var tempGra = new esri.Graphic(geo, symbol, null, null);

      if (att != undefined) tempGra.setAttributes(att);
      MapControl.graphicLayers[gralyr == undefined ? 'gralyr3' : gralyr].add(tempGra);
      if (isshowExtent == undefined)
        map.setExtent(showExtent.expand(extent == undefined ? 0 : extent));
    }
  });
};


// 使用方法：
// let x_array = [];
// let y_array = [];
// for (let i = 0; i < source.length; i++) {
//   let goe = MapControl.WktToAgs(source[i].geo);
//   const STARTPOINT_X = parseFloat(goe.paths[0][0][0]);
//   const STARTPOINT_Y = parseFloat(goe.paths[0][0][1]);
//   const ENDPOINT_X = parseFloat(goe.paths[0][1][0]);
//   const ENDPOINT_Y = parseFloat(goe.paths[0][1][1]);
//   x_array.push(STARTPOINT_X, ENDPOINT_X);
//   y_array.push(STARTPOINT_Y, ENDPOINT_Y);
// }
// MapControl.setPolylinesExtent(x_array, y_array);

//设置多个线对象的大致范围..进行中心定位
MapControl.setPolylinesExtent = function (x, y, expand = 0) {
  function sequence(a, b) {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1
    } else {
      return 0;
    }
  }
  x = x.sort(sequence)
  y = y.sort(sequence)
  const map = MapControl.map[MapControl.mapId]
  let extent = new esri.geometry.Extent({
    "xmin": x[0],
    "ymin": y[0],
    "xmax": x[x.length - 1],
    "ymax": y[y.length - 1],
    "spatialReference": map.spatialReference
  });
  map.setExtent(extent.expand(expand))
}

/**
 *地图定位
 */
MapControl.showExtent = function (geo, iscal) {
  esriLoader.loadModules(
    ['esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon']).then(
    ([Point, Polyline, Polygon]) => {
      let map = MapControl.map[MapControl.mapId];
      var showExtent;
      if (geo.type == undefined) return;
      switch (geo.type) {
        case 'point':
          geo = new Point(geo);
          var xMin = geo.x - 0.000005;
          var yMin = geo.y - 0.000005;
          var xMax = geo.x + 0.000005;
          var yMax = geo.y + 0.000005;
          showExtent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, map.spatialReference);
          break;
        case 'polyline':
          geo = new Polyline(geo);
          showExtent = geo.getExtent();
          break;
        case 'polygon':
          geo = new Polygon(geo);
          showExtent = geo.getExtent();
          break;
        case 'extent':
          geo = new Polygon(geo);
          showExtent = geo.getExtent();
          break;
      }
      if (showExtent !== undefined) {
        map.setExtent(showExtent.expand(iscal == undefined ? 1.5 : iscal));
      }
    }
  ).catch(err => {
    console.error(err);
  })
};

//返回范围面的中心点
MapControl.getCenterByPolygon = function (geometry) {
  let polygon = MapControl.WktToAgs(geometry);
  return polygon.getExtent().getCenter()
};

//当前视角内地图的四角范围
MapControl.getMapPolygon = function () {
  const map = MapControl.map[MapControl.mapId];
  let extent = map.extent;

  var lb = extent.xmin + " " + extent.ymin;
  var lt = extent.xmin + " " + extent.ymax;
  var rt = extent.xmax + " " + extent.ymax;
  var rb = extent.xmax + " " + extent.ymin;

  let geometry = 'POLYGON ((' + lb + "," + lt + "," + rt + "," + rb + "," + lb + '))';
  bus.$emit('getMapPolygon', geometry);
};

MapControl.SetExtent = function (x, y) {
  let map = MapControl.map[MapControl.mapId];
  //  let cPoint = map.extent.getCenter(); //地图中心点
  let extent = map.extent;
  let mapExtent = new esri.geometry.Extent(
    extent.xmin - x,
    extent.ymin - y,
    extent.xmax + x,
    extent.ymax + y,
    map.spatialReference
  );
  map.setExtent(mapExtent);
};

/**
 *地图绘制
 */
MapControl.mapDraw = function (drawtype, isClear) {
  if (doSpaceDrawEventHandler != undefined) {
    doSpaceDrawEventHandler.remove();
  }
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  doSpaceDrawEventHandler = toolbar.on('draw-end', doSpaceDraw);

  if (drawtype == 'point') {
    toolbar.activate(esri.toolbars.Draw.POINT);
  } else if (drawtype == 'extent') {
    toolbar.activate(esri.toolbars.Draw.EXTENT);
  } else if (drawtype == 'polygon') {
    toolbar.activate(esri.toolbars.Draw.POLYGON);
  } else if (drawtype == 'polyline') {
    toolbar.activate(esri.toolbars.Draw.POLYLINE);
  } else if (drawtype == 'circle') {
    toolbar.activate(esri.toolbars.Draw.CIRCLE);
  } else if (drawtype == 'line') {
    toolbar.activate(esri.toolbars.Draw.LINE);
  }
  if (isClear == true) {
    MapControl.graphicLayers['gralyr1'].clear();
  }
};

MapControl.clearmapDraw = function () {
  MapControl.graphicLayers['gralyr1'].clear();
  if (doSpaceDrawEventHandler != undefined) {
    doSpaceDrawEventHandler.remove();
  }
};

MapControl.doSpaceDraw = function (gra) {
  doSpaceDraw(gra);
}

function doSpaceDraw(gra) {
  if (doSpaceDrawEventHandler !== undefined) {
    doSpaceDrawEventHandler.remove();
  }
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  toolbar.deactivate();
  //根据图形的类型定义显示样式
  var geo = gra.geometry;
  var symbol;
  var geom = '';

  switch (geo.type) {
    case 'point':
      symbol = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        10,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_CIRCLE,
          new dojo.Color([255, 87, 34, 5])
        ),
        new dojo.Color([255, 87, 34, 5.25])
      );
      geom = transformUtils.PointToWKT(geo);
      break;
    case 'polyline':
      symbol = new esri.symbol.SimpleLineSymbol(
        esri.symbol.SimpleLineSymbol.STYLE_DASH,
        new dojo.Color([255, 0, 0]),
        3
      );
      geom = transformUtils.LineToWKT(geo);
      // for (var i = 0; i < geo.paths[0].length; i++) {
      //     geom = geo.paths[0][i][0] + ' ' + geo.paths[0][i][1] + ',' + geom;
      // }
      // geom = 'LINESTRING (' + geom.substring(0, geom.length - 1) + ')';
      break;
    case 'polygon':
      symbol = new esri.symbol.SimpleFillSymbol(
        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_DASH,
          new dojo.Color([255, 0, 0, 0.6]),
          3
        ),
        new dojo.Color([255, 255, 255, 0.2])
      );
      geom = MapControl.AgsToWkt(geo);
      break;
    case 'extent':
      symbol = new esri.symbol.SimpleFillSymbol(
        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_DASH,
          new dojo.Color([255, 0, 0]),
          3
        ),
        new dojo.Color([255, 140, 0, 0.1])
      );
      geom = geo.xmin + ' ' + geo.ymin + ',' + geo.xmax + ' ' + geo.ymin + ',' + geo.xmax + ' ' + geo.ymax + ',' + geo.xmin + ' ' + geo.ymax + ',' + geo.xmin + ' ' + geo.ymin;
      geom = 'POLYGON ((' + geom + '))';
      break;
  }
  bus.$emit('mapDrawresult', geom);
  bus.$emit('PrintmapDrawresult', {
    gwkt: geom,
    gty: geo
  });
  var tempGra = new esri.Graphic(geo, symbol, null, null);
  MapControl.graphicLayers['gralyr1'].add(tempGra);
  bus.$emit('mapTempGra', tempGra);
}


MapControl.DrawTool = function (drawtype) {
  if (doSpaceDrawEventHandler != undefined) {
    doSpaceDrawEventHandler.remove();
  }
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  doSpaceDrawEventHandler = toolbar.on('draw-end', getGeoms);

  if (drawtype == 'point') {
    toolbar.activate(esri.toolbars.Draw.POINT);
  } else if (drawtype == 'extent') {
    toolbar.activate(esri.toolbars.Draw.EXTENT);
  } else if (drawtype == 'polygon') {
    toolbar.activate(esri.toolbars.Draw.POLYGON);
  } else if (drawtype == 'polyline') {
    toolbar.activate(esri.toolbars.Draw.POLYLINE);
  } else if (drawtype == 'circle') {
    toolbar.activate(esri.toolbars.Draw.CIRCLE);
  } else if (drawtype == 'line') {
    toolbar.activate(esri.toolbars.Draw.LINE);
  }

  function getGeoms(gra) {
    esriLoader.loadModules([
        "esri/tasks/IdentifyTask",
        "esri/tasks/IdentifyParameters"
      ])
      .then(([IdentifyTask, IdentifyParameters]) => {
        let map = MapControl.map[MapControl.mapId];
        let geo = gra.geometry;
        let symbol = new esri.symbol.SimpleFillSymbol(
          esri.symbol.SimpleFillSymbol.STYLE_SOLID,
          new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_DASH,
            new dojo.Color([255, 0, 0]),
            3
          ),
          new dojo.Color([255, 140, 0, 0.1])
        );
        let geom;
        if (geo.type == 'point') {
          let identifyTask = new IdentifyTask(
            mapconfig.arcgis_url_kxgh
          );
          let identifyParams = new IdentifyParameters();
          identifyParams.tolerance = 1;
          identifyParams.returnGeometry = true;
          identifyParams.layerOption =
            esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
          identifyParams.geometry = geo;
          identifyParams.mapExtent = map.extent;
          identifyTask.execute(identifyParams, results => {
            if (results.length > 0) {
              for (let i = 0; i < results.length; i++) {
                MapControl.showGraphic(results[i].feature.geometry, undefined, "gralyr6");
              }
            }

          });
        } else {
          switch (geo.type) {
            case 'polygon':
              geom = MapControl.AgsToWkt(geo);
              break;
            case 'extent':
              geom = geo.xmin + ' ' + geo.ymin + ',' + geo.xmax + ' ' + geo.ymin + ',' + geo.xmax + ' ' + geo.ymax + ',' + geo.xmin + ' ' + geo.ymax + ',' + geo.xmin + ' ' + geo.ymin;
              geom = 'POLYGON ((' + geom + '))';
              break;
          }
          var tempGra = new esri.Graphic(geo, symbol, null, null);
          MapControl.graphicLayers['gralyr6'].add(tempGra);
        }
        toolbar.deactivate()
        bus.$emit('mapDrawend', geom);
      })
      .catch(err => {
        console.error(err);
      });
  }
};

MapControl.GetPoint = function (drawtype) {
  if (doSpaceDrawEventHandler != undefined) {
    doSpaceDrawEventHandler.remove();
  }

  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  doSpaceDrawEventHandler = toolbar.on('draw-end', function (gra) {
    let map = MapControl.map;
    if (doSpaceDrawEventHandler != undefined) {
      doSpaceDrawEventHandler.remove();
    }
    let toolbar = MapControl.drawToolbar[MapControl.mapId];
    toolbar.deactivate();
    var geo = gra.geometry;
    var symbol;
    switch (geo.type) {
      case 'point':
        symbol = new esri.symbol.SimpleMarkerSymbol(
          esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
          5,
          new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_SOLID,
            new dojo.Color([255, 0, 0]),
            1
          ),
          new dojo.Color([0, 255, 0, 0.35])
        );
        break;
    }
    bus.$emit('GetPoint', geo);
    var tempGra = new esri.Graphic(geo, symbol, null, null);
    MapControl.graphicLayers['gralyr1'].add(tempGra);
  });

  if (drawtype == 'point') {
    toolbar.activate(esri.toolbars.Draw.POINT);
  }
  MapControl.graphicLayers['gralyr1'].clear();
};

//立案绘制
MapControl.Draw = function (drawtype) {
  if (doSpaceDrawEventHandler != undefined) {
    doSpaceDrawEventHandler.remove();
  }

  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  doSpaceDrawEventHandler = toolbar.on('draw-end', function (gra) {
    let map = MapControl.map[MapControl.mapId];
    if (doSpaceDrawEventHandler != undefined) {
      doSpaceDrawEventHandler.remove();
    }
    toolbar.deactivate();
    //根据图形的类型定义显示样式
    var geo = gra.geometry;

    var symbol = new esri.symbol.SimpleFillSymbol(
      esri.symbol.SimpleFillSymbol.STYLE_SOLID,
      new esri.symbol.SimpleLineSymbol(
        esri.symbol.SimpleLineSymbol.STYLE_DASH,
        new dojo.Color([255, 0, 0]),
        3
      ),
      new dojo.Color([255, 140, 0, 0.35])
    );
    bus.$emit('GetPolygonFromRemoteServer', geo);
    var tempGra = new esri.Graphic(geo, symbol, null, null);
    MapControl.graphicLayers['gralyr1'].add(tempGra);
  });

  toolbar.activate(esri.toolbars.Draw.POLYGON);

  MapControl.graphicLayers['gralyr1'].clear();
};

/**
 *wkt转化成arcgis对象
 */
MapControl.WktToAgs = function (wkt, spatialReference) {
  if (wkt == "MULTIPOINT EMPTY" || wkt == null || wkt == undefined) {
    return null;
  } else {
    let map = MapControl.map[MapControl.mapId];
    var geo;
    if (map && wkt) {
      if (wkt.indexOf('POINT') >= 0)
        geo = transformUtils.WktToPoint(wkt, spatialReference ? spatialReference : map.spatialReference); //点
      else if (wkt.indexOf('LINESTRING') == 0)
        geo = transformUtils.WktToPolyline(wkt, spatialReference ? spatialReference : map.spatialReference); //线
      else if (wkt.indexOf('MULTILINESTRING') == 0)
        geo = transformUtils.WktToMulyiPolyline(wkt, spatialReference ? spatialReference : map.spatialReference); //多线
      else if (wkt.indexOf('POLYGON') == 0)
        geo = transformUtils.WktToPolygon(wkt, spatialReference ? spatialReference : map.spatialReference); //面
      else if (wkt.indexOf('MULTIPOLYGON') == 0) {
        geo = transformUtils.WktToMULTIPOLYGON(wkt, spatialReference ? spatialReference : map.spatialReference); //多面
      }
    }
    return geo;
  }
};

/**
 *arcgis对象wkt
 */
MapControl.AgsToWkt = function (ags) {
  let map = MapControl.map[MapControl.mapId];
  var geo = ags;
  if (geo.type == 'point') {
    geo = transformUtils.PointToWKT(geo); //点
  } else if (geo.type == 'polyline') {
    geo = transformUtils.LineToWKT(geo); //线
  } else if (geo.type == 'polygon') {
    geo = transformUtils.PolygonToWKT(geo); //面
  }
  return geo;
};

/**
 *标注
 */
MapControl.AddMarker = function (name) {
  let map = MapControl.map[MapControl.mapId];
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  toolbar.activate(esri.toolbars.Draw.POINT);
  MapControl.graphicLayers['gralyr1'].clear();
  if (domapOnclickEventHandler != undefined) {
    domapOnclickEventHandler.remove();
  }
  domapOnclickEventHandler = toolbar.on('draw-end', function (gra) {
    if (domapOnclickEventHandler != undefined) {
      domapOnclickEventHandler.remove();
    }
    var geo = gra.geometry;
    MapControl.GetTxtSymbols(geo, name, 0, 40, '#495060');
    bus.$emit('AddMarker', geo);
    toolbar.deactivate();
  });
};

MapControl.showMarker = function (geo) {
  MapControl.graphicLayers['gralyr1'].clear();
  var iconPath =
    'M21.4,10.75C21.4,13.8596180857762 20.0672757983134,16.6579617557165 17.9418493492401,18.6050090555209 17.0443221066919,19.427210169498 16.4687497071909,20.1972502374357 15.4999997246083,21.0410002473414 15.1788168986504,21.3207401363281 14.6249997403403,21.947250257981 13.7499997560722,23.3847502748576 13.3436019926217,24.0524037632258 12.876040684451,24.9010880896574 12.4687497791082,25.666000300437 11.1874998021442,28.0722503285736 11.4538843799389,31.2910003676782 10.6874998111339,31.2910003676782 9.9311690792195,31.2910003676782 10.062499822371,28.2910003311315 8.96874984203587,25.7597503015333 8.58471596323839,24.8709861556588 8.03709726822865,23.8066075530583 7.56249986731934,23.1035002715558 6.71874988248939,21.8535002568804 6.01878656603682,21.3001083190566 5.71874990046874,21.0097502469744 4.74999991788621,20.0722502359682 4.15562035443328,19.2270786136257 3.17966875598971,18.2408347051012 1.27570825337479,16.3167951822706 0.0999999999999996,13.670698279192 0.0999999999999996,10.75 0.0999999999999996,4.86816741430205 4.86816741430205,0.0999999999999996 10.75,0.0999999999999996 16.631832585698,0.0999999999999996 21.4,4.86816741430205 21.4,10.75z';
  var system = new esri.symbol.SimpleMarkerSymbol();
  system.setPath(iconPath);
  system.setSize(30);
  system.setColor(new esri.Color('#FF0000'));
  system.setOffset(0, 15);

  var symbol = new esri.symbol.SimpleLineSymbol(
    esri.symbol.SimpleLineSymbol.STYLE_NULL,
    new dojo.Color([255, 0, 0]),
    0
  );
  system.setOutline(symbol);

  var graphic = new esri.Graphic(geo, system);
  // var symbol = esri.symbol.PictureMarkerSymbol('../assets/img/tips.png', 23, 30);
  // var tempGra = new esri.Graphic(geo, symbol);
  MapControl.graphicLayers['gralyr1'].add(graphic);
};
// 距离、面积测量操作
var doMeasureEventHandler;
var doLengthsCompleteHandler;
var doAreasAndLengthsCompleteHandler;
var length, lastpt, centerPoint;
MapControl.MeasureDraw = function (type) {
  if (doMeasureEventHandler != undefined) {
    doMeasureEventHandler.remove();
  }
  if (doLengthsCompleteHandler != undefined) {
    doLengthsCompleteHandler.remove();
  }
  if (doAreasAndLengthsCompleteHandler != undefined) {
    doAreasAndLengthsCompleteHandler.remove();
  }
  if (domapOnclickEventHandler != undefined) {
    domapOnclickEventHandler.remove();
  }
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  let geometryService = MapControl.GeometryService;
  doMeasureEventHandler = toolbar.on('draw-end', doMeasure);
  if (type == 'polyline') {
    length = 0;
    lastpt = null;
    toolbar.activate(esri.toolbars.Draw.POLYLINE);
    setupCustomTool('polyline');
  } else if (type == 'polygon') {
    toolbar.activate(esri.toolbars.Draw.POLYGON);
  }
};

//量算
function doMeasure(gra) {
  let map = MapControl.map[MapControl.mapId];
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  let geometryService = MapControl.GeometryService;
  var geometry = gra.geometry;
  esriLoader.loadModules(
    ['esri/tasks/AreasAndLengthsParameters']).then(
    ([AreasAndLengthsParameters]) => {
      switch (geometry.type) {
        case 'polygon':
          var symbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(
              esri.symbol.SimpleLineSymbol.STYLE_SOLID,
              new dojo.Color([0, 0, 0]),
              2
            ),
            new dojo.Color([255, 0, 0, 0.25])
          );
          var areasAndLengthParams = new esri.tasks.AreasAndLengthsParameters();
          areasAndLengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_FOOT;
          areasAndLengthParams.areaUnit = esri.tasks.GeometryService.UNIT_METER;
          geometryService.simplify([geometry], function (simplifiedGeometries) {
            areasAndLengthParams.polygons = simplifiedGeometries;
            geometryService.areasAndLengths(
              areasAndLengthParams,
              outputAreaAndLength
            );
          });
          centerPoint = geometry.getCentroid();
          break;
      }
      var graphic = new esri.Graphic(geometry, symbol);
      MapControl.graphicLayers['gralyr1'].add(graphic);
    }
  ).catch(err => {
    console.error(err);
  })
}
var doonLengthsComplete;

function setupCustomTool(name) {
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  if (domapOnclickEventHandler !== undefined) {
    domapOnclickEventHandler.remove();
  }
  if (name == 'polyline') {
    let map = MapControl.map[MapControl.mapId];
    domapOnclickEventHandler = map.on('click', MapclickHandler);
    map.on('dbclick', stopMeasure);
  }
}

function stopMeasure() {
  if (doonLengthsComplete !== undefined) {
    doonLengthsComplete.remove();
  }
  toolbar.deactivate();
}

function MapclickHandler(e) {
  let map = MapControl.map[MapControl.mapId];
  let geometryService = MapControl.GeometryService;
  var pt = new esri.geometry.Point(
    e.mapPoint.x,
    e.mapPoint.y,
    map.spatialReference
  );
  esriLoader.loadModules(
    ['esri/tasks/LengthsParameters']).then(
    ([LengthsParameters]) => {
      if (lastpt != undefined) {
        var line = new esri.geometry.Polyline({
          spatialReference: map.spatialReference
        });
        line.addPath([lastpt, pt]);

        var symbol = new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_SOLID,
          new dojo.Color([255, 0, 0]),
          2
        );
        MapControl.graphicLayers['gralyr1'].add(new esri.Graphic(line, symbol));

        var lengthParams = new esri.tasks.LengthsParameters();
        lengthParams.lengthUnit = esri.tasks.GeometryService.UNIT_METER;
        lengthParams.polylines = [line];
        lengthParams.geodesic = false;
        lengthParams.calculationType = 'geodesic';
        lengthParams.polylines[0].spatialReference = map.spatialReference;
        if (doonLengthsComplete !== undefined)
          dojo.disconnect(doonLengthsComplete);
        doonLengthsComplete = dojo.connect(
          geometryService,
          'onLengthsComplete',
          outputDistance
        );
        geometryService.lengths(lengthParams);
      }
      lastpt = pt;
      var marksymbol = new esri.symbol.SimpleMarkerSymbol(
        esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
        dojox.gfx.px2pt(12),
        new esri.symbol.SimpleLineSymbol()
        .setStyle(esri.symbol.SimpleLineSymbol.STYLE_SOLID)
        .setColor(new dojo.Color([255, 0, 0, 255])),
        new dojo.Color([0, 0, 0, 0], dojox.gfx.px2pt(1))
      );
      var graphic = new esri.Graphic(pt, marksymbol);
      MapControl.graphicLayers['gralyr1'].add(graphic);
    }
  ).catch(err => {
    console.error(err);
  })
}

function outputDistance(evtObj) {
  let map = MapControl.map[MapControl.mapId];
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  if (doLengthsCompleteHandler != undefined) {
    //doLengthsCompleteHandler.remove();
    dojo.disconnect(doLengthsCompleteHandler);
  }
  if (evtObj.lengths[0] < 0.5) {
    toolbar.deactivate();
    if (domapOnclickEventHandler != undefined) {
      domapOnclickEventHandler.remove();
    }
    return;
  }
  length += evtObj.lengths[0];
  var lengthValue;
  if (length >= 1000) {
    lengthValue = (length / 1000).toFixed(3) + '公里';
  } else {
    lengthValue = length.toFixed(3) + '米';
  }

  // var pmsTextBg = new esri.symbol.PictureMarkerSymbol(tips, 22, 20);

  // pmsTextBg.setOffset(40, -15);
  // var textLength = lengthValue.length;
  // pmsTextBg.setWidth(textLength * 10);
  // var bgGraphic = new esri.Graphic(lastpt, pmsTextBg);
  // MapControl.graphicLayers['gralyr1'].add(bgGraphic);//用来衬托文字白底的

  var font = new esri.symbol.Font();
  font.setSize('10pt');
  font.setFamily('微软雅黑');
  var text = new esri.symbol.TextSymbol(lengthValue);
  text.setFont(font);
  text.setColor(new dojo.Color([0, 0, 0, 255]));
  text.setOffset(40, -20);

  var labelGraphic = new esri.Graphic(lastpt, text);
  MapControl.graphicLayers['gralyr1'].add(labelGraphic);
}
//面积结果
function outputAreaAndLength(result) {
  if (doAreasAndLengthsCompleteHandler != undefined) {
    doAreasAndLengthsCompleteHandler.remove();
  }
  let map = MapControl.map[MapControl.mapId];
  let toolbar = MapControl.drawToolbar[MapControl.mapId];
  var area;
  var areaValue = result.areas[0];
  if (areaValue >= 1000000) {
    area = '面积：' + (result.areas[0] / 1000000).toFixed(3) + '平方公里';
  } else {
    area = '面积：' + result.areas[0].toFixed(3) + '平方米';
  }
  var font = new esri.symbol.Font(
    '12pt',
    esri.symbol.Font.VARIANT_NORMAL,
    esri.symbol.Font.WEIGHT_BOLD,
    '黑体'
  );
  var textSymbol = new esri.symbol.TextSymbol(
    area,
    font,
    new dojo.Color([0, 0, 0])
  );
  var labelPointGraphic = new esri.Graphic(centerPoint, textSymbol);
  MapControl.graphicLayers['gralyr1'].add(labelPointGraphic);
  toolbar.deactivate();
}

// 隐藏地图所有图层
MapControl.hideLayersAll = function () {
  if (MapControl.graphicLayers['gralyr1'])
    MapControl.graphicLayers['gralyr1'].hide();
  if (MapControl.graphicLayers['gralyr2'])
    MapControl.graphicLayers['gralyr2'].hide();
  if (MapControl.graphicLayers['gralyr3'])
    MapControl.graphicLayers['gralyr3'].hide();
  if (MapControl.graphicLayers['gralyr4'])
    MapControl.graphicLayers['gralyr4'].hide();
  if (MapControl.graphicLayers['gralyr5'])
    MapControl.graphicLayers['gralyr5'].hide();
}

/*图层控制显示*/
MapControl.SetLayerVisible = function (uservisibleLayers) {
  esriLoader.loadModules(
    ['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer']).then(
    ([Map, ArcGISDynamicMapServiceLayer]) => {
      let map = MapControl.map[MapControl.mapId];
      if (uservisibleLayers) {
        for (var sitem in uservisibleLayers) {
          if (uservisibleLayers[sitem].serviceurl) {
            var sublay = map.getLayer(uservisibleLayers[sitem].serviceurl);
            if (!sublay) {
              continue;
            }
            if (uservisibleLayers[sitem].haschild == true) {
              let index = sublay.displayLevels.indexOf(uservisibleLayers[sitem].layerindex);
              if (uservisibleLayers[sitem].switchs) {
                if (index < 0)
                  sublay.displayLevels.push(uservisibleLayers[sitem].layerindex);
              } else {
                if (index > -1) {
                  sublay.displayLevels.splice(index, 1);
                }
              }
              sublay.setVisibleLayers(sublay.displayLevels);
            } else sublay.setVisibility(uservisibleLayers[sitem].switchs);
          }
        }
      }
    }
  ).catch(err => {
    console.error(err);
  })
};

/*批量图层加载，一直叠加，如果存在则不操作，*/
MapControl.SetLayerload = function (uservisibleLayers) {
  esriLoader.loadModules(
    [
      'esri/map',
      'esri/layers/ArcGISDynamicMapServiceLayer',
      'esri/layers/ArcGISTiledMapServiceLayer'
    ]).then(
    ([Map, ArcGISDynamicMapServiceLayer, ArcGISTiledMapServiceLayer]) => {
      let map = MapControl.map[MapControl.mapId];
      if (uservisibleLayers) {
        for (var sitem in uservisibleLayers) {
          var sublay = map.getLayer(uservisibleLayers[sitem].serviceurl);
          if (sublay == undefined) {
            if (uservisibleLayers[sitem].servicetype === 'dynamic') {
              sublay = new esri.layers.ArcGISDynamicMapServiceLayer(
                uservisibleLayers[sitem].serviceurl
              );
            } else {
              sublay = new esri.layers.ArcGISTiledMapServiceLayer(
                uservisibleLayers[sitem].serviceurl
              );
            }
            sublay.id = uservisibleLayers[sitem].serviceurl;
            sublay.opacity = uservisibleLayers[sitem].slider / 100;
            if (uservisibleLayers[sitem].haschild == true) {
              sublay.displayLevels = [Number(uservisibleLayers[sitem].layerindex)]
              sublay.setVisibleLayers(sublay.displayLevels);
            }
            map.addLayer(sublay);
          } else {
            if (uservisibleLayers[sitem].haschild == true) {
              if (sublay.displayLevels.indexOf(Number(uservisibleLayers[sitem].layerindex)) < 0) {
                sublay.displayLevels.push(Number(uservisibleLayers[sitem].layerindex));
                sublay.setVisibleLayers(sublay.displayLevels);
              }
            } else
              sublay.setVisibility(uservisibleLayers[sitem].switchs);
          }
        }
      }
    }
  ).catch(err => {
    console.error(err);
  })
};

/*地图与影像图切换 */
MapControl.SetLayerbaseload = function (uservisibleLayers) {
  esriLoader.loadModules(
    ['esri/map', 'esri/layers/ArcGISTiledMapServiceLayer', 'esri/layers/ArcGISDynamicMapServiceLayer']).then(
    ([Map, ArcGISTiledMapServiceLayer, ArcGISDynamicMapServiceLayer]) => {
      let map = MapControl.map[MapControl.mapId];
      console.log(uservisibleLayers)
      if (!uservisibleLayers) return;
      uservisibleLayers.forEach(element => {
        var sublay = map.getLayer(element.url);
        if (sublay && !element.isshow) {
          map.removeLayer(sublay); //移除图层
        } else if (element.isshow == true) {
          if (element.type == 'tiled') {
            sublay = new esri.layers.ArcGISTiledMapServiceLayer(element.url);
          }
          if (element.type == 'dynamic') {
            sublay = new esri.layers.ArcGISDynamicMapServiceLayer(element.url);
          }
          sublay.id = element.url;
          sublay.name = element.url;
          map.addLayer(sublay, 0); //加载图层
        }
      });
    }
  ).catch(err => {
    console.error(err);
  })
};

/*根据图层ID编号，将图层从地图中移除*/
MapControl.RemoveLayerByLyrID = function (tempLyrId) {
  let map = MapControl.map[MapControl.mapId];
  if (typeof map.getLayer(tempLyrId) !== "undefined") {
    map.removeLayer(map.getLayer(tempLyrId));
  }
};

/*批量图层移除*/
MapControl.RemoveLayerVisible = function (uservisibleLayers) {
  let map = MapControl.map[MapControl.mapId];
  if (uservisibleLayers) {
    for (var sitem in uservisibleLayers) {
      if (uservisibleLayers[sitem].serviceurl) {
        var sublay = map.getLayer(uservisibleLayers[sitem].serviceurl);
        if (sublay) {
          if (uservisibleLayers[sitem].haschild == true) {
            let index = sublay.displayLevels.indexOf(Number(uservisibleLayers[sitem].layerindex));
            if (index > -1) {
              sublay.displayLevels.splice(index, 1);
              sublay.setVisibleLayers(sublay.displayLevels);
            }
            if (sublay.displayLevels.length == 0) map.removeLayer(sublay);
          } else
            map.removeLayer(sublay);
        }
      }
    }
  }
};

/*图层透明度设置*/
MapControl.transparency = function (uservisibleLayers) {
  var lay = uservisibleLayers.tmdtransparency / 100;
  esriLoader.loadModules(
    [
      'esri/map',
      'dojo/on',
      'dojo/dom',
      'dojo/_base/fx',
      'esri/layers/ArcGISTiledMapServiceLayer',
      'esri/geometry/Extent',
      'dojo/domReady!'
    ]).then(
    ([Map, on, dom, basefx, ArcGISTiledMapServiceLayer, Extent]) => {
      let map = MapControl.map[MapControl.mapId];
      var colorfullbasemap = map.getLayer(uservisibleLayers.serverurl);
      var graybasemapdiv = colorfullbasemap.getNode();
      basefx
        .animateProperty({
          node: graybasemapdiv,
          duration: 500,
          properties: {
            opacity: lay
          }
        })
        .play();
    }
  ).catch(err => {
    console.error(err);
  })
};

/*地图上弹出框*/
MapControl.topup = function (event) {
  var map = MapControl.map[MapControl.mapId];
  /*弹出框*/
  /*调整弹出框的大小*/
  if (event.resize) {
    map.infoWindow.resize(event.resize);
  }
  if (event.setTitle) {
    map.infoWindow.setTitle(event.setTitle);
  }
  if (event.setContent) {
    map.infoWindow.setContent(event.setContent);
  }

  if (event.geo) {
    if (event.geo.type == 'point') {
      map.infoWindow.show(event.geo);
    } else {
      /*取中心点*/
      map.infoWindow.show(event.geo.getExtent().getCenter());
    }
  }
  //显示位置 用于定位
  if (event.geo) {
    var showExtent;
    switch (event.geo.type) {
      case 'point':
        var xMin = parseFloat(event.geo.x) - 0.000005;
        var yMin = parseFloat(event.geo.y) - 0.000005;
        var xMax = parseFloat(event.geo.x) + 0.000005;
        var yMax = parseFloat(event.geo.y) + 0.000005;
        showExtent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, map.spatialReference);
        break;
      case 'polyline':
        showExtent = event.geo.getExtent();
        break;
      case 'polygon':
        showExtent = event.geo.getExtent();
        break;
      case 'extent':
        showExtent = event.geo.getExtent();
        break;
    }
    if (showExtent != undefined) {
      map.setExtent(showExtent.expand(1.5));
    }
  }
};

/*截屏*/
MapControl.screenshots = function (uservisibleLayers) {
  var app = {};
  esriLoader.loadModules(
    [
      'esri/map',
      'esri/dijit/Print',
      'esri/tasks/PrintTask',
      'esri/tasks/PrintParameters',
      'esri/tasks/PrintTemplate',
      'esri/symbols/TextSymbol',
      'esri/symbols/Font',
      'esri/graphic',
      'esri/geometry/Point',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/Color',
      'dojo/domReady!'
    ]).then(
    ([
      Map,
      Print,
      PrintTask,
      PrintParameters,
      PrintTemplate,
      TextSymbol,
      Font,
      Graphic,
      Point,
      SimpleMarkerSymbol,
      SimpleLineSymbol,
      Color
    ]) => {
      var printUrl =
        'http://10.10.31.180:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task';
      var printTask = new PrintTask(printUrl);
      var template = new PrintTemplate();
      template.exportOptions = {
        width: 800,
        height: 600,
        dpi: 96
      };
      template.format = 'PDF';
      template.layout = 'MAP_ONLY';
      template.preserveScale = false;
      var params = new PrintParameters();
      params.map = MapControl.map[MapControl.mapId];
      params.template = template;
      printTask.execute(params, function (evt) {
        window.open(evt.url, '_blank');
      });
    }
  ).catch(err => {
    console.error(err);
  })
};

/*图层控制显示根据属性*/
MapControl.SetLayerVisibleByProperty = function (uservisibleLayers) {
  esriLoader.loadModules(
    ['esri/map', 'esri/layers/ArcGISDynamicMapServiceLayer']).then(
    ([Map, ArcGISDynamicMapServiceLayer]) => {
      let map = MapControl.map[MapControl.mapId];
      try {
        if (uservisibleLayers) {
          if (uservisibleLayers.SERVERURL) {
            var sublay = map.getLayer(uservisibleLayers.SERVERURL);
            if (!sublay) {
              sublay = new esri.layers.ArcGISDynamicMapServiceLayer(
                uservisibleLayers.SERVERURL
              );
              sublay.id = uservisibleLayers.SERVERURL;
              sublay.name = uservisibleLayers.SERVERURL;
              map.addLayer(sublay);
            }

            sublay.setVisibility(true);

            if (
              uservisibleLayers.layerDefint &&
              uservisibleLayers.layerDefint.length > 0
            ) {
              sublay.setLayerDefinitions(uservisibleLayers.layerDefint);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
  ).catch(err => {
    console.error(err);
  })
};

MapControl.PostionToPolygon = function (geo) {
  esriLoader.loadModules(
      ['esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon'])
    .then(([Point, Polyline, Polygon]) => {
      let map = MapControl.map[MapControl.mapId];
      var esrgeo = new Polygon(geo);
      var showExtent = esrgeo.getExtent();
      if (showExtent != undefined) {
        map.setExtent(showExtent.expand(1.5));
      }
    }).catch(err => {
      console.error(err);
    })
};

//添加气球标注(X,Y)文字标注偏移量（默认可以认为是0,13）
MapControl.GetTxtSymbols = function (geo, num, X, Y, color) {
  var iconPath =
    'M21.4,10.75C21.4,13.8596180857762 20.0672757983134,16.6579617557165 17.9418493492401,18.6050090555209 17.0443221066919,19.427210169498 16.4687497071909,20.1972502374357 15.4999997246083,21.0410002473414 15.1788168986504,21.3207401363281 14.6249997403403,21.947250257981 13.7499997560722,23.3847502748576 13.3436019926217,24.0524037632258 12.876040684451,24.9010880896574 12.4687497791082,25.666000300437 11.1874998021442,28.0722503285736 11.4538843799389,31.2910003676782 10.6874998111339,31.2910003676782 9.9311690792195,31.2910003676782 10.062499822371,28.2910003311315 8.96874984203587,25.7597503015333 8.58471596323839,24.8709861556588 8.03709726822865,23.8066075530583 7.56249986731934,23.1035002715558 6.71874988248939,21.8535002568804 6.01878656603682,21.3001083190566 5.71874990046874,21.0097502469744 4.74999991788621,20.0722502359682 4.15562035443328,19.2270786136257 3.17966875598971,18.2408347051012 1.27570825337479,16.3167951822706 0.0999999999999996,13.670698279192 0.0999999999999996,10.75 0.0999999999999996,4.86816741430205 4.86816741430205,0.0999999999999996 10.75,0.0999999999999996 16.631832585698,0.0999999999999996 21.4,4.86816741430205 21.4,10.75z';
  var system = new esri.symbol.SimpleMarkerSymbol();
  system.setPath(iconPath);
  system.setSize(30);
  system.setColor(new esri.Color('#FF0000'));
  system.setOffset(0, 15);

  var symbol = new esri.symbol.SimpleLineSymbol(
    esri.symbol.SimpleLineSymbol.STYLE_NULL,
    new dojo.Color([255, 0, 0]),
    0
  );
  system.setOutline(symbol);

  var graphic = new esri.Graphic(geo, system);
  graphic.setAttributes({
    id: num
  });
  MapControl.graphicLayers['gralyr2'].add(graphic);
  if (num != '' && num != undefined) {
    var txtSym = new esri.symbol.TextSymbol();
    txtSym.setAlign(esri.symbol.TextSymbol.ALIGN_MIDDLE);
    txtSym.setText(num);
    txtSym.setColor(new esri.Color(color)); //"#f7f7f7"
    txtSym.setOffset(X, Y);
    var font = new esri.symbol.Font();
    font.setSize('14px');
    font.setWeight(esri.symbol.Font.WEIGHT_BOLD);
    font.setFamily('微软雅黑');
    txtSym.setFont(font);
    var graphic1 = new esri.Graphic(geo, txtSym);
    MapControl.graphicLayers['gralyr2'].add(graphic1);
  }
};

//添加气球标注(X,Y)文字标注偏移量（默认可以认为是0,13）
MapControl.GetTxtSymbolsMarker = function (geo, num, X, Y, color) {
  var txtSym = new esri.symbol.TextSymbol();
  txtSym.setAlign(esri.symbol.TextSymbol.ALIGN_MIDDLE);
  txtSym.setText(num);
  txtSym.setColor(new esri.Color(color)); //"#f7f7f7"
  txtSym.setOffset(X, Y);
  var font = new esri.symbol.Font();
  font.setSize('14px');
  font.setWeight(esri.symbol.Font.WEIGHT_BOLD);
  font.setFamily('微软雅黑');
  txtSym.setFont(font);
  var graphic1 = new esri.Graphic(geo, txtSym);
  MapControl.graphicLayers['gralyr2'].add(graphic1);
};

//添加气球标注(X,Y)文字标注偏移量（默认可以认为是0,13）
MapControl.GetTxtSymbols2Polygon = function (geo, num, X, Y, icon) {
  esriLoader.loadModules(
    ['esri/geometry/Point', 'esri/geometry/Polyline', 'esri/geometry/Polygon']).then(([Point, Polyline, Polygon]) => {
    //MapControl.graphicLayers['gralyr1'].clear();
    let map = MapControl.map[MapControl.mapId];
    var symbol;
    var showExtent;
    if (geo) {
      switch (geo.type) {
        case 'point':
          geo = new Point(geo);
          var xMin = parseFloat(geo.x) + 0.000005;
          var yMin = parseFloat(geo.y) + 0.000005;
          var xMax = parseFloat(geo.x) + 0.000005;
          var yMax = parseFloat(geo.y) + 0.000005;
          showExtent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, map.spatialReference);
          var symbol = new esri.symbol.SimpleMarkerSymbol(
            esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
            10,
            new esri.symbol.SimpleLineSymbol(
              esri.symbol.SimpleLineSymbol.STYLE_CIRCLE,
              new dojo.Color([255, 87, 34, 5])
            ),
            new dojo.Color([255, 87, 34, 5.25])
          );
          break;
        case 'polyline':
          geo = new Polyline(geo);
          symbol = new esri.symbol.SimpleLineSymbol(
            esri.symbol.SimpleLineSymbol.STYLE_DASH,
            new dojo.Color([255, 0, 0]),
            3
          );
          showExtent = geo.getExtent();
          break;
        case 'polygon':
          geo = new Polygon(geo);
          symbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(
              esri.symbol.SimpleLineSymbol.STYLE_DASH,
              new dojo.Color([0, 125, 125]),
              3
            ),
            new dojo.Color([0, 87, 34, 0.15])
          );
          showExtent = geo.getExtent();
          break;
        case 'extent':
          geo = new Polygon(geo);
          symbol = new esri.symbol.SimpleFillSymbol(
            esri.symbol.SimpleFillSymbol.STYLE_SOLID,
            new esri.symbol.SimpleLineSymbol(
              esri.symbol.SimpleLineSymbol.STYLE_DASH,
              new dojo.Color([255, 0, 0]),
              3
            ),
            new dojo.Color([0, 87, 34, 0.15])
          );
          showExtent = geo.getExtent();
          break;
      }
      if (showExtent != undefined) {
        var tempGra = new esri.Graphic(geo, symbol, null, null);
        MapControl.graphicLayers['gralyr2'].add(tempGra);
        //中间点
        let pointwkt = 'POINT ( ' + (showExtent.xmax + showExtent.xmin) / 2 + ' ' + (showExtent.ymax + showExtent.ymin) / 2 + ')';
        let point = MapControl.WktToAgs(pointwkt);
        if (icon == undefined) MapControl.GetTxtSymbols(point, num, X, Y, '#f7f7f7');
        else MapControl.GetTxtSymbolsMarker(point, num, X, Y, 'black');
      }
    }
  }).catch(err => {
    console.error(err);
  })
};

//通用添加Graphic到地图

/*   let obj = {
    geometry: geo,
    symbol: {
      type: '', //SimpleMarkerSymbol 或者 PictureMarkerSymbol
      image: 'marker.png', //图片名称，带文件后缀(类型为PictureMarkerSymbol)
      color: [255, 87, 34,5], //符号颜色,RGB值和透明度(SimpleMarkerSymbol)
      size: 10, //符号大小(SimpleMarkerSymbol)
      height: 23, //图片高度(类型为PictureMarkerSymbol)
      width: 30, //图片宽度(类型为PictureMarkerSymbol)
      style: 'dash'(虚线), 'solid'(实线)
    },
    isClear:false, //是否清除当前地图元素
    InfoTemplate:{}, //气泡元素(可选)
    attributes:{
      guid: '' //绘制对象的guid
    }, //元素属性(可选)
    layer: 'gralyr1'
  } */

MapControl.addGraphic = function ($graphic) {
  let geometry = $graphic.geometry;
  let symbol = $graphic.symbol;
  switch (geometry.type) {
    case 'point':
      geometry = new esri.geometry.Point(geometry);
      if (symbol.type == 'SimpleMarkerSymbol') {
        symbol = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE, symbol.size, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_CIRCLE, new dojo.Color(symbol.color)), new dojo.Color(symbol.color));
      } else if (symbol.type == 'PictureMarkerSymbol') {
        symbol = new esri.symbol.PictureMarkerSymbol(require('@/assets/img/map/' + symbol.image), symbol.width, symbol.height);
      }
      break;
    case 'polyline':
      geometry = new esri.geometry.Polyline(geometry);
      if (symbol.style == 'dash') { //虚线
        symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color(symbol.color), symbol.size);
      } else { //实线
        symbol = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color(symbol.color), symbol.size);
      }
      break;
    case 'polygon':
      geometry = new esri.geometry.Polygon(geometry);
      symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASH, new dojo.Color(symbol.dashcolor), symbol.size), new dojo.Color(symbol.color));
      break;
    case 'extent':
      geometry = new esri.geometry.Polygon(geometry);
      break;
  }

  if ($graphic.isdeviation == true) { //点位偏移量
    symbol.setOffset(0, 15);
  }

  let gra = new esri.Graphic(geometry, symbol, null, null);
  if ($graphic.attributes !== null) {
    gra.setAttributes($graphic.attributes)
  }
  if ($graphic.isClear == true) {
    MapControl.graphicLayers[$graphic.layer].clear()
  }
  if ($graphic.InfoTemplate !== undefined) {
    MapControl.AddPop(gra, $graphic.InfoTemplate)
  }
  MapControl.graphicLayers[$graphic.layer].add(gra);
};

//添加标注
MapControl.addLabel = function (point, content, R, G, B, layer) {
  // var pmsTextBg = new esri.symbol.PictureMarkerSymbol(
  //   tips,
  //   22,
  //   20
  // );
  // pmsTextBg.setOffset(0, 20);
  // var textLength = content.length;
  // pmsTextBg.setWidth(textLength * 20);
  // var bgGraphic = new esri.Graphic(point, pmsTextBg);
  // MapControl.graphicLayers['gralyr1'].add(bgGraphic);
  // var font = new esri.symbol.Font();
  // font.setSize('12pt');
  // font.setFamily('微软雅黑');
  // var text = new esri.symbol.TextSymbol(content);
  // text.setFont(font);
  // text.setColor(new dojo.Color([0, 0, 0, 255]));
  // text.setOffset(0, 15);
  // var labelGraphic = new esri.Graphic(point, text);

  var font = new esri.symbol.Font()
  font.setSize('9pt');
  font.setFamily('微软雅黑');
  font.setWeight(esri.symbol.Font.WEIGHT_BOLD);
  var textSymbol = new esri.symbol.TextSymbol(
    content,
    font,
    new dojo.Color([R == undefined ? 255 : R, G == undefined ? 255 : G, B == undefined ? 255 : 0])
  );
  var labelPointGraphic = new esri.Graphic(point, textSymbol);
  MapControl.graphicLayers[layer == undefined ? 'gralyr2' : layer].add(labelPointGraphic);
};

//添加地图右键菜单
MapControl.MenuForGraphics = function () {
  esriLoader.loadModules(
    [
      'esri/map',
      'esri/geometry/Point',
      'esri/geometry/Polygon',
      'esri/toolbars/draw',
      'esri/toolbars/edit',
      'esri/symbols/SimpleMarkerSymbol',
      'esri/symbols/SimpleLineSymbol',
      'esri/symbols/SimpleFillSymbol',
      'esri/graphic',
      'esri/geometry/jsonUtils',
      'esri/Color',
      'dojo/parser',
      'dijit/Menu',
      'dijit/MenuItem',
      'dijit/MenuSeparator',
      'dijit/form/Button',
      'dijit/layout/BorderContainer',
      'dijit/layout/ContentPane',
      'dojo/domReady!'
    ]).then(
    ([
      Map,
      Point,
      Polygon,
      Draw,
      Edit,
      SimpleMarkerSymbol,
      SimpleLineSymbol,
      SimpleFillSymbol,
      Graphic,
      geometryJsonUtils,
      Color,
      parser,
      Menu,
      MenuItem,
      MenuSeparator
    ]) => {
      let map = MapControl.map[MapControl.mapId];
      let editbar = MapControl.editToolbar[MapControl.mapId];
      let ctxMenuForMap = new Menu({
        onOpen: function (box) {
          if (editbar) {
            editbar.deactivate();
          }
        }
      });
      MapControl.MenuForMap = ctxMenuForMap;
      ctxMenuForMap.startup();
      ctxMenuForMap.bindDomNode(map.container);
    }
  ).catch(err => {
    console.error(err);
  })
};

//添加气泡
MapControl.AddPop = function (graphic, template) {
  esriLoader.loadModules(
    [
      'esri/dijit/Popup',
      'esri/dijit/PopupTemplate',
      'esri/InfoTemplate',
      'dojo/dom-construct',
      'dojo/dom',
      'dojo/on',
      'dojo/domReady!'
    ]).then(
    ([Popup, PopupTemplate, InfoTemplate, domConstruct, dom, on, domAttr]) => {
      let map = MapControl.map[MapControl.mapId];
      var infoTemplate = new InfoTemplate();

      infoTemplate.setTitle('巡查人员');

      infoTemplate.setContent(template);

      graphic.setInfoTemplate(infoTemplate);
    }
  ).catch(err => {
    console.error(err);
  })
};
//支持多个气泡显示
MapControl.CreatGraphicsLayerWithMTip = function (
  info,
  func,
  ctemplate,
  cGraphicslayer
) {
  esriLoader.loadModules(
    [
      'esri/dijit/Popup',
      'esri/layers/graphics',
      'esri/dijit/PopupTemplate',
      'esri/InfoTemplate',
      'ncam/PopupExtended',
      'esri/graphic',
      'esri/geometry/Point',
      'esri/symbols/SimpleMarkerSymbol',
      'dojo/dom-construct',
      'dojo/_base/lang',
      'dojo/dom',
      'dojo/on',
      'dojo/domReady!'
    ]).then(
    ([
      Popup,
      GraphicsLayer,
      PopupTemplate,
      InfoTemplate,
      PopupExtended,
      Graphic,
      Point,
      SimpleMarkerSymbol,
      domConstruct,
      lang,
      dom,
      on,
      domAttr
    ]) => {
      let map = MapControl.map[MapControl.mapId];
      let data = info;
      var customGraphics = map.getLayer('customGraphics');
      if (customGraphics) {
        map.removeLayer(customGraphics);
      }
      if (!cGraphicslayer) {
        cGraphicslayer = new esri.layers.GraphicsLayer({
          id: 'customGraphics'
        });
        map.addLayer(cGraphicslayer);
        for (var i = 0, len = data.length; i < len; i++) {
          var d = data[i];
          var p = new Point(d.x, d.y, map.spatialReference);
          var symbol = new esri.symbol.PictureMarkerSymbol(
            require('@/assets/img/map/' + data[i].gra.symbol.image),
            data[i].gra.symbol.width,
            data[i].gra.symbol.height
          );
          var graphic = new Graphic(p, symbol, lang.clone(d), null);
          var t_actions = [];
          for (var j = 0; j < func.length; j++) {
            var $func = func[j].funcname;
            t_actions.push({
              text: func[j].text,
              className: func[j].className,
              title: func[j].title,
              click: function (feature) {
                $func(feature);
              }
            });
          }
          var template = new PopupTemplate({
            title: ctemplate.title,
            fieldInfos: ctemplate.fieldInfos,
            extended: {
              actions: t_actions
            }
          });
          graphic.setInfoTemplate(template);
          graphic.infoTemplate.setContent(ctemplate.content);
          cGraphicslayer.add(graphic);
        }
      }

      var extendedPopup = new PopupExtended({
          extended: {
            themeClass: 'light',
            draggable: false,
            defaultWidth: 100,
            hideOnOffClick: true,
            multiple: true,
            smallStyleWidthBreak: 768
          },
          highlight: true,
          titleInBody: true
        },
        dojo.create('div')
      );
      extendedPopup.setMap(map);
      map.infoWindow = extendedPopup;
      for (var i = 0; i < cGraphicslayer.graphics.length; i++) {
        var d = cGraphicslayer.graphics[i];
        var loc = map.toScreen(d.geometry);
        map.infoWindow.setFeatures([cGraphicslayer.graphics[i]]);
        map.infoWindow.show(loc);
      }
    }
  ).catch(err => {
    console.error(err);
  })
};

MapControl.closePopups = function () {
  let map = MapControl.map[MapControl.mapId];
  var tempLength = map.infoWindow.openPopups.length;
  for (var i = 0; i < tempLength; i++) {
    map.infoWindow.openPopups[i].hide();
  }
};

//多面融合成mutlipolygon或者mutlilinestring
MapControl.mergemultipolygon = function (geometrystr) {
  if (geometrystr) {
    let value = 'MULTIPOLYGON (';
    geometrystr.forEach(data => {
      if (data.geostr.indexOf('LINESTRING') > -1) {
        value += data.geostr.replace('MULTILINESTRING  ', '').replace('LINESTRING  ', '').replace('((', '(').replace('))', ')') + ',';
        value = value.replace('MULTIPOLYGON', 'MULTILINESTRING').replace('( (', '((');
      } else
        value += data.geostr.replace('MULTIPOLYGON ', '').replace('POLYGON ', '').replace('(((', '((').replace(')))', '))') + ',';
    });
    if (value.lastIndexOf(',') == value.length - 1) {
      value = value.substring(0, value.length - 1);
    }
    value += ')';
    return value;
  } else return '';
};

//多面融合成polygon或者mutlilinestring
MapControl.mergepolygon = function (geometrystr) {
  if (geometrystr) {
    let value = 'POLYGON (';
    geometrystr.forEach(data => {
      if (data.geostr.indexOf('POLYLINE') > -1) {
        value += data.geostr.replace('POLYLINE (', '').replace('))', ')') + ',';
        value = value.replace('POLYGON', 'POLYLINE');
      } else
        value += data.geostr.replace('POLYGON (', '').replace('))', ')') + ',';
    });
    if (value.lastIndexOf(',') == value.length - 1) {
      value = value.substring(0, value.length - 1);
    }
    value += ')';
    return value;
  } else return '';
};

//根据多个点 绘制成一个矩形面
MapControl.polygonByPoint = function (points) {
  let xPoint = [],
    yPoint = [];
  for (let i = 0; i < points.length; i++) {
    let shape1 = points[i].replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ');
    xPoint.push(parseFloat(shape1[0]));
    yPoint.push(parseFloat(shape1[1]));
  }

  let xMax = Math.max.apply(null, xPoint) + 15;
  let xMin = Math.min.apply(null, xPoint) - 15;
  let yMax = Math.max.apply(null, yPoint) + 15;
  let yMin = Math.min.apply(null, yPoint) - 15;
  let shape = 'POLYGON((' + xMin + ' ' + yMin + ',' + xMax + ' ' + yMin + ',' + xMax + ' ' + yMax + ',' + xMin + ' ' + yMax + ',' + xMin + ' ' + yMin + '))';

  return shape;
};

//两点连接成 一条线
MapControl.linestringByPoint = function (point1, point2) {
  let shape1 = point1.replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ')
  let shape2 = point2.replace('POINT(', '').replace('POINT (', '').replace(')', '').split(' ')
  let shape = 'LINESTRING (' + shape1[0] + ' ' + shape1[1] + ', ' + shape2[0] + ' ' + shape2[1] + ')'

  return shape;
};

//绘制缓冲半径
MapControl.ShowGeometryBuffer = function (geom, buffer) {
  var distance = buffer;
  var map = MapControl.map[MapControl.mapId];
  esriLoader.loadModules(
    [
      'esri/tasks/BufferParameters',
      'esri/SpatialReference',
      'esri/tasks/GeometryService',
      'esri/geometry/Point',
      'esri/geometry/Polyline',
      'esri/geometry/Polygon'
    ]).then(([

    BufferParameters,
    SpatialReference,
    GeometryService,
    Point,
    Polyline,
    Polygon
  ]) => {
    var geometryService = new GeometryService(mapconfig.GeometryService);
    var params = new BufferParameters();
    if (geom.type == 'point') {
      geom = new Point(geom);
    } else if (geom.type == 'polyline') {
      geom = new Polyline(geom);
    } else if (geom.type == 'polygon') {
      geom = new Polygon(geom);
    }
    params.geometries = [geom];
    params.distances = [distance];
    params.unit = GeometryService.UNIT_METER;
    params.outSpatialReference = map.spatialReference;
    geometryService.buffer(params, function (results) {
      var symbol = new esri.symbol.SimpleFillSymbol(
        esri.symbol.SimpleFillSymbol.STYLE_SOLID,
        new esri.symbol.SimpleLineSymbol(
          esri.symbol.SimpleLineSymbol.STYLE_DASH,
          new dojo.Color([255, 0, 0]),
          3
        ),
        new dojo.Color([0, 0, 0, 0.15])
      );
      var graphic = new esri.Graphic(results[0], symbol);
      MapControl.graphicLayers['gralyr2'].add(graphic);
      var polygon = MapControl.AgsToWkt(results[0]);
      return polygon;
      // var showExtent = new Polygon(results[0]);
      // var Extent = showExtent.getExtent();
      // map.setExtent(Extent);
    });
  }).catch(err => {
    console.error(err);
  })
};

function showPopup(row) {
  let items = [];
  for (let item in row) {
    let value = row[item];
    items.push({
      name: item,
      value: row[item].toFixed(3)
    });
  }
  MapControl.setMapClear(1);
  let polygon = MapControl.WktToAgs(row.geom);
  MapControl.showGraphic(polygon, 1.5);
  let showExtent = polygon.getExtent();
  MapControl.showInfoWindow(showExtent.getCenter(), items);
}

//自定义弹出窗口
MapControl.showInfoWindow = function (mpcenter, listdata, contents) {
  esriLoader.loadModules(["esri/dijit/Popup",
    "esri/layers/graphics",
    "esri/dijit/InfoWindow",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/InfoTemplate",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
  ]).then(([Popup, graphics, InfoWinow, graphic, Point, InfoTemplate, SimpleFillSymbol, SimpleLineSymbol, Color,
    domConstruct, dom, on, domAttr
  ]) => {
    let map = MapControl.map[MapControl.mapId];

    // var highlightSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
    //   new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID,
    //     new Color([255, 0, 0]), 1),
    //   new Color([125, 125, 125, 0.35]));
    // var t = "<b>面积: </b>${面积:NumberFormat}平方公里<br/>" + "<b>管控级别: </b>${主体功能}<br/>" + "<b>补偿金额: </b>${补偿金额}万元<br/>" + "<b>红线类型: </b>${类型:NumberFormat}<br/>"+ "<b>责任主体: </b>${区属}政府<br/>"+
    // "<div style='display:block;float:left;margin-right:29px;'></div>"+
    // "<div style='display:block;float:right;'><a href='##' onclick='redLine_zyfx_Click(\""+evt.graphic.attributes.名称+"\")' >建设现状</a><i>|</i><a href='##' onclick='shouslfjqpage_hx()'>资金使用情况</a></div>";
    // var t = "<b>面积: </b>${面积:NumberFormat}平方公里<br/>";<sup class="ivu-badge-count ivu-badge-count-alone" style="box-shadow: 0 0 0 1px transparent;background: transparent;cursor: pointer;" onclick="closePop()">X</sup>
    map.infoWindow.setTitle('详情');
    if (contents && contents != '') {

      map.infoWindow.setContent(contents);
    } else {
      // var content = '<div style="color:#333"><p style="color:#fff;position: relative;top: -5px;">详情</p><span class="ivu-badge" style="position: absolute;top:2px;right: 12px; " > <i data-v-394040b0="" class="ivu-icon ivu-icon-ios-close-empty" style="font-size: 26px;color:#FFF;cursor: pointer;"  onclick="closePop()"></i></span>';
      var content = '<div style="background-color: #fff;overflow:auto;width: 100%;height: 100%;"><table  cellpadding="0" cellspacing="0" border="0" style="width: 100%;height: 100%;"><tbody>'
      if (listdata && listdata.length > 0) {
        for (var i = 0; i < listdata.length; i++) {
          if (listdata[i].name.toLowerCase() == "objectid") {
            content += '<tr style="height:25px; white-space: wrap;overflow: hidden;border:1px solid #f1f1f1;display: none;"></tr>'
          } else {
            content += '<tr style="height:25px; white-space: wrap;overflow: hidden;border:1px solid #f1f1f1;"><td style="border-right:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;"><div style="width:80px;white-space: initial;font-weight: 600;padding-left: 5px">' + listdata[i].name + '</div></td>'
            content += '<td style="border-right:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;"> <div style="overflow: hidden;white-space: wrap;text-overflow: ellipsis;padding-left:5px">' + listdata[i].value + '</div></td></tr>'
          }

          // content += "<b>" + listdata[i].name + ": </b>" + listdata[i].value + "<br/>";
        }
      }
      content += "</tbody></table>"
      content += "</div></div>"
      // dojo.string.substitute(),可以处理通配符形式
      // var highlightGraphic = new esri.Graphic(evt.graphic.geometry, highlightSymbol);
      // var obj = new Object();
      // obj.GETTYPE = 'HX';
      // highlightGraphic.setAttributes(obj);
      // map.graphics.add(highlightGraphic); // 将图标加入图形中

      //map.infoWindow.setTitle('详情');
      map.infoWindow.setContent(content);
    }
    //alert(mpcenter.x+","+mpcenter.y);
    var cPoint = new esri.geometry.Point(mpcenter.x, mpcenter.y, map.spatialReference);
    var loc = map.toScreen(cPoint);
    map.infoWindow.show(cPoint);
    map.centerAt(cPoint);
    //map.centerAndZoom(cPoint,7);
    //setTimeout(function(){

    //},200)

    var x = document.getElementsByName('hlmonitoringTab');
    if (x.length > 0) {
      for (var i = 0; i < x.length; i++) {
        var obj = x[i];
        x[i].onclick = function (obj) {

          var z = document.getElementsByName('hlmonitoringTab');
          for (var j = 0; j < z.length; j++) {
            z[j].className = "ivu-tabs-tab";
          }
          obj.currentTarget.className = "ivu-tabs-tab ivu-tabs-tab-active ivu-tabs-tab-focused";

          var pid = obj.currentTarget.attributes.tab.value;
          var tabs = ["tab1", "tab2"];
          for (var j = 0; j < 2; j++) {
            if (tabs[j] == pid) {
              document.getElementById(tabs[j]).style.display = "block";
            } else {
              document.getElementById(tabs[j]).style.display = "none";
            }
          }
        }
      }
    }

    window.closePop = function () {
      map.infoWindow.hide()
      MapControl.setMapClear(1)
    }
  }).catch(err => {
    console.error(err);
  })
}

function openSheet(name) {
  let url =
    mapconfig.webip + "jbgh/sheetjs/sheet.html#" + name;
  let iWidth = 1150; //弹出窗口的宽度;
  let iHeight = 650; //弹出窗口的高度;
  let iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
  let iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
  window.open(
    url,
    "newwindow",
    "height=" +
    iHeight +
    ", width=" +
    iWidth +
    ", top=" +
    iTop +
    ", left=" +
    iLeft +
    ", toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
  );
}

//自定义弹出窗口
MapControl._showInfoWindow = function (mpcenter, listdata, contents) {
  esriLoader.loadModules(["esri/dijit/Popup",
    "esri/layers/graphics",
    "esri/dijit/InfoWindow",
    "esri/graphic",
    "esri/geometry/Point",
    "esri/InfoTemplate",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "dojo/dom-construct",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
  ]).then(([Popup, graphics, InfoWinow, graphic, Point, InfoTemplate, SimpleFillSymbol, SimpleLineSymbol, Color,
    domConstruct, dom, on, domAttr
  ]) => {
    let map = MapControl.map[MapControl.mapId];
    map.infoWindow.setTitle('详情');
    if (contents && contents != '') {
      map.infoWindow.setContent(contents);
    } else {
      var content = '<div style="background-color: #fff;overflow:auto;"><table  cellpadding="0" cellspacing="0" border="0"><tbody>'
      if (listdata && listdata.length > 0) {
        for (var i = 0; i < listdata.length; i++) {
          if (listdata[i].name.toLowerCase() == "objectid") {
            content += '<tr style="height:25px; white-space: wrap;overflow: hidden;border:1px solid #f1f1f1;display: none;"></tr>'
          } else if (listdata[i].name == '项目名称') {
            content += '<tr style="height:25px; white-space: wrap;overflow: hidden;border:1px solid #f1f1f1;"><td style="border-right:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;"><div style="width:80px;white-space: initial;font-weight: 600;padding-left: 5px">' + listdata[i].name + '</div></td>'
            content += '<td style="border-right:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;"> <div style="overflow: hidden;white-space: wrap;text-overflow: ellipsis;padding-left:5px"><a href="javacript:void(0);" id="Sheet0" value="">' + listdata[i].value + '</a></div></td></tr>'
          } else {
            content += '<tr style="height:25px; white-space: wrap;overflow: hidden;border:1px solid #f1f1f1;"><td style="border-right:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;"><div style="width:80px;white-space: initial;font-weight: 600;padding-left: 5px">' + listdata[i].name + '</div></td>'
            content += '<td style="border-right:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;"> <div style="overflow: hidden;white-space: wrap;text-overflow: ellipsis;padding-left:5px">' + listdata[i].value + '</div></td></tr>'
          }
        }
      }
      content += "</tbody></table>"
      content += "</div></div>"
      map.infoWindow.setContent(content);
      window.jQuery('#Sheet0').click((ele) => {
        let url =
          mapconfig.webip + "jbgh/sheetjs/sheet.html#" + ele.toElement.innerText;
        let iWidth = 1150; //弹出窗口的宽度;
        let iHeight = 650; //弹出窗口的高度;
        let iTop = (window.screen.availHeight - 30 - iHeight) / 2; //获得窗口的垂直位置;
        let iLeft = (window.screen.availWidth - 10 - iWidth) / 2; //获得窗口的水平位置;
        window.open(
          url,
          ele.toElement.innerText + "项目扫尾一表清",
          "height=" +
          iHeight +
          ", width=" +
          iWidth +
          ", top=" +
          iTop +
          ", left=" +
          iLeft +
          ", toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no"
        );
      })
    }

    var cPoint = new esri.geometry.Point(mpcenter.x, mpcenter.y, map.spatialReference);
    var loc = map.toScreen(cPoint); //地理坐标转屏幕坐标(toScreen方法)
    map.infoWindow.show(cPoint);
    map.centerAt(cPoint);
    var x = document.getElementsByName('hlmonitoringTab');
    if (x.length > 0) {
      for (var i = 0; i < x.length; i++) {
        var obj = x[i];
        x[i].onclick = function (obj) {

          var z = document.getElementsByName('hlmonitoringTab');
          for (var j = 0; j < z.length; j++) {
            z[j].className = "ivu-tabs-tab";
          }
          obj.currentTarget.className = "ivu-tabs-tab ivu-tabs-tab-active ivu-tabs-tab-focused";

          var pid = obj.currentTarget.attributes.tab.value;
          var tabs = ["tab1", "tab2"];
          for (var j = 0; j < 2; j++) {
            if (tabs[j] == pid) {
              document.getElementById(tabs[j]).style.display = "block";
            } else {
              document.getElementById(tabs[j]).style.display = "none";
            }
          }
        }
      }
    }
    window.closePop = function () {
      map.infoWindow.hide()
      MapControl.setMapClear(1)
    }
  }).catch(err => {
    console.error(err);
  })
}

// 拾取
MapControl.QueryByPoint3 = function (_Self, VisibleLyr, type) {
  esriLoader.loadModules(['esri/tasks/IdentifyTask', 'esri/tasks/IdentifyParameters']).then(([IdentifyTask, IdentifyParameters]) => {
    let map = MapControl.map[MapControl.mapId];
    map.graphics.clear();
    map.setMapCursor("pointer"); //光标变成小手

    let result = [];
    MapControl.identifyHandler = map.on('click', function (geo) {

      // 流向单点拾取，溯源多点拾取
      if (type == "流向") {
        MapControl.identifyHandler.remove();
      }

      setTimeout(function () {
        for (var i = 0; i < VisibleLyr.length; i++) {
          if (VisibleLyr[i].name != '排水管网') continue;
          var identifyTask = new esri.tasks.IdentifyTask(
            VisibleLyr[i].Address
          );
          var identifyParams = new esri.tasks.IdentifyParameters();
          identifyParams.tolerance = 1; //容差值
          identifyParams.returnGeometry = true;
          identifyParams.layerIds = VisibleLyr[i].layerIds.toString().replace('[', '').replace(']', '').split(',');
          identifyParams.layerOption =
            esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
          identifyParams.geometry = geo.mapPoint;
          identifyParams.mapExtent = map.extent;
          identifyTask.execute(identifyParams, function (results) {
            if (results.length > 0) {
              for (let j = 0; j < results.length; j++) {
                let attributes = results[j].feature.attributes;
                if (results[j].geometryType.indexOf('Point') > 0 && attributes.wtdh != undefined) {
                  result.push(attributes);
                }
              }
            }
            if (result.length > 0) {
              let geo1 = 'POINT (' + geo.mapPoint.x + ' ' + geo.mapPoint.y + ' )';
              let wkt1 = MapControl.WktToAgs(geo1)
              MapControl.GetTxtSymbols(wkt1, type == "流向" ? '起' : '终', 0, 14, '#f7f7f7');

              map.setMapCursor("default"); //光标恢复默认形状
              bus.$emit('identify3', result);
            } else {
              _Self.$Message.error('未拾取到管点！');
            }
          });
        }
      }, 1000)

    });
  })
};


//拾取---根据地图比例尺计算容差值返回范围面
MapControl.identify = function (isremove) {
  if (MapControl.identifyHandler) MapControl.identifyHandler.remove();
  esriLoader.loadModules(['esri/geometry/scaleUtils']).then(([scaleUtils]) => {
    const map = MapControl.map[MapControl.mapId];
    const scale = scaleUtils.getScale(map);
    const PPI = 96
    let Resolution = scale / (PPI / 0.0254)
    MapControl.identifyHandler = map.on("click", function (geo) {
      let x = geo.mapPoint.x
      let y = geo.mapPoint.y
      let xmin = x - Resolution * 10
      let xmax = x + Resolution * 10
      let ymin = y - Resolution * 10
      let ymax = y + Resolution * 10
      let geom = 'POLYGON ((' + xmin + ' ' + ymin + ',' + xmax + ' ' + ymin + ',' + xmax + ' ' + ymax + ',' + xmin + ' ' + ymax + ',' + xmin + ' ' + ymin + '))';
      let geop = 'POINT(' + x + ' ' + y + ')';
      if (isremove == undefined) MapControl.identifyHandler.remove()
      bus.$emit('identify', geom); //返回范围面
      bus.$emit('identifypoint', geop); //返回点
    });
  }).catch(err => {
    console.error(err);
  })
};

//根据地图比例尺计算容差值返回范围面
MapControl.identifyNew = function (isremove) {
  esriLoader.loadModules(
    ['esri/geometry/scaleUtils', 'esri/geometry/geometryEngine']).then(
    ([scaleUtils, geometryEngine]) => {
      const map = MapControl.map[MapControl.mapId];
      const scale = scaleUtils.getScale(map);
      const PPI = 96
      let Resolution = scale / (PPI / 0.0254)
      MapControl.identifyHandler = map.on("click", function (geo) {
        const buffer = geometryEngine.geodesicBuffer(geo.mapPoint, 5, "meters", false) //缓冲范围5m
        let x = geo.mapPoint.x
        let y = geo.mapPoint.y

        //缓冲后转换成范围面
        let geom = ''
        for (var i = 0; i < buffer.rings[0].length; i++) {
          geom = buffer.rings[0][i][0] + ' ' + buffer.rings[0][i][1] + ',' + geom;
        }
        geom = geom + buffer.rings[0][0][0] + ' ' + buffer.rings[0][0][1];
        geom = 'POLYGON((' + geom + '))';
        let wkt = MapControl.WktToAgs(geom)
        // MapControl.showGraphic(wkt, undefined, "gralyr4")

        let extent = buffer.getExtent();
        let xmin = extent.xmin;
        let xmax = extent.xmax;
        let ymin = extent.ymin;
        let ymax = extent.ymax;
        let geometry = 'POLYGON ((' + xmin + ' ' + ymin + ',' + xmax + ' ' + ymin + ',' + xmax + ' ' + ymax + ',' + xmin + ' ' + ymax + ',' + xmin + ' ' + ymin + '))';
        let geop = 'POINT(' + x + ' ' + y + ')';
        if (isremove == undefined) MapControl.identifyHandler.remove()
        bus.$emit('identify', geometry);
        bus.$emit('identifypoint', geop);
      });
    }
  );
};

MapControl.multipolygonExtent = function (geolist) {
  var maxX = 0,
    maxY = 0,
    minX = 0,
    minY = 0;
  for (let i = 0; i < geolist.length; i++) {
    let geom = MapControl.WktToAgs(geolist[i].geostr);
    let event = geom.getExtent();
    if (i == 0) {
      maxX = parseFloat(event.xmax);
      maxY = parseFloat(event.ymax);
      minX = parseFloat(event.xmin);
      minY = parseFloat(event.ymin);
    }
    if (maxX < parseFloat(event.xmax)) {
      maxX = parseFloat(event.xmax);
    }
    if (maxY < parseFloat(event.ymax)) {
      maxY = parseFloat(event.ymax);
    }
    if (minX > parseFloat(event.xmin)) {
      minX = parseFloat(event.xmin);
    }
    if (minY > parseFloat(event.ymin)) {
      minY = parseFloat(event.ymin);
    }
  }
  if (geolist.length > 0) {
    let map = MapControl.map[MapControl.mapId];
    var xMin = parseFloat(minX) - 0.000005;
    var yMin = parseFloat(minY) - 0.000005;
    var xMax = parseFloat(maxX) + 0.000005;
    var yMax = parseFloat(maxY) + 0.000005;
    var showExtent = new esri.geometry.Extent(xMin, yMin, xMax, yMax, map.spatialReference);
    map.setExtent(showExtent.expand(1.5));
  }
};


//根据地图比例尺计算容差值返回点坐标
MapControl.identifypoint = function () {
  esriLoader.loadModules(
      ['esri/geometry/scaleUtils']).then(
      ([scaleUtils]) => {
        const map = MapControl.map[MapControl.mapId];
        const scale = scaleUtils.getScale(map);
        const PPI = 96
        let Resolution = scale / (PPI / 0.0254)
        MapControl.identifyHandler = map.on("click", function (geo) {
          let x = geo.mapPoint.x
          let y = geo.mapPoint.y
          let geom = 'POINT  ( ' + x + ' ' + y + ')';
          MapControl.identifyHandler.remove()
          bus.$emit('identifypoint', geom);
        });
      }
    )
    .catch(err => {
      console.error(err);
    })
};

//拾取已加载的所有服务
MapControl.identifyAllServices = function (_this) {
  MapControl.setMapClear();
  MapControl.identifyHandlerRemove();
  esriLoader
    .loadModules([
      "esri/tasks/IdentifyTask",
      "esri/tasks/IdentifyParameters"
    ])
    .then(([IdentifyTask, IdentifyParameters]) => {
      let map = MapControl.map[MapControl.mapId];
      var identifyParams = new esri.tasks.IdentifyParameters();
      _this.$store.state.identifyvalue = [];
      MapControl.identifyHandler = map.on("click", function (geo) {
        identifyParams.tolerance = 1;
        identifyParams.returnGeometry = true;
        identifyParams.layerOption =
          esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
        identifyParams.geometry = geo.mapPoint;
        identifyParams.mapExtent = map.extent;
        let serviceslist = map.layerIds;
        for (let i = 1; i < serviceslist.length; i++) {
          new esri.tasks.IdentifyTask(serviceslist[i]).execute(identifyParams, function (results) {
            bus.$emit("identifyAllServices", results);
            if (results.length != 0) {
              _this.$store.state.identifyvalue = results;
              _this.$parent.$router.replace({
                name: 'idenfity',
                params: {
                  name: 'idenfity',
                  menuname: '查询结果'
                }
              });
              _this.$parent.title_name = '查询结果';
            }
          });
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
};

MapControl.addToolTip = function (infoTem, point) {
  esriLoader.loadModules(["esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/Font",
    "esri/symbols/TextSymbol",
    "esri/geometry/Point",
    "esri/graphic",
    "dojo/_base/Color",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
  ]).then(([SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, Font, TextSymbol, Point, Graphic, Color, dom, on]) => {
    MapControl.graphicLayers['gralyr1'].clear();
    var fontsize = 14;
    var radius = 6;
    infoTem = infoTem + "";

    var bglineSymbol = new SimpleLineSymbol("solid", new Color([17, 91, 122, 1]), 1);
    var width = (MapControl.chkstrlen(infoTem)) * 0.6 * (fontsize + 1);
    var height = fontsize * 1.6;

    //设置背景框的大小
    var path = "M0" + " " + radius + "L0" + " " + (height - radius) + "Q0" + " " + height + " " + radius + " " + height + "L" + (width - radius) + " " + height + "Q" + width + " " + height + " " + width + " " + (height - radius) + "L" + width + " " + radius + "Q" + width + " " + "0" + " " + (width - radius) + " " + "0L" + radius + " " + "0Q0" + " " + "0" + " " + "0" + " " + radius;
    var bgSymbol = new SimpleMarkerSymbol();
    bgSymbol.setPath(path);
    bgSymbol.setColor(new Color([17, 91, 122, 0.7]));
    bgSymbol.setOutline(bglineSymbol);

    var size = Math.max(height, width);
    bgSymbol.setSize(size);
    bgSymbol.xoffset = 60;
    bgSymbol.yoffset = 0;
    var bgGraphic = new Graphic(point, bgSymbol);
    MapControl.graphicLayers['gralyr1'].add(bgGraphic);

    var font = new Font(fontsize + "px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_LIGHTER);
    var textSymbol = new TextSymbol(infoTem, font.setWeight(Font.WEIGHT_BOLD), new Color([122, 122, 122, 1]));
    textSymbol.setOffset(60, -5);
    textSymbol.setColor(new Color([255, 255, 255, 0.7]));
    var tempGra = new Graphic(point, textSymbol, null, null);
    MapControl.graphicLayers['gralyr1'].add(tempGra);
  });
};

//获取包含汉字字符串长度
MapControl.chkstrlen = function (str) {
  var strlen = 0;
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) //如果是汉字，则字符串长度加2
      strlen += 2;
    else
      strlen++;
  }
  return strlen;
}

//-----------------------------轨迹回放-----------------------------

MapControl.lineSymbol = function () {
  return new esri.symbol.SimpleLineSymbol(
    esri.symbol.SimpleLineSymbol.STYLE_SOLID,
    new dojo.Color("red"),
    5
  );
}
MapControl.pointSymbol = function () {
  return new esri.symbol.SimpleMarkerSymbol(
    esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
    5,
    new esri.symbol.SimpleLineSymbol(
      esri.symbol.SimpleLineSymbol.STYLE_SOLID,
      new dojo.Color([255, 0, 0]),
      1
    ),
    new dojo.Color([255, 0, 0, 1])
  );
}

//------------------------------------------多条轨迹播放-----------------------------------------------
MapControl.carSymbol = {}; //小车图标
MapControl.points = []; //一条轨迹
MapControl.pointsData = []; //多条轨迹
MapControl.jieduan = 0; //默认开始第一条轨迹

var timer; //定时器
var isPause = false; // true：轨迹继续  true：轨迹暂停 

//显示背景阴影轨迹
MapControl.showLine2 = function () {
  var paths = [],
    poinsts = [];
  for (var j = 0; j < MapControl.points.length; j++) {
    var point = [];
    point.push(MapControl.points[j].geometry.x);
    point.push(MapControl.points[j].geometry.y);
    paths.push(point);

    let attr = MapControl.points[j].attributes;
    if (attr != undefined && attr["photo"] != undefined && attr["photo"] != '') poinsts.push(MapControl.points[j])
  }
  var line = new esri.geometry.Polyline({
    "paths": [paths]
  });
  line.spatialReference.wkid = 4326;
  var bglineSymbol = new esri.symbol.SimpleLineSymbol("solid", new dojo.Color([17, 91, 122, 0.4]), 9);

  var lineGriphic = new esri.Graphic(line, bglineSymbol);
  MapControl.graphicLayers['gralyr1'].add(lineGriphic);

  //签到位置点
  for (let i = 0; i < poinsts.length; i++) {
    var obj = {
      geometry: poinsts[i].geometry,
      symbol: {
        type: 'PictureMarkerSymbol', //SimpleMarkerSymbol 或者 PictureMarkerSymbol
        image: '签到.png', //图片名称，带文件后缀(类型为PictureMarkerSymbol)
        height: 28, //图片高度(类型为PictureMarkerSymbol)
        width: 28 //图片宽度(类型为PictureMarkerSymbol)
      },
      isClear: false, //是否清除当前地图元素
      attributes: poinsts[i], //元素属性(可选)
      layer: 'gralyr4'
    }
    MapControl.addGraphic(obj, row)
    // MapControl.showGeometry(poinsts[i].geometry, undefined, "gralyr4", "#00f500", true, 10, poinsts[i], 0, undefined);
  }
}

//轨迹播放时点击暂停，存储的一些数据
let rIndex = 0, //轨迹所在的当前的第几个点位置
  tmpPoints1 = [], //当前播放的轨迹数组
  jindex1 = 0, //播放第几条轨迹数组
  numdif1 = 0; //轨迹点移动速度

// 轨迹清除
MapControl.Stop2 = function () {
  let map = MapControl.map[MapControl.mapId];
  MapControl.Pause(true);

  MapControl.jieduan = 0;
  MapControl.points = []
  MapControl.pointsData = []
  rIndex = 0, tmpPoints1 = [], jindex1 = 0, numdif1 = 0;

  if (timer != null) {
    clearInterval(timer);
    timer = null;
  }

  setTimeout(function () {
    if (map != undefined) {
      if (map.getLayer("lineLayer") != undefined) {
        map.getLayer("lineLayer").clear();
      }
      if (map.getLayer("carLayer") != undefined) {
        map.getLayer("carLayer").clear();
      }
    }
  }, 1500)
}
MapControl.Pause2 = function (value) {
  isPause = value;
}
//轨迹开始
MapControl.Start2 = function () {
  console.log(MapControl.points)
  MapControl.graphicLayers['gralyr5'].clear(); //清除轨迹tip框
  MapControl.Pause(false);
  let map = MapControl.map[MapControl.mapId];

  if (map.getLayer("lineLayer") != undefined) {
    map.getLayer("lineLayer").clear();
  }
  if (map.getLayer("carLayer") != undefined) {
    map.getLayer("carLayer").clear();
  }

  rIndex = 0, tmpPoints1 = [], jindex1 = 0, numdif1 = 0;
  if (timer != null) {
    clearInterval(timer);
    timer = null;
  }
  MapControl.timerfun2(rIndex);
}
MapControl.timerfun2 = function (rIndex) {
  if (MapControl.points == undefined) return;
  if (rIndex >= MapControl.points.length - 1) {
    clearInterval(timer);
    //上一段轨迹播放完后，播放下一段轨迹
    if (MapControl.jieduan < MapControl.pointsData.length - 1) {
      MapControl.jieduan += 1;
      MapControl.points = MapControl.pointsData[MapControl.jieduan];
      MapControl.Start2();
    }

    return
  } else {
    // if (isPause) {
    //   return timer = setInterval(function () {
    //     if (!isPause) {
    //       clearInterval(timer)
    //       MapControl.timerfun2(rIndex);
    //     }
    //   }, 1000);
    // }

    console.log(rIndex + "," + (1 + rIndex));
    var gra1 = MapControl.points[rIndex];
    var gra2 = MapControl.points[1 + rIndex];
    var angle = Math.ceil(MapControl.Angle(gra1.geometry.x, gra1.geometry.y, gra2.geometry.x, gra2.geometry.y))

    MapControl.carSymbol.setAngle(angle); //设置小车角度

    let numdif = 1,
      timedif = 0;

    //计算两点之间的时间差（秒）
    if (gra1.attributes != undefined && gra2.attributes != undefined) {
      let sTime = gra1.attributes["timestr"].split(':')
      let eTime = gra2.attributes["timestr"].split(':')
      timedif = (Number(eTime[0] * 60) + Number(eTime[1])) - (Number(sTime[0] * 60) + Number(sTime[1])) //两点之间的总秒数
      // numdif = timedif / (tempPoints.length - 2);  //总秒数÷总点数=两点移动的时间差
    }

    let tempPoints = [];
    if (timedif != 0)
      tempPoints = MapControl.interpolation2(gra1, gra2, timedif);
    else
      tempPoints = MapControl.interpolation2(gra1, gra2, 1);

    console.log("点数：" + timedif) //两点之间要移动的总点数
    console.log("速度：" + numdif) //两点之间的移动速度
    MapControl.play2(tempPoints, 0, numdif);
  }
}
MapControl.play2 = function (tmpPoints, jindex, numdif) {
  let map = MapControl.map[MapControl.mapId];
  if (isPause) {
    jindex1 = jindex;
    tmpPoints1 = tmpPoints;
    numdif1 = numdif;

    //暂停之后不断的调定时查询isPause是否继续播放轨迹
    return timer = setInterval(function () {
      if (!isPause) {
        clearInterval(timer)
        MapControl.play2(tmpPoints1, jindex1, numdif1);
      }
    }, 1000);
  }
  if (jindex < tmpPoints.length - 1) {

    var line = new esri.geometry.Polyline({
      "paths": [
        [
          [tmpPoints[jindex].geometry.x, tmpPoints[jindex].geometry.y],
          [tmpPoints[jindex + 1].geometry.x, tmpPoints[jindex + 1].geometry.y]
        ]
      ]
    });
    line.spatialReference.wkid = 4326;
    var lineGriphic = new esri.Graphic(line, MapControl.lineSymbol);
    map.getLayer("lineLayer").add(lineGriphic);

    map.getLayer("carLayer").clear();
    var carGriphic = new esri.Graphic(tmpPoints[jindex].geometry, MapControl.carSymbol);
    map.getLayer("carLayer").add(carGriphic);

    if (tmpPoints[jindex + 1].attributes != undefined)
      MapControl.addGPSTextSymbol(tmpPoints[jindex + 1].attributes["timestr"], tmpPoints[jindex + 1].geometry);

    map.centerAt(tmpPoints[jindex + 1].geometry);

    setTimeout(function () {
      MapControl.play2(tmpPoints, jindex + 1, numdif);
    }, numdif * 1000); //小车numdif秒换个位置闪现一次
  } else {
    return MapControl.timerfun2(++rIndex); //一段轨迹播放完后，播放下一段轨迹
  }
}
MapControl.interpolation2 = function (graA, graB, speed) {
  let map = MapControl.map[MapControl.mapId];
  var tmp = [],
    sTime = null;

  if (speed == undefined) {
    speed = 1;
  }
  if (graA.attributes != undefined)
    sTime = graA.attributes["timestr"].split(':')

  var count = speed;
  var disX = (graB.geometry.x - graA.geometry.x) / count;
  var disY = (graB.geometry.y - graA.geometry.y) / count;
  if (disX != 0 || disY != 0) {
    var i = 0;
    while (i < count) {
      var x = parseFloat(graA.geometry.x) + parseFloat(i * disX);
      var y = parseFloat(graA.geometry.y) + parseFloat(i * disY);
      var gra = new esri.Graphic(new esri.geometry.Point(x, y, map.spatialReference), null);
      if (sTime != null) {
        let timedif = (Number(sTime[0] * 60) + Number(sTime[1])) + i;
        if (timedif > 60) {
          let m = parseInt(timedif / 60);
          let s = Math.ceil(timedif % 60);
          var ms = (m < 10 ? '0' + m : m) + ":" + (s < 10 ? '0' + s : s)
          gra.setAttributes({
            timestr: ms
          });
        } else {
          var ms = "00:" + (timedif < 10 ? '0' + timedif : timedif)
          gra.setAttributes({
            timestr: ms
          });
        }
      }
      tmp.push(gra);
      i++;
    }
  }
  tmp.push(graB); //防止插值出来的最后一个点到不了B点
  return tmp;
}

//------------------------------------------一条轨迹播放-----------------------------------------------
var speed1 = 1;

MapControl.showLine = function () {
  var paths = [];
  for (var j = 0; j < MapControl.points.length; j++) {
    var point = [];
    point.push(MapControl.points[j].geometry.x);
    point.push(MapControl.points[j].geometry.y);
    paths.push(point);
  }
  var line = new esri.geometry.Polyline({
    "paths": [paths]
  });
  var bglineSymbol = new esri.symbol.SimpleLineSymbol("solid", new dojo.Color([17, 91, 122, 0.4]), 9);

  var lineGriphic = new esri.Graphic(line, bglineSymbol);
  MapControl.graphicLayers['gralyr4'].add(lineGriphic);
}
MapControl.Pause = function (value) {
  isPause = value;
}
MapControl.Stop = function () {
  let map = MapControl.map[MapControl.mapId];
  if (timer) {
    window.clearInterval(timer);
    setTimeout(function () {
      if (map.getLayer("lineLayer") != undefined) {
        map.getLayer("lineLayer").clear();
      }
      if (map.getLayer("carLayer") != undefined) {
        map.getLayer("carLayer").clear();
      }
    }, 3000)
  }
}
MapControl.Start = function () {
  isPause = false;
  let map = MapControl.map[MapControl.mapId];
  replayIndex = 0;
  if (timer != null) {
    clearInterval(timer);
    if (map.getLayer("lineLayer") != undefined) {
      map.getLayer("lineLayer").clear();
    }
    if (map.getLayer("carLayer") != undefined) {
      map.getLayer("carLayer").clear();
    }
  }
  MapControl.timerfun(map);
  timer = setInterval(function () {
    MapControl.timerfun(map);
  }, speed * 3000);
}
MapControl.timerfun = function () {
  if (replayIndex == MapControl.points.length - 1) {
    clearInterval(timer);
  } else {
    if (isPause)
      return;

    var gra1 = MapControl.points[replayIndex];
    var gra2 = MapControl.points[++replayIndex];
    var angle = Math.ceil(MapControl.Angle(gra1.geometry.x, gra1.geometry.y, gra2.geometry.x, gra2.geometry.y))
    MapControl.carSymbol.setAngle(angle); //设置小车角度

    var tempPoints = MapControl.interpolation(gra1, gra2, speed1); //document.getElementById("txtSpeed").value);

    MapControl.play(tempPoints);
  }
}
MapControl.play = function (tmpPoints) {
  let map = MapControl.map[MapControl.mapId];
  var ref = setTimeout(function () {
    if (this.j < tmpPoints.length - 1) {
      var line = new esri.geometry.Polyline({
        "paths": [
          [
            [tmpPoints[this.j].geometry.x, tmpPoints[this.j].geometry.y],
            [tmpPoints[this.j + 1].geometry.x, tmpPoints[this.j + 1].geometry.y]
          ]
        ]
      });
      var lineGriphic = new esri.Graphic(line, MapControl.lineSymbol);
      map.getLayer("lineLayer").add(lineGriphic);
      map.getLayer("carLayer").clear();
      carGriphic = new esri.Graphic(tmpPoints[this.j + 1].geometry, MapControl.carSymbol);
      map.getLayer("carLayer").add(carGriphic);

      if (tmpPoints[this.j + 1].attributes != undefined)
        MapControl.addGPSTextSymbol(tmpPoints[this.j + 1].attributes["timestr"], tmpPoints[this.j + 1].geometry);

      map.centerAt(tmpPoints[this.j + 1].geometry);
      this.j++;
      MapControl.play(tmpPoints);
    } else {
      this.j = 0;
    }
  }, 100);
}
MapControl.interpolation = function (graA, graB, speed1) {
  let map = MapControl.map[MapControl.mapId];
  var tmp = [];

  if (speed1 == undefined) {
    speed1 = 1;
  }
  speed1 = speed1 - 0.5; //不能大于播放速度
  var count = Math.abs(speed1) * 25;
  var disX = (graB.geometry.x - graA.geometry.x) / count;
  var disY = (graB.geometry.y - graA.geometry.y) / count;
  if (disX != 0 || disY != 0) {
    var i = 0;
    while (i <= count) {
      var x = parseFloat(graA.geometry.x) + parseFloat(i * disX);
      var y = parseFloat(graA.geometry.y) + parseFloat(i * disY);
      var gra = new esri.Graphic(new esri.geometry.Point(x, y, map.spatialReference), null);
      tmp.push(gra);

      i++;
    }
  }
  tmp.push(graB); //防止插值出来的最后一个点到不了B点
  return tmp;
}


MapControl.addGPSTextSymbol = function (infoTem, point) {
  esriLoader.loadModules(["esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/Font",
    "esri/symbols/TextSymbol",
    "esri/geometry/Point",
    "esri/graphic",
    "dojo/_base/Color",
    "dojo/dom",
    "dojo/on",
    "dojo/domReady!"
  ]).then(([SimpleLineSymbol, SimpleMarkerSymbol, SimpleFillSymbol, Font, TextSymbol, Point, Graphic, Color, dom, on]) => {
    MapControl.graphicLayers['gralyr5'].clear();
    var fontsize = 14;
    var radius = 6;
    infoTem = infoTem + "";

    var bglineSymbol = new esri.symbol.SimpleLineSymbol("solid", new dojo.Color([17, 91, 122, 1]), 1);
    var width = (MapControl.chkstrlen(infoTem)) * 0.6 * (fontsize + 1);
    var height = fontsize * 1.6;

    //设置背景框的大小
    var path = "M0" + " " + radius + "L0" + " " + (height - radius) + "Q0" + " " + height + " " + radius + " " + height + "L" + (width - radius) + " " + height + "Q" + width + " " + height + " " + width + " " + (height - radius) + "L" + width + " " + radius + "Q" + width + " " + "0" + " " + (width - radius) + " " + "0L" + radius + " " + "0Q0" + " " + "0" + " " + "0" + " " + radius;
    var bgSymbol = new esri.symbol.SimpleMarkerSymbol();
    bgSymbol.setPath(path);
    bgSymbol.setColor(new dojo.Color([17, 91, 122, 0.7]));
    bgSymbol.setOutline(bglineSymbol);
    var size = Math.max(height, width);
    bgSymbol.setSize(size);
    bgSymbol.xoffset = 50;
    bgSymbol.yoffset = 0;

    var bgGraphic = new Graphic(point, bgSymbol);
    MapControl.graphicLayers['gralyr5'].add(bgGraphic);

    var font = new Font(fontsize + "px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_LIGHTER);
    var textSymbol = new esri.symbol.TextSymbol(infoTem, font.setWeight(esri.symbol.Font.WEIGHT_BOLD), new dojo.Color([122, 122, 122, 1]));
    textSymbol.setOffset(50, -5);
    textSymbol.setColor(new dojo.Color([255, 255, 255, 0.7]));
    var tempGra = new esri.Graphic(point, textSymbol, null, null);
    MapControl.graphicLayers['gralyr5'].add(tempGra);
  });
};
MapControl.Angle = function (startx, starty, endx, endy) {
  var tan = 0
  if (endx == startx) {
    tan = Math.atan(0) * 180 / Math.PI
  } else {
    tan = Math.atan(Math.abs((endy - starty) / (endx - startx))) * 180 / Math.PI
  }

  if (endx >= startx && endy >= starty) { //第一象限
    return -tan;
  } else if (endx > startx && endy < starty) { //第四象限
    return tan;
  } else if (endx < startx && endy > starty) { //第二象限
    return tan - 180;
  } else {
    return 180 - tan; //第三象限
  }
}

MapControl.hjjInfo = function (item) {
  MapControl.popupinfo.hide(); //隐藏地图弹窗

  var titleName = "";
  if (item.ismixed == 6) {
    titleName = "雨水混接至污水";
  } else if (item.ismixed == 7) {
    titleName = "污水混接至雨水";
  } else if (item.ismixed == 8) {
    titleName = "雨污互相混接";
  }

  let map = MapControl.map[MapControl.mapId];
  var geo = new esri.geometry.Point(item.xcoor, item.ycoor, MapControl.map.spatialReference);
  let info =
    `<div >
			<ul>
				<li>
					<div style="display: inline-block;width: 65px;">材质:</div>
					<div style="display: inline-block;">
						 {{ item.jxjcz}}
					</div>
				</li>
				<li>
					<div style="display: inline-block;width: 65px;">埋深:</div>
					<div style="display: inline-block;">
						 {{ item.depth}}
					</div>
				</li>
				<li>
					<div style="display: inline-block;width: 65px;">地面高程:</div>
					<div style="display: inline-block;">
						 {{ item.surface_elev}} (m)
					</div>
				</li>
				<li>
					<div style="display: inline-block;width: 65px;">权属单位:</div>
					<div style="display: inline-block;">
						 {{ item.qsdw}}
					</div>
				</li>
			</ul>
		</div>`;
  let infoContent = Vue.extend({
    template: info,
    data() {
      return {
        item: {

        },
      }
    },
    methods: {
      getdata() {
        this.item = item;
      },
    },
    mounted() {
      this.getdata();
    }
  });
  let component = new infoContent().$mount();

  var apHtml = "<span style='font-size: 14px;font-weight: bold;'>" + titleName + "</span>";
  setTimeout(function () {
    MapControl.popupinfo.setTitle(apHtml);
    // MapControl.popupinfo.resize('300', '250');
    MapControl.popupinfo.setContent(component.$el); //vm.$el 获取Vue实例关联的DOM元素
    MapControl.popupinfo.show(geo);
    map.reposition();
  }, 500);
}

// 地图弹出框--只有一个
MapControl.GetTxtSymbolsByPopupinfo = function (title, list, geo) {
  let map = MapControl.map[MapControl.mapId];
  var htmlmain = ''
  for (let i in list) {
    htmlmain += `<tr style="color: #FFF;">
						<td style="width: 40%;">${i}</td>
						<td style="width: 60%;">${list[i]}</td>
					  </tr>`
  }
  var htmlS = '';
  htmlS =
    `<div style="width: 100%;">
				<table border="0" cellspacing="0" style="table-layout: fixed;text-align: left;width: 100%">
				${htmlmain}
				</table>
			</div>`;


  var apHtml = "<span style='font-size: 14px;font-weight: bold;'>" + title + "</span>";
  MapControl.popupinfo.setTitle(apHtml);
  MapControl.popupinfo.setContent(htmlS)
  MapControl.popupinfo.show(geo);
  map.reposition();
  document.getElementsByClassName('contentPane')[0].style.backgroundColor = '#006699';
  document.getElementsByClassName('actionsPane')[0].style.backgroundColor = '#006699';
  document.getElementsByClassName('outerPointer')[0].style.backgroundColor = '#006699';
  document.getElementsByClassName('pointer')[0].style.backgroundColor = '#006699';
  document.getElementsByClassName('titlePane')[0].style.backgroundColor = '#234a65';
  document.getElementsByClassName('esriPopupWrapper')[0].style.boxShadow = 'none';
};
// 隐藏地图弹窗
MapControl.hidePopupinfo = function () {
  if (MapControl.popupinfo != undefined) {
    MapControl.popupinfo.hide();
  }
};


//------------------------------------------------------map分屏-----------------------------------------------------------

//分屏联动
MapControl.ExtentChange = function (extent, items) {
  for (let key in MapControl.map) {
    if (mapconfig.MapControl[key]) continue;
    let map = MapControl.map[key];
    let mapExtent = new esri.geometry.Extent(
      extent.xmin,
      extent.ymin,
      extent.xmax,
      extent.ymax,
      map.spatialReference
    );
    esriLoader.loadModules(
      ['esri/map', 'esri/geometry/Extent', 'esri/toolbars/navigation']).then((
      [Map, Extent]) => {
      map.setExtent(mapExtent);
    }).catch(err => {
      console.error(err);
    })
  }
};

//分屏销毁map对象
MapControl.MapDestroy = function () {
  for (let key in MapControl.map) {
    let map = MapControl.map[key];
    map.destroy();
  }
};

//分屏加载图层
MapControl.MapAddSplit = function (mapid, uservisibleLayers) {
  let map = MapControl.map[mapid];
  if (uservisibleLayers) {
    for (var sitem in uservisibleLayers) {
      if (uservisibleLayers[sitem].serviceurl) {
        var sublay = map.getLayer(uservisibleLayers[sitem].serviceurl);
        if (!sublay) {
          if (uservisibleLayers[sitem].servicetype === 'dynamic') {
            sublay = new esri.layers.ArcGISDynamicMapServiceLayer(
              uservisibleLayers[sitem].serviceurl
            );
          } else {
            sublay = new esri.layers.ArcGISTiledMapServiceLayer(
              uservisibleLayers[sitem].serviceurl
            );
          }
          sublay.id = uservisibleLayers[sitem].serviceurl;
          sublay.name = uservisibleLayers[sitem].serviceurl;
          sublay.opacity = uservisibleLayers[sitem].slider / 100;
          if (uservisibleLayers[sitem].haschild == true) {
            sublay.displayLevels = [Number(uservisibleLayers[sitem].layerindex)]
            sublay.setVisibleLayers(sublay.displayLevels);
          }
          map.addLayer(sublay);
        }
        sublay.setVisibility(true);
      }
    }
  }
};

/*分屏地图与影像图切换 */
MapControl.SetLayerbaseloadsplit = function (uservisibleLayers) {
  esriLoader.loadModules(
    ['esri/map', 'esri/layers/ArcGISTiledMapServiceLayer']).then((
    [Map, ArcGISTiledMapServiceLayer]) => {
    for (let name in MapControl.map) {
      if (name == "mapbox") continue;
      let map = MapControl.map[name];
      if (!uservisibleLayers) return;
      uservisibleLayers.forEach(element => {
        var sublay = map.getLayer(element.url);
        if (sublay && !element.isshow) {
          map.removeLayer(sublay); //移除图层
        } else if (element.isshow) {
          sublay = new esri.layers.ArcGISTiledMapServiceLayer(element.url);
          sublay.id = element.url;
          sublay.name = element.url;
          map.addLayer(sublay, 0); //加载图层
        }
      });
    }

  }).catch(err => {
    console.error(err);
  })
};