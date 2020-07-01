module.exports = {
  // 基础配置
  base: '/Web-JavaScript/', // 部署站点的基础路径
  locales: {
    // 默认标题
    '/': {
      title: 'JavaScript基础',
      description: ''
    }
  },
  head: [
    // 添加链接 pwa 的 manifest 如果需要
    [
      'link',
      {
        rel: 'icon',
        href: ''
      }
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
      }
    ],
    [
      'meta',
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileColor',
        content: '#000000'
      }
    ]
  ],
  port: 3009,
  dest: 'dist', // 指定 vuepress build 的输出目录
  serviceWorker: false, // pwa

  // 主题配置
  themeConfig: {
    editLinks: true,
    docsDir: 'src', // 假如文档不是放在仓库的根目录下
    locales: {
      '/': {
        docsBranch: 'master', // 假如文档放在一个特定的分支下
        editLinkText: '在github上编辑此页',
        lastUpdated: '上次更新', // 获取每个文件最后一次 git 提交的时间戳
        nav: [
          // {
          //   text: '静态页面相关知识',
          //   link: '/base/html',
          //   items: [{
          //       text: '一、HTML',
          //       link: '/base/1.htm',
          //     },
          //     {
          //       text: '二、CSS',
          //       link: '/base/2.css',
          //     },
          //     {
          //       text: '三、JS基础',
          //       link: '/base/3.js',
          //     },
          //     {
          //       text: '四、JS面向对象',
          //       link: '/base/4.obj',
          //     },
          //     {
          //       text: '五、V8引擎机制',
          //       link: '/base/5.v8',
          //     },
          //     {
          //       text: '六、渲染机制',
          //       link: '/base/6.render',
          //     },
          //     {
          //       text: '七、浏览器缓存',
          //       link: '/base/7.cache',
          //     },
          //     {
          //       text: '八、排序算法',
          //       link: '/base/8.calc',
          //     },
          //     {
          //       text: '九、设计模式',
          //       link: '/base/9.design',
          //     },
          //     {
          //       text: '十、前端安全',
          //       link: '/base/10.safe',
          //     },
          //     {
          //       text: '十一、网络相关',
          //       link: '/base/11.network',
          //     },
          //   ],
          // },
          {
            text: 'ES6相关知识',
            link: '/es6/Vue',
            items: [{
              text: '一、Proxy',
              link: '/es6/1.Proxy',
            }, {
              text: '二、React',
              link: '/es6/2.React',
            }, {
              text: '三、Angular',
              link: '/es6/3.Angular',
            }, {
              text: '四、小程序',
              link: '/es6/4.小程序',
            }]
          },
          // {
          //   text: 'JavaScript相关知识',
          //   link: '/service/node',
          //   items: [{
          //     text: '一、Node',
          //     link: '/service/1.node',
          //   }, {
          //     text: '二、Express',
          //     link: '/service/2.express',
          //   }, {
          //     text: '三、Koa',
          //     link: '/service/3.koa',
          //   }, {
          //     text: '四、Egg',
          //     link: '/service/4.egg',
          //   }]
          // },
          // {
          //   text: '大厂面试题',
          //   link: '/article/',
          //   items: [{
          //     text: '阿里巴巴',
          //     link: '/article/阿里巴巴',
          //   }, {
          //     text: '饿了么',
          //     link: '/article/饿了么',
          //   }, {
          //     text: '百分点',
          //     link: '/article/百分点',
          //   }, {
          //     text: '宝宝树',
          //     link: '/article/宝宝树',
          //   }, {
          //     text: '滴滴',
          //     link: '/article/滴滴',
          //   }, {
          //     text: '兑吧',
          //     link: '/article/兑吧',
          //   }, {
          //     text: '海风教育',
          //     link: '/article/宝海风教育',
          //   }, {
          //     text: '海康威视',
          //     link: '/article/海康威视',
          //   }, {
          //     text: '沪江',
          //     link: '/article/沪江',
          //   }, {
          //     text: '今日头条',
          //     link: '/article/今日头条',
          //   }, {
          //     text: '酷家乐',
          //     link: '/article/酷家乐',
          //   }, {
          //     text: '蘑菇街',
          //     link: '/article/蘑菇街',
          //   }, {
          //     text: '寺库',
          //     link: '/article/寺库',
          //   }, {
          //     text: '挖财',
          //     link: '/article/挖财',
          //   }, {
          //     text: '网易',
          //     link: '/article/网易',
          //   }, {
          //     text: '微医',
          //     link: '/article/微医',
          //   }, {
          //     text: '喜马拉雅',
          //     link: '/article/喜马拉雅',
          //   }, {
          //     text: '携程',
          //     link: '/article/携程',
          //   }, {
          //     text: '有赞',
          //     link: '/article/有赞',
          //   }]
          // }
        ],
        sidebar: {
          '/base/': ['1.htm', '2.css', '3.js', '4.obj', '5.v8', '6.render', '7.cache', '8.calc', '9.design', '10.safe', '11.network'],
          '/es6/': ['1.Vue', '2.React', '3.Angular', '4.小程序'],
          '/service/': ['1.node', '2.express', '3.koa', '4.egg'],
          '/article/': ['阿里巴巴', '蘑菇街', '饿了么', '今日头条', '滴滴', '兑吧', '百分点', '海风教育', '海康威视', '沪江', '酷家乐', '寺库', '挖财', '网易', '微医', '携程', '喜马拉雅', '有赞']
        }
      }
    }
  }
}