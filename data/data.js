var icMarkers1 = [
  { id: 'point0', title: '长恨歌1', lng: 116.494447, lat: 39.958947, content: '汉皇重色思倾国，御宇多年求不得。', img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524831990105&di=2c8f65ff28ac69f8c05443d1a607b121&imgtype=0&src=http%3A%2F%2Fww1.sinaimg.cn%2Fbmiddle%2F43a39d58gw1emoikb3o0qj20c80bh0tu.jpg' },
  { id: 'point1', title: '长恨歌2-3', lng: 116.259882, lat: 39.98195, img: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2613409845,1777072018&fm=58&bpow=776&bpoh=718' },
  { id: 'point2', title: '长恨歌4-6', lng: 116.404287, lat: 39.913008, content: '回眸一笑百媚生，六宫粉黛无颜色。春寒赐浴华清池，温泉水滑洗凝脂。侍儿扶起娇无力，始是新承恩泽时。' }
]
var icMarkers2 = [
  { id: 'point5', title: '燕歌行', lng: 116.421804, lat: 39.900988, content: '贱妾茕茕守空房，忧来思君不敢忘，不觉泪下沾衣裳。', img: 'https://ss3.baidu.com/-rVXeDTa2gU2pMbgoY3K/it/u=813075485,1205066043&fm=202&mola=new&crop=v1' }
]
var icMarkers3 = [
  { id: 'point6', title: '自定义内容', lng: 116.397082, lat: 39.932863, contentHtml: '<ul class="testInfoWinUl"><li>昔我往矣，杨柳依依；今我来思，雨雪霏霏。</li><li>青青子衿，悠悠我心。</li><li>高山仰止，景行行止。</li><li>知人者智，自知者明。</li></ul>' }
]
var icLabel = [
  { id: 'label0', text: 'label0', lng: 116.494447, lat: 39.958947, content: 'I can swear I can joke',title:"A" },
  { id: 'label1', text: 'label1', lng: 116.259882, lat: 39.98195, content: 'I say whats on my mind',title:"B" },
  { id: 'label2', text: 'label2', lng: 116.404287, lat: 39.913008, content: 'If I drink if I smoke',title:"V" },
  { id: 'label3', text: 'label3', lng: 116.321397, lat: 39.860654, content: 'I keep up with the guys',title:"G" },
  { id: 'label4', text: 'label4', lng: 116.305875, lat: 39.920001, content: 'And youll see me holding up' },
  { id: 'label5', text: 'label5', lng: 116.421804, lat: 39.900988, content: 'My middle finger to the world' },
  { id: 'label6', text: 'label6', lng: 116.397082, lat: 39.932863, content: 'Fuck your ribbons and your pearls' }
]
var icAdvancedLabelEg = [
  { id: 'advancedLabel0', center: [116.423493, 39.907445], text: 'aaa' },
  { id: 'advancedLabel1', center: [116.176333, 39.983367], text: 'bbb' },
  { id: 'advancedLabel2', center: [116.320637, 40.029348], text: 'cccc' },
  { id: 'advancedLabel3', center: [116.444244, 40.040839], text: 'dddddd' }
]
var icMapHeatMap = [
  { lng: 116.39622, lat: 39.933306, count: 1 },
  { lng: 116.402652, lat: 39.932116, count: 1 },
  { lng: 116.403263, lat: 39.923097, count: 1 }

]
var icMapHeatMap1 = [
  { 'lng': 116.418261, 'lat': 39.921984, 'count': 50 },
  { 'lng': 116.423332, 'lat': 39.916532, 'count': 51 },
  { 'lng': 116.419787, 'lat': 39.930658, 'count': 15 },
  { 'lng': 116.418455, 'lat': 39.920921, 'count': 40 },
  { 'lng': 116.418843, 'lat': 39.915516, 'count': 100 },
  { 'lng': 116.42546, 'lat': 39.918503, 'count': 6 },
  { 'lng': 116.423289, 'lat': 39.919989, 'count': 18 },
  { 'lng': 116.418162, 'lat': 39.915051, 'count': 80 },
  { 'lng': 116.422039, 'lat': 39.91782, 'count': 11 },
  { 'lng': 116.41387, 'lat': 39.917253, 'count': 7 },
  { 'lng': 116.41773, 'lat': 39.919426, 'count': 42 },
  { 'lng': 116.421107, 'lat': 39.916445, 'count': 4 },
  { 'lng': 116.417521, 'lat': 39.917943, 'count': 27 },
  { 'lng': 116.419812, 'lat': 39.920836, 'count': 23 },
  { 'lng': 116.420682, 'lat': 39.91463, 'count': 60 },
  { 'lng': 116.415424, 'lat': 39.924675, 'count': 8 },
  { 'lng': 116.419242, 'lat': 39.914509, 'count': 15 },
  { 'lng': 116.422766, 'lat': 39.921408, 'count': 25 },
  { 'lng': 116.421674, 'lat': 39.924396, 'count': 21 },
  { 'lng': 116.427268, 'lat': 39.92267, 'count': 1 },
  { 'lng': 116.417721, 'lat': 39.920034, 'count': 51 },
  { 'lng': 116.412456, 'lat': 39.92667, 'count': 7 },
  { 'lng': 116.420432, 'lat': 39.919114, 'count': 11 },
  { 'lng': 116.425013, 'lat': 39.921611, 'count': 35 },
  { 'lng': 116.418733, 'lat': 39.931037, 'count': 22 },
  { 'lng': 116.419336, 'lat': 39.931134, 'count': 4 },
  { 'lng': 116.413557, 'lat': 39.923254, 'count': 5 },
  { 'lng': 116.418367, 'lat': 39.92943, 'count': 3 },
  { 'lng': 116.424312, 'lat': 39.919621, 'count': 100 },
  { 'lng': 116.423874, 'lat': 39.919447, 'count': 87 },
  { 'lng': 116.424225, 'lat': 39.923091, 'count': 32 },
  { 'lng': 116.417801, 'lat': 39.921854, 'count': 44 },
  { 'lng': 116.417129, 'lat': 39.928227, 'count': 21 },
  { 'lng': 116.426426, 'lat': 39.922286, 'count': 80 },
  { 'lng': 116.421597, 'lat': 39.91948, 'count': 32 },
  { 'lng': 116.423895, 'lat': 39.920787, 'count': 26 },
  { 'lng': 116.423563, 'lat': 39.921197, 'count': 17 },
  { 'lng': 116.417982, 'lat': 39.922547, 'count': 17 },
  { 'lng': 116.426126, 'lat': 39.921938, 'count': 25 },
  { 'lng': 116.42326, 'lat': 39.915782, 'count': 100 },
  { 'lng': 116.419239, 'lat': 39.916759, 'count': 39 },
  { 'lng': 116.417185, 'lat': 39.929123, 'count': 11 },
  { 'lng': 116.417237, 'lat': 39.927518, 'count': 9 },
  { 'lng': 116.417784, 'lat': 39.915754, 'count': 47 },
  { 'lng': 116.420193, 'lat': 39.917061, 'count': 52 },
  { 'lng': 116.422735, 'lat': 39.915619, 'count': 100 },
  { 'lng': 116.418495, 'lat': 39.915958, 'count': 46 },
  { 'lng': 116.416292, 'lat': 39.931166, 'count': 9 },
  { 'lng': 116.419916, 'lat': 39.924055, 'count': 8 },
  { 'lng': 116.42189, 'lat': 39.921308, 'count': 11 },
  { 'lng': 116.413765, 'lat': 39.929376, 'count': 3 },
  { 'lng': 116.418232, 'lat': 39.920348, 'count': 50 },
  { 'lng': 116.417554, 'lat': 39.930511, 'count': 15 },
  { 'lng': 116.418568, 'lat': 39.918161, 'count': 23 },
  { 'lng': 116.413461, 'lat': 39.926306, 'count': 3 },
  { 'lng': 116.42232, 'lat': 39.92161, 'count': 13 },
  { 'lng': 116.4174, 'lat': 39.928616, 'count': 6 },
  { 'lng': 116.424679, 'lat': 39.915499, 'count': 21 },
  { 'lng': 116.42171, 'lat': 39.915738, 'count': 29 },
  { 'lng': 116.417836, 'lat': 39.916998, 'count': 99 },
  { 'lng': 116.420755, 'lat': 39.928001, 'count': 10 },
  { 'lng': 116.414077, 'lat': 39.930655, 'count': 14 },
  { 'lng': 116.426092, 'lat': 39.922995, 'count': 16 },
  { 'lng': 116.41535, 'lat': 39.931054, 'count': 15 },
  { 'lng': 116.413022, 'lat': 39.921895, 'count': 13 },
  { 'lng': 116.415551, 'lat': 39.913373, 'count': 17 },
  { 'lng': 116.421191, 'lat': 39.926572, 'count': 1 },
  { 'lng': 116.419612, 'lat': 39.917119, 'count': 9 },
  { 'lng': 116.418237, 'lat': 39.921337, 'count': 54 },
  { 'lng': 116.423776, 'lat': 39.921919, 'count': 26 },
  { 'lng': 116.417694, 'lat': 39.92536, 'count': 17 },
  { 'lng': 116.415377, 'lat': 39.914137, 'count': 19 },
  { 'lng': 116.417434, 'lat': 39.914394, 'count': 43 },
  { 'lng': 116.42588, 'lat': 39.922622, 'count': 27 },
  { 'lng': 116.418345, 'lat': 39.919467, 'count': 8 },
  { 'lng': 116.426883, 'lat': 39.917171, 'count': 3 },
  { 'lng': 116.423877, 'lat': 39.916659, 'count': 34 },
  { 'lng': 116.415712, 'lat': 39.915613, 'count': 14 },
  { 'lng': 116.419869, 'lat': 39.931416, 'count': 12 },
  { 'lng': 116.416956, 'lat': 39.925377, 'count': 11 },
  { 'lng': 116.42066, 'lat': 39.925017, 'count': 38 },
  { 'lng': 116.416244, 'lat': 39.920215, 'count': 91 },
  { 'lng': 116.41929, 'lat': 39.915908, 'count': 54 },
  { 'lng': 116.422116, 'lat': 39.919658, 'count': 21 },
  { 'lng': 116.4183, 'lat': 39.925015, 'count': 15 },
  { 'lng': 116.421969, 'lat': 39.913527, 'count': 3 },
  { 'lng': 116.422936, 'lat': 39.921854, 'count': 24 },
  { 'lng': 116.41905, 'lat': 39.929217, 'count': 12 },
  { 'lng': 116.424579, 'lat': 39.914987, 'count': 57 },
  { 'lng': 116.42076, 'lat': 39.915251, 'count': 70 },
  { 'lng': 116.425867, 'lat': 39.918989, 'count': 8 }
]
var icCircle = [
  { id: 'circle0', title: '圆示例1', center: [116.637416, 39.793363], radius: 3036 },
  { id: 'circle1', title: '圆示例2', center: [116.101594, 39.791589], radius: 8036 }
]
var icPolyline = [
  { id: 'polyline0', title: '折线示例', center: [116.423493, 39.907445], points: [[116.176333, 39.983367], [116.320637, 40.029348], [116.444244, 40.040839], [116.617869, 39.991327], [116.636841, 39.879351], [116.489087, 39.776951]] }
]
var icPolygon = [
  { id: 'polygon0', title: '多边形示例', center: [116.386178, 39.909909], points: [[116.30224, 39.962577], [116.438495, 39.965673], [116.536231, 39.883781], [116.413774, 39.826619], [116.255097, 39.892639]] }
]
