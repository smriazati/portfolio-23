<template>
    <div>
        <figure v-if="data">
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