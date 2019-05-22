var JM_html = {
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
  addSearchBar: function (box, settings) {
    var html = '<div class="ic-map-search ' + settings.customClass + '">' +
                '<input class="ic-map-search-input" type="text" />' +
                '<span class="ic-map-search-clear"><i class="icon iconfont icon-shanchu2"></i></span>' +
                '<span class="ic-map-search-btn"><i class="icon iconfont icon-sousuo"></i></span>' +
              '</div>'
    box.append(html)
  },
  addSearchResult: function (box, htmlCode) {
    var html = '<div class="ic-map-result">' + htmlCode + '</div>'
    box.append(html)
  },
  addAdvancedLabel: function (box) {
    var html = ''
    box.append(html)
  }
}
