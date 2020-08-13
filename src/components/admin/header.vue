<template>
  <div class="admin_webData">
    <div class="webData_title">总览</div>
    <div class="dataNum">
      <div class="dataItem">
        <div>
          <p>访问数</p>
          <p class="num">{{dataNumList.visitNum}}</p>
        </div>
      </div>
      <div class="dataItem">
        <div>
          <p>文章数</p>
          <p class="num">{{dataNumList.postNum}}</p>
        </div>
      </div>
      <div class="dataItem">
        <div>
          <p>评论数</p>
          <p class="num">{{dataNumList.commentNum}}</p>
        </div>
      </div>
      <div class="dataItem">
        <div>
          <p>留言数</p>
          <p class="num">{{dataNumList.msgNum}}</p>
        </div>
        
      </div>
      <div class="dataItem">
        <div>
          <p>心情数</p>
          <p class="num">{{dataNumList.moodNum}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      webData: ["访问", "文章", "评论", "留言", "心情"]
    }
  },
  props: {
    dataNumList: {
      type: Object
    }
  }
}
</script>
