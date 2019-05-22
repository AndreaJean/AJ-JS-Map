var JM_LL_config = {
  //
  // =========================== defaultOption转换 ==============================
  //
  converOptions: function (ov) {
    var nv = JM_util.deepCopy(ov)
    nv.mapCenter = ov.center
    nv.mapInitLevel = ov.zoom
	nv.zoomOffset=0

    return nv
  },
  cfg: {
    radius: 6, // 热力图的半径
    opacity: 0.2,
    xFeild:'jd',
    yFeild:'wd',
    valueField:'count'
  }
}
