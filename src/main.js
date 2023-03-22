import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from "./store"

Vue.use(Vuex)

//全局事件总线 eventBus
// Vue.prototype.$eventBus = new Vue();

//api模块初始化。引用第三方插件
import '@/initial/modules'

//路由拦截
import './router/intercept.js' 

//图片点击放大预览
import Viewer from 'v-viewer'
Vue.use(Viewer)
Viewer.setDefaults({
  Options: {
    'inline': true,
    'button': true, //右上角按钮
    "navbar": true, //底部缩略图
    "title": true, //当前图片标题
    "toolbar": true, //底部工具栏
    "tooltip": true, //显示缩放百分比
    "movable": true, //是否可以移动
    "zoomable": true, //是否可以缩放
    "rotatable": true, //是否可旋转
    "scalable": true, //是否可翻转
    "transition": true, //使用 CSS3 过度
    "fullscreen": true, //播放时是否全屏
    "keyboard": true, //是否支持键盘
    'url': 'data-source'
  }
})

// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.prototype.$store = store

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')