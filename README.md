# AJ-JS-Map

基于js，jquery的地图插件，支持BMap，leaflet。

## 起步

1、获取百度地图服务密钥（ak）：

  参见：http://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/getkey


2、在html页面<head>中引用百度地图API文件：

```html
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&ak=您的密钥"></script>
```

3、将dist文件夹拷入项目中

4、在页面中引用插件js、css文件

```html
<link rel="stylesheet" type="text/css" href="dist/BMap.min.css">
<script type="text/javascript" src="dist/jquery.min.js"></script>
<script type="text/javascript" src="dist/BMap.min.js"></script>
<script type="text/javascript" src="dist/IcJsMap.min.js"></script>
```

5、在页面中创建生成地图的容器：

```html
<div id='icJsMap' class='map-eg1'></div>
```

6、调用插件：

```JavaScript
var testMap = new IcJsMap()
testMap.init(id, option)
```
- id：{String}，生成地图的容器的id，不可为空
- option：{Object}，地图可配置选项，详情参见《使用手册.docx》



