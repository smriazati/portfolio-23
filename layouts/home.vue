<template>
    <div :class="`${route.name} home-default`">
        <main>
            <slot />
        </main>
        <SiteFooter></SiteFooter>
    </div>
</template>
<script setup>
const route = useRoute();
</script>
<style lang="scss" scoped>
.home-default {
    min-height: 100vh;
    max-width: 100vw;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    main {
        flex: 2;
    }
}
</style>