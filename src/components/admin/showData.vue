<template>
  <div class="admin_content">
    <div class="content">
      <h3>{{dataTitle}}内容管理</h3>
      <div class="search">
        <el-button type="primary" v-show="dataTitle === '文章'" @click="$emit('toggleEditor')">发布{{dataTitle}}</el-button>
        <el-button type="primary" v-show="dataTitle === '心情'" @click="addMood">添加心情</el-button>
        <el-input v-model.lazy="search" placeholder="请输入查询内容"></el-input>
      </div>
      <div class="table_title">
        <span>Title</span>
        <span>Content</span>
        <span>Time</span>
        <span>Control</span>
      </div>
      <ul class="table">
        <li v-for="(data, index) in searchData" :key="data.id">
          <span :title="data.title">{{data.title}}</span>
          <span :title="data.content">{{data.content}}</span>
          <span :title="data.time">{{data.time}}</span>
          <span>
            <el-button v-show="dataTitle === '文章'" size="mini" type="primary" @click="$emit('toggleEditor', data.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="dltData(data.id, index)">删除</el-button>
          </span>
        </li>
      </ul>
    </div>
    <div class="delete">
      <h3>{{dataTitle}}回收站</h3>
      <div class="table_title">
        <span>Title</span>
        <span>Control</span>
      </div>
      <ul class="table" v-show="deleteData">
        <li v-for="(item, index) in deleteData" :key="item.id">
          <span :title="item.content">{{item.title || item.name || item.content}}</span>
          <span>
            <el-button size="mini" type="primary" @click="undelete(item.id, index)">恢复</el-button>
            <el-button size="mini" type="danger" @click="shiftDeleteData">彻底删除</el-button>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js"
import $ from 'axios'

export default {
  data() {
    return {
      search: ""
    };
  },
  props: {
    dataTitle: String,
    contentData: Array,
    deleteData: Array
  },
  computed: {
    // 列表筛选
    searchData() {
      if (this.search) {
        return this.contentData.filter(e => {
          return e.title.toLowerCase().includes(this.search.toLowerCase()) || e.content.toLowerCase().includes(this.search.toLowerCase())
        })
      }
      return this.contentData;
    }
  },
  methods: {
    // 删除操作
    dltData(id, index) {
      this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        switch(this.dataTitle){
          case '文章':
            api.deletePost({
              params: {
                postId: id
              }
            }).then(res => {
              let data = res.data
              if(data.code === 200 && data.data === '删除文章成功') {
                this.$emit('deleteContent', index)
              } else {
                this.$message({
                  type: "info",
                  message: "操作失败请重试"
                })
              }
            })
          break
          case '评论':
            api.deleteComment({
              params: {
                cmtId: id
              }
            }).then(res => {
              let data = res.data
              if(data.code === 200 && data.data === '删除成功') {
                this.$emit('deleteContent', index)
              } else {
                this.$message({
                  type: "info",
                  message: "操作失败请重试"
                })
              }
            })
          break
          case '留言':
            api.deleteMsg({
              params: {
                msgId: id
              }
            }).then(res => {
              let data = res.data
              if(data.code === 200 && data.data === '删除成功') {
                this.$emit('deleteContent', index)
              } else {
                this.$message({
                  type: "info",
                  message: "操作失败请重试"
                })
              }
            })
          break
          case '心情':
            api.deleteMood({
              params: {
                moodId: id
              }
            }).then(res => {
              let data = res.data
              if(data.code === 200 && data.data === '删除心情成功') {
                this.$emit('deleteContent', index)
              } else {
                this.$message({
                  type: "info",
                  message: "操作失败请重试"
                })
              }
            })
          break
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    // 恢复操作
    undelete(id, index) {
      this.$confirm("此操作将恢复该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        switch(this.dataTitle){
          case '文章':
            api.undeletePost({postId: id}).then(res => {
              let data = res.data
              if(data.code === 200 && data.data === '文章恢复成功') {
                this.$emit('undeleteData', index)
              } else {
                this.$message({
                  type: "info",
                  message: "操作失败请重试"
                })
              }
            })
          break
          case '评论':
            api.undeleteComment({cmtId: id}).then(res => {
              let data = res.data
              if(data.code === 200 && data.data === '恢复成功') {
                this.$emit('undeleteData', index)
              } else {
                this.$message({
                  type: "info",
                  message: "操作失败请重试"
                })
              }
            })
          break
          case '留言':
            api.undeleteMsg({msgId: id}).then(res => {
              let data = res.data
              if(data.code === 200 && data.data === '恢复成功') {
                this.$emit('undeleteData', index)
              } else {
                this.$message({
                  type: "info",
                  message: "操作失败请重试"
                })
              }
            })
          break
          case '心情':
            api.undeleteMood({moodId: id}).then(res => {
              let data = res.data
              if(data.code === 200 && data.data === '恢复成功') {
                this.$emit('undeleteData', index)
              } else {
                this.$message({
                  type: "info",
                  message: "操作失败请重试"
                })
              }
            })
          break
        }
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    },
    // 添加心情短语
    addMood () {
      this.$prompt('', '添加心情短语', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          api.addMood({content: value}).then(res => {
            let data = res.data
            if(data.code === 200 && data.data === '添加心情成功') {
              this.$message({
                type: 'success',
                message: '添加心情短语成功'
              })
            } else {
              this.$message( '添加心情短语失败')
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消添加心情'
          })     
        })
    },
    // 彻底删除
    shiftDeleteData() {
      this.$confirm("此操作将彻底删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
      .then(() => {
        this.$message({
          type: "success",
          message: "删除成功!"
        })
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        })
      })
    }
  }
}
</script>
