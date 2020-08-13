<template>
  <div>
    <el-container>
      <el-header height="0" :class="navBarFixed == true ? 'navBarWrap' :''">
        <c-header></c-header>
      </el-header>
      <el-main style="overflow: visible">
        <transition name="index">
          <router-view></router-view>
        </transition>
      </el-main>
      <el-footer height="0">
        <c-footer></c-footer>
      </el-footer>
    </el-container>
    <back-top ref="backTop"></back-top>
  </div>
</template>

<script>
import CHeader from '../components/common/header'
import CFooter from '../components/common/footer'
import BackTop from '../components/common/backTop'
export default {
  components: {
    CHeader,
    CFooter,
    BackTop
  },
  data() {
    return {
      navBarFixed: false
    }
  },
  mounted() {
    this.$root.backTop = this.$refs.backTop
    window.addEventListener('scroll', this.watchScroll)
  },
  methods: {
    watchScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 70) {
        this.navBarFixed = true
      } else {
        this.navBarFixed = false
      }
    }
  }
}
</script>
<style lang="scss">
@import '../assets/css/home/index.scss';

.navBarWrap {
  position:fixed;
  top:0;
  width: 100%;
  background: #fff;
  animation: navAnim 0.3s;
  z-index:99999;
}
@keyframes navAnim {
  0%{
    top: -100%;
  }
  100%{
    top: 0;
  }
}
</style>
