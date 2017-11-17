export default {
  path: '/main',
  component: (resolve) => {
    require(['./main.vue'], resolve)
  }
}
