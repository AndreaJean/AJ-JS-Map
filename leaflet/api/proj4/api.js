var ezMap = {
    /**
     * 二维数组：可以插入多个图层对象
     * 参数说明：[]表示图层组,数组中[i][0]表示图层名,[i][1]表示图层的URL,[i][2]表示图层的参数设置
     * 参数类型：Array
     * 取值范围：无限制
     * 默认值：无
     */
    MapSrcURL: [
        /** 最上层图层 */
        // ["K2", "http://172.25.18.113:7001/EzServer/Maps/K2For2010", {
        //     crs: '3857',
        //     type: 'EzMap2010Local',
        //     imageSRC: '../images/shiliang.png'
        // }],

        //-------------------------------------
        //Geog2010 格式模板
        // ["公司2010格式地图(大地坐标投影)", "http://172.18.69.48:8080/EzServer6/Maps/dongcheng2d2010", {
        //     crs: '4326',
        //     type: 'EzMap2010',
        //     imageSRC: '../images/shiliang.png'
        // }],
        
		["新矢量","http://10.161.82.82:8080/EzServer7/Maps/gynewsl",{
        //GeogTdt 格式模板    
      //["矢量","/gysl",{
			crs: '4326',                     
			imageSRC: 'http://10.161.82.84:8080/EzServerClientV7121/images/shiliang.png',
			customOpts:{
					isTDT: true,
					print: true,
					layers:"arcgisslgy"
			}
		}],["矢量","http://10.161.82.82:8080/EzServer7/Maps/gysl",{
        //GeogTdt 格式模板    
      //["矢量","/gysl",{
			crs: '4326',                     
			imageSRC: 'http://10.161.82.84:8080/EzServerClientV7121/images/shiliang.png',
			customOpts:{
					isTDT: true,
					print: true,
					layers:"arcgisslgy"
			}
		}],			
	/*		["省矢量","http://10.160.8.139:8001/EzServer7/Maps/arcgissl12",{
			crs: '4326',                     
			imageSRC: 'http://10.161.82.84:8080/EzServerClientV7112/images/shiliang.png',
			customOpts:{
					isTDT: true,
					print: true,
					layers:"arcgissl12"
			}
		}],	
    ["矢量","http://10.160.8.139：8001/EzServer7/Maps/arcgisslgy",{
			crs: '4326',
			type: 'EzMap2010',
			imageSRC: 'images/shiliang.png',
			customOpts:{
					isTDT: true,
					print: true,
					layers:"lsl"
			}
						
		}],*/
        // ["test", "http://172.18.68.86:7002/PGIS_S_TileMapServer/Maps/sltdt", {
        //     crs: '4326',
        //     imageSRC: '../images/shiliang.png'
        // }],


        //-------------------------------------
        //proj2010(公司加密格式投影) 格式模板
        // ["公司加密格式(大地坐标投影)", "http://172.25.18.113:7001/EzServer/Maps/K2For2010", {
        //     crs: '3857',
        //     type: 'EzMap2010Local',
        //     imageSRC: '../images/shiliang.png'
        // }],

        /** 第二层图层 */
        // ["K3", "http://172.25.18.113:7001/EzServer/Maps/K3For2010", {
        //     crs: '3857',
        //     type: 'EzMap2010Local',
        //     imageSRC: '../images/yingxiang.png'
        // }]
       ["影像","http://10.161.82.82:8080/EzServer7/Maps/gyyx",{
			crs: '4326',
			wrapX: false,
			imageSRC: 'http://10.161.82.84:8080/EzServerClientV7121/images/yingxiang.png',
			customOpts:{
					isTDT: true,
					print: true,
					layers:"lsy"
			}		
			
		}],/*
		 ["group", "http://10.161.82.84:9090/EzServer7/Maps/gyyx1", {
            type: 'group',
            //subType: 'wmts',
            crs: '4326',
            wrapX: false,
            imageSRC: 'http://10.161.82.84:8080/EzServerClientV7112/images/yingxiang.png',
            subLayer: ["http://10.161.82.84:9090/EzServer7/Maps/gyyx2", {},"http://10.161.82.84:9090/EzServer7/Maps/gyyx3", {},"http://10.161.82.84:9090/EzServer7/Maps/gyyx4", {}]
        }],*/
		/** ... */
		/**
                ["矢影叠加","http://10.161.1.210/PGIS_S_TileMapServer/Maps/RV",{
			crs: '4326',
			type: 'EzMap2010',
			imageSRC: 'http://10.161.82.84:8080/EzServerClientV7112/images/yingxiang.png',
			customOpts:{
					isTDT: true,
					print: true,
					layers:"lsy"
			}		
		}],*/
		      ["联网地图","http://10.160.8.139:7013/PGIS_S_LWTileMap_20140624/Maps/TDT_SL",{
			crs: '4326',
			imageSRC: 'http://10.161.82.84:8080/EzServerClientV7121/images/shiliang.png',
			customOpts:{
					isTDT: false,
					print: false,
					layers:"TDT_SL"
			}		
		}]
    ],

    /**
     * 参数说明：设置地图初始化中心位置
     * 参数类型：Array<Float,Float>
     * 取值范围：无限制
     * 默认值：无
     */
    //CenterPoint: [104.114129,37.550339],
	CenterPoint: [106.66777789592743,26.596203055232763],
    // CenterPoint: [492567.23876, 326339.30273],106.74369,26.78608

    /**
     * 参数说明：设置全图显示时地图显示范围
     * 参数类型：[minx,miny,maxx,maxy]
     * 取值范围：无限制
     * 默认值：无
     */
	MapFullExtent: undefined,
    //MapFullExtent: [116.264129,39.590339,116.564129,39.79],

    /**
     * 参数说明：设置地图初始显示级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
	MapInitLevel: 13,

    /**
     * 参数说明：设置地图显示的最大级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
	MapMaxLevel: 19,

    /**
     * 参数说明：设置地图显示的最小级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
	MapMinLevel: 4,

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
};