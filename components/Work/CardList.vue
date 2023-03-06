<template>
    <div>
        <ul class="card-list">
            <li v-for="item in results" :key="item._id" class="card-list-item">
                <div class="card-list-item-wrapper">
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
                        <div class="text-wrapper-inner">
                            <div v-if="item.categories">
                                <ul class="row no-break">
                                    <li v-for="(type, index) in item.categories" :key="index">
                                        {{ type.name }}</li>
                                </ul>
                            </div>
                            <button class="btn-plain">
                                <h3 class="project-title">{{ item.name }}</h3>
                            </button>
                            <p v-if="item.tagline" class="tagline">{{ item.tagline }}</p>
                            <div v-if="item.skills">
                                <SkillsList :data="item.skills"></SkillsList>
                            </div>
                            <div v-if="!item.disableProjectPage" class="button-wrapper">
                                <NuxtLink :to="`/project/${item.slug.current}`">View project</NuxtLink>
                            </div>
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
.card-list-item-wrapper {
    display: grid;
    grid-template-columns: 450px auto;
    grid-template-rows: auto;
}

.video-wrapper {
    text-align: right;
}

.text-wrapper {
    display: flex;
    align-items: center;
    padding-left: $spacer;

    .text-wrapper-inner {
        >*:not(:last-child) {
            margin-bottom: $spacer;
        }
    }
}

.button-wrapper {
    a {
        @include btnArrow;
        padding-left: 0;
    }
}
</style>