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
          path: decodeURIComponent(this.$route.query.dest || '/main'),
          force: true
        })
      },
      template: '<span></span>'
    }
  },
  {
    path: '/',
    beforeEnter: (to, from, next) => {
      next({path: '/main'})
    }
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
    beforeEnter: (to, from, next) => {
      let auth = true
      console.log(2)
      if (!auth) {
        console.log(1)
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
console.log(router)

export default router
