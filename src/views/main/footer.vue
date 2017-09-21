<template>
  <div class="footer">
    <ul>
      <li><router-link to="main/home">首页</router-link>|</li>
      <li><router-link to="main/product">产品与服务</router-link>|</li>
      <li><router-link to="main/case">案例展示</router-link>|</li>
      <li><router-link to="main/about">关于我们</router-link></li>
    </ul>
    <p><img src="../../assets/images/icon_home_phone.png" width="24" height="24"> 咨询电话 028-65786048</p>
    <p>蜀ICP备09001737 | &copy 2017 四川长虹电器股份有限公司 版权所有 </p>

  </div>
</template>
<script>
  export default {
    name: 'footer'
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/footer.scss";
</style>
