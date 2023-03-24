/**
 * @description 防抖函数(有两种)
 * @description 一种是立即执行：频繁触发事件，第一次触发时执行函数，后面触发不会执行，停止触发，间隔一定时间之后再触发事件，函数才会再次执行
 * @description 一种是最后执行：频繁触发事件，事件只会在触发事件之后间隔定义的时间，函数才会被执行，而且只会执行最后一次触发的事件。
 * @param {Function} callback 回调函数
 * @param {Number} time 单位ms
 * @param {Boolean} immediate 第一次是否调用(立即执行)
 * @returns {Function}
 */
export function debounce(callback, time, immediate = true) {
  var timeout, result;

  var debounced = function () {
    // 保存this指向
    var context = this
    // 如果定时器存在,就清除定时器引用
    timeout && clearTimeout(timeout)
    // 如果参数为true, 则为即执行函数
    if (immediate) {
      // 如果定时器引用不存在,则立刻调用函数;如果定时器存在,则不调用函数
      var isCall = !timeout
      // 给定时器添加引用
      timeout = setTimeout(() => {
        // time秒后去除定时器引用
        timeout = null
      }, time)
      isCall && (result = callback.apply(context, arguments))
    } else {
      // time秒后执行函数
      timeout = setTimeout(() => {
        callback.apply(context, arguments)
      }, time)
    }
    // 返回函数结果(一般用于即执行函数)
    return result
  }

  //取消
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
}

/**
 * @description 节流函数
 * @description 连续出发事件后，会先执行一次事件函数，执行之后如果在规定时间间隔内再触发事件，将不出触发函数，超过规定的事件间隔后会再次触发一次，如此往复
 * @param {Function} callback 回调函数
 * @param {Number} wait 单位ms
 * @param {object} options  leading：false 表示禁用第一次执行 trailing: false 表示禁用停止触发的回调
 * @returns {Function}
 */
export function throttle(callback, wait, options) {
  var timeout, context, args, previous = 0
  if (!options) options = {};
  // 设置一个函数,用于收尾调用(最后一次调用)
  var later = function () {
    previous = options.leading === false ? 0 : new Date();
    timeout = null
    callback.apply(context, args)
    if (!timeout) context = args = null;
  }
  var throttled = function () {
    // 设置当前时间
    var now = +new Date()
    if (!previous && options.leading === false) previous = now;
    // 保存当前时间差
    var remaining = wait - (now - previous)
    context = this
    args = arguments

    /**
     * 如果时间差小于零,表示已经超过等待时间,可以立刻执行.
     * 第二种情况就是修改了系统时间
     * 如果将系统时间改为以前，则使得当前时间小于上一次的时间，出现remaining比wait大的情况
     * 如果将系统时间改为久远的未来，则使得当前时间远大于上一次的时间，出现remaining为负数的情况
     */
    if (remaining <= 0 || remaining > wait) {
      // 定时器存在,去除定时器,保存当前时间,立刻执行函数.
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      callback.apply(context, args)
      if (!timeout) context = args = null;
    } else if (!timeout) {
      // 如果定时器不存在,将延迟函数的执行
      timeout = setTimeout(later, remaining)
    }
  }
  //取消
  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  }
  return throttled;
}


//组件内部使用
// import {
//   debounce
// } from '@/api/control/index.js'

// methods: {
//   handleClick: debounce(function () {

//   }, 1000),
// }