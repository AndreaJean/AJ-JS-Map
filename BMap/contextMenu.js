// 定义构造函数并继承Overlay
var JM_ContextMenu = function (option) {
  this.overlayType = 'ContextMenu'
  this._default = option

  if (JM_util.checkNull(option)) {
    this._option = JM_util.mergeObjectDeep(this._default, option)
  } else {
    this._option = Object.assign({}, this._default)
  }
}
JM_ContextMenu.prototype = new BMap.Overlay()
// 初始化
JM_ContextMenu.prototype.initialize = function (map) {
  this._map = map

  var div = document.createElement('div')
  div.setAttribute('id', 'icMapContextMenu')
  div.setAttribute('class', 'ic-map-contextMenu')
  map.getPanes().labelPane.appendChild(div)
  this._div = div

  return div
}
// 绘制
JM_ContextMenu.prototype.draw = function () {
  var position = this._map.pointToOverlayPixel(this._option.point)
  this._div.setAttribute('class', 'ic-map-contextMenu ' + this._option.customClass)
  this._div.style.left = position.x + 'px'
  this._div.style.top = position.y + 'px'
}
// 显示
JM_ContextMenu.prototype.show = function (option) {
  var _this = this
  this._option = JM_util.mergeObjectDeep(this._default, option)
  if (this._div) {
    this._div.style.display = 'block'
    this._div.innerHTML = createMenuHtml(this._option)
    this.draw()

    // 禁止信息窗口上的地图双击事件
    document.getElementById('icMapContextMenu').ondblclick = function (ev) {
      var oEvent = ev || event
      oEvent.cancelBubble = true
      oEvent.stopPropagation()
    }

    // 单击关闭菜单
    document.onclick = function (ev) {
      _this.hide()
    }

    // 菜单项点击事件绑定
    if (this._option.menuItem.length) {
      this._option.menuItem.forEach(e => {
        document.getElementById(e.id).onclick = function () {
          _this.hide()
          e.clickEvent(_this._option.info)
        }
      })
    }
  }
}
// 隐藏
JM_ContextMenu.prototype.hide = function () {
  if (this._div) {
    var position = this._map.pointToOverlayPixel(this._default.point)
    this._div.style.left = position.x + 'px'
    this._div.style.top = position.y + 'px'
    this._div.style.display = 'none'
  }
}
// 信息窗dom
function createMenuHtml (option) {
  var html = '<ul>'
  if (option.menuItem.length) {
    option.menuItem.forEach(e => {
      html += '<li id="' + e.id + '">'
      if (JM_util.checkNull(e.iconClass)) {
        html += '<i class="' + e.iconClass + '"></i>'
      }
      html += e.label + '</li>'
    })
  }
  html += '</ul>'
  return html
}
