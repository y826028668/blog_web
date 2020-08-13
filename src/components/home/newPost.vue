<template>
  <div class="main_newPost">
    <div class="area_title">
      <h2>最新文章</h2>
    </div>
    <div class="post_wrap">
        <block-post class="animate__animated animate__fadeInUp" v-for="post in newPostList" :key="post._id" :num=18 :postData="post"></block-post>
    </div>
    <div class="more">
      <span class="more_span" @click="getMorePost">点击查看更多</span>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import BlockPost from '../common/blockPost'

export default {
  components: {
    BlockPost
  },
  data() {
    return {
      total: '',
      postList: [],
      pageNum: 1,
      postNum: 12
    }
  },
  computed: {
    newPostList () {
      return this.postList
    }
  },
  methods: {
    // 获取第一页文章数据
    getPagingPost() {
      if(this.postList.length !== this.total) {
        api.getPagingPost({
          params: {
            pageNum: this.pageNum,
            postNum: this.postNum
          }
        }).then(res => {
          let data = res.data
          if(data.code === 200 && data.data.total && Array.isArray(data.data.data)) {
            this.total = data.data.total
            this.postList.push(...data.data.data)
            this.pageNum += 1
          } else {
            this.$message('最新文章获取失败')
          }
        })
      }
    },
    // 点击查看更多
    getMorePost() { 
      const loading = this.$loading({
        target: '.more_span',
        background: 'rgba(0, 0, 0, 0.4)'
      })
      setTimeout(() => {
        if(loading) {
          loading.close()
        }
        this.getPagingPost()
      }, 1500)
      
    }
  },
  created () {
    this.getPagingPost()
  }
}
</script>
