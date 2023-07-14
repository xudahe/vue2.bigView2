/**
 * 创建script,按需加载
 * @param url
 * @returns {Promise}
 */

const cerateScriptLoaded = url => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = function () {
      resolve()
    }
    document.body.appendChild(script)
  })
}


const loadedScripts = []

const loadScripts = urls => {
  const diffUrls = urls.filter(item => loadedScripts.indexOf(item) < 0)
  loadedScripts.push(...diffUrls)

  return new Promise(resolve => {
    function doLoad(url) {
      cerateScriptLoaded(url).then(() => {
        if (diffUrls.length > 0) {
          doLoad(diffUrls.shift())
        } else {
          resolve()
        }
      })
    }

    if (diffUrls.length > 0) {
      doLoad(diffUrls.shift())
    } else {
      resolve()
    }
  })
}


// 页面中使用
// const outerScripts = [
//   // baseUrl + '/plugins/echart/echarts.min.js'
// ]

// loadScripts(outerScripts).then(() => {
//   next()
// })
