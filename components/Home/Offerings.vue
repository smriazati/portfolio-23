<template>
    <div class="">
        <header class="center">
            <h2>Services</h2>
        </header>
        <div v-for="item in data.items" :key="item._key" class="card">
            <div class="row no-break">
                <NuxtLink :to="item.link" class="image-wrapper">
                    <figure v-if="item.img">
                        <img :src="$urlFor(item.img?.url).height(200).width(200).format('webp').url()"
                            :alt="item.img?.altText" class="clip-circle">
                    </figure>
                    <figure v-else>
                        <img src="https://picsum.photos/200/200" alt="placeholder image" class="clip-circle">
                    </figure>
                </NuxtLink>
                <div class="text-wrapper">
                    <h2>{{ item.name }}</h2>
                    <p>{{ item.description }}</p>
                    <div class="button-wrapper">
                        <NuxtLink :to="item.link">View work</NuxtLink>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script setup>

const query = groq`
*[_type == "content"][0]{
        "items": specialties[]{name, description, _key, "img": image.asset->{url, altText}, link}
    }
`
const { data } = useSanityQuery(query)

</script>
<style lang="scss" scoped>
.row {
    max-width: calc(40ch + 30px + 300px);
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
}

.card+.card {
    margin-top: $spacer;
}

.image-wrapper {
    flex: 0 0 200px;
    margin-right: $spacer;
}

.text-wrapper {
    display: flex;
    flex-direction: column;
}

.clip-circle {
    clip-path: circle(47%);
}
</style>