export default defineNuxtRouteMiddleware((to, from) => {
  // console.log('to', to, 'from', from)
  if (to.path.includes('/videoanimation')) {
    return navigateTo('/work?category=Video')
  }
  if (to.path.includes('/documentary')) {
    return navigateTo('/work?category=Video')
  }
  if (to.path.includes('/web')) {
    return navigateTo('/work?category=Web')
  }
})