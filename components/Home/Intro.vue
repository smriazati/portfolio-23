<template>
    <div class="row">
        <div class="text-wrapper">
            <p>👋 Hello!</p>
            <p>{{ data.mainText }}</p>
        </div>
        <div class="image-wrapper">
            <div v-if="data.profileImg" class="clip-circle" :style="`width: ${300}px; height: ${300}px`">
                <ProfileImage :size="300"></ProfileImage>
            </div>
        </div>
    </div>
</template>
<script setup>

const query = groq`
*[_type == "content"][0]{
        "profileImg": profileImg.asset->{url, altText},
        mainText, workCTA
    }
`
const { data } = useSanityQuery(query)

</script>
<style lang="scss" scoped>
.row {
    justify-content: center;
    align-items: center;
}

.text-wrapper {
    max-width: 40ch;
    margin-right: $spacer*2;
}

.clip-circle {
    clip-path: circle(47%);
}
</style>