const {
  defineConfig
} = require('@vue/cli-service')

const path = require("path");

//压缩代码并去掉console
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//代码打包zip
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

// 国内免费（猫云）CDN https://www.bootcdn.cn/

//配置打包时使用CDN节点（加入externals外部扩展）， 忽略打包的第三方库
//左面放package.json中的扩展的名称,右面放项目依赖的名称(项目初始化要用的名称)
const assetsCDN = {
  // 属性名称 vue, 表示遇到 import xxx from 'vue' 这类引入 'vue'的，不去 node_modules 中找，而是去找全局变量 Vue（其他的为VueRouter、Vuex、axios、ELEMENT、echarts，注意全局变量是一个确定的值，不能修改为其他值，修改为其他大小写或者其他值会报错）
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    // 'vuex': 'Vuex', //打包后会找不到vuex
    'axios': 'axios',
    'view-design': 'iview',
    'element-ui': 'ELEMENT',
    'nprogress': 'NProgress',
  },
  css: [
    'https://cdn.bootcdn.net/ajax/libs/view-design/4.7.0/styles/iview.min.css',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/theme-chalk/index.min.css',
    'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.css',
  ],
  js: [
    // vue必须在第一个
    'https://cdn.bootcdn.net/ajax/libs/vue/2.7.0/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.2/vue-router.min.js',
    // 'https://cdn.bootcdn.net/ajax/libs/vuex/4.1.0/vuex.cjs.min.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/1.3.4/axios.min.js',

    'https://cdn.bootcdn.net/ajax/libs/view-design/4.7.0/iview.min.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/index.min.js',
    'https://cdn.bootcdn.net/ajax/libs/nprogress/0.2.0/nprogress.min.js',
  ]
}

function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = defineConfig({
  transpileDependencies: true,

  // 部署应用时的基本路径 URL，baseUrl从 Vue CLI 3.3 起，已弃用，使用publicPath来替代
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',

  // build时构建文件的目录，构建时传入 --no-clean 可关闭该行为
  outputDir: 'dist', // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录

  // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
  assetsDir: 'static',

  // 可以不设置一般会默认，指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',

  // 默认在生成的静态资源文件名中包含hash以控制缓存
  filenameHashing: true,

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
  lintOnSave: process.env.NODE_ENV !== 'production',

  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性（注：仅影响构建时注入的标签）
  // crossorigin: '', //use-credentials

  // 在生成的 HTML 中的<link rel="stylesheet">和<script>标签上启用 Subresource Integrity (SRI)
  integrity: false,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {

      // 生产环境，则添加不参与打包的包名和依赖包的名称
      config.externals = assetsCDN.externals

      const plugins = [];
      // 代码压缩
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: { // 删除注释
              comments: false
            },
            compress: {
              //warnings: false, // 若打包错误，则注释这行
              drop_console: true, //清除 debugger 语句
              drop_debugger: false, //清除console语句
              pure_funcs: ["console.log"]
            }
          },
          sourceMap: false,
          parallel: true
        })
      ),
        //代码压缩打包
        plugins.push(
          new CompressionWebpackPlugin({
            filename: "[path][base].gz", // 压缩后的文件名(保持原文件名，后缀加.gz)
            algorithm: "gzip", // 使用gzip压缩
            test: productionGzipExtensions, // 匹配文件名
            threshold: 1024 * 10, // 对超过10k的数据压缩
            minRatio: 0.8, // 压缩率小于0.8才会压缩
            deleteOriginalAssets: false, // 是否删除未压缩的源文件
          })
        );
      config.plugins = [...config.plugins, ...plugins];
    }

    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: 'all',
            test: /node_modules/,
            name: 'vendor',
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100
          },
          common: {
            chunks: 'all',
            test: /[\\/]src[\\/]js[\\/]/,
            name: 'common',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60
          },
          styles: {
            name: 'styles',
            test: /\.(sa|sc|c)ss$/,
            chunks: 'all',
            enforce: true
          },
          runtimeChunk: {
            name: 'manifest'
          }
        }
      }
    }

    // 关闭 webpack 打包的性能提示
    config.performance = {
      hints: false
    }

    //返回一个将要合并的对象
    return {
      resolve: {
        // 在jsconfig.json文件里面配置
        // extensions: ['.js', '.vue', '.json', 'ttf'],
        // alias: {
        //   '@': resolve('src'),
        // }
      },
      module: {
        rules: []
      }
    }
  },

  // webpack 配置
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {

      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      config.plugin('html').tap((args) => {
        args[0].cdn = assetsCDN
        return args
      })

      //添加分析工具 
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()

      // 移除预先加载模块：prefetch，preload
      config.plugins.delete('prefetch')
      config.plugins.delete('preload')
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('postcss-pxtorem')({
              //rootValue设置比例 需要与index.html中的autoRootFontSize一致

              rootValue: 100, // 设置比例是 100px = 1rem，开头大写的Px 不转换 => height: 100Px, (注意：内联样式不转换)
              unitPrecision: 5, // 计算结果保留 5 位小数
              selectorBlackList: ['.no-rem', 'no-rem'], // 要忽略的选择器并保留为px。
              propList: ['*'], // 可以从px更改为rem的属性  感叹号开头的不转换 比如['*', '!border']
              replace: true, // 转换成 rem 以后，不保留原来的 px 单位属性
              mediaQuery: true, // 允许在媒体查询中转换px。
              minPixelValue: 0, // 设置要替换的最小像素值。
              exclude: /node_modules/i // 排除 node_modules 文件(node_modules 内文件禁止转换)
            }),
          ]
        }
      }
    },
  },

  //配置代理服务器来解决跨域问题
  devServer: {
    // hot: true, //热加载
    // host: 'localhost', //ip地址
    // port: 8085, //端口
    // https: false, //false关闭https，true为开启
    // open: true, //自动打开浏览器
    proxy: {
      '/api': {
        //普通的http代理
        target: 'http://localhost:1081', //开发环境接口地址
        // ws: true, //是否代理websockets
        changeOrigin: true, // 开启跨域
        // secure: true,   // 如果是https接口，需要配置这个参数

        // 注释掉pathRewrite，不然会导致proxy的target失效
        // pathRewrite: {
        //   '^/api': '' //路径重写 
        // }
      }
    }
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader
  parallel: require('os').cpus().length > 1,

  // 向 PWA 插件传递选项
  pwa: {},

  // 可以用来传递任何第三方插件选项
  pluginOptions: {}
})