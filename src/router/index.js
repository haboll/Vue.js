/**
 * Created by 栗子哥哥 on 2017/9/18.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: {
      init () {
        alert('404 NOT FOUND')
        setTimeout(history.back(), 2000)
      },
      template: '<span></span>'
    }
  },
  {
    path: '/redirect',
    component: {
      init () {
        this.$router.replace({
          path: decodeURIComponent(this.$route.query.dest || '/'),
          force: true
        })
      },
      template: '<span></span>'
    }
  },
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    component: (resolve) => {
      require(['@/views/login/login'], resolve)
    }
  },
  {
    path: '/main',
    component: (resolve) => {
      require(['@/views/main/main'], resolve)
    },
    children: [
      { path: '/', redirect: '/main/home' },
      {
        path: '/main/home',
        component: (resolve) => {
          require(['@/views/home/home'], resolve)
        }
      },
      {
        path: '/main/product',
        component: (resolve) => {
          require(['@/views/home/home'], resolve)
        },
        children: [
          {
            path: '/', redirect: '/main/product/system'},
          {
            path: '/main/product/system',
            component: (resolve) => {
              require(['@/views/home/home'], resolve)
            }
          },
          {
            path: '/main/product/hardware',
            component: (resolve) => {
              require(['@/views/home/home'], resolve)
            }
          },
          {
            path: '/main/product/solution',
            component: (resolve) => {
              require(['@/views/home/home'], resolve)
            }
          }
        ]
      },
      {
        path: '/main/case',
        component: (resolve) => {
          require(['@/views/home/home'], resolve)
        }
      },
      {
        path: '/main/about',
        component: (resolve) => {
          require(['@/views/home/home'], resolve)
        }
      }
    ],
    beforeEnter: (to, from, next) => {
      let auth = true
      if (!auth) {
        next({path: '/login'})
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  routes: routes
})
export default router
