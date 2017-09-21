<template>
  <div class="wrapper">
    <Navbar></Navbar>
    <div class="sem-main">
     <router-view></router-view>
    </div>
    <FooterBar></FooterBar>
  </div>
</template>
<script>
import Navbar from './navbar'
import FooterBar from './footer'

export default {
  name: 'main',
  components: { Navbar, FooterBar }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/css/baseStyle.scss";
</style>

