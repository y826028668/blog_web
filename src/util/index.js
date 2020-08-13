import moment from 'moment'
// const moment = require('moment')
/**
 * 获取区间随机数
 * @param {*} max 
 * @param {*} min 
 */
export function getRandom (max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 将字符串时间转换为 7/1,2020 这种格式
 * @param {String} date 
 */
export function formatDate (date) {
  if(!date) return
  if(typeof(date) === 'string' || typeof(date) === 'number') {
    let time = +moment(date)
    if(typeof(time) === 'number' && !isNaN(+time)) {
      let year = moment(time).year()
      let month = moment(time).month()
      let day = moment(time).date()
      return `${month+1}/${day},${year}`
    }
    return '无法解析该参数'
  } else {
    return '参数类型仅接受String和Number，内容为时间字符串或时间戳'
  }
}

/**
 * 去除字符串中的特殊字符,尖括号、冒号、空格等
 * @param {*} str 
 */
export function filterStr(str) {
  // 去除空白字符
  str = str.replace(/\s/g, '')
  str = str.replace(/\</g, '&lt;')
  str = str.replace(/\>/g, '&gt;')
  str = str.replace(/\(/g, '-')
  str = str.replace(/\)/g, '-')
  return str
}
