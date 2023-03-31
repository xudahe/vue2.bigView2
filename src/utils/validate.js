/**
 * @description 验证是否为邮箱
 * @param {String} s 
 */
export function isEmail(s) {
  return /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 *  @description 验证是否为手机号码
 * @param {String} s
 */
export function isMobile(s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * @description 验证是否为电话号码
 * @param {String} s 
 */
export function isPhone(s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * @description 验证是否为全小写
 * @param {String} s 
 */
export function isLowerCase(s) {
  return /^[a-z]+$/.test(s)
}
/**
 * @description 验证是否为全大写
 * @param {String} s 
 */
export function isUpperCase(s) {
  return /^[A-Z]+$/.test(s)
}


/**
 * @description 判断是否为数字类型
 * @param {String} s
 */
export function isDigit(value) {
  var patrn = /^[0-9]*$/;
  if (patrn.exec(value) == null || value == "") {
    return false;
  } else {
    return true;
  }
}

// 校验是否为中国大陆手机号
export function isTel(value) {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString());
}

// 校验是否为中国大陆传真或固定电话号码
export function isFax(str) {
  return /^([0-9]{3,4})?[0-9]{7,8}$|^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str);
}

// 校验是否为QQ号码
// 校验规则： 非0开头的5位-13位整数
export function isQQ(value) {
  return /^[1-9][0-9]{4,12}$/.test(value.toString());
}

// 校验是否为 数字
export function isNum(value, floats = null) {
  let regexp = new RegExp(`^[1-9][0-9]*.[0-9]{${floats}}$|^0.[0-9]{${floats}}$`);
  return typeof value === 'number' && floats ? regexp.test(String(value)) : true;
}

// 校验是否为非零的正整数
export function isInt(value, minLength = null, maxLength = undefined) {
  if (!isNum(value)) return false;

  let regexp = new RegExp(`^-?[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
  return regexp.test(value.toString());
}

// 校验是否为非零的正整数
export function isPInt(value, minLength = null, maxLength = undefined) {
  if (!isNum(value)) return false;

  let regexp = new RegExp(`^[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
  return regexp.test(value.toString());
}

// 校验是否为非零的负整数
export function isNInt(value, minLength = null, maxLength = undefined) {
  if (!isNum(value)) return false;
  let regexp = new RegExp(`^-[1-9][0-9]${anysicIntLength(minLength,maxLength)}$`);
  return regexp.test(value.toString());
}


// 校验字符是否以字母开头
// 校验规则： 必须以字母开头；开头的字母不区分大小写
export function letterBegin(str) {
  return /^[A-z]/.test(str);
}

// 清除所有空格
export function clearSpaces(str) {
  return str.replace(/[ ]/g, '');
}

// 清除所有中文字符(包括中文标点符号)
export function clearCNChars(str) {
  return str.replace(/[\u4e00-\u9fa5]/g, '');
}

// 清除所有中文字符及空格
export function clearCNCharsAndSpaces(str) {
  return str.replace(/[\u4e00-\u9fa5 ]/g, '');
}

// 校验是否包含空格
export function haveSpace(str) {
  return /[ ]/.test(str);
}

// 校验是否包含中文字符(包括中文标点符号)
export function haveCNChars(str) {
  return /[\u4e00-\u9fa5]/.test(str);
}

//校验不能为空
export function isNull(val) {
  if (typeof val == 'boolean') {
    return false;
  }
  if (typeof val == 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length == 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val == 'null' || val == null || val == 'undefined' || val == undefined || val == '') return true;
    return false;
  }
  return false;
}

//密码验证
export function isPwd(str) {
  var reg0 = /^\S{6,}$/;
  // 不少于6位字符（任何字符）

  var reg1 = /([0-9a-zA-Z])\1{5,17}/;
  // 连续重复字符，检索 6 到 18 位的连续重复字符，如：aaaaaaa

  var reg2 = /((?:0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)|9(?=0)){5,9}\d)/;
  // 递增数字，检索 6 到 10 位连续递增数字，如：9876543
  // 9 后面面可以是 0，如： 012345，567890

  var reg3 = /((?:0(?=9)|9(?=8)|8(?=7)|7(?=6)|6(?=5)|5(?=4)|4(?=3)|3(?=2)|2(?=1)|1(?=0)){5,9}\d)/;
  // 递减数字，检索 6 到 10 位连续递增数字，如：1234567
  // 9 前面可以是 0，如： 098765，543210

  var reg4 = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~!@#$%^&*_.]).{8,}$/;
  // 口令长度8位以上，至少包含大小写字母、数字、特殊符号
}