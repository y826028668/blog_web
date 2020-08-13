<template>
  <div class="redact">
    <h2>{{postId ? '编辑' : '发布'}}文章</h2>
    <div class="title">
      <el-input v-model="title" placeholder="输入标题内容"></el-input>
    </div>
    <editor :contentData="contentData" @onblur="getContent($event)"></editor>
    <div class="type">
      <span>文章类别：</span>
      <el-radio v-model="parent" label="skill">技术杂谈</el-radio>
      <el-radio v-model="parent" label="share">资源分享</el-radio>
      <el-input v-model="tag" size="small" placeholder="至少输入一个标签"></el-input>
    </div>
    <div class="img">
      <el-button type="primary" size="mini">上传<i class="el-icon-upload el-icon--right"></i></el-button>
      <input class="imgFile" type="file" accept="image/jpeg,image/png" ref="imgFile" @change="upload_img">
      <p>仅能上传jpg/jpeg/png文件，且不能超过2M，比例为4：3</p>
      <div class="img_wrap" v-if="imgSrc">
        <img :src="newImgSrc">
        <i class="el-icon-close" title="取消上传" @click="cancelUploadImg"></i>
      </div>
    </div>
    <el-button type="primary" class="submit" @click="submit">提交</el-button>
    <el-button type="info" class="back" @click="$emit('toggleContent')">返回</el-button>
    <span class="back_top" @click="$emit('toggleContent')"><i class="el-icon-back"></i></span>
  </div>
</template>
<script>
import Editor from './editor.vue'
import api from "@/api/index.js"

export default {
  components: {
    Editor
  },
  props: {
    postId: String
  },
  data () {
    return {
      parent: 'skill',
      title: '',
      content: '',
      tag: '',
      imgSrc: '',
      contentData: ''
    }
  },
  computed: {
    // 清除base64图片数据的空格和换行
    newImgSrc () {
      let str = ''
      str = this.imgSrc.replace(/\s+/g, '')
      str = str.replace(/[\r\n]/g, '')
      return str
    }
  },
  created () {
    // 如果postId有值，说明点击的是编辑，获取文章信息进行展示
    if (this.postId) {
      api.getOnePost({
        params: {
          postId: this.postId
        }
      }).then(res => {
        if(res.data.code === 200 && res.data.msg === 'OK' && res.data.data) {
          let data = res.data.data
          this.parent = data.parent
          this.content = data.content
          this.title = data.title
          this.tag = data.tag
          this.imgSrc = data.imgSrc
          this.contentData = data.content
        }
      })
    }
  },
  methods: {
    // 失焦时获取文本框内的内容保存到变量中
    getContent (e) {
      this.content = JSON.stringify(e)
    },
    // 将图片转换为base64格式
    upload_img () {
      const inputDom = this.$refs.imgFile
      let file = inputDom.files
      if ( file.length !== 0 ) {
        if (file[0].size > (1024*1024*2)) {
          return this.$message({  
            message: `图片大小不能超过2M，当前图片大小为${(file[0].size / 1024 / 1024).toFixed(2)}M`,  
            type: 'warning'  
          }); 
        }
      }
      const reader = new FileReader()
      reader.readAsDataURL(file[0])
      reader.onload = () => {
        this.imgSrc = reader.result
      }
      reader.onerror = err => {
        console.log('Error', error);
      }
    },
    // 取消上传图片
    cancelUploadImg() {
      const inputDom = this.$refs.imgFile
      inputDom.src = ''
      this.imgSrc = ''
    },
    // 点击提交发送请求
    submit () {
      const postObj = {
        parent: this.parent,
        title: this.title,
        content: this.content,
        tag: this.tag,
        imgSrc: this.imgSrc
      }
      // 根据postID，决定发送新增文章或修改文章
      if(this.postId) {
        api.updateOnePost({
          postId: this.postId,
          parent: this.parent,
          title: this.title,
          content: this.content,
          tag: this.tag,
          imgSrc: this.imgSrc
        }).then(res => {
          let data = res.data
          if(data.code === 200 && data.data === '文章修改成功') {
            this.$message({
              type: "success",
              message: "修改成功,即将返回到首页"
            })
            setTimeout(() => {
              this.$emit('toggleContent')
            },500)
          } else {
            this.$message("修改文章失败")
          }
        })
      } else {
        api.addOnePost({
          parent: this.parent,
          title: this.title,
          content: this.content,
          tag: this.tag,
          imgSrc: this.imgSrc
        }).then(res => {
          let data = res.data
          if(data.code === 200 && typeof(data.data) === 'object') {
            this.$message({
              type: "success",
              message: "发布文章成功,即将返回到首页"
            })
            setTimeout(() => {
              this.$emit('toggleContent')
            },500)
          } else {
            this.$message("发布文章失败")
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/admin/editPost.scss';
</style>
