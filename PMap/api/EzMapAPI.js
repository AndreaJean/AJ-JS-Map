/*
|------------------------------------------------------------------------------
|                                   EzMapAPI.js
|
|@author: qianleyi
|@date: 2015-11-27
|@descript: 基础地图初始化配置设置
|------------------------------------------------------------------------------
*/

window.ezMap = {
  /**
     * 二维数组：可以插入多个图层对象
     * 参数说明：[]表示图层组,数组中[i][0]表示图层名,[i][1]表示图层的URL,[i][2]表示图层的参数设置
     * 参数类型：Array
     * 取值范围：无限制
     * 默认值：无
     */
  MapSrcURL: [
    ['最新', 'http://10.8.6.103/PGIS_S_TileMapServer/Maps/BJSL', {
      crs: '4326',
      imageSRC: 'PMap/images/shiliang.png',
      customOpts: {
        isTDT: true,
        print: true,
        layers: 'BJSL'
      }
    }],
    ['公安导航', 'http://10.1.12.35:7001/PGIS_S_TileMapServer/Maps/GDDH', {
      crs: '4326',
      imageSRC: 'PMap/images/shiliang.png',
      customOpts: {
        isTDT: true,
        print: true,
        layers: 'GDDH'
      }
    }],
    ['矢影', 'http://10.8.6.103/PGIS_S_TileMapServer/Maps/RV', {
      crs: '4326',
      imageSRC: 'PMap/images/yingxiang.png',
      type: 'EzMap2010'
    }],
    ['影像', 'http://10.8.6.103/PGIS_S_TileMapServer/Maps/Sate', {
      crs: '4326',
      imageSRC: 'PMap/images/yingxiang.png',
      type: 'EzMap2010'
    }],
    ['矢量', 'http://10.8.6.103/PGIS_S_TileMapServer/Maps/default', {
      crs: '4326',
      imageSRC: 'PMap/images/shiliang.png',
      type: 'EzMap2010'
    }]

  ],

  /**
     * 参数说明：设置地图初始化中心位置
     * 参数类型：Array<Float,Float>
     * 取值范围：无限制
     * 默认值：无
     */
  CenterPoint: [116.40625, 39.89985],

  /**
     * 参数说明：设置全图显示时地图显示范围
     * 参数类型：[minx,miny,maxx,maxy]
     * 取值范围：无限制
     * 默认值：无
     */
  MapFullExtent: undefined,

  /**
     * 参数说明：设置地图初始显示级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
  MapInitLevel: 12,

  /**
     * 参数说明：设置地图显示的最大级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
  MapMaxLevel: 18,

  /**
     * 参数说明：设置地图显示的最小级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
  MapMinLevel: 1,

  /**
     * 参数说明：是否添加地图级别控制条hover样式
     * 参数类型：Boolean
     * 取值范围：无限制
     * 默认值：无
     */
  isTitleArea: true,

  /**
     * 参数说明：Animation 瓦片是否提前加载
     * 参数类型：Boolean
     * 取值范围：无限制
     * 默认值：false
     */
  loadTilesWhileAnimating: false
}
