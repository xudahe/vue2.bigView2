import { isNull } from "@/utils/validate";

/**
 * 设置主题
 */
export const setTheme = (name) => {
    console.log('theme-' + name)
    document.body.className = (!isNull(name) ? 'theme-' + name : '') + (document.body.className.indexOf('grayMode') != -1 ? ' grayMode' : '');
}

/**
 * 设置灰色
 */
export const toggleGrayMode = (status) => {
    if (status) {
        document.body.className = document.body.className + (document.body.className.indexOf('grayMode') != -1 ? '' : ' grayMode');
    } else {
        document.body.className = document.body.className.replace(' grayMode', '');
    }
};