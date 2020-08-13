<template>
  <div class="admin_menu">
    <div class="author">
      <div>
        <img src="~@/assets/img/author.jpg" alt="">
      </div>
      <p>CC的个人博客</p>
      <router-link to="/" title="点击返回博客首页">首页</router-link>
    </div>
    <ul>
      <li 
        v-for="(m, index) in menuList" 
        :key="m + index"
        :class="isActive == index ? 'active' : ''" 
        @click="totalActive(index, m)"
      >
        {{ m }}
        <i class="el-icon-arrow-right"></i>
      </li>
    </ul>
    <div class="topPost">
      <dl>
        <dt>置顶文章</dt>
        <dd v-for="(item, index) in postList" :key="item._id">
          <span>{{item.title}}</span>
          <el-button type="danger" icon="el-icon-delete" title="取消置顶" @click="cancelTop(item._id, index)"></el-button>
        </dd>
      </dl>
      <el-button class="addToppost" type="primary" @click="topPost = !topPost">设置置顶文章</el-button>
      <ul class="post" v-show="topPost">
        <li v-for="(data, index) in contentData" :key="data.id">
          <span>{{data.title}}</span>
          <el-button type="primary" icon="el-icon-check" title="置顶" @click="addTopPost(data.id, index)"></el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js"
export default {
  props: {
    toggleContent: Boolean,
    contentData: Array
  },
  data () {
    return {
      isActive: 0,
      menuList: ['文章管理', '评论管理', '留言管理', '心情管理'],
      topPost: false,
      postList: ''
    }
  },
  methods: {
    // 给点击的菜单项添加样式，并抛出事件通知父组件
    totalActive (i, m) {
      this.isActive = i
      this.$emit('changeMenu', m)
    },
    // 设置置顶文章
    addTopPost (id) {
      api.addTopPost({postId: id}).then(res => {
        let data = res.data
        if(data.data.postId){
          this.$message({
            type: 'success',
            message: '设置成功'
          })
          this.getTopPost()
          this.topPost = false
        } else {
          this.$message('设置失败')
        }
      })
    },
    // 取消置顶
    cancelTop(id, index) {
      this.$confirm('取消该文章的置顶, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.cancelTopPost({
          params: {
            id
          }
        }).then(res => {
          if(res.data.data === '取消置顶成功') {
            this.$message({
              type: 'success',
              message: '取消置顶成功'
            })
            this.getTopPost()
          } else {
            this.$message('取消置顶失败')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })         
      })
    },
    // 获取置顶文章
    getTopPost() {
      api.getTopPost().then(res => {
        let data = res.data
        if(data.code === 200 && Array.isArray(data.data)) {
          this.postList = data.data
        }
      })
    }
  },
  watch: {
    // 监控实例属性 isActive 判断是否切换点击状态
    isActive(newVal, oldVal) {
      if(this.toggleContent) this.isActive = oldVal
      else return this.isActive = newVal
    }
  },
  created () {
    // 获取置顶文章
    this.getTopPost()
  }
}
</script>
