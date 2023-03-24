import dateFormat from './methods/dateFormat'
import {
  sexIdcard,
  IDcardHide,
  telHide,
  nameHide
} from './methods/dataMasking'

/**
 * 注意：当有局部和全局两个名称相同的过滤器时候，会以就近原则进行调用，即：局部过滤器优先于全局过滤器被调用！
 */

// 注册过滤器,出口文件，所有全局过滤器都在该文件里导出。
export default {
  dateFormat,
  sexIdcard,
  IDcardHide,
  telHide,
  nameHide
}