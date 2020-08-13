import axios from '@/axios'
const api = {
  // 管理员相关请求
  adminLogin (data) {
    return axios.post('/api/admin/login', data)
  },
  adminChange (data) {
    return axios.put('/api/admin/change', data)
  },
  adminLogout () {
    return axios.get('/api/admin/logout')
  },
  verify (params) {
    return axios.get('/api/admin/verify', params)
  },
  // 文章相关请求
  getAllPost() {
    return axios.get('/api/post/getAllPost')
  },
  getPagingPost (params) {
    return axios.get('/api/post/getPagingPost', params)
  },
  getTypePost (params) {
    return axios.get('/api/post/getTypePost', params)
  },
  getOnePost (params) {
    return axios.get('/api/post/getOnePost', params)
  },
  getHotPost (params) {
    return axios.get('/api/post/getHotPost', params)
  },
  getRandomPost (params) {
    return axios.get('/api/post/getRandomPost', params)
  },
  addOnePost (data) {
    return axios.post('/api/post/addOnePost', data)
  },
  deletePost (params) {
    return axios.delete('/api/post/deletePost', params)
  },
  updateOnePost (data) {
    return axios.put('/api/post/updateOnePost', data)
  },
  undeletePost (data) {
    return axios.put('/api/post/undeletePost', data)
  },
  shiftDeletePost (params) {
    return axios.delete('/api/post/shiftDeletePost', params)
  },
  getDeletePost () {
    return axios.get('/api/post/getDeletePost')
  },
  getSearchPost (params) {
    return axios.get('/api/post/getSearchPost', params)
  },
  getTagPost (params) {
    return axios.get('/api/post/getTagPost', params)
  },
  getHotTag (params) {
    return axios.get('/api/post/getHotTag', params)
  },
  getBrotherPost (params) {
    return axios.get('/api/post/getBrotherPost', params)
  },
  // 评论相关请求
  getAllComment () {
    return axios.get('/api/comment/getAllComment')
  },
  getPostAllComment (params) {
    return axios.get('/api/comment/getPostAllComment', params)
  },
  getNewComment (params) {
    return axios.get('/api/comment/getNewComment', params)
  },
  getOneComment (params) {
    return axios.get('/api/comment/getOneComment', params)
  },
  addComment (data) {
    return axios.post('/api/comment/addComment', data)
  },
  replyComment (data) {
    return axios.post('/api/comment/replyComment', data)
  },
  deleteComment (params) {
    return axios.delete('/api/comment/deleteComment', params)
  },
  undeleteComment (data) {
    return axios.put('/api/comment/undeleteComment', data)
  },
  shiftDeleteComment (params) {
    return axios.delete('/api/comment/shiftDeleteComment', params)
  },
  getDeleteComment () {
    return axios.get('/api/comment/getDeleteComment')
  },
  checkName (params) {
    return axios.get('/api/comment/checkName', params)
  },
  getAllChildCmt (params) {
    return axios.get('/api/comment/getAllChildCmt', params)
  },
  // 留言相关
  getAllMsg () {
    return axios.get('/api/msg/getAllMsg')
  },
  getPagingMsg (params) {
    return axios.get('/api/msg/getPagingMsg', params)
  },
  addMsg (data) {
    return axios.post('/api/msg/addMsg', data)
  },
  replyMsg (data) {
    return axios.post('/api/msg/replyMsg', data)
  },
  deleteAdminMsg (params) {
    return axios.delete('/api/msg/deleteAdminMsg', params)
  },
  deleteMsg (params) {
    return axios.delete('/api/msg/deleteMsg', params)
  },
  undeleteMsg (data) {
    return axios.put('/api/msg/undeleteMsg', data)
  },
  shiftDeleteMsg (params) {
    return axios.delete('/api/msg/shiftDeleteMsg', params)
  },
  getDeleteMsg () {
    return axios.get('/api/msg/getDeleteMsg')
  },
  checkName (params) {
    return axios.get('/api/msg/checkName', params)
  },
  // 心情相关
  getAllMood () {
    return axios.get('/api/mood/getAllMood')
  },
  getNewMood () {
    return axios.get('/api/mood/getNewMood')
  },
  getRandomMood () {
    return axios.get('/api/mood/getRandomMood')
  },
  addMood (data) {
    return axios.post('/api/mood/addMood', data)
  },
  updateMood (data) {
    return axios.put('/api/mood/updateMood', data)
  },
  deleteMood (params) {
    return axios.delete('/api/mood/deleteMood', params)
  },
  undeleteMood (data) {
    return axios.put('/api/mood/undeleteMood', data)
  },
  shiftDeleteMood (params) {
    return axios.delete('/api/mood/shiftDeleteMood', params)
  },
  getDeleteMood (params) {
    return axios.get('/api/mood/getDeleteMood', params)
  },
  // 置顶文章相关
  getTopPost () {
    return axios.get('/api/topPost/getTopPost')
  },
  cancelTopPost (params) {
    return axios.delete('/api/topPost/cancelTopPost', params)
  },
  addTopPost (data) {
    return axios.post('/api/topPost/addTopPost', data)
  },
  // 获取所有分类数据的数据量 
  getDataNum () {
    return axios.get('/api/num')
  }
}

export default api
