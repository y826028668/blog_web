import axios from 'axios'
import formatDate from '@/util/formatDate.js'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:1234'
axios.interceptors.response.use(res => {
  // 转换时间戳
  const data = res.data.data
  if(data && typeof(data) === 'object'){
    if(Array.isArray(data)){
      data.forEach(e => {
        e.time = formatDate(e.time)
      })
    } else {
      if(data.time){
        data.time = formatDate(data.time)
      }
    }
  }
  return res
}, err => {
  return Promise.reject(err)
})

export default axios
