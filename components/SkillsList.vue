<template>
    <ul class="row no-break skills-wrapper">
        <li v-for="item in results" :key="item._id">
            <figure v-if="item.image?.url" class="image-wrapper">
                <img :src="$urlFor(item.image.url).width(100).format('webp').url()"
                    :alt="item.image?.altText ? item.image.altText : `Logo for ${item.name}`">
                <figcaption>{{ item.name }}</figcaption>
            </figure>
        </li>
    </ul>
</template>
<script setup>
const props = defineProps(['data'])
const results = props.data.sort((a, b) => a.name.localeCompare(b.name))
</script>
<style lang="scss" scoped>
.skills-wrapper {
    margin-top: $spacer*0.5;

    >*:not(:last-child) {
        margin-right: 1ch;
    }

    li img {
        height: 30px;
        width: 30px;
        object-fit: contain;
    }

}

figure {
    position: relative;
    display: inline-block;
}

figure figcaption {
    visibility: hidden;
    opacity: 0;
    transition: .3s ease all;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: $spacer 0;
    position: absolute;
    z-index: 1;
    bottom: 150%;
    left: 50%;
    margin-left: -60px;
}

figure figcaption::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
}

figure:hover figcaption {
    visibility: visible;
    opacity: 1;
}
</style>
