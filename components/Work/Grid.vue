<template>
    <ul class="project-grid">
        <li v-for="item in data" :key="item._id" class="project-item">
            <WorkGridItem :item="item"></WorkGridItem>
        </li>
    </ul>
</template>
<script setup>
defineProps(['data'])
</script>
<style lang="scss" scoped>
.project-grid {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    // grid-gap: 50px;
}
</style>