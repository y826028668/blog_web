<template>
  <div class="searchResult container">
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
      search: '',
      postList: [],
      total: 0,
      pageNum: 1,
      showNum: 12
    }
  },
  computed: {
    title() {
      return `搜索：${this.search}`
    }
  },
  methods: {
    // 获取搜索结果
    getSearchPost () {
      if(this.pageNum !== 1 && this.total < this.showNum) return// 阻塞点
      const loading = this.$loading({
        lock: true,
        background: '#ffffff'
      })
      api.getSearchPost({
        params: {
          text: this.search,
          pageNum: this.pageNum,
          showNum: this.showNum
        }
      }).then(res => {
        let data = res.data
        if(data.code === 200 && data.data.total) {
          this.total = data.data.total
          this.postList = data.data.data
        }
        loading.close()
      })
    },
    // 点击了翻页后回到顶部，同时获取第pageNum页数据
    changePaging(pageNum) {
      this.$root.backTop.$children[0].handleClick()
      this.pageNum = pageNum
      setTimeout(() => {
        this.getSearchPost()
      }, 400)
    }
  },
  created() {
    this.search = this.$route.params.text
    // this.getSearchPost()
  },
  watch: {
    $route (n, o) {
      if(n.fullPath.includes('/search/')) {
        this.search = this.$route.params.text
      }
    },
    search (n, o) {
      if(n) {
        this.getSearchPost()
      }
    }
  }
}
</script>
