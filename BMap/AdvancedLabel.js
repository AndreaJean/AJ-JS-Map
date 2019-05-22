// 定义构造函数并继承Overlay
var JM_AdvancedLabel = function (option) {
  this._option = Object.assign({}, option)
  this.id = this._option.id
  this.overlayType = this._option.overlayType
}
JM_AdvancedLabel.prototype = new BMap.Overlay()
// 初始化
JM_AdvancedLabel.prototype.initialize = function (map) {
  this._map = map
  var div = document.createElement('div')
  div.setAttribute('id', this._option.id)
  map.getPanes().floatPane.appendChild(div)
  this._div = div

  return div
}
// 绘制
JM_AdvancedLabel.prototype.draw = function () {
  var position = this._map.pointToOverlayPixel(this._option.point)
  this._div.style.position = 'absolute'
  this._div.style.left = position.x + 'px'
  this._div.style.top = position.y + 'px'
  this._div.innerHTML = this._option.innerHTML
}
// 显示
JM_AdvancedLabel.prototype.show = function () {
  if (this._div) {
    this._div.style.display = 'block'
    this.draw()

    // 禁止信息窗口上的地图双击事件
    document.getElementById(this._option.id).ondblclick = function (ev) {
      var oEvent = ev || event
      oEvent.cancelBubble = true
      oEvent.stopPropagation()
    }
  }
}
// 隐藏
JM_AdvancedLabel.prototype.hide = function () {
  if (this._div) {
    this._div.style.display = 'none'
  }
}
