// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src',
  //调试工具
  devtools: { enabled: true },
  // 是否开启 ssr 服务端渲染
  ssr: true,
  // 应用模块
  modules: ['@vant/nuxt'],
   // 移动端适配
   postcss: {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,
      },
    },
  },
})
