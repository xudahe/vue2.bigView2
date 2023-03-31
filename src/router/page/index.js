export default [{
    path: "/",
    name: "",
    meta: {
      title: "重定向"
    },
    redirect: "/login", //默认重定向到登录
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      title: "登录"
    },
    component: () => import('@/page/login/index'),
  },
  {
    path: '/loading',
    name: 'loading',
    meta: {
      title: "中间页"
    },
    component: () => import('@/page/login/loading'),
  },
  {
    path: "/layout",
    name: 'layout',
    meta: {
      title: "主页"
    },
    component: () => import('@/page/layout/index'),
    children: []
  },
  {
    path: '/lock',
    name: '锁屏页',
    component: () => import('@/page/lock/index'),
    meta: {
      title: "锁屏页"
    }
  },
  // {
  //   path: '/404',
  //   component: () => import('@/components/error-page/404'),
  //   name: '404',
  //   meta: {
  //     title: "404"
  //   }
  // },
  // {
  //   path: '/403',
  //   component: () => import('@/components/error-page/403'),
  //   name: '403',
  //   meta: {
  //     title: "403"
  //   }
  // },
  // {
  //   path: '/500',
  //   component: () => import('@/components/error-page/500'),
  //   name: '500',
  //   meta: {
  //     title: "500"
  //   }
  // },
]