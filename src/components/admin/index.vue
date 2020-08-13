<template>
  <el-container class="admin_home">
    <el-header height="0">
      <el-avatar :size="20" icon="el-icon-user-solid"></el-avatar>
      <span>cc的个人博客</span>
      <span class="changePwd" @click="dialogFormVisible = true" title="点击修改密码">修改密码</span>
      <span class="logout" @click="logout" title="点击注销登录">注销登录</span>

      <el-dialog style="z-index: 99998;" width="400px" title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="账号">
            <el-input v-model="form.adminId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="form.adminPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="form.newPwd" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </div>
      </el-dialog>

    </el-header>
    <el-container>
      <el-aside>
        <a-menu 
          :contentData="postData"
          @changeMenu="changeMenu($event)" 
          :toggleContent="toggleContent">
        </a-menu>
      </el-aside>
      <el-main>
        <div class="main" v-if="!toggleContent">
          <a-header :dataNumList="dataNumList"></a-header>
          <a-show-data
            @toggleEditor="changeToggleEditor($event)"
            @deleteContent="deleteContent($event)"
            @undeleteData="undeleteData($event)"
            :dataTitle="dataTitle"
            :contentData="contentData"
            :deleteData="deleteData"
          ></a-show-data>
        </div>
        <redact :postId="postId" @toggleContent="changeToggleContent" v-else />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import api from "@/api/index.js"
import AHeader from "./header.vue"
import AMenu from "./menu.vue"
import AShowData from "./showData.vue"
import Redact from "./redact.vue"
import moment from "moment"
import md5 from 'md5'
import axios from 'axios'

export default {
  components: {
    AHeader,
    AMenu,
    AShowData,
    Redact
  },
  data() {
    return {
      dialogFormVisible: false,
      toggleContent: false,
      dataNumList: {},
      dataTitle: "",
      contentData: [],
      deleteData: [],
      postData: [],
      deletePost: [],
      comData: [],
      deleteCom: [],
      msgData: [],
      deleteMsg: [],
      moodData: [],
      deleteMood: [],
      postId: "",
      form: {
        adminId: '',
        adminPwd: '',
        newPwd: ''
      }
    }
  },
  methods: {
    // 子组件点击删除后将对应项移到deleteData中进行展示
    deleteContent(index) {
      let d = this.contentData.splice(index, 1)
      this.deleteData.unshift(d[0])
      this.$message({
        type: "success",
        message: "删除成功!"
      })
    },
    undeleteData(index) {
      let d = this.deleteData.splice(index, 1)
      this.contentData.unshift(d[0])
      this.$message({
        type: "success",
        message: "恢复成功!"
      })
    },
    // 显示编辑页
    changeToggleEditor(e) {
      if (e) {
        this.postId = e
      } else {
        this.postId = ""
      }
      this.toggleContent = true
    },
    // 隐藏编辑页
    changeToggleContent() {
      this.toggleContent = false
    },
    // 在编辑页时，点击了菜单项，根据情况不同分别展示不同的内容
    changeMenu(e) {
      if (this.toggleContent) {
        this.$confirm("确定要退出该页吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          this.toggleContent = false
        })
        .catch(() => {
          this.toggleContent = true
        })
      }
      // 根据点击的菜单获取数据
      switch (e) {
        case "文章管理":
          this.contentData = this.postData
          this.deleteData = this.deletePost
          this.dataTitle = e.slice(0, 2)
        break
        case "评论管理":
          this.contentData = this.comData
          this.deleteData = this.deleteCom
          this.dataTitle = e.slice(0, 2)
        break
        case "留言管理":
          this.contentData = this.msgData
          this.deleteData = this.deleteMsg
          this.dataTitle = e.slice(0, 2)
        break
        case "心情管理":
          this.contentData = this.moodData
          this.deleteData = this.deleteMood
          this.dataTitle = e.slice(0, 2)
        break
      }
    },
    // 注销登录
    logout () {
      this.$confirm("确定要退注销登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        api.adminLogout().then(res => {
          if(res.data.data === '注销登录成功') {
            this.$message({
              type: "success",
              message: "注销成功，即将返回到首页"
            })
            setTimeout(() =>{
              this.$router.replace('/')
            }, 500)
          } else {
            this.$message('未登陆，即将返回到登录页')
            setTimeout(() =>{
              this.$router.replace('/login')
            }, 500)
          }
        })
      })
    },
    // 修改密码
    submit () {
      api.adminChange({adminId: this.form.adminId, adminPwd: md5(this.form.adminPwd), newPwd: md5(this.form.newPwd)})
      .then(res => {
        let data = res.data
        if(data.code === 200 && data.data === '修改密码成功') {
          this.$message({
            type: "success",
            message: "修改密码成功"
          })
          this.dialogFormVisible = false
        } else {
          this.$message("修改密码失败，请检查账号密码后重试")
        }
        this.form.adminId = ''
        this.form.adminPwd = ''
        this.form.newPwd = ''
      })
    }
  },
  created() {
    // 获取右侧各类型的数据量
    api.getDataNum().then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.dataNumList = res.data.data
      } else {
        this.$message.error("总览数据获取失败")
      }
    }),
    // 获取所有文章
    api.getAllPost().then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.postData = res.data.data.map(e => {
          return {
            title: e.title,
            content: e.content,
            time: moment(e.time).format("YYYY-MM-DD, hh:mm"),
            id: e._id
          }
        })
        this.contentData = this.postData
        this.dataTitle = "文章"
      } else {
        this.$message.error("文章数据获取失败")
      }
    }),
    // 获取文章回收站
    api.getDeletePost().then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.deletePost = res.data.data.map(e => {
          return {
            title: e.title,
            content: e.content,
            time: moment(e.time).format("YYYY-MM-DD, hh:mm"),
            id: e._id
          }
        })
        this.deleteData = this.deletePost
      } else {
        this.$message.error("文章回收站数据获取失败")
      }
    }),
    // 获取评论数据
    api.getAllComment()
    .then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.comData = res.data.data.map(e => {
          return {
            title: e.name,
            content: e.content,
            time: moment(e.time).format("YYYY-MM-DD, hh:mm"),
            id: e._id
          }
        })
      } else {
        this.$message.error("评论数据获取失败")
      }
    }),
    // 获取评论回收站
    api.getDeleteComment().then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.deleteCom = res.data.data.map(e => {
          return {
            title: e.name,
            content: e.content,
            time: moment(e.time).format("YYYY-MM-DD, hh:mm"),
            id: e._id
          }
        })
      } else {
        this.$message.error("评论回收站数据获取失败")
      }
    }),
    // 获取留言数据
    api.getAllMsg().then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.msgData = res.data.data.map(e => {
          return {
            title: e.name,
            content: e.content,
            time: moment(e.time).format("YYYY-MM-DD, hh:mm"),
            id: e._id
          }
        })
      } else {
        this.$message.error("留言数据获取失败")
      }
    }),
    // 获取留言回收站数据
    api.getDeleteMsg().then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.deleteMsg = res.data.data.map(e => {
          return {
            title: e.name,
            content: e.content,
            time: moment(e.time).format("YYYY-MM-DD, hh:mm"),
            id: e._id
          }
        })
      } else {
        this.$message.error("留言回收站数据获取失败")
      }
    }),
    // 获取心情数据
    api.getAllMood().then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.moodData = res.data.data.map(e => {
          return {
            title: e.content,
            content: e.content,
            time: moment(e.time).format("YYYY-MM-DD, hh:mm"),
            id: e._id
          }
        })
      } else {
        this.$message.error("心情数据获取失败")
      }
    }),
    // 获取心情回收站数据
    api.getDeleteMood().then(res => {
      if (res.data.code === 200 && res.data.msg === "OK") {
        this.deleteMood = res.data.data.map(e => {
          return {
            title: e.content,
            content: e.content,
            time: moment(e.time).format("YYYY-MM-DD, hh:mm"),
            id: e._id
          }
        })
      } else {
        this.$message.error("心情回收站数据获取失败")
      }
    })
  },
  // 仅能从登录页路由进入后台管理页
  beforeRouteEnter (to, from, next) {
    if (from.fullPath !== '/login') {
      next(vm => {
        vm.$router.replace('/')
      })
      return
    } else {
      api.verify({
        params: {
          token: from.params.id
        }
      }).then(res => {
        from.params.loading.close()
        if(!sessionStorage.token || !res.data.data) {
          next(vm => {
            vm.$router.replace('/login')
          })
          return
        } else if(sessionStorage.token === res.data.data) {
          next()
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/admin/index.scss";
</style>
