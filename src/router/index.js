/**
 * Created by 栗子哥哥 on 2017/9/18.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './main'
import Resume from './resume'
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
  {path: '/', redirect: '/main'}
]
routes.push(Main, Resume)
const router = new VueRouter({
  routes: routes
})
export default router
