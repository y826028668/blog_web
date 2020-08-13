import moment from 'moment'
/**
 * 转换时间戳
 * @param {Date} d 
 */
export default function (d) {
  let date = +moment(d)
  return date
}

