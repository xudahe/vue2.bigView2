import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from "./store"

Vue.use(Vuex)

Vue.prototype.$store = store

//全局事件总线 eventBus
// Vue.prototype.$eventBus = new Vue();

//api模块初始化。引用第三方插件
import '@/initial/modules'

//路由拦截
import './router/intercept.js'

//全局过滤器初始化。在如下路径文件下全局注册过滤器即可。
import filters from '@/initial/filter/index'
// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

//全局指令初始化。在如下路径文件下全局注册指令即可。
import directives from '@/initial/directives/index'
// 全局注册指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, {
    // 只调用一次，指令第一次绑定到元素时调用
    bind: directives[key].bind || (() => {}),
    // 被绑定元素插入父节点时调用
    inserted: directives[key].inserted || (() => {}),
    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
    update: directives[key].update || (() => {}),
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: directives[key].componentUpdated || (() => {}),
    // 只调用一次，指令与元素解绑时调用
    unbind: directives[key].unbind || (() => {})
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')