<template>
  <div class="common_msg">
    <h3>网友留言</h3>
    <div class="block_msg clearboth animate__animated animate__fadeIn" v-for="msg in msgList" :key="msg._id">
      <img src="~@/assets/img/author.png">
      <div class="msg_content">
        <div class="meta">
          <span class="name">{{msg.name}}</span>
          <span class="time">{{msg.time}}</span>
          <span class="reply" v-if="token" @click="replyUser(msg)">回复</span>
        </div>
        <div class="content">{{msg.content}}</div>
        <div class="admin" v-if="msg.replyMsg">
          <i class="el-icon-user-solid"></i>
          <span>站长回复：</span>
          {{msg.replyMsg}}
        </div>
      </div>
    </div>
    <div class="msg_paging">
      <el-pagination
        layout="prev, pager, next"
        :page-size="6"
        :total="total"
        hide-on-single-page
        @current-change="msgChangePaging">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    msgList: Array,
    total: Number
  },
  data () {
    return {
      token: '',
      isShowReply: false,
      reply: ''
    }
  },
  methods: {
    // 切换分页
    msgChangePaging(i) {
      this.$emit('msgChangePaging', i)
    },
    // 回复
    replyUser (i) {
      this.$emit('replyUser', i.name, i._id)
    }
  },
  created() {
    this.token = sessionStorage.getItem('token')
  },
}
</script>
