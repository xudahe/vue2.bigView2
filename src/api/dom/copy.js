/**
 * @description 复制文本
 * @param {DOM | String} obj   要复制的DOM元素文本或纯文本
 * @returns {Promise}
 * 示例：this.$copyText("xu")
 * 示例：this.$copyText(this.$refs.contentBox)
 */
function copyText(obj) {
  return new Promise((resolve, reject) => {
    const
      range = document.createRange(),
      selection = document.getSelection()
    if (typeof obj === "object") {
      // 将DOM元素中的文字添加到range对象中
      range.selectNodeContents(obj)
      // 清除已有选区
      selection.removeAllRanges()
      // 选中range对象中的所有文字
      selection.addRange(range)
      // 复制
      document.execCommand('Copy')
      // 清除已有选区
      selection.removeAllRanges()
    }
    if (typeof obj === "string") {
      const ele = document.createElement('span')
      ele.innerText = obj
      ele.style.cssText = `
                position: fixed;
                top: 0;
                opacity: 0;
                white-space: pre; 
            `
      document.body.appendChild(ele)
      range.selectNodeContents(ele)
      selection.removeAllRanges()
      selection.addRange(range)
      document.execCommand('Copy')
      document.body.removeChild(ele)
    }
    resolve()
  })
}

export default copyText
