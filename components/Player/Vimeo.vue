<template>
    <div class="video-element__container">
        <div class="video-element__player" ref="playerRef" @click="$emit('shrink')"></div>
        <!-- <div class="video-element__play-button" @click="play()">Play</div> -->
    </div>
</template>
  
<script setup>
import Player from '@vimeo/player';

const props = defineProps(['id', 'title'])
// console.log(props);

let player;
let isPlaying = false;
const playerRef = ref(null);

onMounted(() => {
    const options = {
        url: `https://vimeo.com/${props.id}`,
        loop: false,
        controls: true,
        muted: false,
        title: false,
        byline: false,
        portrait: false,
        pip: false,
        responsive: true,
        color: '#000000'
    };

    player = new Player(playerRef.value, options);
});

const play = () => {
    player.play()
        .then(isPlaying = true)
        .catch(e => console.log(e));
};

const pause = () => {
    player.pause()
    isPlaying = false
};


</script>