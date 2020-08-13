<template>
  <div class="main_slide">
    <div class="area_title container">
      <h2>每日精选</h2>
    </div>
    <div class="slide_wrap">
      <div class="slide_bg" v-show="showSlideBg">
        <el-carousel
          indicator-position="none"
          arrow="never"
          :autoplay="false"
          name="slideBg"
          ref="slideBg"
          :loop="true"
        >
          <el-carousel-item v-for="item in postList" :key="item._id">
            <img :src="item.imgSrc || defaultImgSrc">
          </el-carousel-item>
        </el-carousel>
      </div>
      <el-carousel 
        class="slide_content"
        :type="type"
        arrow="always"
        :autoplay="false"
        :indicator-position="dots"
        name="slideContent"
        ref="slideContent"
        @change="changeSlide"
      >
        <el-carousel-item class="slide_item" v-for="post in postList" :key="post._id">
          <block-post :num=50 :postData="post"></block-post>
        </el-carousel-item>
      </el-carousel>
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
      showSlideBg: true,
      type: 'card',
      dots: '',
      screenWidth: '',
      postList: [],
      defaultImgSrc: require('@/assets/img/bg-7.png')
    }
  },
  methods: {
    // 根据索引切换背景图
    changeSlide(nowIndex, oldIndex) {
      const bgDom = this.$refs.slideBg
      if(nowIndex > oldIndex) bgDom.next()
      else bgDom.prev()
    },
    // 获取推荐文章
    getRandomPost () {
      api.getRandomPost().then(res => {
        if(res.data.code === 200 && Array.isArray(res.data.data)) {
          this.postList = res.data.data
        } else {
          this.$message('获取热门文章失败')
        }
      })
    },
    handleResize () {
      this.screenWidth = document.body.clientWidth
    }
  },
  created () {
    this.getRandomPost()
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.addEventListener('resize', this.handleResize)
    if(this.screenWidth > 992) {
      this.showSlideBg = true
      this.type = 'card'
      this.dots = 'none'
    } else {
      this.showSlideBg = true
      this.type = ''
      this.dots = ''
    }
  },
  watch: {
    screenWidth: {
      handler(val) {
        if(val > 992) {
          this.showSlideBg = true
          this.type = 'card'
          this.dots = 'none'
        } else {
          this.showSlideBg = true
          this.type = ''
          this.dots = ''
        }
      },
      deep: true
    }
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>
