<template>
  <div id="editor" class="editor" ref="editor">
    <p>{{contentData}}</p>
  </div>
</template>

<script>
import E from 'wangeditor'

export default {
  props: {
    contentData: String
  },
  data () {
    return {
      editor: ''
    }
  },
  mounted () {
    this.editor = new E('#editor')
    this.editor.customConfig.showLinkImg = false
    this.editor.customConfig.uploadImgMaxLength = 5
    this.editor.customConfig.onchangeTimeout = 500
    this.editor.customConfig.onblur = html => {
      this.$emit('onblur', html)
    }
    this.editor.create()
  }
}
</script>
<style lang="scss">
#editor{
  width: 100%;
  height: 40rem;
  margin: 0 auto;
  background: #fff;
  .w-e-text-container{
    height: 37.4rem !important;
  }
}
</style>
