<template>
  <div class="common_backTop">
    <el-backtop :bottom="20" :right="20">
      <i class="el-icon-top"></i>
    </el-backtop>
  </div>
</template>

<style <style lang="scss">
.common_backTop{
  .el-backtop{
    font-size: 2.5rem;
    color: #333;
    background-color: #fff;
    border-radius: 0.3rem;
    border: 1px solid rgba(0,0,0,.1);
    box-shadow: 0 10px 20px rgba(0,0,0,.03),
                0 6px 6px rgba(0,0,0,.05);
    &:hover{
      background: rgba(0,0,0,.03);
    }
  }
}
</style>
