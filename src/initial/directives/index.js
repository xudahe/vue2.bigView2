import dialogDrag from './methods/dialogDrag' //<el-dialog></el-dialog> 标签组件拖拽指令
import draggable from './methods/draggable' //页面可视区域任意拖拽
import copy from './methods/copy' //复制粘贴指令
import longpress from './methods/longpress' //长按指令
import debounce from './methods/debounce' //防抖 v-debounce="[reset,`click`,1000]"
import throttle from './methods/throttle' //节流 v-throttle="[reset,`click`,1000]"
import waterMarker from './methods/waterMarker' //实现页面水印

//注册指令,出口文件，所有全局指令都在该文件里导出。
export default {
  dialogDrag,
  draggable,
  copy,
  longpress,
  debounce,
  throttle,
  waterMarker,
}
