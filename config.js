/**
 * 项目总的配置文件
 */
module.exports = {
  /**
     * 当前环境（此项不可修改）
     * development开发环境，beta测试服的生产环境，production正式服的生产环境
     */
  env: process.env.VUE_APP_ENV,

  // 网页标题
  title: '快乐呱呱呱呱乐',
  // 网页描述
  description: '',
  // 网页关键词
  keywords: '', 

  // 接口请求的域名
  api: {
    // 测试服域名
    beta: '',
    // 正式服域名
    production: ''
  },

  // 接口成功响应的状态码（用于请求拦截那边判断响应情况）
  successApiCode: 1, 

  // 前端测试服域名的关键字，如“demo”（如配置了此字段，那么当检测到当前域名包含了此关键字时，请求的接口域名会使用服务端测试服的域名，即api.beta）
  betaHostKeyword: '',

  // 部署时资源的公共路径（默认为相对路径，一般情况下再上线验收后会改为cdn路径）
  path: {
    // 测试服路径
    beta: './',
    // 正式服路径
    production: './'
  },

  // 是否开启多页面打包，开启后会使用下面multiPage的配置信息
  useMultiPage: false,
  // 多页面打包的配置（如不需要打包多页面可忽略）
  multiPage: {
    /**
         * 对象key: 页面的标识
         * filename: 生成的html文件名
         * title: 页面的title
         * meta: meta元素配置（对象形式，默认情况下key代表meta.name，value代表meta.content；如果需要其他属性，参考下列写法）
         * lang: 默认语言，为空时会自动根据用户设备语言进行设置
         */
    'index': {
      filename: 'index.html', 
      title: 'index',
      meta: {
        'demo': 'demo-value',
        // 以下将生成 <meta property="og:title" content="这是content">，自行找规律
        'og:title': { property: 'og:title', content: '这是content' }
      }
      // lang: 'en',
    },
    'index.en': {
      filename: 'index.en.html', 
      title: 'index.en',
      meta: {},
      lang: 'en'
    }
  }

}
