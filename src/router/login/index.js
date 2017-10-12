
export default {
  path: '/login',
  component: (resolve) => {
    require(['./login.vue'], resolve)
  }
}
