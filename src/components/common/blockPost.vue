<template>
  <div class="common_blockPost">
    <div class="img_wrap">
      <router-link :to="{name: 'post', params: { type: post.parent, id: post._id }}">
        <img :src="defaultImg">
      </router-link>
      <router-link class="tag" :style="{ backgroundColor: tagRandomBg }" :to="{name: 'searchresult', params: { text: post.tag }}">{{ post.tag }}</router-link>
    </div>
    <h5 class="post_title">
      <router-link :to="{name: 'post', params: { type: post.parent, id: post._id }}" :title="post.title">{{ post.title | strShear(num) }}</router-link>
    </h5>
    <p class="post_content">{{ post.content || '' }}</p>
    <p class="post_publishMsg">
      <i class="el-icon-user"></i>
      <span class="author">{{ post.author | upperCase }}</span>
      <i class="el-icon-time"></i>
      <span class="time">{{ post.time }}</span>
    </p>
  </div>
</template>
<script>
import {getRandom, formatDate} from '@/util/index'
export default {
  data() {
    return {
      defaultImgSrc: require('@/assets/img/bg-6.png'),
      tagBg: ['#f9c100', '#4ca80b', '#ff7500', '#ee303a', '#0ab3af', '#fc4a00', '#0085FF', '#6555E2']
    }
  },
  props: {
    postData: Object,
    num: Number
  },
  computed: {
    post () {
      const obj = {...this.postData}
      for (const key in obj) {
        if(key === 'time') {
          obj[key] = formatDate(obj[key])
        }
      }
      return obj
    },
    // 获取文章的分类，用于跳转到对应路由
    // getPostType () {
    //   if(this.postData.parent === 'skill') return 'skillType'
    //   else return 'shareType'
    // },
    // 文章是否有图片，如果没有使用一张默认图片进行展示
    defaultImg () {
      if (this.postData.imgSrc) return this.postData.imgSrc
      else return this.defaultImgSrc
    },
    // 给tag随机的背景色
    tagRandomBg () {
      return this.tagBg[getRandom(0, this.tagBg.length)]
    }
  },
  filters: {
    upperCase (val) {
      return val.toUpperCase()
    }
  }
}
</script>

<style lang="scss">
.post_title a {
  color: grba(0,0,0,);
}
.post_content {
  color: $content-color;
}
.post_publishMsg {
  color: rgba(34,34,34,0.5);
  font-size: 1.2rem;
  i{
    margin-right: 0.4rem;
  }
  .author{
    color: rgba(34,34,34,0.6);
    font-size: 1.4rem;
    font-weight: bold;
    margin-right: 1rem;
  }
}
</style>
