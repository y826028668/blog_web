<template>
  <div class="common_post container" ref="tree">
    <div class="postPage_wrap">
      <div class="left">
        <div class="postPage_title">
          <router-link to="" :style="{ backgroundColor: tagRandomBg }" class="tag">{{postData.tag}}</router-link>
          <h2>{{postData.title}}</h2>
          <span class="time"><i class="el-icon-time"></i>{{formatTime}}</span>
          <span class="views"><i class="el-icon-view"></i>{{postData.views}}</span>
          <span class="comment"><i class="el-icon-chat-dot-round"></i>{{cmtTotal}}</span>
        </div>
        <div class="postPage_content">
          <div class="img">
            <img :src="defaultImg">
          </div>
          <div class="content" v-html="postData.content"></div>
          <div class="mood">
            <p><i class="el-icon-sunrise-1"></i></p>
            {{mood}}
          </div>
          <div class="toggle_post">
            <div class="prev">
              <span>上一篇</span>
              <span class="null"  v-if="!prev._id">没有了</span>
              <span @click="togglePost(prev)" class="prevTitle" v-if="prev._id">{{prev.title ? prev.title : '没有了'}}</span>
            </div>
            <div class="next">
              <span>下一篇</span>
              <span class="null" v-if="!next._id">没有了</span>
              <span @click="togglePost(next)" class="nextTitle" v-if="next._id">{{next.title ? next.title : '没有了'}}</span>
            </div>
          </div>
          <div class="like">
            <like-post></like-post>
          </div>
          <div class="comment_wrap">
            <h2 class="comment_title">发表评论</h2>
            <div class="cancel" v-show="parentCmtData.name">正在回复<i>{{parentCmtData.name}}</i><span @click="parentCmtData = ''">取消回复</span></div>
            <div class="form">
              <b-form ref="form" @submitForm="submitForm"></b-form>
            </div>
            <div class="showComment" v-show="cmtTotal !== 0">
              <h2>网友评论</h2>
              <comment v-for="cmt in cmtData" :key="cmt._id" :id="cmt._id" @replyCmt="replyCmt"></comment>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="6"
              hide-on-single-page
              :total="cmtTotal"
              @current-change="cmtChangePaging">
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="right">
        <b-sidebar></b-sidebar>
      </div>
    </div>
    <reading :percentage="percentage"></reading>
  </div>
</template>

<script>
import api from '@/api/index.js'
import BSidebar from '../common/sidebar'
import Reading from './reading'
import LikePost from './likePost'
import BForm from '../message/form'
import Comment from './commentData'
import {getRandom, formatDate, filterStr} from '@/util/index'
export default {
  inject: ['reload'],
  components: {
    BSidebar,
    Reading,
    LikePost,
    BForm,
    Comment
  },
  data() {
    return {
      percentage: 0,
      scrollHeight: 0,
      scroll: 0,
      id: '',
      postData: {},
      next: {},
      prev: {},
      mood: '',
      pageNum: 1,
      cmtNum: 6,
      cmtTotal: 0,
      cmtData: [],
      parentCmtData: '',
      tagBg: ['#f9c100', '#4ca80b', '#ff7500', '#ee303a', '#0ab3af', '#fc4a00', '#0085FF', '#6555E2'],
      defaultImgSrc: require('@/assets/img/bg-6.png')
    }
  },
  methods: {
    // 获取滚动条数据，计算阅读百分比
    handleScroll () {
      this.scrollHeight = document.documentElement.scrollHeight
      let b = this.scrollHeight - document.body.clientHeight
      let a = b / 100
      this.scroll = document.documentElement.scrollTop
      this.percentage = Math.ceil(this.scroll / a)
    },
    // 获取文章数据
    getOnePost () {
      api.getOnePost({
        params: {
          postId: this.id
        }
      }).then(res => {
        if(res.data.code === 200 && res.data.data) {
          this.postData = res.data.data
          this.postData.content = JSON.parse(this.postData.content)
        }
      })
    },
    // 根据文章id获取上一篇和下一篇文章信息
    getBrotherPost (id) {
      api.getBrotherPost({
        params: {
          postId: id
        }
      }).then(res => {
        let data = res.data
        if(data.code === 200 && data.data) {
          this.next = data.data.next
          this.prev = data.data.prev
        }
      })
    },
    // 上下篇文章切换
    togglePost (post) {
      this.$router.push({
        path: `/${post.parent}/${post._id}`
      })
    },
    // 获取文章评论数据
    getPostComment () {
      api.getPostAllComment({
        params: {
          postId: this.id,
          pageNum: this.pageNum,
          cmtNum: this.cmtNum
        }
      }).then(res => {
        if(res.data.code === 200 && res.data.data !== '无评论') {
          this.cmtTotal = res.data.data.total
          this.cmtData = res.data.data.data
        }
      })
    },
    // 获取随机心情
    getMood () {
      api.getRandomMood().then(res => {
        if(res.data.code === 200 && res.data.data) {
          this.mood = res.data.data.content
        }
      })
    },
    // 发布评论
    submitForm (obj) {
      // 如果 this.parentCmtData 没值说明是评论，如果有值就是回复
      if(this.parentCmtData === '') {
        this.$confirm('确定发布评论吗？', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info '
        }).then(() => {
          api.addComment({
            parentId: this.postData._id,
            name: filterStr(obj.name),
            email: filterStr(obj.email),
            content: filterStr(obj.content)
          }).then(res => {
            if(res.data.code === 200 && res.data.data._id) {
              this.$message({
                type: 'success',
                message: '发布成功'
              })
              this.$refs.form.$children[0].$el[0].value = ''
              this.$refs.form.$children[0].$el[1].value = ''
              this.$refs.form.$children[0].$el[2].value = ''
              this.$router.go(0)
            } else {
              this.$message(`发布失败，${res.data.data}`)
            }
          })
        })
      } else {
        this.$confirm(`确定对<<${this.parentCmtData.name}>>进行评论吗？`, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info '
        }).then(() => {
          api.replyComment({
            postId: this.id,
            parentCmtId: this.parentCmtData._id,
            name: filterStr(obj.name),
            email: filterStr(obj.email),
            content: filterStr(obj.content)
          }).then(res => {
            let data = res.data
            if(data.code === 200 && data.data._id) {
              this.$refs.form.$children[0].$el[0].value = ''
              this.$refs.form.$children[0].$el[1].value = ''
              this.$refs.form.$children[0].$el[2].value = ''
              this.parentCmtData = ''
              this.$router.go(0)
              this.$message({
                type: 'success',
                message: '发布成功'
              })
            } else {
              this.$message(`发布失败，${res.data.data}`)
            }
          })
        })
      }
    },
    // 点击了回复，将父评传过来保存，用于发送请求的判断条件
    replyCmt (parent) {
      this.parentCmtData = parent
      // 滚动到表单位置
      window.scrollTo(0,this.$refs.form.$el.offsetTop - 100)
      // 聚焦input框
      this.$refs.form.$children[0].$el[0].focus()
    },
    cmtChangePaging (pageNum) {
      this.pageNum = pageNum
      this.getPostComment()
    }
  },
  computed: {
    // 给tag随机的背景色
    tagRandomBg () {
      return this.tagBg[getRandom(0, this.tagBg.length)]
    },
    // 格式化时间
    formatTime () {
      return formatDate(this.postData.time)
    },
    // 文章是否有图片，如果没有使用一张默认图片进行展示
    defaultImg () {
      if (this.postData.imgSrc) return this.postData.imgSrc
      else return this.defaultImgSrc
    }
  },
  created() {
    this.id = this.$route.params.id
    this.getOnePost()
    this.getBrotherPost(this.id)
    this.getPostComment()
    this.getMood()
  },
  mounted () {
    window.scrollTo(0,0)
    this.scrollHeight = document.documentElement.scrollHeight
    window.addEventListener('scroll',this.handleScroll)
  },
  watch: {
    $route () {
      const loading = this.$loading({
        lock: true,
        text: '正在加载',
        background: 'rgb(255,255,255)'
      })
      this.id = ''
      this.postData = {}
      this.next = {}
      this.prev = {}
      this.mood = ''
      this.pageNum = 1
      this.cmtNum = 6
      this.cmtTotal = 0
      this.cmtData = []
      this.parentCmtData = ''
      this.id = this.$route.params.id
      this.getOnePost()
      this.getBrotherPost(this.id)
      this.getPostComment()
      this.getMood()
      
      setTimeout(() =>{
        window.scrollTo(0,0)
        loading.close()
      }, 800)
      
    }
  },
  destroyed () {
    window.removeEventListener('scroll',this.handleScroll)
  }
}
</script>

<style lang="scss">
@import '@/assets/css/common/postPage.scss';
</style>
