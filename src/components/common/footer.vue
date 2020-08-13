<template>
  <div class="common_footer container">
    <h2>
      <div @click="backHome" title="CC的个人博客" style="cursor: pointer">
        <img src="~@/assets/img/logo.png" alt="CCBLOG">
      </div>
    </h2>
    <div class="footer_copyright">
      <p>Copyright © CC个人博客 2020 · All rights reserved</p>
      <p>备案号</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backHome () {
      if(this.$route.fullPath === '/index') {
        window.scrollTo(0,0)
      } else {
        this.$router.push({name: 'index'})
      }
    }
  }
}
</script>
