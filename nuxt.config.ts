// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //调试工具
  devtools: { enabled: true },
  // 是否开启 ssr 服务端渲染
  ssr: false,
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
  routeRules: {
    // all routes (by default) will be revalidated every 60 seconds, in the background
    '/**': { isr: 60 },
    // this page will be generated on demand and then cached permanently
    '/static': { isr: true },
    // this page is generated at build time and cached permanently
    '/prerendered': { prerender: true },
    // this page will be always fresh
    '/dynamic': { isr: false },
    // you can do lots more with route rules too!
    '/redirect': { redirect: '/static' },
    '/headers': { headers: { 'x-magic-of': 'nuxt and vercel' } },
    '/spa': { ssr: false },
  },
  runtimeConfig: {
    nitro: { envPrefix: 'VERCEL_' },
    region: process.env.VERCEL_REGION,
  },
})