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

// 地图样式，百度
const JM_stylesB = [
  { style: 'normal', label: '默认风格' },
  { style: 'light', label: '清新蓝风格' },
  { style: 'dark', label: '黑夜风格' },
  { style: 'redalert', label: '红色警戒风格' },
  { style: 'googlelite', label: '精简风格' },
  { style: 'grassgreen', label: '自然绿风格' },
  { style: 'midnight', label: '午夜蓝风格' },
  { style: 'pink', label: '浪漫粉风格' },
  { style: 'darkgreen', label: '青春绿风格' },
  { style: 'bluish', label: '清新蓝绿风格' },
  { style: 'grayscale', label: '高端灰风格' },
  { style: 'hardedge', label: '强边界风格' }
]
// 地图样式，高德
const JM_stylesG = [
  { style: 'normal', label: '标准' },
  { style: 'dark', label: '幻影黑' },
  { style: 'light', label: '月光银' },
  { style: 'fresh', label: '草色青' },
  { style: 'grey', label: '雅士灰' },
  { style: 'graffiti', label: '涂鸦' },
  { style: 'whitesmoke', label: '远山黛' },
  { style: 'macaron', label: '马卡龙' },
  { style: 'blue', label: '靛青蓝' },
  { style: 'darkblue', label: '极夜蓝' },
  { style: 'wine', label: '酱籽' }
]
