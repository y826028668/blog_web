<template>
  <div class="home_main">
    <top-post class=" container"></top-post>
    <hot-post></hot-post>
    <h-slide></h-slide>
    <new-post class=" container"></new-post>
  </div>
</template>

<script>
import TopPost from './topPost'
import HotPost from './hotPost'
import HSlide from './slide'
import NewPost from './newPost'
export default {
  components: {
    TopPost,
    HotPost,
    HSlide,
    NewPost
  }
}
</script>

<style lang="scss">
@import '@/assets/css/home/main.scss';
</style>
