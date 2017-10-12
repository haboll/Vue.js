<template>
  <div class="nav-bar">
      <div class="nav-left">
        <img src="../../assets/images/logo_topbar.png" alt="logo.png" />
      </div>
      <div class="nav-right">
          <ul>
            <li>{{nav.manager}}</li>
            <li @click.stop.prevent="onclick">{{nav.loginOut}}</li>
          </ul>
      </div>
  </div>
</template>
<script>
  export default {
    name: 'navbar',
    methods: {
      onclick: function () {
        console.log(1)
        this.$router.push('/login')
      }
    },
    computed: {
      nav: function () {
        return {
          manager: this.$t('nav.manager'),
          loginOut: this.$t('nav.loginOut')
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import './../../assets/css/navbar.scss';
</style>
