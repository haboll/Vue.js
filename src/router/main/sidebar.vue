<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <ul>
        <li v-for="item in block" class="block-wrapper">
          <router-link :to="item.list[0].href" class="block" :class="{active: item.isLink}">
            <img class="block-img" :src="item.isLink?item.icon:item.iconChecked"/>
            <div>{{item.Name}}</div>
            <img v-if="item.hasSubPath" class="block-arrow" :src="item.iconChecked"/>
          </router-link>
          <div v-if="item.hasSubPath" class="menu-block">
            <div v-for="list in item.list" class="menu-list">
              <router-link  :to="list.href" class="list" :class="{active: list.isLink}">
                <p>{{list.ListName}}</p>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  const SideBar = Vue.component('sidebar', {
    props: ['block'],
    created: function () {
      console.log(this.block)
    }
  })
  export default SideBar
</script>
<style lang="scss" scoped>
  @import './../../assets/css/sidebar.scss';
</style>
