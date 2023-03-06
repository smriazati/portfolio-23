<template>
    <div class="card">
        <NuxtLink :to="data.link" class="image-wrapper">
            <!-- <figure v-if="data.img">
                <img :src="$urlFor(data.img?.url).height(500).width(500).format('webp').url()" :alt="data.img?.altText">
            </figure>
            <figure v-else>
                <img src="https://picsum.photos/500/500" alt="placeholder image">
            </figure> -->
        </NuxtLink>
        <div class="text-wrapper">
            <h2 class="card-title">{{ data?.name }}</h2>
            <p>{{ data?.description }}</p>
        </div>
        <div class="button-wrapper">
            <NuxtLink :to="data.link">View work</NuxtLink>
        </div>
    </div>
</template>
<script setup>
defineProps(['data'])
// const { $urlFor } = useNuxtApp()
</script>
<style lang="scss" scoped>
.card {
    text-align: center;
    display: flex;
    flex-direction: column;
}

.image-wrapper {
    margin-bottom: $spacer;
}

.text-wrapper {
    text-align: center;
    // max-width: 25ch;
    margin-left: auto;
    margin-right: auto;

    .card-title {
        text-transform: lowercase;
        font-style: normal;
        letter-spacing: 0.03rem;
    }

    p {
        @include typeSansSerif();
    }
}

figure {
    clip-path: circle(47%);
}

.button-wrapper {
    margin-top: $spacer*.5;
    display: flex;
    justify-content: center;

    a {
        @include btnArrow;
    }
}
</style>
