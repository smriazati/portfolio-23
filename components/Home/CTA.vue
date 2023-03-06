<template>
    <div class="cta-wrapper">
        <div class="col">
            <div class="text-wrapper">
                <p>{{ data.text }}</p>
            </div>
            <div class="button-wrapper">
                <ul class="row no-break">
                    <li>
                        <NuxtLink to="/work?category=Web">Web portfolio</NuxtLink>
                    </li>
                    <li>
                        <NuxtLink to="/work?category=Video">Video portfolio</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="col">
            <div class="text-wrapper">
                <p>Ready to get started on your next creative project?</p>
            </div>
            <div class="button-wrapper">
                <ul class="row no-break">
                    <li>
                        <NuxtLink to="/contact">Get in touch</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>

const query = groq`
*[_type == "content"][0]{
    "text": workCTA
}
`
const { data } = useSanityQuery(query)

</script>
<style lang="scss" scoped>
.cta-wrapper {
    padding-top: $spacer*2;
}

.col+.col {
    margin-top: $spacer*2;
}

.col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

.button-wrapper {
    margin-top: $spacer;

    .row {
        justify-content: center;
    }

    ul {
        >*:not(:last-child) {
            margin-right: $spacer;
        }
    }
}
</style>