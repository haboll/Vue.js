
export default {
  path: '/main',
  component: (resolve) => {
    require(['./main.vue'], resolve)
  },
  children: [
    { path: '/', redirect: '/main/home' },
    {
      path: '/main/home',
      component: (resolve) => {
        require(['./routes/home/index.vue'], resolve)
      }
    },
    {
      path: '/main/status',
      component: (resolve) => {
        require(['./routes/status/index.vue'], resolve)
      },
      children: [
        {
          path: '/', redirect: '/main/status/battery'},
        {
          path: '/main/status/battery',
          component: (resolve) => {
            require(['./routes/status/battery/index.vue'], resolve)
          }
        },
        {
          path: '/main/status/mcp',
          component: (resolve) => {
            require(['./routes/status/mcp/index.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/main/warn',
      component: (resolve) => {
        require(['./routes/warn/index.vue'], resolve)
      },
      children: [
        {
          path: '/', redirect: '/main/warn/time'},
        {
          path: '/main/warn/time',
          component: (resolve) => {
            require(['./routes/warn/time/index.vue'], resolve)
          }
        },
        {
          path: '/main/warn/history',
          component: (resolve) => {
            require(['./routes/warn/history/index.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/main/data',
      component: (resolve) => {
        require(['./routes/data/index.vue'], resolve)
      }
    },
    {
      path: '/main/system',
      component: (resolve) => {
        require(['./routes/system/index.vue'], resolve)
      },
      children: [
        {
          path: '/', redirect: '/main/system/warn'},
        {
          path: '/main/system/warn',
          component: (resolve) => {
            require(['./routes/system/warn/index.vue'], resolve)
          }
        },
        {
          path: '/main/system/battery',
          component: (resolve) => {
            require(['./routes/system/battery/index.vue'], resolve)
          }
        },
        {
          path: '/main/system/user',
          component: (resolve) => {
            require(['./routes/system/user/index.vue'], resolve)
          }
        }
      ]
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
