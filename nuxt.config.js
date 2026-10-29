import colors from 'vuetify/es5/util/colors'

// GitHub Pages 部署在 /games/ 子路徑下
const base = process.env.NODE_ENV === 'production' ? '/games/' : '/'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  server: {
    port: 3000,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: title => (title ? `${title} - 我的自介頁` : '我的自介頁'),
    htmlAttrs: {
      lang: 'zh-Hant',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: `${base}favicon.ico` }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: '~/plugins/vuetify.js',
    treeShake: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    base,
  },

  // GitHub Pages 找不到路徑時會讀 404.html,交給 Nuxt 在前端處理路由
  generate: {
    fallback: '404.html',
  },
}
