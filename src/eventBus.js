/**
 * 组件之间的消息总线，用作组件间消息传递
 */
import Vue from 'vue';

/**
 *  Vue 实例
 *
 * @example
 *  A组件：
 *  import bus from '@/eventBus'
 *  触发事件
 *  bus.$emit('message', data)
 *
 *  B组件：
 *  import bus from '@/eventBus'
 *  侦听事件
 *  bus.$on('message', data => {
 *    收到A组件发送过来的消息
 *  })
 * 
 * 注意：解绑事件 bus.$off('message')
 */
export default new Vue({});