var JM_util = {
  uuid: function () {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  },
  // 合并对象
  mergeObjectDeep: function (defaultObj, originalObj) {
    let newObj = this.deepCopy(defaultObj)
    for (let i in defaultObj) {
      let dv = defaultObj[i]
      let ov = originalObj[i]
      if (this.isObjectObject(dv) && this.checkNull(ov)) {
        newObj[i] = this.mergeObjectDeep(dv, ov)
      } else {
        if (this.checkNull(ov)) {
          newObj[i] = this.deepCopy(ov)
        }
      }
    }
    return newObj
  },
  deepCopy: function (source) {
    var sourceCopy = null
    if (this.isObjectObject(source)) {
      sourceCopy = {}
      for (var item in source) {
        sourceCopy[item] = this.deepCopy(source[item])
      }
    } else if (this.isArray(source)) {
      sourceCopy = []
      source.forEach(item => {
        sourceCopy.push(this.deepCopy(item))
      })
    } else {
      return source
    }
    return sourceCopy
  },
  // 获取变量的类型
  getType: function (obj) {
    var str = Object.prototype.toString.call(obj)
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    if (obj instanceof Element) { // 判断是否是dom元素，如div等
      return 'element'
    }
    return map[str]
  },
  isArray: function (obj) {
    return Array.isArray(obj) || Object.prototype.toString.call(obj) === '[object Array]'
  },
  isObject: function (obj) {
    var type = typeof obj
    return (type === 'function' || type === 'object') && !!obj
  },
  isObjectObject: function (val) {
    return Object.prototype.toString.call(val) === '[object Object]'
  },
  isDate: function (val) {
    return Object.prototype.toString.call(val) === '[object Date]'
  },
  isFunction: function (val) {
    return Object.prototype.toString.call(val) === '[object Function]'
  },
  isString: function (val) {
    return Object.prototype.toString.call(val) === '[object String]'
  },
  isNumber: function (val) {
    return Object.prototype.toString.call(val) === '[object Number]'
  },
  // 校验是否为空
  checkNull: function (obj) {
    if (obj === null || obj === '' || obj === undefined) {
      return false
    } else if (JSON.stringify(obj) === '{}') {
      let a = false
      for (let i in obj) {
        a = true
      }
      return a
    } else if ((this.isString(obj) || this.isArray(obj)) && obj.length === 0) {
      return false
    } else {
      return true
    }
  },
  // 校验数组元素是否重复
  checkRepeat: function (arr) {
    for (let i = 0; i < arr.length; i++) {
      let arrCopy = [...arr]
      let item = arrCopy[i]
      arrCopy.splice(i, 1)
      if (arrCopy.includes(item)) {
        return false
      }
    }
    return true
  },
  // 字符串转常量名
  evil: function (str) {
    let fn = Function
    return new fn('return ' + str)()
  }

}
