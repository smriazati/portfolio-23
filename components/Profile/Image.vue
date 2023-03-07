<template>
    <div>
        <figure v-if="data" class="clip-circle">
            <img :src="$urlFor(data.profileImg.url).width(width).height(height).fit('crop')
                .url()" :alt="data.profileImg?.altText">
        </figure>
    </div>
</template>
<script setup>
defineProps(['height', 'width'])

const query = groq`
*[_type == "content"][0]{
        "profileImg": profileImg.asset->{url, altText}
}
`
const { data } = useSanityQuery(query)
const { $urlFor } = useNuxtApp()

</script>
<style lang="scss" scoped>
figure {
    width: 100%;
    height: 100%;

    img {
        object-fit: cover;
    }
}

@media (max-width: $collapse-bp) {
    figure {
        text-align: right;

        img {
            height: 250px;
            width: 250px;
        }
    }
}
</style>