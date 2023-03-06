<script setup>
import LiteYouTubeEmbed from 'vue-lite-youtube-embed'
import 'vue-lite-youtube-embed/style.css'

defineProps(['id', 'title'])

</script>

<template>
    <LiteYouTubeEmbed :id="id" :title="title" />
</template>