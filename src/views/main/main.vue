<template>
  <div>
    <Navbar></Navbar>
    <Sidebar></Sidebar>
    <div>
     <router-view></router-view>
    </div>
  </div>
</template>
<script>
import Navbar from './navbar'
import Sidebar from './sidebar'
export default {
  name: 'main',
  components: { Navbar, Sidebar }
}
</script>

