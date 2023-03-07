// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ['@/assets/styles/main.scss' ],
    build: {
      transpile: ['gsap'],
    },
    plugins: ['./plugins/sanityImage'],
    modules: ['@nuxtjs/sanity', 'nuxt-icon'],
    app: {
      layoutTransition: { name: 'page', mode: 'out-in' },
      pageTransition: { name: 'page', mode: 'out-in' }
    },
    sanity: {
      projectId: 'xrr4kx86'
    },
    vite: {
        css: {
          preprocessorOptions: {
            scss: {
              additionalData: '@use "@/assets/styles/_vars.scss" as *;'
            }
          }
        }
      },
    
})
