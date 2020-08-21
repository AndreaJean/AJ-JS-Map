# AJ-JS-Map

基于js，jquery的地图插件，支持BMap，leaflet。

## 起步

**1、获取百度地图服务密钥（ak）**

  参见：http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/getkey

**2、在html页面<head>中引用百度地图API文件**

```html
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=您的密钥"></script>
```

**3、将dist文件夹拷入项目中**

**4、在页面中引用插件js、css文件**

```html
<link rel="stylesheet" type="text/css" href="dist/BMap.min.css">
<script type="text/javascript" src="dist/jquery.min.js"></script>
<script type="text/javascript" src="dist/BMap.min.js"></script>
<script type="text/javascript" src="dist/IcJsMap.min.js"></script>
```

**5、在页面中创建生成地图的容器**

```html
<div id='icJsMap' class='map-eg1'></div>
```

**6、调用插件**

```JavaScript
var testMap = new IcJsMap()
testMap.init(id, option)
```
- id：{String}，生成地图的容器的id，不可为空
- option：{Object}，地图可配置选项，***详情参见《使用手册.docx》***

## 方法

地图组件提供下列方法，以便用户在组件外调用，实现与地图的互动。

使用方法（如地图实例为testMap)：testMap.方法名(参数)。

***带 * 的参数不可为空。***

***详情参见《使用手册.docx》***

| 方法名 | 说明 | 参数 |
| --- | --- | --- |
|$_getAllMapStyles|——|获取所有二维地图样式信息，返回样式对象数组|
|$_setMapStyle|* style：String|切换二维地图样式，style可选项见mapStyle|
|$_onChangeMapType|* viewMode：String|切换地图显示类型|
|viewMode: 地图显示类型，可选项见viewMode|
|$_onPanTo|* coordinate：Array|移动地图中心点|
|coordinate：新中心点坐标，如[116.404, 39.915]|
|$_onZoomTo|* level：Number|改变地图显示比例|
|$_setTrafficMode|* flag：Boolean|开启关闭路况|
|flag：true（开启） | false（关闭）|
|$_setEditMode|* flag：Boolean|开启关闭编辑状态|
|开启编辑状态时，地图上的覆盖物可拖拽，来修改坐标或形状|
|flag：true（开启） | false（关闭）|
|$_setDistanceToolStatus|* flag：Boolean|开启关闭测距工具|
|flag：true（开启） | false（关闭）|
|$_setDrawMode|* flag：Boolean|开启关闭绘图状态开启绘图状态时，显示绘图控件，详见icDrawControl|
|flag：true（开启） | false（关闭）|
|$_setDrawMode|* drawType：String|设置绘图类型|
|drawType：可选项见drawType|
|$_setCoordinateMode|* flag：Boolean|开启关闭拾取坐标功能|
|功能开启时，左键单击地图可通过getCoordinate事件获取坐标信息|
|flag：true（开启） | false（关闭）|
|$_showOverlays|* data：Object|
|* flag：Boolean|显示/隐藏覆盖物|
|data：参见overlayArreyObj|
|flag：true（显示） | false（隐藏）|
|$_clearAllOverlays|——|清除搜索结果、地图上全部覆盖物，关闭路况图层、信息窗、右键菜单等|
|$_getOverlayByID|* id：String|通过ID获取覆盖物对象|
|id：覆盖物id|
|$_setOverlayStyle|* id：String|
|* style：markerStyle、labelStyle、circleStyle、polylineStyle、polygonStyle|设置覆盖物样式，注意样式类型与覆盖物类型一致|
|id：覆盖物id|
|style：样式参数|
|$_centerAndOpenInfoWindow|* obj：overlayObj|
|infoWinStyle：infoWinOption|打开覆盖物信息窗并居中|
|obj：覆盖物信息对象|
|infoWinStyle：信息窗参数|
|$_getDrivingPath|* start：Array|
|* end：Array|
|policy：String|
|specificStyle：Object|获取两点间的行车路线|
|start：起点坐标数组，如[116.404, 39.915]|
|end：终点坐标数组|
|policy：驾车策略，可选项为'默认'，'all'，'优先高速'，'避开高速'，'避开拥堵'|
|specificStyle：参数项同icDriving|
|$_getDrivingPathAndRun|* start：Array|
|* end：Array|
|* speed：Number|
|policy：String|
|specificStyle：Object|获取两点间的行车路线，并沿路线运动|
|start：起点坐标数组，如[116.404, 39.915]|
|end：终点坐标数组|
|speed：移动图标刷新位置的时间间隔，值越大图标移动越慢|
|policy：驾车策略，可选项为'默认'，'all'，'优先高速'，'避开高速'，'避开拥堵'|
|specificStyle：参数项同icDriving|
|$_getDrivingPathAndLuShu|* start：Array|
|* end：Array|
|policy：String|
|specificStyle：Object|获取两点间的行车路线，并创建路书对象|
|start：起点坐标数组，如[116.404, 39.915]|
|end：终点坐标数组|
|policy：驾车策略，可选项为'默认'，'all'，'优先高速'，'避开高速'，'避开拥堵'|
|specificStyle：参数项同icLuShu|
|$_setLuShuAction|* action：String|控制路书对象行为|
|action：行为，可选项为播放'start'，暂停'pause'，停止'stop'，隐藏信息窗口'showInfoWindow'，展示信息窗口'hideInfoWindow'|
|$_clearDrivingPath|——|清除地图上的所有行车路线
