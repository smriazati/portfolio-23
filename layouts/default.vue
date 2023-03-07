<template>
    <div :class="`${route.name} layout-default`">
        <SiteHeader></SiteHeader>
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
.layout-default {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    main {
        flex: 2;
        display: flex;
    }
}
</style>