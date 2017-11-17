<template>
  <div class="modal-wrapper">
    <alert></alert>
    <div class="wrapper">
      <Navbar></Navbar>
      <div class="main">
        <side-bar :block="blocks"></side-bar>
        <div class="sem">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Navbar from './navbar'
  import SideBar from './sidebar'
  import Alert from '@/components/alert'
  import Icons from '@/assets/icons'

  const initBlocks = [
    {
      id: 1,
      name: 'home',
      eName: 'home',
      icon: Icons.batch,
      iconChecked: Icons.batch,
      hasSubPath: false,
      list: [
        {
          listName: 'home',
          href: '/main/home'
        }
      ]
    },
    {
      id: 2,
      name: 'status',
      eName: 'status',
      icon: Icons.batch,
      iconChecked: Icons.batch,
      hasSubPath: true,
      list: [
        {
          listName: 'battery',
          eListName: '',
          href: '/main/status/battery'
        },
        {
          listName: 'mcp',
          eListName: '',
          href: '/main/status/mcp'
        }
      ]
    },
    {
      id: 3,
      name: 'warn',
      eName: 'warn',
      hasSubPath: true,
      list: [
        {
          listName: 'time',
          href: '/main/warn/time'
        },
        {
          listName: 'history',
          href: '/main/warn/history'
        }
      ]
    },
    {
      id: 4,
      name: 'data',
      eName: 'data',
      hasSubPath: false,
      list: [
        {
          listName: 'data',
          href: '/main/data'
        }
      ]
    },
    {
      id: 5,
      name: 'system',
      eName: 'system',
      hasSubPath: true,
      list: [
        {
          listName: 'swarn',
          href: '/main/system/warn'
        },
        {
          listName: 'sbattery',
          href: '/main/system/battery'
        },
        {
          listName: 'suser',
          href: '/main/system/user'
        }
      ]
    }
  ]
  export default {
    name: 'main',
    components: {Navbar, SideBar, Alert},
    computed: {
      block: function () {
        initBlocks.map(item => {
          item.Name = this.$t(`sidebar.${item.name}`)
          item.list.map((i) => {
            i.ListName = this.$t(`sidebar.${i.listName}`)
          })
        })
        return initBlocks
      },
      blocks: function () {
        let path = this.$route.path
        return this.block.map((item, index) => {
          item.isLink = item.list.some((i) => {
            i.isLink = i.href === path
            return i.href === path
          })
          return item
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/css/baseStyle.scss";
</style>

