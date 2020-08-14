<template>
  <div class="common_sidebar">
    <div class="hotPosts">
      <div class="title">热门文章</div>
      <ul>
        <li class="clearboth" v-for="post in hotPostList" :key="post._id">
          <router-link :to="{name: 'post', params: { type: post.parent, id: post._id }}">
            <div class="img_wrap">
              <img :src="post.imgSrc || defaultImgSrc">
            </div>
            <div class="postTitle">{{post.title}}</div>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="hotTags">
      <div class="title">热门标签</div>
      <div @click="backtop" class="tag" v-for="item in hotTags" :key="item.tag">
        <router-link :to="{name: 'searchresult', params: { text: item.tag }}">
          <span>{{ item.tag }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import BlockPost from '../common/blockPost'
import { getRandom } from '@/util/index'
export default {
  components: {
    BlockPost
  },
  data() {
    return {
      hotPostList: [],
      hotTags: [],
      defaultImgSrc: require('@/assets/img/bg-6.png')
    }
  },
  methods: {
    backtop () {
      window.scrollTo(0,0)
    },
    // 获取热门文章
    getHotPosts () {
      api.getHotPost().then(res => {
        if(res.data.code === 200 && Array.isArray(res.data.data) && res.data.data.length === 5) {
          this.hotPostList = res.data.data
        } else {
          this.$message('热门文章获取失败，请刷新重试')
        }
      })
    },
    // 获取热门标签
    getHopTags (num) {
      api.getHotTag({
        params: {
          num
        }
      }).then(res => {
        if(res.data.code === 200 && Array.isArray(res.data.data) && res.data.data.length === num) {
          this.hotTags = res.data.data
        } else {
          this.$message('热门标签获取失败，请刷新重试')
        }
      })
    }
  },
  created () {
    this.getHotPosts()
    this.getHopTags(3)
  }
}
</script>

<style lang="scss">
@import '@/assets/css/common/sidebar.scss';
</style>
