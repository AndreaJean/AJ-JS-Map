
var JM_map = function () {
  var newObj = {
    isMapLoad: true, // 控制判断是否是第一次加载完成地图
    baseMap: {},
    infoWin: {},
    icContextMenu: {},
    mapStyle: 'normal',
    viewMode: '2D',
    // mapTypeNow: BMAP_NORMAL_MAP,
    option: {},
    status: {
      edit: false,
      draw: false,
      measure: false,
      coordinate: false,
      cluster: false
    },
    DrawingType: null,
    modules: {
      tilemap: {},
      boundary: {}, // 边界实例
      traffic: {}, // 路况实例
      marker: [],
      label: [],
      heatMap: {}, // 热力实例
      cluster: {}, // 点聚合实例
      drawing: {}, // 绘图工具实例
      distanceTool: {}, // 测距工具
      diving: [], // 驾车实例数组
      lushu: [] // 路书实例
    },
    //
    // =========================== init ==============================
    //
    // 初始化地图
    init (opt) {
      this.option = JM_util.deepCopy(opt)
      window.ezMap.CenterPoint = this.option.center
      window.ezMap.MapInitLevel = this.option.zoom
      window.ezMap.MapMaxLevel = this.option.maxZoom
      window.ezMap.MapMinLevel = this.option.minZoom

      this.baseMap = new EzMap(document.getElementById(this.option.id))
      this.baseMap.showMapControl()

      // 绑定事件
      this.bindEvents()
    },
    // 绑定事件
    bindEvents () {
      let me = this

      // 地图单击事件
      this.baseMap.addMapEventListener(Ez.Event.MAP_CLICK, function (evt) {
        var map = me.baseMap
        var pixel = evt.pixel
        var coord = evt.coordinate
        var overlay = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
          if (feature instanceof EzMarker) {
            return feature
          }
        })
        // console.log(overlay)
        if (overlay) {
	        me.modules.marker.forEach(obj => {
	          obj.closeInfoWindow()
	        })
          var overlayObj = overlay.info
          // vpEventTarget.fire({ type: 'change', id: me.option.domId, source: 'map', data: JSON.stringify(overlayObj) })
          me.centerAndOpenInfoWindow(overlay, overlayObj, overlayObj.infoWinStyle)
        }
      })
    },
    // 初始化地图显示范围
    initExtent () {
      let border = new BMap.Bounds(JM_B_util.newPoint(this.option.extent[0]), JM_B_util.newPoint(this.option.extent[1]))
      try {
        BMapLib.AreaRestriction.setBounds(this.baseMap, border)
      } catch (e) {
        alert(e)
      }
    },
    // 初始化自定义右键菜单
    initContextMenu () {
      this.icContextMenu = new JM_ContextMenu(this.option.ContextMenuOption)
      this.icContextMenu.isTargetMap = true
      this.baseMap.addOverlay(this.icContextMenu)
    },
    // 设置比例尺控件
    initScaleControl () {
      let _scaleControl = this.option.scaleControl
      if (_scaleControl.show) {
        let param = {}
        var a = _scaleControl.position[0] === 'BOTTOM' ? 'bottom' : 'top'
        var b = _scaleControl.position[1] === 'LEFT' ? 'left' : 'right'
        param.position = a + b
        L.control.scale(param).addTo(this.baseMap)
        var dom = $('#' + this.option.id + ' .leaflet-' + a + '.leaflet-' + b + ' .leaflet-control-scale')
        dom.attr('style', 'position:absolute;' + a + ':' + _scaleControl.y + 'px;' + b + ':' + _scaleControl.x + 'px;')
      }
    },
    // 设置缩放控件
    initNavigationControl () {
      let _navigationControl = this.option.navigationControl
      if (_navigationControl.show) {
        this.baseMap.showStandMapControl()
      }
    },
    // 设置鹰眼(缩略图)控件
    initOverviewMapControl () {
      let _overviewMapControl = this.option.overviewMapControl
      if (_overviewMapControl.show) {
      	// 构造鹰眼对象
        var ov = new OverView()
        // 设置鹰眼的宽度，单位为像素px
        ov.width = 200
        // 设置鹰眼的高度
        ov.height = 200
        // 添加鹰眼对象到地图对象中
      	this.baseMap.addOverView(ov)
      }
    },
    //
    // =========================== new Module ==============================
    //
    // 加载点聚合图层
    newClusterModule () {
      this.option.icCluster.styles[0].size = new BMap.Size(...this.option.icCluster.styles[0].size)
      this.option.icCluster.styles[0].offset = new BMap.Size(...this.option.icCluster.styles[0].offset)
      this.modules.cluster = new BMapLib.MarkerClusterer(this.baseMap, this.option.icCluster)
    },
    // 加载行政区域边界
    newBoundaryModule () {
      let me = this
      this.modules.boundary = new BMap.Boundary()
      let areas = this.option.icBoundary.area
      areas.forEach(area => {
        // 生成行政区
        this.modules.boundary.get(area, function (border) {
          let count = border.boundaries.length // 行政区域的块数
          if (count === 0) {
            alert('未能获取当前设置的行政区域，无法展示区域边界！')
          } else {
            let pointArray = []
            // 一个行政区可能包括地图上的两块无交集区域
            for (var i = 0; i < count; i++) {
              let polygon = me.createBoundary(border.boundaries[i], me.option.icBoundary)
              polygon.areaName = area
              me.baseMap.addOverlay(polygon)
              pointArray = pointArray.concat(polygon.getPath())
            }
          }
        })
      })
    },
    // 创建一个区域边界
    createBoundary (boundary, option) {
      let polygon = new BMap.Polygon(boundary, option.polygonStyle) // 建立多边形覆盖物

      // 添加鼠标滑上滑出事件
      if (option.hover.isUsed) {
        polygon.addEventListener('mouseover', function (e) {
          if (JM_util.checkNull(option.hover.func)) {
            option.hover.func(polygon.areaName)
          }
          JM_B_util.setPolygonStyle(e.target, option.hover.polygonStyle)
        })
        polygon.addEventListener('mouseout', function (e) {
          JM_B_util.setPolygonStyle(e.target, option.polygonStyle)
        })
      }
      polygon.overlayType = 'boundary'

      return polygon
    },
    //
    // =========================== GPS ==============================
    //
    // 获取两点间的驾车路线规划方案
    getDrivingPath (start, end, speed, isLuShu, pathType, specificStyle) {
      let me = this
      let id = JM_util.uuid()
      if (JM_util.checkNull(specificStyle)) {
        this.option.icDriving = JM_util.mergeObjectDeep(this.option.icDriving, specificStyle)
      }

      let length = this.modules.diving.length
      this.modules.diving[length] = {
        id: id,
        drivingRoute: [],
        path: []
      }
      let drivingObj = this.modules.diving[length]

      let onSearchCompleteFunc = function (results) {
        me.addPathPoints(me, results, id)
        drivingObj.path = me.addPathLine(me, results, id, pathType)
        if (speed) {
          if (isLuShu) {
            me.addLuShu(me, results, specificStyle)
          } else {
            me.addRunAction(me, results, id, speed)
          }
        }
      }

      let opts = []
      opts[0] = {
        policy: BMAP_DRIVING_POLICY_FIRST_HIGHWAYS
      }
      opts[1] = {
        policy: BMAP_DRIVING_POLICY_AVOID_HIGHWAYS
      }
      opts[2] = {
        policy: BMAP_DRIVING_POLICY_AVOID_CONGESTION
      }
      opts[3] = {
        policy: BMAP_DRIVING_POLICY_DEFAULT
      }
      for (let i = 0; i < 4; i++) {
        opts[i].onSearchComplete = onSearchCompleteFunc
        drivingObj.drivingRoute[i] = JM_B_util.newDrivingRoute(this.baseMap, opts[i])
      }

      let startPoint = JM_B_util.newPoint(start)
      let endPoint = JM_B_util.newPoint(end)
      switch (pathType) {
      case ('优先高速'):
        drivingObj.drivingRoute[0].search(startPoint, endPoint)
        break
      case ('避开高速'):
        drivingObj.drivingRoute[1].search(startPoint, endPoint)
        break
      case ('避开拥堵'):
        drivingObj.drivingRoute[2].search(startPoint, endPoint)
        break
      case ('all'):
        for (let i = 0; i < 4; i++) {
          drivingObj.drivingRoute[i].search(startPoint, endPoint)
        }
        break
      default:
        drivingObj.drivingRoute[3].search(startPoint, endPoint)
      }
    },
    // 添加起点，终点
    addPathPoints (me, results, id) {
      // console.log('.......')
      let startObj = {
        id: id + '_start',
        overlayType: 'marker',
        point: results.getStart().point,
        markerStyle: me.option.icDriving.startIcon,
        title: '起点'
      }
      let endObj = {
        id: id + '_end',
        overlayType: 'marker',
        point: results.getEnd().point,
        markerStyle: me.option.icDriving.endIcon,
        title: '终点'
      }
      let start = this.createOverlay(startObj, true)
      let end = this.createOverlay(endObj, true)
      start.drivingAttr = true
      end.drivingAttr = true
      me.baseMap.addOverlay(start)
      me.baseMap.addOverlay(end)
    },
    // 画出路线
    addPathLine (me, results, id, pathType) {
      let path = []
      let pathNum = 1
      if (pathType === 'all') {
        pathNum = results.getNumPlans()
      }
      // console.log(results.getNumPlans())
      for (let i = 0; i < pathNum; i++) {
        let pts = results.getPlan(i).getRoute(i).getPath()
        let pathObj = {
          id: id + '_line_' + JM_util.uuid(),
          overlayType: 'polyline',
          points: pts,
          polylineStyle: me.option.icDriving.pathStyle,
          hoverStyle: me.option.icDriving.pathHoverStyle,
          drivingAttr: true
        }
        path.push(pathObj)
        let line = this.createOverlay(pathObj)
        line.drivingAttr = true
        me.baseMap.addOverlay(line)
      }
      return path
    },
    // 添加运动图标
    addRunAction (me, results, id, speed) {
      let runObj = {
        id: id + '_run',
        overlayType: 'marker',
        point: results.getStart().point,
        markerStyle: me.option.icDriving.runIcon,
        title: me.option.icDriving.runIconTitle
      }
      let run = this.createOverlay(runObj, true)
      run.drivingAttr = true
      me.baseMap.addOverlay(run)

      let pts = results.getPlan(0).getRoute(0).getPath()
      me.baseMap.setViewport(pts) // 根据路线坐标设置地图视野

      pts.forEach((point, index) => {
        me.reSetPosition(run, point, index, speed)
      })
    },
    // 移动运动图标
    reSetPosition (runObj, point, index, speed) {
      setTimeout(function () {
        runObj.setPosition(point)
      }, speed * index)
    },
    // 添加路书
    addLuShu (me, results, specificStyle) {
      console.log(specificStyle)
      let opt = me.option.icLuShu
      if (JM_util.checkNull(specificStyle)) {
        opt = JM_util.mergeObjectDeep(me.option.icLuShu, specificStyle)
      }
      let pts = results.getPlan(0).getRoute(0).getPath()
      let length = me.modules.lushu.length
      me.modules.lushu[length] = JM_B_util.newLuShu(me.baseMap, pts, opt)
    },
    // 控制路书对象行为
    setLuShuAction (action) {
      switch (action) {
      case ('start'):
        this.modules.lushu.forEach(element => {
          element.start()
          element._marker.overlayType = 'marker'
          element._marker.drivingAttr = true
        })
        break
      case ('stop'):
        this.modules.lushu.forEach(element => {
          element.stop()
        })
        break
      case ('pause'):
        this.modules.lushu.forEach(element => {
          element.pause()
        })
        break
      case ('showInfoWindow'):
        this.modules.lushu.forEach(element => {
          element.showInfoWindow()
        })
        break
      case ('hideInfoWindow'):
        this.modules.lushu.forEach(element => {
          element.hideInfoWindow()
        })
        break
      }
    },
    // 清除地图上的所有行车路线
    clearDrivingPath () {
      let me = this
      let overlays = this.baseMap.getOverlays()
      overlays.forEach(e => {
        if (e.drivingAttr) {
          me.baseMap.removeOverlay(e)
        }
      })
      this.modules.diving = []
      this.modules.lushu = []
    },
    //
    // =========================== set ==============================
    //
    // 切换地图样式
    setMapStyle (style) {
      this.baseMap.setMapStyle({ style: style })
    },
    // 切换地图类型
    setMapType (viewMode) {
      if (viewMode === this.viewMode) {
        return
      }
      this.viewMode = viewMode
      this.baseMap.setMapType(this.convertMapType(viewMode))
    },
    convertMapType (viewMode) {
      switch (viewMode) {
      case ('2D'):
        return BMAP_NORMAL_MAP
      case ('3D'):
        return BMAP_PERSPECTIVE_MAP
      case ('卫星'):
        return BMAP_HYBRID_MAP
      case ('卫星无路网'):
        return BMAP_SATELLITE_MAP
      }
    },
    // 开关路况
    setTrafficControl (flag) {
      if (flag) {
        this.modules.traffic = new BMap.TrafficLayer()
        this.baseMap.addTileLayer(this.modules.traffic)
      } else {
        this.baseMap.removeTileLayer(this.modules.traffic)
      }
    },
    // 开关拾取坐标
    setCoordinateStatus (flag) {
      this.status.coordinate = flag
    },
    // 开启/关闭编辑模式
    setEditStatus (flag) {
      this.status.edit = flag
      let items = JM_B_util.getEditOverlays(this.baseMap)
      let editTypes = ['circle', 'polyline', 'polygon', 'rectangle']

      if (flag && !items.length) {
        return false
      }
      if (flag && items.length) {
        this.modules.drawing.close()
        items.forEach(e => {
          if (e.overlayType === 'marker') {
            e.enableDragging()
          }
          if (editTypes.includes(e.overlayType)) {
            e.enableEditing()
            e.isEditing = true
          }
        })
      } else if (!flag && items.length) {
        if (this.status.draw) {
          this.modules.drawing.open()
          this.modules.drawing.setDrawingMode(this.DrawingType)
        }

        let updateOverlays = []
        items.forEach(e => {
          if (e.overlayType === 'marker') {
            e.disableDragging()
          }
          if (editTypes.includes(e.overlayType)) {
            e.disableEditing()
            e.isEditing = false
            if (e.lineupdate) {
              updateOverlays.push(e)
            }
          }
        })
        if (updateOverlays.length) {
          return updateOverlays
        }
      }
      return true
    },
    //
    // =========================== DistanceTool ==============================
    //
    // 初始化测距工具
    newDistanceTool () {
      let me = this
      this.modules.distanceTool = new BMapLib.DistanceTool(this.baseMap, this.option.icDistanceTool)
      this.modules.distanceTool.addEventListener('drawend', function (e) {
        me.option.listenerFunc('DistanceTool', e)
      })
    },
    // 开启关闭测距工具
    setDistanceToolStatus (flag) {
      if (flag) {
        this.modules.distanceTool.open()
      } else {
        this.modules.distanceTool.close()
      }
    },
    //
    // =========================== draw ==============================
    //
    // 初始化绘图工具
    newDrawModule () {
      let markerOptions = {
        icon: JM_B_util.newIcon(this.option.markerStyle),
        offset: new BMap.Size(...[0, -0.5 * this.option.markerStyle.imageSize[1]])
      }
      let opts = {
        isOpen: false,
        drawingType: this.DrawingType,
        enableCalculate: false,
        markerOptions: markerOptions,
        circleOptions: this.option.circleStyle,
        polylineOptions: this.option.polylineStyle,
        polygonOptions: this.option.polygonStyle,
        rectangleOptions: this.option.polygonStyle
      }
      this.modules.drawing = new BMapLib.DrawingManager(this.baseMap, opts)
      this.bindCompleteEvent()
    },
    // 绑定绘图操作完成后的方法
    bindCompleteEvent () {
      let me = this
      let listeners = ['markercomplete', 'circlecomplete', 'polylinecomplete', 'polygoncomplete', 'rectanglecomplete']
      let overlayTypes = ['marker', 'circle', 'polyline', 'polygon', 'rectangle']
      listeners.forEach((element, index) => {
        me.modules.drawing.addEventListener(element, function (e, overlay) {
          let overlayType = overlayTypes[index]
          overlay.overlayType = overlayType
          overlay.edit = true
          overlay.drawing = true
          if (JM_util.checkNull(me.option.icDrawControl.completeFunc[overlayType])) {
            me.option.icDrawControl.completeFunc[overlayType](overlay)
          }
          // console.log(element)
          me.newDrawModule()
          me.setDrawStatus(true)
          // console.log(me.DrawingType)
        })
      })
    },
    // 开启/关闭绘图模式
    setDrawStatus (flag) {
      this.status.draw = flag
      if (flag) {
        this.modules.drawing.open()
        this.modules.drawing.setDrawingMode(this.DrawingType)
      } else {
        this.modules.drawing.close()
      }
    },
    // 绘图操作
    setDrawMode (drawType) {
      switch (drawType) {
      case ('marker'):
        this.DrawingType = BMAP_DRAWING_MARKER
        break
      case ('circle'):
        this.DrawingType = BMAP_DRAWING_CIRCLE
        break
      case ('polyline'):
        this.DrawingType = BMAP_DRAWING_POLYLINE
        break
      case ('polygon'):
        this.DrawingType = BMAP_DRAWING_POLYGON
        break
      case ('rectangle'):
        this.DrawingType = BMAP_DRAWING_RECTANGLE
        break
      case ('clear'):
        this.clearAllDraw()
        break
      }
      this.modules.drawing.setDrawingMode(this.DrawingType)
    },
    // 清除绘图内容
    clearAllDraw () {
      let me = this
      let overlays = this.baseMap.getOverlays()
      overlays.forEach(e => {
        if (e.drawing) {
          me.baseMap.removeOverlay(e)
        }
      })
    },
    //
    // =========================== show ==============================
    //
    // overlayArrey：数据集合，overlayType：数据类型，flag：显示/隐藏
    showOverlays (overlayArrey, overlayType, flag) {
      // this.hideContextMenu()

      if (!this.checkRepeatOverlays(overlayArrey, overlayType)) {
        alert('覆盖物id是唯一标识，不可重复！')
        return
      }
      if (overlayType === 'heatMap') {
        this.showHeatMap(overlayArrey, flag)
      } else {
        this.showOtherOverlays(overlayArrey, overlayType, flag)
      }
    },
    // 校验传入的数据是否存在重复id
    checkRepeatOverlays (overlayArrey, overlayType) {
      // 热力图数据不需要id
      if (overlayType === 'heatMap') {
        return true
      }

      let idList = []
      overlayArrey.forEach(overlayObj => {
        idList.push(overlayObj.id)
      })
      return JM_util.checkRepeat(idList)
    },
    // 显示/隐藏热力图，refresh：是否刷新新力图数据，true/false
    showHeatMap (overlayArrey, flag, refresh) {
      if (flag) {
			  var config = {
			    radius: 6, // 热力图的半径
			    opacity: 0.2,
			    xField: 'lng',
			    yField: 'lat',
			    valueField: 'count'
			  }
	      this.modules.heatMap = new EzLayerHeatMap(config)
	      this.baseMap.addOverlay(this.modules.heatMap)
	      this.modules.heatMap.addData(overlayArrey)
      } else {
        this.baseMap.removeOverlay(this.modules.heatMap)
      }
    },
    // 显示/隐藏其他覆盖物(overlayArrey：数据集合，overlayType：数据类型，flag：显示/隐藏)
    showOtherOverlays (overlayArrey, overlayType, flag) {
      let me = this
      if (flag) {
      	me.modules[overlayType] = []
        overlayArrey.forEach(overlayObj => {
          let overlay = me.createOverlay(overlayObj)
          if (me.option.icCluster.isUsed && overlayType === 'marker') {
            me.modules.cluster.addMarker(overlay)
          } else {
            me.baseMap.addOverlay(overlay)
            me.modules[overlayType].push(overlay)
          }
        })
      } else {
        me.modules[overlayType].forEach(obj => {
          me.baseMap.removeOverlay(obj)
        })
      }
    },
    // marker添加动画效果
    addAnimation (marker, type) {
      if (type === 'bounce') {
        marker.setAnimation(BMAP_ANIMATION_BOUNCE)
      } else {
        marker.setAnimation(BMAP_ANIMATION_DROP)
      }
    },
    //
    // =========================== create ==============================
    //
    // 创建覆盖物，overlayObj：覆盖物信息对象
    createOverlay (overlayObj) {
      // this.uniqueOverlay(overlayObj.id) // 如果地图上已存在相同id覆盖物，执行更新操作，先删除再创建，

      let styleName = overlayObj.overlayType + 'Style'
      overlayObj[styleName] = JM_util.mergeObjectDeep(this.option[styleName], overlayObj[styleName] || {})
      overlayObj.normalStyle = overlayObj[styleName]
      if (overlayObj.hoverStyle) {
        overlayObj.hoverStyle = JM_util.mergeObjectDeep(overlayObj.normalStyle, overlayObj.hoverStyle)
      }
      overlayObj.infoWinStyle = JM_util.mergeObjectDeep(this.option.infoWinOption, overlayObj.infoWinStyle || {})

      let overlay = null
      switch (overlayObj.overlayType) {
      case ('marker'):
        overlay = JM_B_util.newMarker(overlayObj)
        break
      case ('label'):
        overlay = JM_B_util.newLabel(overlayObj)
        break
      case ('circle'):
        overlay = JM_B_util.newCircle(overlayObj)
        break
      case ('polyline'):
        overlay = JM_B_util.newpPolyline(overlayObj)
        break
      case ('polygon'):
        overlay = JM_B_util.newPolygon(overlayObj)
        break
      case ('AdvancedLabel'):
        overlayObj.point = JM_B_util.newPoint(overlayObj.center)
        overlay = new AdvancedLabel(overlayObj)
        break
      case ('CurveLine'):
        overlay = JM_B_util.newCurveLine(overlayObj)
        break
      }
      this.bindOverlayEvent(overlay, overlayObj)
      return overlay
    },
    // 去除地图已有覆盖物
    uniqueOverlay (id) {
      JM_B_util.clearOverlays(this.baseMap, [id])
      if (this.option.icCluster.isUsed) {
        JM_B_util.clearClusterOverlays(this.modules.cluster, [id])
      }
    },
    // 覆盖物绑定事件
    bindOverlayEvent (overlay, overlayObj) {
      let me = this

      // 鼠标滑上事件
      overlay.addEventListener('mouseover', function () {
        if (JM_util.checkNull(overlayObj.mouseoverEvent)) {
          overlayObj.mouseoverEvent(overlay.info)
        }
        if (JM_util.checkNull(overlayObj.hoverStyle)) {
          me.setOverlayStyle(overlayObj.id, overlayObj.hoverStyle)
        }
      })

      // 鼠标滑出事件
      overlay.addEventListener('mouseout', function () {
        if (JM_util.checkNull(overlayObj.mouseleaveEvent)) {
          overlayObj.mouseleaveEvent(overlay.info)
        }
        if (JM_util.checkNull(overlayObj.hoverStyle)) {
          me.setOverlayStyle(overlayObj.id, overlayObj.normalStyle)
        }
      })
      // 点击事件
      overlay.addEventListener('click', function (e) {
        // 是否禁默认点击事件
        if (!overlayObj.stopDefaultClickEvent) {
          $('#' + me.option.domId).attr('val', JSON.stringify(overlayObj))
          // vpEventTarget.fire({ type: 'change', id: me.option.domId, source: 'map', data: JSON.stringify(overlayObj) })
          me.centerAndOpenInfoWindow(overlay, overlayObj, overlayObj.infoWinStyle)
        }
        if (JM_util.checkNull(overlayObj.clickEvent)) {
          overlayObj.clickEvent(overlay.info)
        }
      })

      // 右键菜单
      overlay.addEventListener('rightclick', function (e) {
        me.icContextMenu.isTargetMap = false
        me.icContextMenu.hide()
        if (overlayObj.contextMenu && overlayObj.contextMenu.isUsed) {
          let info = {
            lng: overlayObj.lng,
            lat: overlayObj.lat,
            menuItem: overlayObj.contextMenu.menuItem,
            info: overlayObj,
            customClass: overlayObj.contextMenu.customClass
          }
          JM_B_util.showContextMenu(me.icContextMenu, info)
        }
      })

      // marker拖拽事件
      if (overlay.overlayType === 'marker') {
        overlay.addEventListener('dragend', function (e) {
          if (overlayObj.dragendEvent) {
            overlayObj.dragendEvent(e.point, overlay.info)
          } else {
            console.log('未定义拖拽后执行的方法')
          }
        })
      }

      // 覆盖物的属性发生变化时触发
      let lineupdateType = ['circle', 'polyline', 'polygon', 'rectangle']
      if (lineupdateType.includes(overlay.overlayType)) {
        overlay.addEventListener('lineupdate', function (e) {
          if (overlay.isEditing) {
            overlay.lineupdate = true
            // console.log(overlay)
          }
        })
      }
    },
    // 设置覆盖物样式
    setOverlayStyle (id, style) {
      let overlay = JM_B_util.getOverlayById(this.baseMap, id)
      let overlayType = overlay.overlayType
      switch (overlayType) {
      case ('marker'):
        let icon = JM_B_util.newIcon(style)
        overlay.setIcon(icon)
        break
      case ('circle'):
        JM_B_util.setPolygonStyle(overlay, style)
        break
      case ('polyline'):
        JM_B_util.setPolylineStyle(overlay, style)
        break
      case ('CurveLine'):
        JM_B_util.setPolylineStyle(overlay, style)
        break
      case ('polygon'):
        JM_B_util.setPolygonStyle(overlay, style)
        break
      case ('label'):
        overlay.setStyle(style)
        break
      }
    },
    //
    // =========================== clear ==============================
    //
    // 关闭右键菜单
    hideContextMenu () {
      this.icContextMenu.hide()
    },
    // 清除全部覆盖物
    clearAllOverlays () {
    	let me = this
      let removeTypes = ['marker', 'label']
      removeTypes.forEach(type => {
	      me.modules[type].forEach(obj => {
	        if (type === 'marker') {
	        	obj.closeInfoWindow()
	        }
	        me.baseMap.removeOverlay(obj)
	      })
      })
      me.baseMap.removeOverlay(this.modules.heatMap)
    },
    //
    // =========================== other ==============================
    //
    // 打开信息窗口并居中(覆盖物对象，用户传入信息窗口样式)
    centerAndOpenInfoWindow (item, obj, infoWinStyle) {
      JM_B_util.centerAndOpenInfoWindow(this.baseMap, item, obj, infoWinStyle)
    },
    // 设置地图显示级别
    zoomToFunc (level) {
      this.baseMap.zoomTo(level)
    },
    // 移动到定点，arr：[坐标数组]/point
    panToFunc (param, zoomLevel) {
      var point = JM_util.isArray(param) ? JM_B_util.newPoint(param) : param
      var z = zoomLevel || this.baseMap.getZoom()
      this.baseMap.centerAtLatlng(point)
      this.baseMap.zoomTo(z)
    },
    // 通过ID获取覆盖物对象
    getOverlayById (id) {
      return JM_B_util.getOverlayById(this.baseMap, id)
    }
  }
  return newObj
}
