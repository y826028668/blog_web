<template>
  <div class="main_topPost">
    <block-post v-for="post in newPostList" :key="post._id" :postData="post" :num=22></block-post>
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
  computed: {
    newPostList () {
      return this.topPostList.map(e => {
        return {
          title: e.title,
          author: e.author,
          imgSrc: e.imgSrc,
          postId: e.postId,
          parent: e.parent,
          tag: e.tag,
          time: e.time,
          _id: e.postId,
          id: e._id
        }
      })
    }
  },
  created () {
    api.getTopPost().then(res => {
      let data = res.data
      if(data.code === 200 && Array.isArray(data.data)) this.topPostList = data.data
      else this.$message('置顶文章获取失败')
    })
  }
}
</script>
