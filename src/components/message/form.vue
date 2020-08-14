<template>
  <div class="common_form">
    <el-form 
      :model="msgForm" 
      status-icon 
      :rules="rules" 
      ref="msgForm"
      class="demo-ruleForm">
      <el-form-item class="name" prop="name">
        <el-input type="text" placeholder="昵称*" v-model="msgForm.name" autocomplete="off" @blur="checkName"></el-input>
      </el-form-item>
      <el-form-item class="email" prop="email">
        <el-input type="text" placeholder="邮箱*" v-model="msgForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item class="content" prop="content">
        <el-input type="textarea" :rows="5" maxlength="50" v-model="msgForm.content" placeholder="请输入留言内容"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <p class="clearboth"><el-button type="primary" @click="submitForm('msgForm')">发布</el-button></p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api/index.js'
import {filterStr} from '@/util'
export default {
  data() {
    return {
      msgForm:{
        name: '',
        email: '',
        content: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' },
          {type: 'string', whitespace: true}
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
          {type: 'string', whitespace: true}
        ],
        content: [
          { required: true, message: '请输入留言内容', trigger: 'blur' },
          { min: 1, max: 50, message: '长度不超过50个字符', trigger: 'blur' },
          {type: 'string', whitespace: true}
        ]
      }
    }
  },
  methods: {
    // 表单验证
    submitForm(formName) {
      const obj = {...this.msgForm}
      this.$refs[formName].validate((valid) => {
        this.msgForm.name = filterStr(this.msgForm.name)
        this.msgForm.email = filterStr(this.msgForm.email)
        this.msgForm.content = filterStr(this.msgForm.content)
        if (valid) {
          this.$emit('submitForm', obj)
          this.msgForm.content = ''
        } else {
          alert('未通过验证，请检查后重试')
          return false
        }
      })
    },
    // 检查昵称是否重复
    checkName () {
      if(!this.msgForm.name) return
      api.checkName({
        params: {
          name: filterStr(this.msgForm.name)
        }
      }).then(res => {
        let data = res.data
        if(data.data === '昵称重复'){
          alert('昵称重复请更换')
        }
      })
    },
    // 发布成功后初始化
    successMsg () {
      this.content = ''
    }
  },
  beforeDestroy () {
    this.msgForm.name = ''
    this.msgForm.email = ''
    this.msgForm.content = ''
  }
}
</script>
