<template>
  <div class="notFind">
    <div class="back_home">
      <router-link to="/">
        <img src="~@/assets/img/logo.png" alt="">
      </router-link>
    </div>
    <div class="notFind_box">
      <div>
        <img src="~@/assets/img/notfind.png" alt="">
      </div>
    </div>
    <p>很抱歉，找不到这个页面，请选择点击logo回到首页或关闭</p>
  </div>
</template>

<style lang="scss">
.notFind{
  width: 100%;
  height: 100%;
  padding: 0 1.5rem;
  box-sizing: border-box;
  .back_home{
    text-align: center;
    margin-top: 6%;
    margin-bottom: 6%;
    a{
      display: inline-block;
      display: block;
    }
  }
  
  .notFind_box{
    margin-bottom: 6%;
  }
  p{
    padding: 0 3rem;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    color: rgba(0,0,0,.5);
  }
}
@media screen and (max-width: 992px){
  .notFind_box{
    div{
      text-align: center;
      img{
        width: 90%;
        height: 40rem;
        object-fit: cover;
      }
    }
  }
}
</style>
