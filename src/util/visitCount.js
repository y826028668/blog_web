/* 访问量统计 */
import axios from 'axios'
window.onload = function () {
  let { cip, cname } = returnCitySN
  axios.get('/api/visit', {
    params: {
      userIp: cip, 
      location: cname
    }
  })
}
