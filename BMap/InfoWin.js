// 定义构造函数并继承Overlay
var JM_InfoWin = function (option) {
  this.overlayType = 'InfoWin'
  this._default = Object.assign({}, option)
  this._option = Object.assign({}, option)
}
JM_InfoWin.prototype = new BMap.Overlay()
// 初始化
JM_InfoWin.prototype.initialize = function (map) {
  this._map = map

  var div = document.createElement('div')
  div.setAttribute('id', 'icMapInfoWin')
  div.setAttribute('class', 'ic-map-infoWin')
  map.getPanes().floatPane.appendChild(div)
  this._div = div

  return div
}
// 绘制
JM_InfoWin.prototype.draw = function () {
  var position = this._map.pointToOverlayPixel(this._option.point)
  this._div.setAttribute('class', 'ic-map-infoWin ' + this._option.customClass)
  this._div.style.width = this._option.width + 'px'
  this._div.style.left = position.x - this._option.offset[0] + 'px'
  this._div.style.top = position.y - this._option.offset[1] + 'px'
}
// 显示
JM_InfoWin.prototype.show = function (option) {
  var _this = this
  this._option = JM_util.mergeObjectDeep(this._default, option)
  if (this._div) {
    this._div.style.display = 'block'
    this._div.innerHTML = createHtml(this._option)
    this.draw()

    // X按钮事件绑定
    document.getElementById('icMapInfoWinCancleBtn').onclick = function () {
      _this.hide()
    }

    // 禁止信息窗口上的地图双击事件
    document.getElementById('icMapInfoWin').ondblclick = function (ev) {
      var oEvent = ev || event
      oEvent.cancelBubble = true
      oEvent.stopPropagation()
    }

    // 按钮事件绑定
    if (this._option.button.length) {
      this._option.button.forEach(e => {
        document.getElementById(e.id).onclick = function () {
          e.clickEvent(_this._option.info)
        }
      })
    }
  }
}
// 隐藏
JM_InfoWin.prototype.hide = function () {
  if (this._div) {
    var position = this._map.pointToOverlayPixel(this._default.point)
    this._div.style.left = position.x + 'px'
    this._div.style.top = position.y + 'px'
    this._div.style.display = 'none'
  }
}
// 信息窗dom
function createHtml (option) {
  if (option.type === 'normal') {
    return normalWin(option)
  } else if (option.type === 'custom') {
    return customWin(option)
  } else {
    return false
  }
}
// 常规（图片/一段文字/图片+一段文字）
function normalWin (option) {
  var text = '<div class="ic-map-infoWin-title">' + option.title + '<i id="icMapInfoWinCancleBtn" class="icon iconfont icon-shanchu1"></i></div>' +
    '<span class="ic-map-infoWin-triangle"></span>' +
    '<div class="ic-map-infoWin-content">'
  if (JM_util.checkNull(option.img)) {
    text += '<span class="ic-map-infoWin-img" style="width:' + option.imgSize[0] + ';height:' + option.imgSize[1] + ';"><img src="' + option.img + '"/></span>'
  }
  if (JM_util.checkNull(option.content)) {
    text += '  <p>' + option.content + '</p>'
  }
  if (option.button.length) {
    option.button.forEach(e => {
      text += '<button id="' + e.id + '">' + e.label + '</button>'
    })
  }
  text += '</div>'
  return text
}
// 自定义
function customWin (option) {
  var text = '<div class="ic-map-infoWin-title">' + option.title + '<i id="icMapInfoWinCancleBtn" class="icon iconfont icon-shanchu1"></i></div>' +
    '<span class="ic-map-infoWin-triangle"></span>' +
    '<div class="ic-map-infoWin-content">'
  if (JM_util.checkNull(option.contentHtml)) {
    text += option.contentHtml
  }
  if (option.button.length) {
    option.button.forEach(e => {
      text += '<button id="' + e.id + '">' + e.label + '</button>'
    })
  }
  text += '</div>'
  return text
}
