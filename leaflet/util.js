var JM_B_util = {
  //
  // =========================== new ==============================
  //
  // 创建地理坐标点
  newPoint (arr) {
    return L.latLng(arr[1], arr[0])
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
    var anchor = [0.5 * iconOption.imageSize[0], iconOption.imageSize[1]]
    var option = {
      iconUrl: iconOption.url,
      iconSize: iconOption.imageSize,
      iconAnchor: anchor
    }
    var icon = L.icon(option)
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
    var marker = L.marker(point, option)
    this.addAttributes(marker, markerObj)

    return marker
  },
  // 创建文本标注
  newLabel (labelObj) {
    var point = this.newPoint([labelObj.lng, labelObj.lat])
    var style = labelObj.labelStyle
    var className = labelObj.className ? labelObj.className : 'labelStyle'
    var anchor = [0.5 * parseInt(style.width), 0.5 * parseInt(style.height)]
    var option = {
      html: labelObj.text,
      className: className,
      iconSize: [parseInt(style.width), parseInt(style.height)],
      iconAnchor: anchor
    }
    var divIcon = L.divIcon(option)
    var label = L.marker(point, { icon: divIcon })
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
  // =========================== infoWin ==============================
  //
  // 显示信息窗口（自定义）
  showInfoWin (map, obj, infoWinStyle) {
    var contentOption = {
      width: infoWinStyle.width,
      title: obj.title, // 信息窗口标题
      img: obj.img,
      imgSize: infoWinStyle.imgSize,
      content: obj.content,
      button: infoWinStyle.button,
      info: obj,
      contentHtml: obj.contentHtml,
      customClass: infoWinStyle.customClass
    }
    var html = infoWinStyle.type !== 'custom' ? this.createNormalInfoWin(contentOption) : this.createCustomInfoWin(contentOption)
    var point = this.creatPoint(obj)
    var infoWinOpt = {
      maxWidth: infoWinStyle.width,
      minWidth: infoWinStyle.width,
      offset: [-infoWinStyle.offset[0], -infoWinStyle.offset[1]],
      className: infoWinStyle.customClass
    }
    var infoWin = L.popup(infoWinOpt).setLatLng(point).setContent(html)

    this.addAttributes(infoWin, obj)
    map.openPopup(infoWin)
    if (infoWinStyle.button.length) {
      infoWinStyle.button.forEach(e => {
        document.getElementById(e.id).onclick = function () {
          e.clickEvent(obj)
        }
      })
    }
    // console.log(map._layers)
  },
  // 常规（图片/一段文字/图片+一段文字）
  createNormalInfoWin (option) {
    var text = '<div class="ic-map-infoWin-title" style="width:auto;">' + option.title + '</div>' +
    '<div class="ic-map-infoWin-content">'
    if (JM_util.checkNull(option.img)) {
      text += '<span class="ic-map-infoWin-img" style="width:' + option.imgSize[0] + ';height:' + option.imgSize[1] + ';"><img src="' + option.img + '"/></span>'
    }
    if (JM_util.checkNull(option.content)) {
      text += '  <p class="ic-map-infoWin-p">' + option.content + '</p>'
    }
    if (option.button.length) {
      option.button.forEach(e => {
        text += '<button id="' + e.id + '">' + e.label + '</button>'
      })
    }
    text += '</div>'
    return text
  },
  // 自定义
  createCustomInfoWin (option) {
    var text = '<div class="ic-map-infoWin-title">' + option.title + '<i id="icMapInfoWinCancleBtn" class="icon iconfont icon-shanchu1"></i></div>' +
    '<span class="ic-map-infoWin-triangle"></span>' +
    '<div class="ic-map-infoWin-content">'
    if (JM_util.checkNull(option.contentHtml)) {
      text += option.contentHtml
    }
    if (option.button.length) {
      option.button.forEach(e => {
        text += '<button id="' + e.id + '">' + e.label + '</button>'
      })
    }
    text += '</div>'
    return text
  },
  //
  // =========================== ContextMenu ==============================
  //
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
    var overlays = map._layers
    if (!overlays) {
      return
    }
    for (var e in overlays) {
      var item = overlays[e]
      if (item.id && idList.includes(item.id)) {
        item.remove()
      }
    }
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
  centerAndOpenInfoWindow (map, obj, infoWinStyle) {
    var me = this
    var point = this.creatPoint(obj)
    // infoWin.closePopup()
    map.panTo(point)
    setTimeout(function () { me.showInfoWin(map, obj, infoWinStyle) }, 300)
  }
}
