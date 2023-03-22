import Vue from 'vue'

// 引入UI框架
import './UI/elementUI'
import './UI/iviewUI'
// 引入全局样式
import '@/global/css/elementUI.less'
import '@/global/css/IviewUI.less'
// 引入全局自定义样式
import '@/global/css/index.css'
import '@/global/css/animation.css'
import '@/global/css/button.css'
// 引入css样式初始化
import 'normalize.css/normalize.css'
// 引入第三方图标库：https://www.thinkcmf.com/font/search.html，例如：<i class="fa fa-minus"></i>
import "font-awesome/css/font-awesome.css" //
// 引入数组模块
import ArrayMethod from '@/api/array'
// 引入文本复制模块
import Copy from '@/api/dom/copy'
// 引入全屏函数
import FullScreen from '@/api/other/full_screen'
// 引入时间格式化函数
import Date from '@/api/date'
// 引入全局提示模块
import Message from '@/api/message'

// 引入二次封装的axios模块d
import axios from '@/api/axios/index'

// 结合 promise 封装原生ajax
import http from '@/api/axios/http'
Vue.use(http)

//定义全局混入
import theme from '@/api/mixins/theme'
Vue.mixin(theme)


/**
 * @description 添加axios实例
 * 数据请求
 */
Vue.prototype.$ajax = axios

/**
 * @description 引入全局提示
 * @param {String} msg 提示内容
 */
Vue.prototype.$successMsg = Message.successMsg
Vue.prototype.$warnMsg = Message.warnMsg
Vue.prototype.$errorMsg = Message.errorMsg

/**
 * @description 引入全局通知
 * @param {String} msg 通知内容
 * @param {String} title 标题
 */
Vue.prototype.$successTip = Message.successTip
Vue.prototype.$warnTip = Message.warnTip
Vue.prototype.$errorTip = Message.errorTip

/**
 * @description 引入全局弹框
 * @param {String} title 标题
 * @param {String} msg 内容
 * @param {Boolean} isHTML 内容是否为html
 */
Vue.prototype.$showMsgBox = Message.showMsgBox

/**
 * @description 引入全局弹框
 * @param {String} title 标题
 * @param {String} msg 内容
 * @param {Boolean} isHTML 内容是否为html
 */
Vue.prototype.$showTipDiy = Message.showTipDiy

/**
 * @description 引入时间格式化函数
 * @param {String | Date} date 日期格式化
 */
Vue.prototype.$formatDate = Date.formatDate

/**
 * @description 根据时间转换为文件名称
 */
Vue.prototype.$namDate = Date.namDate

/**
 * @description 日期差(date_2 - date_1)
 * @param {String | Date} date_1
 * @param {String | Date} date_2
 * @returns {Number} 返回日期差
 */
Vue.prototype.$dateDiff = Date.dateDiff

/**
 * @description 获取指定日期
 */
Vue.prototype.$setDay = Date.setDay
Vue.prototype.$setMonth = Date.setMonth
Vue.prototype.$setYear = Date.setYear
Vue.prototype.$setDate = Date.setDate
Vue.prototype.$fromNow = Date.fromNow

/**
 * @description 设置全屏函数与取消全屏函数
 * @param {DOM Object} element DOM元素
 */
Vue.prototype.$setFullScreen = FullScreen.requestFullScreen
Vue.prototype.$cancelFullScreen = FullScreen.cancelFullScreen

/**
 * @description 文本复制
 * @param {DOM | String} obj 要复制的内容或DOM文本节点
 * @returns {Promise}
 */
Vue.prototype.$copyText = Copy


/**
 * @description 排序（只排字段值为数字和日期）
 * @param {Array} list 需要排序的数组
 * @param {Boolean} isDes 是否倒序
 * @param {String} property 如果排序元素为对象，可指定需要排序的字段
 * @returns {Array} 返回新的数组
 */
Vue.prototype.$sortList = ArrayMethod.sortList

/**
 * @description 排序
 * @param {Array} list 需要排序的数组
 * @param {Boolean} isDes 是否倒序
 * @param {String} property 如果排序元素为对象，可指定需要排序的字段
 * @returns {Array} 返回新的数组
 */
Vue.prototype.$searchResult = ArrayMethod.searchResult

/**
 * @description 去重
 * @param {Array} arr 需要去重的数组
 * @param {String} key 数组元素为对象，可传入key值进行排序（对象键值为一层）
 * @returns {Array} 返回新的数组
 */
Vue.prototype.$removeRepeat = ArrayMethod.removeRepeat


import ElementResizeDetectorMaker from "element-resize-detector"
Vue.prototype.$erd = ElementResizeDetectorMaker()


// 阻止显示生产模式的消息
Vue.config.productionTip = false