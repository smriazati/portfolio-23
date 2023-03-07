<template>
    <section class="services-wrapper padded-section" ref="wrapper">
        <div class="text-wrapper">
            <h2 class="text-display-sm-style">Services</h2>
        </div>
        <div class="list-wrapper">
            <ul v-if="data">
                <li v-for="item in data.specialties" :key="item._key" class="service-item">
                    <NuxtLink :to="item.link">
                        <div class="text-wrapper">
                            <p class="text-display-style">{{ item?.name }}</p>
                        </div>
                        <div class="button-wrapper btn-arrow">
                            <NuxtLink :to="item.link">View work</NuxtLink>
                        </div>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </section>
</template>

<script setup>
import gsap from 'gsap';

const query = groq`
*[_type == "content"][0]{
        "specialties": specialties[]{name, description, _key, "img": image.asset->{url, altText}, link}
}
`

const { data } = useSanityQuery(query)

// const wrapper = ref()
// const tl = ref();
// const ctx = ref();

// onMounted(() => {
//     console.log(wrapper.value)

//     ctx.value = gsap.context((self) => {
//         tl.value = gsap
//             .timeline()
//             // .set(wrapper.value, {
//             //     y: '300px',
//             // })
//             .to(wrapper.value, {
//                 y: '0px',
//                 scrollTrigger: {
//                     trigger: wrapper.value,
//                     start: `top+=100px bottom-=500px`,
//                     end: `bottom top`,
//                     scrub: true,
//                     // markers: true
//                 }
//             })
//     }, wrapper.value);
// });

// onUnmounted(() => {
//     ctx.value.revert();
// });

</script>
<style lang="scss" scoped>
.services-wrapper {
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: $spacer*3;
    padding-left: $spacer*2;
    padding-right: $spacer*2;

    @media (max-width: $collapse-bp) {
        display: flex;
        flex-direction: column;
        padding: $spacer*4 $spacer;
    }

    ul {
        list-style: none;
    }

    .service-item {
        a {
            display: flex;
            align-items: center;
            justify-content: space-between;

            @media (max-width: $collapse-bp) {
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
            }
        }

        .btn-arrow {
            @media (max-width: $collapse-bp) {
                padding-left: 0;
            }
        }

        a:hover .btn-arrow::after {
            margin-left: $spacer*2;
        }

        &:not(:last-child) {
            margin-bottom: $spacer*2;
        }
    }

}
</style>