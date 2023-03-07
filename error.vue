<template>
    <div class="error-wrapper">
        <SiteHeader />
        <div class="text-wrapper">
            <h1 class="text-display-sm-style">Error</h1>
            <p class="text-display-style">{{ error.message }}</p>
            <nuxt-link class="btn-fill" to="/">Try going home instead?</nuxt-link>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    error: Object
})
const handleError = () => clearError({ redirect: '/' })
</script>
<style lang="scss" scoped>
.error-wrapper {
    min-height: 100vh;
    padding: 20px;
}

.text-wrapper {
    padding: $spacer*2;

    @media (max-width: $collapse-bp) {
        padding: $spacer;
    }
}
</style>
