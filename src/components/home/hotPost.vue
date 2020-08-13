<template>
  <div class="main_hotPost">
    <div class="container">
      <div class="area_title">
        <h2>热门文章</h2>
      </div>
      <div class="post_wrap">
        <block-post v-for="post in topPostList" :key="post._id" :postData="post" :num=22></block-post>
      </div>
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
      topPostList: []
    }
  },
  methods: {
    // 获取热门文章
    getHotPost () {
      api.getHotPost().then(res => {
        if(res.data.code === 200 && Array.isArray(res.data.data)) {
          this.topPostList = res.data.data
        } else {
          this.$message('获取热门文章失败')
        }
      })
    }
  },
  created () {
    this.getHotPost()
  }
}
</script>
