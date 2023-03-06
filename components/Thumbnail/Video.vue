

<template>
    <video autoplay muted loop :width="size" @mouseenter="togglePlayback" ref="video">
        <source :src="data.url" type="video/mp4">
    </video>
</template>
<script setup>
const props = defineProps(['data', 'size'])
const isPlaying = ref(true)
const video = ref()
const togglePlayback = () => {
    isPlaying.value = !isPlaying.value;
}
watch(isPlaying, () => {
    if (isPlaying.value) {
        video.value.play()
    } else {
        video.value.pause()
    }
})

</script>
