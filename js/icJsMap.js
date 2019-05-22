var IcJsMap = function () {
  var icMap = this
  icMap.newObj = {
    box: null,
    option: '',
    map: null,
    init: function (domId, _option) {
      var defaultOption = JM_util.deepCopy(JM_option)
      this.option = JM_util.mergeObjectDeep(defaultOption, _option)
      this.option.id = 'map_' + JM_util.uuid()

      JM_html.addMapDiv(domId, this.option.id)
      this.box = $('#' + domId + ' .ic-map-div')
      this.map = new JM_map()
      this.map.init(this.option)

      this.initComponents()
    },
    // 初始化各组件
    initComponents: function () {
      if (this.option.icMapTypeControl.show) {
        this.mapTypeControl.init()
      }
      if (this.option.icToolBar.show) {
        this.toolBar.init()
      }
      if (this.option.icDrawControl.isUsed) {
        this.drawBar.init()
      }
      if (this.option.icSearchBar.show) {
        this.searchBar.init()
      }
    },
    //
    // =========================== base func ==============================
    //
    // 自定义模块控制
    showCustomOverlays (overlayArrey, index, indexChild, isInit) {
      if (!isInit) {
        this.setting.icCustomBox[index].data[indexChild].active = !this.setting.icCustomBox[index].data[indexChild].active
        this.setting.icCustomBox = [...this.setting.icCustomBox]
      }
      overlayArrey.active = this.setting.icCustomBox[index].data[indexChild].active
      overlayArrey = this.setOverlayObjAttributes(overlayArrey)
      this.map.showOverlays(overlayArrey.data, overlayArrey.overlayType, overlayArrey.active)
    },
    // 设置点聚合功能
    setClusterStatus (flag) {
      this.map.setClusterStatus(flag)
    },
    // 把信息窗、右键菜单、拖拽事件等一类覆盖物的属性赋给每个覆盖物
    setOverlayObjAttributes (overlayArrey) {
      overlayArrey.data.forEach((overlayObj, index) => {
        overlayObj.overlayType = overlayArrey.overlayType
        overlayObj.infoWinStyle = overlayArrey.infoWinStyle
        overlayObj.contextMenu = overlayArrey.contextMenu
        overlayObj.dragendEvent = overlayArrey.dragendEvent
        overlayObj.stopDefaultClickEvent = !!overlayArrey.stopDefaultClickEvent
        overlayObj.clickEvent = overlayArrey.clickEvent
        overlayObj.dblclickEvent = overlayArrey.dblclickEvent
        overlayObj.mouseoverEvent = overlayArrey.mouseoverEvent
        overlayObj.mouseleaveEvent = overlayArrey.mouseleaveEvent

        if (overlayArrey.overlayType === 'heatMap') {
          overlayObj.max = overlayArrey.max
        } else {
          let styleName = overlayObj.overlayType + 'Style'
          overlayObj[styleName] = overlayArrey[styleName]
          overlayObj.hoverStyle = overlayArrey.hoverStyle
          if (overlayArrey.overlayType === 'marker') {
            overlayObj.animationType = overlayArrey.animationType
          }
        }
        if (['circle', 'polyline', 'polygon', 'rectangle'].includes(overlayArrey.overlayType)) {
          overlayObj.lng = overlayObj.center[0]
          overlayObj.lat = overlayObj.center[1]
        }
        if (overlayArrey.overlayType === 'AdvancedLabel') {
          let dom = document.getElementsByName('ic-advanced-label-item')[index]
          overlayObj.innerHTML = dom.outerHTML
        }
      })
      return overlayArrey
    },
    // 设置控件位置
    setControlPosition (option) {
      let position = option.position
      let style = { [position[0]]: option.y + 'px' }
      if (position[1] !== 'center') {
        style[position[1]] = option.x + 'px'
      }
      return style
    },
    // =========================== 外部方法 ==============================
    // 获取所有地图样式
    $_getAllMapStyles () {
      return JM_stylesB
    },
    // 切换地图样式
    $_setMapStyle (style) {
      this.map.setMapStyle(style)
    },
    // 切换地图类型
    $_onChangeMapType (viewMode) {
      this.mapTypeControl.changeType(viewMode)
    },
    // 移动地图中心点
    $_onPanTo (coordinate) {
      this.map.panToFunc(coordinate)
    },
    // 改变地图显示比例
    $_onZoomTo (level) {
      this.map.zoomToFunc(level)
    },
    // 路况
    $_setTrafficStatus (flag) {
      this.toolBar.setTraffic(flag)
    },
    // 开启关闭编辑状态
    $_setEditStatus (flag) {
      this.toolBar.setEdit(flag)
    },
    // 开启关闭测距工具
    $_setDistanceToolStatus (flag) {
      this.toolBar.setDistance(flag)
    },
    // 开启关闭绘图状态
    $_setDrawStatus (flag) {
      this.toolBar.setDraw(flag)
    },
    // 设置绘图类型
    $_setDrawMode (drawType) {
      this.map.setDrawMode(drawType)
      icMap.newObj.drawBar.btns.each(function () {
        if ($(this).attr('data-type') === drawType) {
          if (!$(this).hasClass('active')) {
            icMap.newObj.drawBar.btns.removeClass('active')
            $(this).addClass('active')
          }
        }
      })
    },
    // 开启关闭拾取坐标功能
    $_setCoordinateStatus (flag) {
      this.toolBar.setCoordinate(flag)
    },
    // 显示/隐藏覆盖物
    $_showOverlays (overlayArrey, flag) {
      overlayArrey = this.setOverlayObjAttributes(overlayArrey)
      this.map.showOverlays(overlayArrey.data, overlayArrey.overlayType, flag)
    },
    // 清除全部覆盖物
    $_clearAllOverlays () {
      let me = this
      let icCustomBox = me.option.icCustomBox
      if (JM_util.checkNull(icCustomBox)) {
        icCustomBox.forEach((box, index) => {
          box.data.forEach(overlayArrey => {
            overlayArrey.active = false
          })
        })
      }
      // this.clearSearchResults()
      if (this.option.icToolBar.show && JM_util.checkNull(this.toolBar)) {
        this.$_setTrafficStatus(false)
      }
      if (JM_util.checkNull(this.editBar)) {
        this.$_setEditStatus(false)
      }
      this.map.clearAllOverlays()
    },
    // 通过ID获取覆盖物对象
    $_getOverlayByID (id) {
      return this.map.getOverlayById(id)
    },
    // 设置覆盖物样式
    $_setOverlayStyle (id, style) {
      this.map.setOverlayStyle(id, style)
    },
    // 打开信息窗口并居中
    $_centerAndOpenInfoWindow (obj, infoWinStyle) {
      this.map.centerAndOpenInfoWindow(obj, infoWinStyle)
    },
    // 获取两点间的驾车路线规划方案
    $_getDrivingPath (start, end, pathType, specificStyle) {
      this.map.getDrivingPath(start, end, 0, false, pathType, specificStyle)
    },
    // 获取两点间的行车路线，并沿路线运动
    $_getDrivingPathAndRun (start, end, speed, pathType, specificStyle) {
      this.map.getDrivingPath(start, end, speed, false, pathType, specificStyle)
    },
    // 获取两点间的行车路线，并创建路书对象
    $_getDrivingPathAndLuShu (start, end, pathType, specificStyle) {
      this.map.getDrivingPath(start, end, true, true, pathType, specificStyle)
    },
    // 控制路书对象行为
    $_addLuShuAction (action) {
      this.map.setLuShuAction(action)
    },
    // 清除地图上的所有行车路线
    $_clearDrivingPath () {
      this.map.clearDrivingPath()
    }
  }
  //
  // =========================== mapTypeControl ==============================
  //
  icMap.newObj.mapTypeControl = {
    viewMode: '2D',
    control: null,
    buttons: null,
    mark: null,
    init: function () {
      // console.log(444, icMap.newObj)
      JM_html.addMapTypeControl(icMap.newObj.box, icMap.newObj.option.icMapTypeControl.button)
      this.control = icMap.newObj.box.find('.ic-map-type-control')
      this.buttons = icMap.newObj.box.find('.ic-map-type-control-btn>button')
      this.mark = icMap.newObj.box.find('.ic-map-type-control-mark')

      this.buttons.eq(0).addClass('active')
      this.mark.hide()
      this.bind()
    },
    bind: function () {
      var me = this
      this.buttons.click(function () {
        me.buttons.removeClass('active')
        $(this).addClass('active')

        var viewMode = $(this).attr('viewMode')
        me.changeType(viewMode)
      })
      this.mark.click(function () {
        if ($(this).hasClass('select')) {
          me.changeType('卫星无路网')
          $(this).removeClass('select')
        } else {
          $(this).addClass('select')
          me.changeType('卫星')
        }
      })
    },
    changeType: function (viewMode) {
      if (this.viewMode === viewMode) {
        return
      }
      icMap.newObj.map.setMapType(viewMode)
      this.viewMode = viewMode
      if (['卫星', '卫星无路网'].includes(viewMode)) {
        this.mark.addClass('select').show()
      } else {
        this.mark.hide()
      }
    }
  }
  //
  // =========================== toolBar ==============================
  //
  icMap.newObj.toolBar = {
    bar: null,
    areaBtn: null,
    trafficBtn: null,
    editBtn: null,
    toolBoxBtn: null,
    toolList: null,
    coordinateBtn: null,
    drawBtn: null,
    distanceBtn: null,
    status: {
      traffic: false,
      edit: false,
      draw: false,
      distance: false,
      coordinate: false
    },
    init: function () {
      var settings = icMap.newObj.option.icToolBar.layout
      JM_html.addToolBar(icMap.newObj.box, icMap.newObj.option.area, settings)
      this.bar = icMap.newObj.box.find('.ic-map-toolbar')
      this.areaBtn = icMap.newObj.box.find('.ic-map-toolbar-btn.center')
      this.trafficBtn = icMap.newObj.box.find('.ic-map-toolbar-btn.traffic')
      this.editBtn = icMap.newObj.box.find('.ic-map-toolbar-btn.edit')
      this.toolBoxBtn = icMap.newObj.box.find('.ic-map-toolbar-btn.boxBtn')
      this.toolList = icMap.newObj.box.find('.ic-map-toolbar-tool')
      this.coordinateBtn = icMap.newObj.box.find('.ic-map-toolbar-btn.coordinate')
      this.drawBtn = icMap.newObj.box.find('.ic-map-toolbar-btn.draw')
      this.distanceBtn = icMap.newObj.box.find('.ic-map-toolbar-btn.measure')

      this.toolList.hide()
      this.bind()
    },
    bind: function () {
      let me = this
      this.areaBtn.click(function () {
        icMap.newObj.map.panToFunc(icMap.newObj.option.center, icMap.newObj.option.zoom)
      })
      this.trafficBtn.click(function () {
        me.setTraffic(!me.status.traffic)
      })
      this.editBtn.click(function () {
        me.setEdit(!me.status.edit)
      })
      this.toolBoxBtn.click(function () {
        me.toolList.toggle()
      })
      this.coordinateBtn.click(function () {
        me.setCoordinate(!me.status.coordinate)
      })
      this.drawBtn.click(function () {
        me.setDraw(!me.status.draw)
      })
      this.distanceBtn.click(function () {
        me.setDistance(!me.status.distance)
      })
    },
    setTraffic: function (flag) {
      if (flag === this.status.traffic) {
        return
      }
      this.status.traffic = !this.status.traffic
      if (this.trafficBtn) {
        this.trafficBtn.toggleClass('active', flag)
      }
      icMap.newObj.map.setTrafficControl(flag)
    },
    setCoordinate: function (flag) {
      if (flag === this.status.coordinate) {
        return
      }
      this.status.coordinate = !this.status.coordinate
      if (this.coordinateBtn) {
        this.coordinateBtn.toggleClass('active', flag)
      }
      icMap.newObj.map.setCoordinateStatus(flag)
    },
    setDraw: function (flag) {
      if (flag === this.status.draw) {
        return
      }
      this.status.draw = !this.status.draw
      if (this.drawBtn) {
        this.drawBtn.toggleClass('active', flag)
      }
      icMap.newObj.drawBar.bar.toggle(flag)
      icMap.newObj.map.setDrawStatus(flag)
    },
    setEdit: function (flag) {
      if (flag === this.status.edit) {
        return
      }
      if (flag && !icMap.newObj.map.setEditStatus(flag)) {
        alert('地图上不存在可编辑的覆盖物！')
        return
      }
      this.status.edit = !this.status.edit
      if (this.editBtn) {
        this.editBtn.toggleClass('active', flag)
      }
      icMap.newObj.map.setEditStatus(flag)
    },
    setDistance: function (flag) {
      if (flag === this.status.distance) {
        return
      }
      this.status.distance = !this.status.distance
      if (this.distanceBtn) {
        this.distanceBtn.toggleClass('active', flag)
      }
      icMap.newObj.map.setDistanceToolStatus(flag)
    }
  }
  //
  // =========================== toolBar ==============================
  //
  icMap.newObj.drawBar = {
    bar: null,
    btns: null,
    init: function () {
      JM_html.addDrawBar(icMap.newObj.box, icMap.newObj.option.icDrawControl.type)
      this.bar = icMap.newObj.box.find('.ic-edit-control')
      this.btns = this.bar.find('button')
      this.btns.eq(0).addClass('active')
      this.bar.hide()
      this.bind()
    },
    bind: function () {
      let me = this
      this.btns.click(function () {
        var drawType = $(this).attr('data-type')
        if (drawType !== 'clear') {
          if (!$(this).hasClass('active')) {
            me.btns.removeClass('active')
            $(this).addClass('active')
          }
        }
        icMap.newObj.map.setDrawMode(drawType)
      })
    }

  }
  //
  // =========================== SearchBar ==============================
  //
  icMap.newObj.searchBar = {
    bar: null,
    input: null,
    clearBtn: null,
    btns: null,
    init: function () {
      var settings = icMap.newObj.option.icSearchBar
      JM_html.addSearchBar(icMap.newObj.box, settings)
      this.bar = icMap.newObj.box.find('.ic-map-search')
      this.input = this.bar.find('.ic-map-search-input')
      this.clearBtn = this.bar.find('.ic-map-search-clear')
      this.btn = this.bar.find('.ic-map-search-btn')
      this.bind(settings)
    },
    bind: function (settings) {
      let me = this
      this.clearBtn.click(function () {
        me.input.val('')
      })
      this.btn.click(function () {
        settings.searchFunc(me.input.val())
      })
    },
    addResult: function () {

    }
  }

  return icMap.newObj
}
