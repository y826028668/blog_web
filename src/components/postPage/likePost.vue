<template>
  <div class="common_likePost">
    <h2 class="likeTitle">猜你喜欢</h2>
    <block-post v-for="post in likePost" :key="post._id" :postData="post" :num="50"></block-post>
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
      likePost: []
    }
  },
  methods: {
    // 获取猜你喜欢文章
    getLikePost () {
      api.getRandomPost({
        params: {
          postNum: 3
        }
      }).then(res => {
        if(res.data.code === 200 && res.data.data) {
          this.likePost = res.data.data
        }
      })
    }
  },
  created() {
    this.getLikePost()
  },
}
</script>
