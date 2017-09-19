export default {
  '/login': {
    title: '用户登录',
    component (resolve) {
      require(['@/views/login'], resolve)
    },
    forbidAuthed: true
  }
}
