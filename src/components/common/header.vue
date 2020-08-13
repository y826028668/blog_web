<template>
  <div class="common_header container">
    <h1>
      <router-link to="/" title="CC的个人博客">
        <img src="~@/assets/img/logo.png" alt="CCBLOG">
      </router-link>
    </h1>
    <ul class="menu">
      <li><router-link :to="{name: 'index'}" router-link-active="active" exact>首页</router-link></li>
      <li><router-link :to="{name: 'skill'}">技术杂谈</router-link></li>
      <li><router-link :to="{name: 'share'}">资源分享</router-link></li>
      <li><router-link :to="{name: 'message'}">留言</router-link></li>
      <li><router-link :to="{name: 'about'}">关于</router-link></li>
    </ul>
    <div class="menu_small" @click="openMenu">
      <span class="el-icon-menu"></span>
    </div>
    <router-link :to="{name: 'search'}" class="search_wrap">
      <i class="el-icon-search"></i>
    </router-link>
    <transition name="menuSmall">
      <ul class="menu_smallList" v-show="showMenu" @click.self="aaaa">
        <li class="logo">
          <div @click="backHome">
            <img src="~@/assets/img/logo.png" alt="CCBLOG">
          </div>
          <i class="el-icon-close" @click.self="closeMenu"></i>
        </li>
        <li @click="closeMenu" class="menu_item"><router-link :to="{name: 'index'}" router-link-active="active" exact>首页</router-link></li>
        <li @click="closeMenu" class="menu_item"><router-link :to="{name: 'skill'}">技术杂谈</router-link></li>
        <li @click="closeMenu" class="menu_item"><router-link :to="{name: 'share'}">资源分享</router-link></li>
        <li @click="closeMenu" class="menu_item"><router-link :to="{name: 'message'}">留言</router-link></li>
        <li @click="closeMenu" class="menu_item"><router-link :to="{name: 'about'}">关于</router-link></li>
      </ul>
    </transition>
    <div class="coverup" v-show="showMenu" @click.self="closeMenu"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    openMenu () {
      this.showMenu = true
    },
    closeMenu () {
      this.showMenu = false
    },
    backHome () {
      this.closeMenu()
      if(this.$route.fullPath === '/index') {
        window.scrollTo(0,0)
      } else {
        this.$router.push({name: 'index'})
      }
    }
  }
}
</script>

<style lang="scss">
:root {
  --animate-delay: 0.1s;
}
.menuSmall-enter-to{
  animation: openMenuSmall .3s;
}

.menuSmall-leave-to{
  animation: closeMenuSmall .3s;
}

.menu_item{
  transform: translateX(-100%);
  animation: liAnim .3s .3s;
  animation-fill-mode: forwards;
  &:nth-of-type(2){
    animation-delay: 0.4s;
  }
  &:nth-of-type(3){
    animation-delay: 0.5s;
  }
  &:nth-of-type(4){
    animation-delay: 0.6s;
  }
  &:nth-of-type(5){
    animation-delay: 0.7s;
  }
  &:nth-of-type(6){
    animation-delay: 0.8s;
  }
}
@keyframes openMenuSmall {
  0%{
    left: -50%
  }
  100%{
    left: 0%;
  }
}
@keyframes closeMenuSmall {
  0%{
    left: 0%
  }
  100%{
    left: -50%;
  }
}
@keyframes liAnim {
  0%{
    transform: translateX(-100%);
  }
  100%{
    transform: translateX(0%);
  }
}
</style>
