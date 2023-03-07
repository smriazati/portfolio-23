<template>
  <NuxtLayout>
    <NuxtPage />
    <vueVimeoPlayer></vueVimeoPlayer>
  </NuxtLayout>
</template>
<script setup>
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

useHead({
  link: [
    // {
    //   rel: 'preconnect',
    //   href: 'https://fonts.googleapis.com'
    // },
    // {
    //   rel: 'stylesheet',
    //   href: 'https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Nunito+Sans:wght@400;700&display=swap',
    //   crossorigin: ''
    // },
    {
      rel: 'stylesheet',
      href: 'https://use.typekit.net/rpq4aft.css'
    }
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Sarah Riazati` : 'Sarah Riazati';
  },
  meta: [
    {
      name: 'description', content: "I'm Sarah Riazati, a freelance video producer and web developer with a passion for creative storytelling and strategic thinking."
    }
  ],
})

</script>
<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>