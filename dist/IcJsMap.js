
//
// JM_util=======================================================================
//
const JM_util = {
  uuid: function () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  },
  // 合并对象
  mergeObjectDeep: function (defaultObj, originalObj) {
    let newObj = this.deepCopy(defaultObj)
    for (let i in defaultObj) {
      let dv = defaultObj[i]
      let ov = originalObj[i]
      if (this.isObjectObject(dv) && this.checkNull(ov)) {
        newObj[i] = this.mergeObjectDeep(dv, ov)
      } else {
        if (this.checkNull(ov)) {
          newObj[i] = this.deepCopy(ov)
        }
      }
    }
    return newObj
  },
  deepCopy: function (source) {
    var sourceCopy = null
    if (this.isObjectObject(source)) {
      sourceCopy = {}
      for (var item in source) {
        sourceCopy[item] = this.deepCopy(source[item])
      }
    } else if (this.isArray(source)) {
      sourceCopy = []
      source.forEach(item => {
        sourceCopy.push(this.deepCopy(item))
      })
    } else {
      return source
    }
    return sourceCopy
  },
  // 获取变量的类型
  getType: function (obj) {
    var str = Object.prototype.toString.call(obj)
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    if (obj instanceof Element) { // 判断是否是dom元素，如div等
      return 'element'
    }
    return map[str]
  },
  isArray: function (obj) {
    return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]'
  },
  isObject: function (obj) {
    var type = typeof obj
    return (type === 'function' || type === 'object') && !!obj
  },
  isObjectObject: function (val) {
    return Object.prototype.toString.call(val) === '[object Object]'
  },
  isDate: function (val) {
    return Object.prototype.toString.call(val) === '[object Date]'
  },
  isFunction: function (val) {
    return Object.prototype.toString.call(val) === '[object Function]'
  },
  isString: function (val) {
    return Object.prototype.toString.call(val) === '[object String]'
  },
  isNumber: function (val) {
    return Object.prototype.toString.call(val) === '[object Number]'
  },
  // 校验是否为空
  checkNull: function (obj) {
    if (obj === null || obj === '' || obj === undefined) {
      return false
    } else if (JSON.stringify(obj) === '{}') {
      let a = false
      for (let i in obj) {
        a = true
      }
      return a
    } else if ((this.isString(obj) || this.isArray(obj)) && obj.length === 0) {
      return false
    } else {
      return true
    }
  },
  // 校验数组元素是否重复
  checkRepeat: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let arrCopy = [...arr]
      let item = arrCopy[i]
      arrCopy.splice(i, 1)
      if (arrCopy.includes(item)) {
        return false
      }
    }
    return true
  },
  // 字符串转常量名
  evil: function (str) {
    let fn = Function
    return new fn('return ' + str)()
  }

}
//
// JM_option=======================================================================
//
const JM_option = {
  id: '', // 地图id
  area: '北京', // 地图显示的城市，必填
  center: [116.404, 39.915], // 中心点坐标，必填
  zoom: 12, // 地图初加载时展示的级别，必填
  minZoom: 1, // 地图允许展示的最小级别
  maxZoom: 30, // 地图允许展示的最大级别
  mapStyle: 'normal', // 地图样式
  viewMode: '2D', // 显示的地图类型
  resizeEnable: true,
  rotateEnable: true,
  pitchEnable: true,
  pitch: -90,
  rotation: 0,
  // skyColor: '#ff6600',
  showBuildingBlock: true,
  buildingAnimation: true, // 楼块出现是否带动画
  expandZoomRange: true,
  enableScrollWheelZoom: true, // 是否允许滚轮缩放地图
  enableDoubleClickZoom: true, // 是否允许通过双击鼠标放大地图
  enableDragging: true, // 是否允许拖拽
  enableMapClick: false, // 是否开启底图可点功能
  enableHighResolution: true, // 是否启用使用高分辨率地图。在iPhone4及其后续设备上，可以通过开启此选项获取更高分辨率的底图，v1.2,v1.3版本默认不开启，v1.4默认为开启状态
  enableAutoResize: true, // 是否自动适应地图容器变化
  icMapOnloadFunc: null, // 用户自定义地图加载完成后立即执行的方法
  listenerFunc: function (type, e) { console.log('监听类型：', type, '回传内容', e) }, // 监听回调
  // 比例尺控件
  scaleControl: {
    show: false, // 是否加载
    position: ['BOTTOM', 'LEFT'], // 先上下，后左右，大写
    x: 100,
    y: 24
  },
  // 缩放控件
  navigationControl: {
    show: false, // 是否加载
    position: ['BOTTOM', 'LEFT'], // 先上下，后左右，大写
    x: 17,
    y: 60
  },
  // 鹰眼(缩略图)
  overviewMapControl: {
    show: false, // 是否显示
    open: false, // 是否初始就打开，默认不打开false
    position: ['BOTTOM', 'RIGHT'], // 先上下，后左右，大写
    x: 10,
    y: 5
  },
  // 信息窗参数配置
  infoWinOption: {
    point: [0, 0],
    offset: [0, 33],
    type: 'normal',
    width: 300,
    title: '信息', // 信息窗口标题
    img: '',
    imgSize: ['100%', '100px'],
    content: '',
    button: [],
    info: null,
    contentHtml: '',
    customClass: ''
  },
  // 地图右键菜单
  icMapContextMenu: {
    isUsed: false, // 是否启用
    customClass: '',
    menuItem: [
      // {id: 菜单idstring, iconClass: 菜单图标类名string, label: 菜单文字string, clickEvent: 点击事件func} // 菜单项
    ]
  },
  // 覆盖物右键菜单参数配置
  ContextMenuOption: {
    isUsed: false, // 是否启用
    point: [0, 0],
    menuItem: [],
    info: '',
    customClass: ''
  },
  // 图像标注样式的默认参数
  markerStyle: {
    url: 'http://192.168.191.155:8989/VisualizePlatform/view/externalJs/images/marker.png',
    position: [19, 33],
    anchor: [10, 16],
    imageOffset: [0, 0],
    imageSize: [19, 33],
    isSymbol: false,
    SymbolShapeType: '',
    symbolPts: [],
    symbolStyle: {
      anchor: [0, 0],
      scale: 1,
      rotation: 0,
      strokeWeight: 2,
      strokeColor: '#3D82EA',
      strokeOpacity: 1,
      fillColor: '#fff',
      fillOpacity: 0.6
    }
  },
  // 文本标注样式的默认参数
  labelStyle: {
    color: '#fff',
    fontSize: '12px',
    fontFamily: '微软雅黑',
    background: 'rgba(45, 140, 240, .8)',
    width: '80px',
    height: '80px',
    padding: '20px 0',
    lineHeight: '22px',
    border: '1px solid #2d8cf0',
    borderRadius: '50px',
    // boxShadow: '4px 5px 1px rgba(45, 140, 240, .3)',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    boxSizing: 'border-box',
    offset: [0, 0],
    angle: 0,
    enableMassClear: true,
    cursor: 'pointer'
  },
  // 圆样式的默认参数
  circleStyle: {
    strokeWeight: 2,
    strokeColor: '#3D82EA',
    strokeOpacity: 1,
    strokeStyle: 'solid',
    fillColor: '#fff',
    fillOpacity: 0.6,
    enableMassClear: false
  },
  // 折线样式的默认参数
  polylineStyle: {
    strokeWeight: 4,
    strokeColor: '#3D82EA',
    strokeOpacity: 1,
    strokeStyle: 'solid',
    enableMassClear: false
  },
  // 弧线样式的默认参数
  CurveLineStyle: {
    strokeWeight: 4,
    strokeColor: '#3D82EA',
    strokeOpacity: 1,
    strokeStyle: 'solid',
    enableMassClear: false
  },
  // 多边形样式的默认参数
  polygonStyle: {
    strokeWeight: 2,
    strokeColor: '#3D82EA',
    strokeOpacity: 1,
    strokeStyle: 'solid',
    fillColor: '#fff',
    fillOpacity: 0.6,
    enableMassClear: false
  },
  // 行政区域边界
  icBoundary: {
    isUsed: false, // 是否启用
    area: [],
    polygonStyle: {
      strokeWeight: 2,
      strokeColor: '#3D82EA',
      strokeOpacity: 1,
      strokeStyle: 'solid',
      fillColor: '#fff',
      fillOpacity: 0,
      enableMassClear: false
    },
    hover: {
      isUsed: false, // 是否启用滑上效果
      polygonStyle: {
        strokeWeight: 2,
        strokeColor: '#3D82EA',
        strokeOpacity: 1,
        strokeStyle: 'solid',
        fillColor: '#fff',
        fillOpacity: 0
      },
      func: null
    }
  },
  // 热力图参数配置
  icHeatMap: {
    isUsed: false, // 是否用到热力图，用于控制是否加载相应js
    option: {
      radius: 20, // 热力图的半径
      visible: true, // 热力图是否显示
      // gradient: {}, // 热力图的渐变区间,JSON
      opacity: 0.6 // 热力的透明度,0~1
    }
  },
  // 是否添加绘制弧线类
  icCurveLine: {
    isUsed: false
  },
  // 点聚合参数配置
  icCluster: {
    isUsed: false, // 是否用到点聚合，用于控制是否加载相应js
    girdSize: 60, // 聚合计算时网格的像素大小，默认60
    maxZoom: 22, // 最大的聚合级别，大于该级别就不进行相应的聚合
    minClusterSize: 2, // 最小的聚合数量，小于该数量的不能成为一个聚合，默认为2
    isAverangeCenter: false, // 聚合点的落脚位置是否是所有聚合在内点的平均值，默认为否，落脚在聚合内的第一个点
    styles: [{ // 自定义聚合后的图标风格
      url: 'http://www.easyicon.net/api/resizeApi.php?id=501219&size=48', // 图片的url地址。(必选)
      // url: 'http://www.easyicon.net/api/resizeApi.php?id=501206&size=48', // 橙色
      // url: 'http://www.easyicon.net/api/resizeApi.php?id=501201&size=48', // 绿色
      // url: 'http://www.easyicon.net/api/resizeApi.php?id=501228&size=48', // 蓝色
      size: [48, 48], // 图片的大小。（必选）
      anchor: [0, 0], // 图标定位在地图上的位置相对于图标左上角的偏移值，默认偏移值为图标的中心位置。（可选）
      offset: [48, 48], // 图片相对于可视区域的偏移值，此功能的作用等同于CSS中的background-position属性。（可选）
      textSize: 14, // 文字的大小。（可选，默认10）
      textColor: '#fff' // 文字的颜色。（可选，默认black）
    }]
  },
  // 行车路线默认参数
  icDriving: {
    startIcon: {
      url: 'http://www.easyicon.net/api/resizeApi.php?id=1061279&size=48',
      position: [32, 32],
      anchor: [16, 32],
      imageOffset: [0, 0],
      imageSize: [32, 32]
    },
    endIcon: {
      url: 'http://www.easyicon.net/api/resizeApi.php?id=1061278&size=48',
      position: [32, 32],
      anchor: [16, 32],
      imageOffset: [0, 0],
      imageSize: [32, 32]
    },
    runIcon: {
      url: 'http://www.easyicon.net/api/resizeApi.php?id=11019&size=48',
      position: [48, 48],
      anchor: [24, 48],
      imageOffset: [0, 0],
      imageSize: [48, 48]
    },
    runIconTitle: '',
    pathStyle: {
      strokeWeight: 4,
      strokeColor: '#3D82EA',
      strokeOpacity: 0.6,
      strokeStyle: 'solid'
    },
    pathHoverStyle: {
      strokeWeight: 4,
      strokeColor: '#E6273E',
      strokeOpacity: 1,
      strokeStyle: 'solid'
    }
  },
  // 路书
  icLuShu: {
    isUsed: false, // 是否启用
    icon: {
      url: 'http://lbsyun.baidu.com/jsdemo/img/car.png',
      position: [52, 26],
      imageOffset: [0, 0],
      imageSize: [52, 26]
    },
    option: {
      speed: 4500,
      defaultContent: '',
      autoView: true,
      enableRotation: true,
      landmarkPois: []
    }
  },
  // 测距工具
  icDistanceTool: {
    isUsed: false, // 是否启用
    followText: '',
    unit: 'metric',
    lineColor: '#E6273E',
    lineStroke: 3,
    opacity: 1,
    lineStyle: 'solid'
    // secIcon: null,
    // closeIcon: null,
    // cursor: 'crosshair'
  },
  // 地图类型控件
  icMapTypeControl: {
    show: false, // 是否加载
    position: ['bottom', 'center'], // top/bottom，left/center/right
    x: 0,
    y: 5,
    customClass: '', // 自定义类名
    viewMode: ['2D', '3D', '卫星'],
    button: [
      { viewMode: '2D', label: '二 维' },
      { viewMode: '卫星', label: '实 景' },
      { viewMode: '3D', label: '三 维' }
    ] // 按钮上显示的文字
  },
  // 绘图控件
  icDrawControl: {
    isUsed: false, // 是否启用
    show: true, // 是否显示工具条
    position: ['top', 'center'], // top/bottom，left/center/right
    type: ['marker', 'circle', 'polyline', 'polygon', 'rectangle', 'clear'],
    defaultType: 'marker',
    x: 0,
    y: 20,
    customClass: '', // 自定义类名
    completeFunc: {
      marker: null,
      circle: null,
      polyline: null,
      polygon: null,
      rectangle: null,
      clear: null
    }
  },
  // 右上角工具条
  icToolBar: {
    show: false, // 是否显示
    customClass: '', // 自定义类名
    layout: ['center'], // 显示哪些功能,['center', 'traffic', 'edit', 'measure', 'coordinate', 'draw']
    position: ['right', 'top'], // 先左右，后上下
    x: 10,
    y: 20
  },
  // 搜索
  icSearchBar: {
    show: false,
    customClass: '', // 自定义类名
    keyword: '',
    placeholder: '请输入关键字',
    select: {
      show: false,
      value: [],
      dataList: [],
      // multiple: true,
      option: { label: 'text' }
    },
    searchFunc: null
  },
  // 自定义模块
  icCustomBox: [],
  icCustomBoxItem: {
    show: false, // 是否显示
    customClass: '', // 自定义类名
    position: ['right', 'top'],
    x: 10,
    y: 0,
    data: []
  }
}
//
// JM_html=======================================================================
//
const JM_html = {
  addMapDiv: function (domId, mapId) {
    var target = $('#' + domId)
    var html = '<div class=\'ic-map-div\'><div id=\'' + mapId + '\' class=\'ic-map\'></div></div>'
    target.append(html)
  },
  addMapTypeControl: function (box, btns) {
    var html = '<div class=\'ic-map-type-control\'>'
    btns.forEach(btn => {
      html += '<div class=\'ic-map-type-control-btn\'><button viewMode="' + btn.viewMode + '">' + btn.label + '</button>'
      if (btn.viewMode === '卫星') {
        html += '<div class=\'ic-map-type-control-mark\'>' +
                  '<span class=\'ic-map-checkbox-icon\'><span class=\'ic-map-checkbox-fill\'></span></span>' +
                  '<span class=\'ic-map-checkbox-label\'>标注</span>' +
                '</div>'
      }
      html += '</div>'
    })
    html += '</div>'
    box.append(html)
  },
  addToolBar: function (box, area, settings) {
    var btns = {
      'center': { label: area, icon: 'icon-position' },
      'traffic': { label: '路况', icon: 'icon-shishilukuang-copy' },
      'edit': { label: '编辑', icon: 'icon-bianji-copy-copy' },
      'coordinate': { label: '拾取坐标', icon: 'icon-zuobiao' },
      'draw': { label: '绘图', icon: 'icon-draw' },
      'measure': { label: '测距', icon: 'icon-juli-copy' }
    }
    var html = '<div class=\'ic-map-toolbar\'>'
    settings.forEach((e, index) => {
      if (index < 3) {
        var item = btns[e]
        html += '<span class=\'ic-map-toolbar-btn ' + e + '\'><i class=\'icon iconfont ' + item.icon + '\'></i>' + item.label + '</span><b></b>'
      }
    })

    if (settings.length > 3) {
      html += '<span class=\'ic-map-toolbar-btn boxBtn\'><i class=\'icon iconfont icon-tool\'></i>工具箱</span>' +
              '<div class=\'ic-map-toolbar-tool\'><b class=\'ic-map-toolbar-triangle\'></b>'
      settings.forEach((e, index) => {
        if (index >= 3) {
          var item = btns[e]
          html += '<span class=\'ic-map-toolbar-btn ' + e + '\'><i class=\'icon iconfont ' + item.icon + '\'></i>' + item.label + ' </span>'
        }
      })
      html += '</div>'
    }

    html += '</div>'
    box.append(html)
  },
  addDrawBar: function (box, typeList) {
    var html = '<div class=\'ic-edit-control\'>'
    typeList.forEach(type => {
      html += '<button data-type=\'' + type + '\'><i class=\'icon iconfont icon-map-' + type + '\'></i></button>'
    })
    html += '</div>'
    box.append(html)
  },
  addSearchBar: function (box) {
    var html = ''
    box.append(html)
  },
  addAdvancedLabel: function (box) {
    var html = ''
    box.append(html)
  }
}
//
// IcJsMap=======================================================================
//
let IcJsMap = function () {
  let icMap = this
  icMap.newObj = {
    box: null,
    option: '',
    map: null,
    init: function (domId, _option) {
      let defaultOption = JM_util.deepCopy(JM_option)
      this.option = JM_util.mergeObjectDeep(defaultOption, _option||{})
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
    // 获取地图当前级别
    $_getZoom () {
      return this.map.getZoom()
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
      let me = this
      this.buttons.click(function () {
        me.buttons.removeClass('active')
        $(this).addClass('active')

        let viewMode = $(this).attr('viewMode')
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
      let settings = icMap.newObj.option.icToolBar.layout
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
        let drawType = $(this).attr('data-type')
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
      let settings = icMap.newObj.option.icSearchBar
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

// 导出=======================================================================

window.IcJsMap = IcJsMap
