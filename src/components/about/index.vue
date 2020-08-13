<template>
  <div class="b_about">
    <div class="about_title container">
      <h2>关于</h2>
      <span>非常欢迎大家访问本站</span>
    </div>
    <div class="about_wrap container">
      <div class="about_content">
        <div class="about_me">
          <h4>关于站长</h4>
          <p>
            cc，男，一个90后的菜鸡站长。大学主修室内设计，但谁知道毕业几年后就稀里糊涂的做起了前端，算是一种缘分吧，在这里感谢所有在这一路上给与我帮助与启发的人。正如我前面所说，在前端的行业里，我还是个菜鸡小白，以现在的前端生态来看，需要学的东西还有很多很多，估计以后还会更多，还是需要努力学习新的东西。俗话说活到老学到老，真特别适合编程类的行业，永远都有新的东西，技术更迭也比较快。希望在以后的生活和工作中，能够保持住这种学习的热情。最后希望以后我的头发能够安好吧，哈哈~~~
          </p>
        </div>
        <div class="about_web">
          <h4>关于本站</h4>
          <p>
            为什么要做这个网站呢，其实主要的原因还是想有一个属于自己的，用作记录各种各样技术或生活的网站。进入到互联网时代，发现现在总是提笔忘字，有时候想写点东西，总是忘记字怎么写，敲起键盘来倒是飞快，索性就做一个网站，以后有什么需要记录的知识或是其他什么东西，就统统写在这里吧，文笔不好的话就见笑了。
          </p>
        </div>
        <div class="contact_me">
          <h4>联系我</h4>
          <p>如果对本站有什么疑问，请联系我</p>
          <p>微信：y826028668</p>
          <p>QQ：826028668</p>
        </div>
      </div>
      <div class="right_wrap">
        <b-sidebar />
      </div>
    </div>
  </div>
</template>

<script>
import BSidebar from '../common/sidebar'

export default {
  components: {
    BSidebar
  }
}
</script>

<style lang="scss">
@import '@/assets/css/about/index.scss';
</style>
