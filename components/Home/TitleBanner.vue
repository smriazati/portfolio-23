<template>
    <div class="title-row padded-section">
        <div class="row no-break" ref="banner">
            <div v-if="data" class="text-wrapper">
                <div class="text-wrapper-inner">
                    <p class="small-title">👋 Hello!</p>
                    <h1 class="main-text" v-if="data.mainText">{{ data.mainText }}</h1>
                    <SanityContent v-if="data.secondaryText" :blocks="data.secondaryText.rte"></SanityContent>
                </div>
                <div class="button-wrapper-container">
                    <div class="button-wrapper btn-arrow">
                        <NuxtLink to="/work">View work</NuxtLink>
                    </div>
                    <div class="button-wrapper btn-arrow">
                        <NuxtLink to="/contact">Get in touch</NuxtLink>
                    </div>
                </div>

            </div>
            <div class="image-wrapper">
                <div>
                    <ProfileImage :height="500" :width="500"></ProfileImage>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import gsap from 'gsap';
const query = groq`
*[_type == "content"][0]{
    "mainImg": mainImg.asset->{url, altText},
    mainText,secondaryText,
}
`
const { data } = useSanityQuery(query)
const banner = ref()
const tl = ref();
const ctx = ref();

onMounted(() => {

    ctx.value = gsap.context((self) => {

        const image = self.selector('.image-wrapper')
        const textEls = self.selector('.text-wrapper-inner > *')
        const buttonEls = self.selector('.button-wrapper-container');
        const batchItems = [...textEls, buttonEls]
        tl.value = gsap
            .timeline()
            .set(batchItems, {
                y: -30,
                autoAlpha: 0
            })
            .to(batchItems, {
                y: 0,
                autoAlpha: 1,
                stagger: { // wrap advanced options in an object
                    each: 0.25,
                    ease: "power1.easeOut",
                }
            })
            .to(image, {
                autoAlpha: 1,
                scale: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.easeOut",
            }, "<")
    }, banner.value);
});

onUnmounted(() => {
    ctx.value.revert();
});
</script>

<style lang="scss">
// gsap
.title-row {

    .button-wrapper-container,
    .text-wrapper-inner>* {
        opacity: 0;
    }

    .image-wrapper {
        transform: translateX(5px);
        opacity: 0;
    }

}

.title-row p.small-title {
    // @include textDisplaySmStyle;
    text-transform: none;
    margin-bottom: $spacer;
}

.title-row {
    background: #fff;

    .row {
        justify-content: space-between;

        @media (max-width: $collapse-bp) {
            flex-direction: column-reverse;
        }
    }

    .main-text {
        font-size: 2rem;
        line-height: 2.7rem;
    }

    .text-wrapper {
        display: flex;
        flex-direction: column;
        padding: $spacer*2;

        @media (max-width: $collapse-bp) {
            padding: $spacer;
        }

        .text-wrapper-inner {
            max-width: 75ch;
        }

    }

    .button-wrapper {
        padding-left: 0;
        margin-top: $spacer;
    }

}
</style>