var outerFunc = {
  test1: function (item) {
    console.log('test1', item)
  },
  test2: function (item) {
    let a = item || '333333'
    alert(JSON.stringify(a))
  },
  editMarker: function (newPoint, item) {
    console.log(newPoint, item)
  },
  onSearch: function (select, keyword) {
    this.icSearchResults = []
    this.icSearchResultList = []
    this.markerExample.data.forEach(item => {
      let obj = Object.assign({}, item)
      this.icSearchResults.push(obj)
      obj.data.forEach(e => {
        e.infoWinStyle = obj.infoWinStyle
        this.icSearchResultList.push(e)
      })
    })
    this.isSearchEnd++
    console.log(select, keyword)
  },
  onLocation: function (item) {
    testMap.$_centerAndOpenInfoWindow(item, item.infoWinStyle)
  },
  clearSearchResults: function () {
    this.icSearchResults = []
    this.icSearchResultList = []
  },
  //
  // =========================== 直接调用组件内部方法 ==============================
  //
  // 移动地图中心点
  panTo: function () {
    let coordinate = [116.397082, 39.932863]
    testMap.$_onPanTo(coordinate)
  },
  // 改变地图显示比例
  zoomTo: function () {
    testMap.$_onZoomTo(10)
  },
  // 切换地图类型
  setMapType: function () {
    let viewMode = '3D'
    testMap.$_onChangeMapType(viewMode)
  },
  // 路况
  setTrafficStatus: function (flag) {
    testMap.$_setTrafficStatus(flag)
  },
  // 开启关闭编辑状态
  setEditStatus: function (flag) {
    testMap.$_setEditStatus(flag)
  },
  // 开启关闭测距工具
  setDistanceToolStatus: function (flag) {
    testMap.$_setDistanceToolStatus(flag)
  },
  // 开启关闭绘图状态
  setDrawStatus: function (flag) {
    testMap.$_setDrawStatus(flag)
  },
  // 设置绘图类型
  setDrawMode: function () {
    testMap.$_setDrawMode('circle')
  },
  // 开启关闭拾取坐标功能
  setCoordinateStatus: function (flag) {
    testMap.$_setCoordinateStatus(flag)
  },
  // 清除全部覆盖物
  clearAllOverlays: function () {
    testMap.$_clearAllOverlays()
  },
  // 获取所有地图样式
  getMapStyle: function () {
    let vm = this
    let styles = testMap.$_getAllMapStyles()
    let item = {
      show: false,
      value: [],
      dataList: [],
      option: { label: 'text' }
    }
    styles.forEach(e => {
      let obj = Object.assign({}, e)
      obj.value = obj.style
      item.dataList.push(obj)
    })
    vm.mapTheme = item
  },
  // 切换地图样式
  setMapStyle: function (styles) {
    if (testMap) {
      testMap.$_setMapStyle(styles[0].style)
    }
  },
  // 显示/隐藏marker
  showMarkers: function (flag) {
    let data = {
      overlayType: 'marker',
      data: icMarkers1,
      infoWinStyle: {
        type: 'normal', // 默认（可传图片和一段文字）：'infoWin'，自定义：'custom'，
        customClass: 'showMarkers', // 用户自定义类名
        width: 300, // 信息窗宽度，高度自适应
        button: [
          // 信息窗中的自定义按钮
          {
            id: 'infoWinBtnConsole', // 按钮id
            label: '打印详情', // 按钮文字
            clickEvent: this.test1 // 按钮点击事件
          },
          {
            id: 'infoWinBtnAlert',
            label: '弹出详情',
            clickEvent: this.test2
          }
        ]
      },
      contextMenu: {
        isUsed: true, // 是否启用
        customClass: 'customMarkerMenu',
        menuItem: [
          {
            id: 'markerMenu0',
            iconClass: 'icon iconfont icon-shezhi1',
            label: '小红帽',
            clickEvent: outerFunc.test2
          }, // 菜单项
          {
            id: 'markerMenu1',
            iconClass: 'icon iconfont icon-yonghu2',
            label: '大灰狼',
            clickEvent: outerFunc.test2
          }, // 菜单项
          {
            id: 'markerMenu2',
            iconClass: 'icon iconfont icon-yonghu2',
            label: '猎人',
            clickEvent: outerFunc.test2
          } // 菜单项
        ]
      },
      // markerStyle: {
      //   isSymbol: true,
      //   SymbolShapeType: '五角星'
      // },
      stopDefaultClickEvent: false,
      clickEvent: this.test1,
      dragendEvent: this.editMarker
    }

    testMap.$_showOverlays(data, flag)
  },
  // 显示/隐藏圆
  showCircle: function (flag) {
    let data = {
      overlayType: 'circle',
      data: icCircle,
      infoWinStyle: {
        type: 'normal', // 默认（可传图片和一段文字）：'infoWin'，自定义：'custom'，
        customClass: 'showCircle' // 用户自定义类名
      },
      // mouseoverEvent: this.test1,
      // mouseleaveEvent: this.test1,
      stopDefaultClickEvent: false,
      clickEvent: this.test1
    }

    testMap.$_showOverlays(data, flag)
  },
  // 显示/隐藏折线
  showPolyline: function (flag) {
    let data = {
      overlayType: 'polyline',
      data: icPolyline,
      infoWinStyle: {
        type: 'normal', // 默认（可传图片和一段文字）：'infoWin'，自定义：'custom'，
        customClass: 'showPolyline' // 用户自定义类名
      },
      // mouseoverEvent: this.test1,
      // mouseleaveEvent: this.test1,
      stopDefaultClickEvent: false,
      clickEvent: this.test1
    }

    testMap.$_showOverlays(data, flag)
  },
  // 显示/隐藏弧线
  showCurveLine: function (flag) {
    let data = {
      overlayType: 'CurveLine',
      data: icPolyline,
      stopDefaultClickEvent: true,
      hoverStyle: {
        strokeWeight: 4,
        strokeColor: '#E6273E',
        strokeOpacity: 1,
        strokeStyle: 'solid'
      }
    }

    testMap.$_showOverlays(data, flag)
  },
  // 显示/隐藏多边形
  showPolygon: function (flag) {
    let data = {
      overlayType: 'polygon',
      data: icPolygon,
      infoWinStyle: {
        type: 'normal', // 默认（可传图片和一段文字）：'infoWin'，自定义：'custom'，
        customClass: 'showPolygon' // 用户自定义类名
      },
      // mouseoverEvent: this.test1,
      // mouseleaveEvent: this.test1,
      stopDefaultClickEvent: false,
      clickEvent: this.test1
    }

    testMap.$_showOverlays(data, flag)
  },
  // 显示/隐藏热力图
  showHeatMap: function (flag) {
    let data = {
      overlayType: 'heatMap',
      name: '热力图',
      max: 100,
      data: icMapHeatMap1
    }
    testMap.$_showOverlays(data, flag)
  },
  // 显示/隐藏热力图
  showLabel: function (flag) {
    let labelExample = {
      overlayType: 'label',
      clickEvent: this.test1,
      data: icLabel
    }
    testMap.$_showOverlays(labelExample, flag)
  },
  // 显示/隐藏复杂标注
  showAdvancedLabel: function (flag) {
    let me = this
    this.icAdvancedLabel = icAdvancedLabelEg
    // console.log(icAdvancedLabelEg)
    let labelExample = {
      overlayType: 'AdvancedLabel',
      stopDefaultClickEvent: true,
      data: icAdvancedLabelEg
    }
    testMap.$_showOverlays(labelExample, flag)
  },
  // 设置覆盖物样式
  setOverlayStyle: function () {
    let id = 'point1'
    let polygonStyle = {
      strokeWeight: 5,
      strokeColor: '#ff6600'
    }
    let labelStyle = {
      color: '#ff6600',
      border: '1px solid #ff6600'
    }
    let markerStyle = {
      url: 'https://www.easyicon.net/api/resizeApi.php?id=1061287&size=32',
      position: [32, 32],
      imageOffset: [0, 0],
      imageSize: [32, 32]
    }

    // testMap.$_setOverlayStyle(id, polygonStyle)
    testMap.$_setOverlayStyle(id, markerStyle)
    // testMap.$_setOverlayStyle(id, labelStyle)
  },
  // 获取两点间的驾车路线规划方案
  getDrivingPath: function () {
    testMap.$_getDrivingPath([116.341334, 39.883781], [116.554628, 39.971424], '避开高速')
    testMap.$_getDrivingPath([116.245898, 39.992654], [116.40285, 39.944878], '避开高速')
  },
  getDrivingPathAndRun: function () {
    testMap.$_getDrivingPathAndRun([116.245898, 39.992654], [116.40285, 39.944878], 50)
  },
  // 清除地图上的所有行车路线
  clearDrivingPath: function () {
    testMap.$_clearDrivingPath()
  },
  // 路书
  setLuShu: function (action) {
    if (action === 'path') {
      // testMap.$_getDrivingPathAndLuShu([116.245898, 39.992654], [116.40285, 39.944878], '避开高速', {option: {defaultContent: '诺亚方舟'}})
      testMap.$_getDrivingPathAndLuShu([116.341334, 39.883781], [116.554628, 39.971424], '避开高速', { option: { defaultContent: '友谊的小船' } })
    } else {
      testMap.$_setLuShuAction(action)
    }
  }
}
var testData = {
  options1: {}, // 地图参数
  options2: {}, // 地图参数
  isShow: false, // 地图显示控制
  isSearchEnd: 0, // 搜索结束标识
  scaleControl: {
    // 比例尺
    show: true // 是否加载，默认不显示false
  },
  navigationControl: {
    // 缩放控件
    show: true // 是否加载，默认不显示false
  },
  overviewMapControl: {
    // 鹰眼(缩略图)
    show: true // 是否加载，默认不显示false
  },
  icMapTypeControl: {
    // 地图类型控件
    show: true, // 是否加载，默认不显示false
    button: [
      { viewMode: '2D', label: '二 维' },
      { viewMode: '卫星', label: '实 景' },
      { viewMode: '3D', label: '三 维' }
    ] // 按钮上显示的文字
  },
  icHeatMap: {// 热力图参数配置
    isUsed: true
  },
  icCluster: { // 点聚合参数配置
    isUsed: false
  },
  icToolBar: {// 右上角工具条
    show: true, // 是否显示
    layout: ['center', 'coordinate', 'measure', 'edit', 'draw'] // 显示哪些功能
  },
  icDrawControl: {
    isUsed: true, // 是否启用
    completeFunc: {
      marker: outerFunc.test1,
      circle: outerFunc.test1,
      polyline: outerFunc.test1,
      polygon: outerFunc.test1
    }
  },
  icSearchBar: {
    // 搜索工具条
    show: true,
    customClass: 'customSearch', // 自定义类名
    select: {
      show: true,
      value: [],
      dataList: [
        { text: '分类一', value: 1, select: true },
        { text: '分类二', value: 2 }
      ],
      // multiple: true,
      option: { label: 'text' }
    },
    searchFunc: outerFunc.test1
  },
  icSearchResults: [], // 传给地图的搜索结果，带有分类的特殊信息，譬如iconStyle
  icMapContextMenu: {
    // 地图右键菜单
    isUsed: true, // 是否启用
    menuItem: [
      {
        id: 'menu0',
        iconClass: 'icon iconfont icon-shezhi1',
        label: '测试',
        clickEvent: outerFunc.test2
      } // 菜单项
    ]
  },
  markerExample: {
    // marker示例
    show: true,
    customClass: 'customMarkers', // 自定义类名
    position: ['right', 'top'], // 先左右，后上下
    x: 10,
    y: 76,
    data: [
      {
        overlayType: 'marker',
        name: '燕歌行',
        active: false,
        data: icMarkers2,
        infoWinStyle: {
          type: 'normal', // 默认（可传图片和一段文字）：'infoWin'，自定义：'custom'，
          customClass: 'customInfoWin', // 用户自定义类名
          width: 300, // 信息窗宽度，高度自适应
          button: [
            // 信息窗中的自定义按钮
            {
              id: 'infoWinBtnConsole', // 按钮id
              label: '打印详情', // 按钮文字
              clickEvent: outerFunc.test1 // 按钮点击事件
            },
            {
              id: 'infoWinBtnAlert',
              label: '弹出详情',
              clickEvent: outerFunc.test2
            }
          ]
        },
        contextMenu: {
          isUsed: true, // 是否启用
          customClass: 'customMarkerMenu',
          menuItem: [
            {
              id: 'markerMenu0',
              iconClass: 'icon iconfont icon-shezhi1',
              label: '小红帽',
              clickEvent: outerFunc.test2
            }, // 菜单项
            {
              id: 'markerMenu1',
              iconClass: 'icon iconfont icon-yonghu2',
              label: '大灰狼',
              clickEvent: outerFunc.test2
            }, // 菜单项
            {
              id: 'markerMenu2',
              iconClass: 'icon iconfont icon-yonghu2',
              label: '猎人',
              clickEvent: outerFunc.test2
            } // 菜单项
          ]
        },
        dragendEvent: outerFunc.editMarker,
        stopDefaultClickEvent: true
        // clickEvent: outerFunc.test1
      },
      {
        overlayType: 'marker',
        name: '长恨歌',
        active: false,
        data: icMarkers1,
        markerStyle: icMarkerStyle1,
        infoWinStyle: {
          type: 'normal', // 默认（可传图片和一段文字）：'infoWin'，自定义：'custom'
          customClass: 'customInfoWin2', // 用户自定义类名
          imgSize: ['80%', '120px'], // 图片[宽, 高]，默认['100%','100px']
          button: [
            { id: 'infoWinBtnTest', label: '测试', clickEvent: outerFunc.test2 }
          ]
        },
        dragendEvent: outerFunc.editMarker
      },
      {
        overlayType: 'marker',
        name: '自定义',
        active: false,
        data: icMarkers3,
        markerStyle: icMarkerStyle2,
        infoWinStyle: {
          type: 'custom', // 默认（可传图片和一段文字）：'infoWin'，自定义：'custom'
          imgSize: ['80%', '120px'], // 图片[宽, 高]，默认['100%','100px']
          button: [
            { id: 'infoWinBtnTest', label: '测试', clickEvent: outerFunc.test2 }
          ]
        }
      }
    ]
  },
  heatMapExample: {
    // 热力图示例
    show: true,
    customClass: 'customHeatMap', // 自定义类名
    position: ['right', 'top'], // 先左右，后上下
    x: 10,
    y: 198,
    data: [
      {
        overlayType: 'heatMap',
        name: '热力图',
        active: false,
        max: 100,
        data: icMapHeatMap
      }
    ]
  },
  icSearchResultList: [], // 搜索结果列表
  mapTheme: {},
  icAdvancedLabel: {}
}
var testOption = {
  // id: 'beijing', // 地图id，必填
  area: '北京', // 地图显示的城市，必填
  center: [116.259882, 39.900], // 中心点坐标，必填
  // extent: [[116.224237, 39.999639], [116.552514, 39.863756]], // 左上角和右下角取点坐标
  zoom: 12, // 地图初加载时展示的级别，必填
  // minZoom: 14, // 地图允许展示的最小级别
  // maxZoom: 17, // 地图允许展示的最大级别
  mapStyle: 'normal', // 地图样式
  viewMode: '2D', // 显示的地图类型
  scaleControl: testData.scaleControl, // 是否显示比例尺
  navigationControl: testData.navigationControl, // 是否显示缩放控件
  overviewMapControl: testData.overviewMapControl, // 是否显示鹰眼(缩略图)
  // enableScrollWheelZoom: true, // 是否允许滚轮缩放地图，默认true
  // enableDragging: true, // 是否允许拖拽，默认true
  // enableHighResolution: true, // 是否启用使用高分辨率地图。在iPhone4及其后续设备上，可以通过开启此选项获取更高分辨率的底图，v1.2,v1.3版本默认不开启，v1.4默认为开启状态
  // enableAutoResize: true, // 是否自动适应地图容器变化，默认启用
  // enableMapClick: false, // 是否开启底图可点功能，默认不启用
  icMapOnloadFunc: null, // 用户自定义地图加载完成后立即执行的方法
  icMapTypeControl: testData.icMapTypeControl, // 是否显示地图类型控件
  icToolBar: testData.icToolBar, // 右上角工具条
  icSearchBar: testData.icSearchBar, // 搜索工具条
  icHeatMap: testData.icHeatMap, // 热力图参数配置
  icCluster: testData.icCluster, // 点聚合参数配置
  icMapContextMenu: testData.icMapContextMenu, // 地图右键菜单配置
  icDrawControl: testData.icDrawControl,
  icCustomBox: [
    // this.markerExample,
    // this.heatMapExample
  ], // 自定义模块
  infoWinOption: {
    width: 250
  },
  icBoundary: {
    isUsed: false,
    area: ['北京市朝阳区', '北京市东城区', '北京市昌平区'],
    hover: {
      isUsed: true,
      // func: this.test1,
      polygonStyle: {
        strokeColor: '#ff0000'
      }
    }
  },
  // 监听回调
  listenerFunc: function (flag, info) {
    if (flag === 'coordinate') {
      console.log('获取坐标：', info)
    }
    if (flag === 'DistanceTool') {
      console.log('DistanceTool', info)
    }
  },
  icDistanceTool: {
    isUsed: true // 是否启用
  }
  // icNoControlFunc: this.icNoControlFunc // 无控制按钮功能，地图加载完成即执行
}
