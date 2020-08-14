<template>
  <div class="common_search">
    <i class="el-icon-close" @click="closeSearchPage"></i>
    <div class="wrap">
      <div class="left">
        <div class="search_input">
          <input type="text" v-model="search" placeholder="请输入搜索内容" @keyup.enter="getSearchResult">
          <i class="el-icon-right" title="搜索" @click="getSearchResult"></i>
        </div>
        <div class="posts_wrap">
          <div class="newPost">
            <h3>最新文章</h3>
            <ul>
              <li class="newPost_item animate__animated animate__fadeInUp animate__delay-0.5s" v-for="item in newPostList" :key="item._id">
                <router-link :to="{name: 'post', params: { type: item.parent, id: item._id }}" >{{ item.title }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right newPost_item" v-show="isShowResult">
        <div class="result_wrap animate__animated animate__fadeIn">
          <block-post v-for="result in resultList" :key="result._id" :postData="result"></block-post>
        </div>
        <span class="resNull" v-show="resultList.length === 0">搜索结果为空</span>
        <div class="more">
          <span @click="transmitSearchText" v-show="resultList.length !== 0">显示所有搜索结果</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index'
import { Loading } from 'element-ui'
import BlockPost from './blockPost'
export default {
  components: {
    BlockPost
  },
  data() {
    return {
      isShowResult: false,
      search: '',
      newPostList: [],
      resultList: [],
      screenWidth: ''
    }
  },
  methods: {
    // 搜索页关闭后重新初始化
    closeSearchPage () {
      this.$router.go(-1)
      this.isShowResult = false
      this.resultList = []
      this.search = ''
    },
    // 传递搜索框内容并关闭该页面
    transmitSearchText () {
      this.$router.push({
        path: `/search/${this.search}`
      })
      this.isShowResult = false
      this.resultList = []
      this.search = ''
    },
    // 根据输入框内容获取文章数据
    getSearchResult () {
      if(this.screenWidth > 992) {
        if(this.search === '') {
          this.$message('请输入搜索内容')
          return
        } else {
          const loading = Loading.service({
            target: '.right',
            background: '#ffffff'
          })
          this.isShowResult = true
          api.getSearchPost({
            params: {
              text: this.search
            }
          })
          .then(res => {
            loading.close()
            let data = res.data
            if(data.code === 200 && data.data.total && Array.isArray(data.data.data)) {
              if(data.data.data.length > 3) this.resultList = data.data.data.splice(0, 3)
              else this.resultList = data.data.data
            } else if (data.data === '未找到搜索结果') {
              this.resultList = []
            }
          })
        }
      } else {
        this.transmitSearchText()
      }
      
    },
    handleResize () {
      this.screenWidth = document.body.clientWidth
    }
  },
  created() {
    // 获取最新文章5篇
    api.getPagingPost({
      params: {
        postNum: 5
      }
    }).then(res => {
      let data = res.data
      if(data.code === 200 && Array.isArray(data.data.data)) {
        this.newPostList = data.data.data
      } else {
        this.$message('最新文章获取失败')
      }
    })
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="scss">
  @import '@/assets/css/common/search.scss';
</style>

