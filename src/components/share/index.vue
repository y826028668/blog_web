<template>
  <div class="share">
    <post-list :postList="postList" :title="title" :total="total" @changePaging="changePaging($event)"></post-list>
  </div>
</template>

<script>
import PostList from '../common/postList'
import api from '@/api/index.js'
export default {
  components: {
    PostList
  },
  data() {
    return {
      type: 'share',
      total: 0,
      postList: [],
      title: '资源分享',
      pageNum: 1,
      postNum: 12
    }
  },
  methods: {
    // 获取资源分享分类下的的文章数据
    getSharePost () {
      api.getTypePost({
        params: {
          type: this.type,
          pageNum: this.pageNum,
          postNum: this.postNum
        }
      }).then(res => {
        let data = res.data
        if(data.code === 200 && data.data.total) {
          this.total = data.data.total
          this.postList = data.data.data
        }
      })
    },
    // 翻页
    changePaging (pageNum) {
      this.$root.backTop.$children[0].handleClick()
      this.pageNum = pageNum
      this.getSharePost()
    }
  },
  created() {
    this.getSharePost()
  }
}
</script>
