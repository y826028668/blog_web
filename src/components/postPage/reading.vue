<template>
  <div class="common_reading">
    <el-progress 
      :type="mType" 
      :percentage="+percentage" 
      color="#3545ee"
      :stroke-width="3"
      :width="80"
    ></el-progress>
  </div>
</template>
<script>
export default {
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      screenWidth: '',
      mType: 'circle'
    }
  },
  methods: {
    handleResize () {
      this.screenWidth = document.body.clientWidth
    }
  },
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.addEventListener('resize', this.handleResize)
    if(this.screenWidth > 992) {
      this.mType = 'circle'
    } else {
      this.mType = 'line'
    }
  },
  watch: {
    screenWidth: {
      handler(val) {
        if(val > 992) {
          this.mType = 'circle'
        } else {
          this.mType = 'line'
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
