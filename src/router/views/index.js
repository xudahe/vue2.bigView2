export default [{
  path: "/homepage",
  name: "homepage",
  meta: {
    title: "综合"
  },
  component: () => import('@/views/home/homepage'),
  children: []
}, {
  path: "/application",
  name: "application",
  meta: {
    title: "运营"
  },
  component: () => import('@/views/home/application'),
  children: []
}, ]