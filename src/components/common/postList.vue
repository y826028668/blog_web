<template>
  <div class="common_postListPage container">
    <div class="title">
      <h2>{{title}}</h2>
    </div>
    <div class="wrap">
      <div class="left">
        <div class="post_wrap" :class="animate">
          <block-post v-for="post in newPostList" :key="post._id" :postData="post" :num="50"></block-post>
        </div>
        <div class="paging">
          <el-pagination
            layout="prev, pager, next"
            :page-size="12"
            :total="total"
            hide-on-single-page
            @current-change="changePaging">
          </el-pagination>
        </div>
      </div>
      <div class="right">
        <sidebar></sidebar> 
      </div>
    </div>
  </div>
</template>

<script>
import BlockPost from '../common/blockPost'
import Sidebar from '../common/sidebar'
export default {
  components: {
    BlockPost,
    Sidebar
  },
  props: {
    postList: Array,
    title: String,
    total: Number
  },
  data() {
    return {
      animate: ''
    }
  },
  computed: {
    newPostList() {
      return this.postList
    }
  },
  methods: {
    // 翻页
    changePaging (i) {
      this.$emit('changePaging', i)
    }
  },
  watch: {
    postList: {
      deep: true,
      handler (newVal, oldVal) {
        // this.$root.backTop.$children[0].handleClick()
        this.animate = 'animate__animated animate__fadeIn animate__delay-0.3s'
        setTimeout(() => {
          this.animate = ''
        }, 1300)
      }
    }
  }

}
</script>

<style lang="scss">
  @import '@/assets/css/common/postList.scss';
</style>
