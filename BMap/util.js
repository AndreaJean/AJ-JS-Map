var JM_B_util = {
  //
  // =========================== new ==============================
  //
  // 创建地理坐标点
  newPoint (arr) {
    return new BMap.Point(...arr)
  },
  creatPoint (obj) {
    var point = null
    if (obj.point) {
      point = obj.point
    } else {
      point = this.newPoint([obj.lng, obj.lat])
    }
    return point
  },
  // 创建覆盖物所使用的图标
  newIcon (iconOption) {
    var url = iconOption.url
    var size = new BMap.Size(...iconOption.position)
    var anchor = null
    if (JM_util.checkNull(iconOption.anchor)) {
      anchor = new BMap.Size(...iconOption.anchor)
    } else {
      anchor = new BMap.Size(0.5 * iconOption.position[0], 0.5 * iconOption.position[1])
    }
    var imageOffset = new BMap.Size(...iconOption.imageOffset)
    var imageSize = new BMap.Size(...iconOption.imageSize)
    var option = {
      anchor: anchor,
      imageOffset: imageOffset,
      imageSize: imageSize
    }
    var icon = new BMap.Icon(url, size, option)
    return icon
  },
  // 创建点(点位信息对象，图标样式对象)
  newMarker (markerObj) {
    var point = this.creatPoint(markerObj)
    var style = markerObj.markerStyle
    var icon = null
    if (!style.isSymbol) {
      icon = this.newIcon(style)
    } else {
      style.symbolStyle.anchor = new BMap.Size(...style.symbolStyle.anchor)
      if (JM_util.checkNull(style.symbolPts)) {
        icon = new BMap.Symbol(style.symbolPts, style.symbolStyle)
      } else {
        var shape = this.getSymbolShapeType(style.SymbolShapeType)
        icon = new BMap.Symbol(shape, style.symbolStyle)
      }
    }
    var option = { title: markerObj.title || '', icon: icon }
    var marker = new BMap.Marker(point, option)
    this.addAttributes(marker, markerObj)

    return marker
  },
  // 创建文本标注
  newLabel (labelObj) {
    var point = this.newPoint([labelObj.lng, labelObj.lat])
    var style = labelObj.labelStyle
    style.transform += ' rotate(' + style.angle + 'deg)'
    var option = {
      position: point,
      offset: new BMap.Size(...style.offset),
      enableMassClear: style.enableMassClear
    }

    var label = new BMap.Label(labelObj.text, option)
    label.setStyle(style)
    this.addAttributes(label, labelObj)

    return label
  },
  // 创建圆
  newCircle (circleObj) {
    var point = this.newPoint(circleObj.center)
    var circle = new BMap.Circle(point, circleObj.radius, circleObj.circleStyle)
    this.addAttributes(circle, circleObj)
    return circle
  },
  // 创建折线
  newpPolyline (polylineObj) {
    var points = []
    if (JM_util.isArray(polylineObj.points[0])) {
      polylineObj.points.forEach(obj => {
        points.push(this.newPoint(obj))
      })
    } else {
      points = polylineObj.points
    }
    var polyline = new BMap.Polyline(points, polylineObj.polylineStyle)
    this.addAttributes(polyline, polylineObj)
    return polyline
  },
  // 创建弧线
  newCurveLine (CurveLineObj) {
    var points = []
    if (JM_util.isArray(CurveLineObj.points[0])) {
      CurveLineObj.points.forEach(obj => {
        points.push(this.newPoint(obj))
      })
    } else {
      points = CurveLineObj.points
    }
    var CurveLine = new BMapLib.CurveLine(points, CurveLineObj.CurveLineStyle)
    this.addAttributes(CurveLine, CurveLineObj)
    return CurveLine
  },
  // 创建多边形
  newPolygon (polygonObj) {
    var points = []
    polygonObj.points.forEach(obj => {
      points.push(this.newPoint(obj))
    })
    var polygon = new BMap.Polygon(points, polygonObj.polygonStyle)
    this.addAttributes(polygon, polygonObj)
    return polygon
  },
  // 创建驾车对象
  newDrivingRoute (map, opts) {
    var driving = new BMap.DrivingRoute(map, opts)
    return driving
  },
  // 创建路书对象
  newLuShu (map, pathPoints, option) {
    var opts = option.option
    opts.icon = this.newIcon(option.icon)
    var module = new BMapLib.LuShu(map, pathPoints, opts)
    return module
  },
  //
  // =========================== set ==============================
  //
  // 补充覆盖物id、info等属性
  addAttributes (overlay, overlayObj) {
    overlay.id = overlayObj.id
    overlay.info = overlayObj
    overlay.overlayType = overlayObj.overlayType
    if (overlay.overlayType !== 'label') {
      overlay.edit = true
    }
    return overlay
  },
  // 设置多边形/圆样式
  setPolygonStyle (polygon, style) {
    polygon.setStrokeWeight(style.strokeWeight)
    polygon.setStrokeColor(style.strokeColor)
    polygon.setStrokeOpacity(style.strokeOpacity)
    polygon.setStrokeStyle(style.strokeStyle)
    polygon.setFillColor(style.fillColor)
    polygon.setFillOpacity(style.fillOpacity)
  },
  // 设置折线样式
  setPolylineStyle (polygon, style) {
    polygon.setStrokeWeight(style.strokeWeight)
    polygon.setStrokeColor(style.strokeColor)
    polygon.setStrokeOpacity(style.strokeOpacity)
    polygon.setStrokeStyle(style.strokeStyle)
  },
  //
  // =========================== show ==============================
  //
  // 显示信息窗口（自定义）
  showInfoWin (infoWin, obj, infoWinStyle) {
    var point = this.creatPoint(obj)
    var option = {
      point: point,
      offset:infoWinStyle.offset,
      type: infoWinStyle.type,
      width: infoWinStyle.width,
      title: obj.title||infoWinStyle.title, // 信息窗口标题
      img: obj.img,
      imgSize: infoWinStyle.imgSize,
      content: obj.content,
      button: infoWinStyle.button,
      info: obj,
      contentHtml: obj.contentHtml,
      customClass: infoWinStyle.customClass
    }
    infoWin.show(option)
  },
  // 显示右键菜单
  showContextMenu (menu, info) {
    var point = this.creatPoint(info)
    var option = {
      point: point,
      menuItem: info.menuItem,
      info: info,
      customClass: info.customClass
    }
    menu.show(option)
  },
  //
  // =========================== clear ==============================
  //
  // 清除指定覆盖物
  clearOverlays (map, idList) {
    var overlays = map.getOverlays()
    overlays.forEach(e => {
      if (idList.includes(e.id)) {
        map.removeOverlay(e)
      }
    })
  },
  // 清除指定覆盖物
  clearClusterOverlays (clusterLayer, idList) {
    var all = clusterLayer.getMarkers()
    var markers = []
    all.forEach(marker => {
      if (idList.includes(marker.id)) {
        markers.push(marker)
      }
    })
    clusterLayer.removeMarkers(markers)
  },
  //
  // =========================== get ==============================
  //
  // 获取可编辑的覆盖物
  getEditOverlays (map) {
    var overlays = map.getOverlays()
    var editItems = []
    overlays.forEach(e => {
      if (e.edit) {
        editItems.push(e)
      }
    })
    return editItems
  },
  // 根据ID获取覆盖物
  getOverlayById (map, id) {
    var overlays = map.getOverlays()
    var target = null
    overlays.forEach(e => {
      if (e.id === id) {
        target = e
      }
    })
    return target
  },
  // 获取矢量图标类预设的图标样式
  getSymbolShapeType (type) {
    var SymbolShapeTypes = [
      { value: BMap_Symbol_SHAPE_CIRCLE, type: '圆形' },
      { value: BMap_Symbol_SHAPE_RECTANGLE, type: '矩形' },
      { value: BMap_Symbol_SHAPE_RHOMBUS, type: '菱形' },
      { value: BMap_Symbol_SHAPE_STAR, type: '五角星' },
      { value: BMap_Symbol_SHAPE_BACKWARD_CLOSED_ARROW, type: '方向向下的闭合箭头' },
      { value: BMap_Symbol_SHAPE_FORWARD_CLOSED_ARROW, type: '方向向上的闭合箭头' },
      { value: BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, type: '方向向下的非闭合箭头' },
      { value: BMap_Symbol_SHAPE_FORWARD_OPEN_ARROW, type: '方向向上的非闭合箭头' },
      { value: BMap_Symbol_SHAPE_POINT, type: '定位点图标' },
      { value: BMap_Symbol_SHAPE_PLANE, type: '飞机形状' },
      { value: BMap_Symbol_SHAPE_CAMERA, type: '照相机形状' },
      { value: BMap_Symbol_SHAPE_WARNING, type: '警告符号' },
      { value: BMap_Symbol_SHAPE_SMILE, type: '笑脸形状' },
      { value: BMap_Symbol_SHAPE_CLOCK, type: '钟表形状' }
    ]
    var SymbolShapeType = null
    SymbolShapeTypes.forEach(e => {
      if (e.type === type) {
        SymbolShapeType = e.value
      }
    })
    return SymbolShapeType
  },
  //
  // =========================== other ==============================
  //
  // 动态加载js
  loadJScript (src, func, type) {
    var script = document.createElement('script')
    script.type = type || 'text/javascript'
    script.src = src
    if (func) {
      script.onload = function () {
        func()
      }
    }
    document.head.appendChild(script)
  },
  // 打开信息窗口并居中
  centerAndOpenInfoWindow (map, infoWin, obj, infoWinStyle) {
    var me = this
    var point = this.creatPoint(obj)
    infoWin.hide()
    map.panTo(point)
    setTimeout(function () { me.showInfoWin(infoWin, obj, infoWinStyle) }, 300)
  }
}
