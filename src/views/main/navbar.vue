<template>
  <div class="nav-bar">
      <div class="nav-left"></div>
      <div class="nav-right">
          <ul>
              <li>
                  <a target="_blank" href='http://manage.eshangneng.com'  onfocus="this.blur();"
                     style="background-color: #32396B">
                      <p id="system-entrance">进入管理系统</p>
                  </a>
              </li>
            <li v-for="item in items">
              <router-link :to="item.list[0].href">
                <p>{{item.name}}</p>
                <p>{{item.eName}}</p>
              </router-link>
              <div v-if="item.hasSubPath">
                <div v-for="list in item.list">
                  <router-link  :to="list.href">
                    <p>{{list.listName}}</p>
                    <p>{{list.eListName}}</p>
                  </router-link>
                </div>

              </div>
            </li>
          </ul>
      </div>
  </div>
</template>
<script>
  const navArr = [
    {
      id: 4,
      name: '关于我们',
      eName: 'ABOUT US',
      hasSubPath: false,
      list: [
        {
          listName: '',
          href: '/main/about'
        }
      ]
    },
    {
      id: 3,
      name: '案例展示',
      eName: 'CASE',
      hasSubPath: false,
      list: [
        {
          listName: '',
          href: '/main/case'
        }
      ]
    },
    {
      id: 2,
      name: '产品与服务',
      eName: 'PRODUCTS',
      hasSubPath: true,
      list: [
        {
          listName: '',
          href: '/main/product'
        },
        {
          listName: '系统平台',
          eListName: 'SYSTEM',
          href: '/main/product/system'
        },
        {
          listName: '硬件产品',
          eListName: 'HARDWARE',
          href: '/main/product/hardware'
        },
        {
          listName: '解决方案',
          eListName: 'SOLUTION',
          href: '/main/product/solution'
        }
      ]
    },
    {
      id: 1,
      name: '首页',
      eName: 'HOME',
      hasSubPath: false,
      list: [
        {
          listName: '',
          href: '/main/home'
        }
      ]
    }
  ]
  export default {
    name: 'navbar',
    data: () => {
      return {items: navArr}
    }
  }
</script>
<style lang="scss" scoped>
  @import './../../assets/css/navbar.scss';
</style>
