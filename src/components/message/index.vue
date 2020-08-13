<template>
  <div class="message container">
    <div class="msg_wrap">
      <div class="left">
        <h2 class="msg_title">给我留言</h2>
        <div class="form">
          <c-form ref="handlerForm" @submitForm="submitMsg"></c-form>
        </div>
        <div class="msg">
          <c-msg 
          :msgList="msgList"
          :total="total"
          @msgChangePaging="msgChangePaging"
          @replyUser="replyUser"></c-msg>
        </div>
      </div>
      <div class="right">
        <c-sidebar></c-sidebar>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/index.js'
import moment from 'moment'
import CForm from './form'
import CMsg from './msgTemplate'
import CSidebar from '../common/sidebar'

export default {
  components: {
    CForm,
    CMsg,
    CSidebar
  },
  data() {
    return {
      msgList: [],
      total: 0,
      pageNum: 1,
      msgShowNum: 6
    }
  },
  methods: {
    // 将时间转换格式为：M/D, YYYY · hh:mm
    formatDate(date) {
      let time = +moment(date)
      let year = moment(time).year()
      let month = moment(time).month()
      let day = moment(time).date()
      let house = moment(time).hour()
      let minute = moment(time).minute()
      return `${month+1}/${day}, ${year} · ${house}:${minute}`
    },
    // 点击换页
    msgChangePaging (index) {
      this.pageNum = index
      window.scrollTo(0,400)
      this.getMsgData()
    },
    // 发布留言
    submitMsg(formData){
      if(!formData.name || !formData.email || !formData.content) return
      this.$confirm('确定发布留言吗?', '留言', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        api.addMsg({
          name: formData.name ,
          email: formData.email ,
          content: formData.content 
        }).then(res => {
          let data = res.data
          if(data.data === '留言成功') {
            this.$message({
              message: '留言成功',
              type: 'success'
            })
            this.$refs.handlerForm.successMsg()
            this.getMsgData()
          } else if(data.data === '留言失败'){
            this.$message({
              message: '留言失败，请重试',
              type: 'warning'
            })
          } else{
            this.$message('昵称重复')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消留言'
        })        
      })
      
    },
    // 回复留言
    replyUser(name, id){
      // 拿到点击的标的 根据标的的id 发送请求，成功后重新获取数据渲染到页面
      this.$prompt(`回复${name}`, '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        api.replyMsg({
          msgId: id,
          content: value
        }).then(res => {
          if(res.data.data === '回复成功') {
            this.$message({
              type: 'success',
              message: '回复成功'
            })
            this.getMsgData()
          } else {
            this.$message('回复失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });     
      })
    },
    // 获取数据
    getMsgData () {
      if(this.pageNum !== 1 && this.msgList.length < this.msgShowNum) return
      api.getPagingMsg({
        params: {
          pageNum: this.pageNum,
          msgShowNum: this.msgShowNum
        }
      }).then(res => {
        let data = res.data
        if(data.code === 200 && data.data.total) {
          this.total = data.data.total
          data.data.data.forEach(e => {
            e.time = this.formatDate(e.time)
          })
          this.msgList = data.data.data
        }
      })
    },
    notify () {
      
    }
  },
  created() {
    this.getMsgData()
  },
}
</script>

<style lang="scss">
  @import '@/assets/css/message/index.scss';
</style>
