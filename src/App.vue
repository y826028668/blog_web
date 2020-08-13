<template>
  <div id="app">
    <transition name="fade">
      <keep-alive>
        <router-view v-if="isRouterAlive" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/css/index.scss';
@import '@/assets/css/mobile.scss';
</style>
