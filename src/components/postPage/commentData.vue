<template>
  <div class="post_comment">
    <div class="commentTemp clearboth">
      <div class="left_img">
        <img src="~@/assets/img/author.png">
      </div>
      <div class="right_content">
        <div class="right_top">
          <span class="name">{{data.name}}</span>
          <span class="time">{{newTime}}</span>
          <span class="reply" v-if="!data.parentCmtId" @click="$emit('replyCmt', data)">回复</span>
        </div>
        <div class="content">{{data.content}}</div>
      </div>
    </div>
    <div class="cmtChildren" v-if="cmtList.length !== 0">
      <comment-template v-for="cmt in cmtList" :key="cmt._id"  :id="cmt._id"></comment-template>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'
import moment from 'moment'
import {formatDate} from '@/util/index'
export default {
  name: 'comment-template',
  props: {
    id: String
  },
  data() {
    return {
      data: '',
      parentName: '',
      parentId: '',
      cmtList: []
    }
  },
  computed: {
    newTime () {
      let time = moment(this.data.time).format('YYYY-MM-DD, hh:mm')
      return time
    }
  },
  methods: {
    // 获取评论数据
    getComment (id) {
      api.getOneComment({
        params: {
          id
        }
      }).then(res => {
        let data = res.data
        if(data.code === 200 && data.data._id){
          this.data = data.data
        }
      })
    },
    // 获取子评论数据
    getChildCmt (id) {
      api.getAllChildCmt({
        params: {
          id
        }
      }).then(res => {
        let data = res.data
        if(data.code === 200 && data.data) {
          this.cmtList = data.data
        }
      })
    }
  },
  created () {
    this.getComment(this.id)
    this.getChildCmt(this.id)
  }
}
</script>
