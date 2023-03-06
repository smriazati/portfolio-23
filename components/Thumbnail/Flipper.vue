<template>
    <div class="thumbnail-flipper" @mouseenter="toggleFlipper" @mouseleave="toggleFlipper">
        <figure v-for="(item, index) in data" :key="index" :class="index === counter ? 'top' : ''">
            <img :src="$urlFor(item.url).height(size).fit('max').format('webp').url()" alt="">
        </figure>
    </div>
</template>
<script setup>

const props = defineProps(['data', 'size'])
const counter = ref(0);
const timer = ref();
const isPlaying = ref(false)

const toggleFlipper = () => {
    isPlaying.value = !isPlaying.value
}

const incrementCounter = () => {
    if (counter.value < props.data.length) {
        counter.value++;
    }
}

const initTimer = () => {
    counter.value = 0
    timer.value = setInterval(incrementCounter, 170);
}

watch(counter, () => {
    if (counter.value == props.data.length) {
        clearInterval(timer.value)
        initTimer()
    }
})

watch(isPlaying, () => {
    if (isPlaying.value) {
        initTimer()
    } else {
        clearInterval(timer.value)
    }
})


</script>
<style lang="scss" scoped>
.thumbnail-flipper {
    display: grid;
    grid-template: 1fr / 1fr;
    place-items: center;

    >* {
        grid-column: 1 / 1;
        grid-row: 1 / 1;
    }
}

div,
figure,
img {
    height: 100%;
    width: 100%;
}

figure {
    transition: .3s ease all;
    position: relative;

    &.top {
        opacity: 1;
        z-index: 11;
    }
}

img {
    object-fit: cover;
}
</style>
