export default defineNuxtRouteMiddleware((to, from) => {
  console.log('to', to, 'from', from)
  if (to.path === '/videoanimation') {
    return navigateTo('/work?category=Video')
  }
  if (to.path === '/documentary') {
    return navigateTo('/work?category=Video')
  }
  if (to.path === '/web') {
    return navigateTo('/work?category=Web')
  }
})