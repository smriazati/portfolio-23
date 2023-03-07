<template>
    <div>
        <HomeTitleBanner></HomeTitleBanner>
        <div v-if="data">
            <div class="gsap-bg-shifter" ref="bgShifter">
                <HomeServices></HomeServices>
                <section class="skills-list-wrapper padded-section">
                    <div class="text-wrapper">
                        <h2 class="text-display-sm-style">Skills &amp; Tools</h2>
                    </div>
                    <div class="list-wrapper">
                        <ul v-if="data.skills" class="row no-break ">
                            <li v-for="item in data.skills" :key="item._key" class="skill-item">
                                <div class="image-wrapper">
                                    <figure v-if="item.image?.url">
                                        <img :src="$urlFor(item.image.url).width(100).fit('scale').format('webp').url()"
                                            :alt="item.image?.altText ? item.image.altText : `Logo for ${item.name}`">
                                    </figure>
                                </div>
                                <div class="text-wrapper">
                                    <p>{{ item.name }}</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
                <section class="work-cta-wrapper padded-section">
                    <div v-if="data.content" class="image-wrapper">
                        <div v-if="data.content.featured" class="row no-break">
                            <div v-for="item in data.content.featured" :key="item._id">
                                <NuxtLink v-if="item.img" :to="`/project/${item.slug.current}`">
                                    <img :src="$urlFor(item.img.url).height(200).fit('max').format('webp').url()"
                                        :alt="item.img.altText">
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="cta-wrapper">
                        <div class="text-wrapper">
                            <p class="text-display-style">
                                <NuxtLink to="/work" class="text-display-style">Explore my portfolio</NuxtLink>
                            </p>
                        </div>
                        <div class="button-wrapper btn-arrow">
                            <NuxtLink to="/work">View work</NuxtLink>
                        </div>
                    </div>
                </section>
                <section class="contact-cta-wrapper">
                    <NuxtLink to="/contact" class="cta-wrapper padded-section">
                        <div class="text-wrapper">
                            <p class="text-display-style">Ready to start a project? Let&rsquo;s discuss!</p>
                        </div>
                        <div class="button-wrapper btn-arrow">
                            <NuxtLink to="/contact">Get in touch</NuxtLink>
                        </div>
                    </NuxtLink>
                </section>
            </div>
        </div>
    </div>
</template>
<script setup>
import gsap from 'gsap';

const query = groq`
{
    "content": *[_type == "content"][0]{
        featured[]->{slug, "img": tnails[0].asset->{url, altText}},
        "mainImg": mainImg.asset->{url, altText},
        mainText,secondaryText,
        "specialties": specialties[]{name, description, _key, "img": image.asset->{url, altText}, link}
    }, 
    "skills": *[_type == "skill"]|order(name asc){
        name, _key, "image": image.asset->{url, altText}
    }
}
`
const { data } = useSanityQuery(query)
const { $urlFor } = useNuxtApp()

definePageMeta({
    layout: "home"
});

useHead({
    title: 'Home',
})
const bgShifter = ref()
const tl = ref();
const ctx = ref();

onMounted(() => {
    ctx.value = gsap.context((self) => {

        tl.value = gsap
            .timeline()
            .set(bgShifter.value, {
                backgroundColor: '#ffd8bf',
            })
            .to(bgShifter.value, {
                backgroundColor: '#ebc8eb',
                scrollTrigger: {
                    trigger: bgShifter.value,
                    start: "top top",
                    // markers: true,
                    end: "bottom top",
                    scrub: 1.1
                }
            })
    }, bgShifter.value);
});

onUnmounted(() => {
    ctx.value.revert();
});

</script>

<style lang="scss" scoped>
.section-container {
    max-width: 1100px;
    margin-left: auto;
    margin-right: auto;
}

.section-title {
    text-align: center;
    text-transform: uppercase;
    font-style: normal;
    margin-bottom: $spacer*2;
    font-size: 24px;
    letter-spacing: 0.2rem;
    font-weight: 700;
}

.padded-section {
    padding-top: 10vh;
    padding-bottom: 10vh;

    @media (max-width: $collapse-bp) {
        padding-top: $spacer*2;
        padding-bottom: $spacer*2;
    }
}

.skills-list-wrapper {

    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 45px;
    padding-left: 30px;
    padding-right: 30px;
    background: rgba(255, 255, 255, 0);
    transition: .3s ease all;

    @media (max-width: $collapse-bp) {
        display: flex;
        flex-direction: column;
        padding: $spacer*4 $spacer;
    }

    img {
        filter: grayscale(1);
    }

    &:hover {
        background: rgba(255, 255, 255, 1);

        img {
            filter: grayscale(0);
        }
    }

    @media (max-width: $collapse-bp) {
        background: rgba(255, 255, 255, 1);

        img {
            filter: grayscale(0);
        }
    }

    .list-wrapper {

        ul {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            grid-row-gap: $spacer*2;
            text-align: center;
            grid-column-gap: $spacer;

            @media (max-width: $collapse-bp) {
                grid-template-columns: repeat(3, 1fr);
                grid-row-gap: $spacer*2;
                grid-column-gap: $spacer*0.5;

            }

            .image-wrapper {
                display: flex;
                justify-content: center;
                margin-bottom: $spacer* 0.5;
            }
        }

        .skill-item {

            figure {
                height: 50px;
                width: 50px;

                * {
                    height: 100%;
                    width: 100%;
                }
            }

            img {
                object-fit: contain;
                // filter: grayscale(1);
                transition: .2s ease-out all;
            }

            &:hover {
                img {
                    filter: grayscale(0);
                }
            }
        }
    }
}

.cta-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: $spacer*2;
    padding-right: $spacer*2;
    width: 100%;

    @media (max-width: $collapse-bp) {
        flex-direction: column;
        justify-content: center;
        text-align: center;
    }

    .text-wrapper .text-display-style {
        font-size: 2rem;
    }

    .button-wrapper {
        display: flex;
        justify-content: center;

        @media (max-width: $collapse-bp) {
            margin-top: $spacer;
        }
    }
}

.work-cta-wrapper {
    background: black;
    color: #fff;

    a {
        color: #fff;
    }

    .image-wrapper {
        margin-bottom: $spacer*3;

        a {
            img {
                z-index: 9;
                position: relative;
                transform: scale(1);
                transition: .8s ease all;
            }

            &:hover {
                img {
                    z-index: 11;
                    transform: scale(1.1);
                }
            }
        }
    }
}

.gsap-bg-shifter {
    background: #ffd8bf;
}
</style>

