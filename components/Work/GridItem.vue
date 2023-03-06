<template>
    <div class="item-wrapper">
        <!-- <div class="image-wrapper">
            <NuxtLink :to="`/project/${item.slug.current}`">
                <div v-if="item.vidTnail">
                    <ThumbnailVideo :data="item.vidTnail"></ThumbnailVideo>
                </div>
                <div v-else>
                    <div v-if="item.tnails">
                        <div v-if="item.tnails.length > 1">
                            <ThumbnailFlipper :data="item.tnails"></ThumbnailFlipper>
                        </div>
                        <div v-else>
                            <figure>
                                <img :src="$urlFor(item.tnails[0].url).height(150).format('webp').url()" alt="">
                            </figure>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div> -->
        <div class="text-wrapper">
            <div class="text-wrapper-inner accordion-wrapper" :class="isCollapsed ? 'collapsed' : 'expanded'">
                <div class="expand-area">
                    <button class="btn-plain" @click="toggleCollapse">
                        <h3 class="project-title">{{ item.name }}</h3>
                        <!-- <span>{{ isCollapsed ? '+' : '-' }}</span> -->
                    </button>
                </div>
                <div class="collapse-area">
                    <p v-if="item.tagline" class="tagline">{{ item.tagline }}</p>
                    <div v-if="item.skills">
                        <SkillsList :data="item.skills"></SkillsList>
                    </div>
                    <div class="button-wrapper">
                        <NuxtLink :to="`/project/${item.slug.current}`">View project</NuxtLink>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>
<script setup>

defineProps(['item'])

const isCollapsed = ref(true);
const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
}

</script>
<style lang="scss" scoped>
.item-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    >*:not(:last-child) {
        margin-bottom: $spacer;
    }
}

.project-title {
    font-size: 30px;
}

.image-wrapper {
    width: 100%;
}

.accordion-wrapper {
    position: relative;
    z-index: 12;

    .collapse-area {
        transition: .3s ease all;
        margin-bottom: 0;
    }

    &.collapsed {
        .collapse-area {
            opacity: 0;
            height: 0;
        }
    }


    &.expanded {
        background: #f8f8f8;
        padding: 30px;
        margin-bottom: $spacer*2;

        .collapse-area {
            opacity: 1;
            height: auto;
            margin-bottom: $spacer*2;
        }
    }

    .expand-area {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 30px;

        >*:not(:last-child) {
            margin-right: $spacer;
        }

        &:hover {
            cursor: pointer;
        }
    }
}


.text-wrapper-inner,
.collapse-area {

    >*:not(:last-child) {
        margin-bottom: $spacer;
    }

}

.tagline {
    @include typeSansSerif();
}
</style>