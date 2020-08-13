<template>
  <div class="admin_login">
    <div class="login_wrap">
      <div class="title">登录</div>
      <p>
        <input v-model="adminId" autocomplete="on" type="text" placeholder="输入账号">
      </p>
      <p>
        <input v-model="adminPwd" type="password" placeholder="输入密码">
      </p>
      <p>
        <button @click="add" @keyup.enter="add">登录</button>
      </p>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import { Loading } from 'element-ui'
import md5 from 'md5'
export default {
  data () {
    return {
      adminId: '',
      adminPwd: ''
    }
  },
  methods: {
    add () {
      if (!this.adminId && !this.adminPwd) {
        this.$message.error('请在输入框内输入账号和密码')
        return
      }
      const loading = Loading.service({
        target: '.login_wrap',
        text: '正在登录'
      })
      api.adminLogin({
        adminId: this.adminId,
        adminPwd: md5(this.adminPwd)
      }).then(res => {
        if (typeof(res.data.data) === 'object' && res.data.data.msg === '登录成功') {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          sessionStorage.setItem('token', res.data.data.value)
          this.$route.params.id = this.adminId
          this.$route.params.loading = loading
          setTimeout(() => {
            this.$router.push('/admin')
          }, 1000)
        } else {
          this.$message.error('登录失败，请检查核对账号或密码后重试')
          loading.close()
        }
        this.adminId = ''
        this.adminPwd = ''
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/admin/login.scss';
</style>
