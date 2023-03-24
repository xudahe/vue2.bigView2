const isEmpty = (val) => {
  if (val == null || val == "" || val == undefined) {
    return true
  } else {
    return false
  }
}

const transfer = (val) => {
  // return val < 10 ? `0${val}` : val

  //使用ES6中的字符串新方法来填充字符串；
  // String.prototype.padStart(maxLength, fillString =’’) 
  // String.prototype.padEnd(maxLength, fillString =’’)
  return val.toString().padStart(2, '0');
}

/**
 * @description 日期格式化
 * @param {String} val
 * @param {String} format
 * @returns {String} result
 * @description  <td>{{dateStr | dateFormat('yyyy-mm-dd')}}</td>
 */
const dateFormat = (val, format = "") => {
  if (isEmpty(val)) return
  let
    date = new Date(val),
    y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    h = date.getHours(),
    min = date.getMinutes(),
    s = date.getSeconds(),
    result = "";

  format = format.toLowerCase(); //转换成小写

  if (isEmpty(format)) {
    result = `${y}-${transfer(m)}-${transfer(d)} ${transfer(h)}-${transfer(min)}-${transfer(s)}`
  }
  if (format == 'yyyy-mm-dd') {
    result = `${y}-${transfer(m)}-${transfer(d)}`
  }
  if (format == 'yyyy-mm') {
    result = `${y}-${transfer(m)}`
  }
  if (format == 'mm-dd') {
    result = `${transfer(m)}-${transfer(d)}`
  }
  if (format == 'hh:mm') {
    result = `${transfer(h)}:${transfer(min)}`
  }
  if (format == 'yyyy') {
    result = `${y}`
  }
  return result
}

export default dateFormat