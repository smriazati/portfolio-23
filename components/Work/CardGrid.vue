<template>
    <div>
        <ul class="card-grid">
            <li v-for="item in results" :key="item._id" class="card-grid-item">
                <div class="card-grid-item-wrapper">

                    <div class="image-wrapper">
                        <NuxtLink :to="`/project/${item.slug.current}`">
                            <div v-if="item.vidTnail" class="video-wrapper">
                                <ThumbnailVideo :data="item.vidTnail" :size="imgSize"></ThumbnailVideo>
                            </div>
                            <div v-else>
                                <div v-if="item.tnails">
                                    <div v-if="item.tnails.length > 1">
                                        <ThumbnailFlipper :data="item.tnails" :size="imgSize"></ThumbnailFlipper>
                                    </div>
                                    <div v-else>
                                        <figure>
                                            <img :src="$urlFor(item.tnails[0].url).height(imgSize).format('webp').url()"
                                                alt="">
                                        </figure>
                                    </div>
                                </div>
                                <div v-else>
                                    <figure>
                                        <img :src="`https://picsum.photos/${imgSize}/${imgSize}`" alt="placeholder image">
                                    </figure>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                    <div class="text-wrapper">
                        <div class="title-wrapper">
                            <h3 class="project-title">{{ item.name }}</h3>
                        </div>
                        <div v-if="item.categories" class="category-wrapper">
                            <ul class="row no-break">
                                <li v-for="(type, index) in item.categories" :key="index">
                                    {{ type.name }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
const props = defineProps(['data'])
const results = computed(() => {
    return props.data?.filter(item => {
        if (!item.hideFromGrid) {
            return item
        }
    })
})
const imgSize = ref(450);
</script>
<style lang="scss" scoped>
ul {
    list-style: none;
}

.card-grid {
    display: grid;

    grid-template-columns: repeat(3, 33.33%);

    >* {
        padding: $spacer*2;
    }

}

.card-grid-item-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .image-wrapper {
        flex: 0 0 20vw;
        background: $highlight;
        overflow: hidden;

        * {
            height: 100%;
            width: 100%;

            img,
            video {
                object-fit: cover;
            }
        }
    }
}

.video-wrapper {
    video {
        max-width: 100%;
    }
}

.text-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .title-wrapper {
        text-align: left;
    }

    .category-wrapper ul {
        li+li {
            &:before {
                content: ",";
                margin-right: 2px;
            }
        }
    }

    >* {
        margin-top: $spacer*0.5;
    }
}
</style>