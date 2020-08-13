<template>
  <div class="skill">
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
      type: 'skill',
      total: 0,
      postList: [],
      title: '技术杂谈',
      pageNum: 1,
      postNum: 12
    }
  },
  methods: {
    getSkillPost () {
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
    changePaging (pageNum) {
      this.$root.backTop.$children[0].handleClick()
      window.scrollTo(0,0)
      this.pageNum = pageNum
      this.getSkillPost()
    }
  },
  created() {
    this.getSkillPost()
  }
}
</script>
