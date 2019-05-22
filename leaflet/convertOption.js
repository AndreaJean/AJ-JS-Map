var JM_LL_config = {
  //
  // =========================== defaultOption转换 ==============================
  //
  converOptions: function (ov,crs) {
    var nv = JM_util.deepCopy(ov)
    //nv.crs = this.crs_baidu
    nv.crs = L.CRS.EPSG4326
	console.log(nv.crs)
    nv.center = [ov.center[1], ov.center[0]]
    nv.layers = []
    nv.zoomControl = false
    nv.attributionControl = false
    nv.doubleClickZoom = ov.enableDoubleClickZoom
    nv.dragging = ov.enableDragging
    nv.scrollWheelZoom = ov.enableScrollWheelZoom

    return nv
  },
  //
  // =========================== 地图瓦片地址 ==============================
  //
  //tileUrl: 'http://online{s}.map.bdimg.com/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl',
  tileUrl: 'http://10.8.6.103/PGIS_S_TileMapServer/Maps/default/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col={x}&Row={y}&Zoom={z}&V=0.3',
  //tileUrl: 'http://10.8.6.103/PGIS_S_TileMapServer/Maps/BJSL/EzMap?Service=getImage&Type=RGB&ZoomOffset=0&Col=843&Row=141&Zoom=10&V=1.0.0',
  //
  // =========================== 转换百度地图坐标系 ==============================
  //
  crs_baidu: new L.Proj.CRS('EPSG:900913', '+proj=merc +a=6378206 +b=6356584.314245179 +lat_ts=0.0 +lon_0=0.0 +x_0=0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs',
    {
      resolutions: (function () {
        var level = 19
        var res = []
        res[0] = Math.pow(2, 18)
        for (var i = 1; i < level; i++) {
          res[i] = Math.pow(2, (18 - i))
        }
        return res
      }()),
      origin: [0, 0],
      bounds: L.bounds([20037508.342789244, 0], [0, 20037508.342789244])
    }),
  //
  // =========================== 转换百度地图坐标系 ==============================
  //
  crs_pgis: new L.Proj.CRS('EPSG:4490', '+proj=longlat +ellps=GRS80 +no_defs',
    {
      resolutions: [
        1.40625,
        0.703125,
        0.3515625,
        0.17578125,
        0.087890625,
        0.0439453125,
        0.02197265625,
        0.010986328125,
        0.0054931640625,
        0.00274658203125,
        0.001373291015625,
        6.866455078125E-4,
        3.433227539062E-4,
        1.716613769531E-4,
        8.58306884766E-5,
        4.29153442383E-5,
        2.14576721191E-5,
        1.07288360596E-5,
        5.3644180298E-6,
        2.6822090149E-6,
        1.3411045074E-6,
        6.705522537E-7
      ],
      origin: [-180, 90],
      bounds: L.bounds([-180.0, -90.0], [180.0, 90.0])
    }),
  //
  // =========================== 热力图参数 ==============================
  //
  cfg: {
    minOpacity: 0.5,
    max: 1.0,
    radius: 20, // 热力图的半径
    blur: 15, // 热力图边缘的阴影宽
    gradient: { 0.45: 'rgb(0,0,255)', 0.55: 'rgb(0,255,255)', 0.65: 'rgb(0,255,0)', 0.95: 'yellow', 1.0: 'rgb(255,0,0)' }
  }
}
