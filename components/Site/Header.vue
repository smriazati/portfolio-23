<template>
    <header class="site-header">
        <h1>
            <NuxtLink to="/">Sarah Riazati</NuxtLink>
        </h1>

        <nav>
            <ul class="row no-break">
                <li>
                    <NuxtLink to="/work">Work</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact">Contact</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.site-header {
    display: flex;
    justify-content: space-between;
    padding: $spacer*2;

    @media (max-width: $collapse-bp) {
        padding: $spacer;
    }

    li:not(:last-child) {
        margin-right: $spacer;
    }

    a {
        letter-spacing: 0;
        transition: .3s ease all;

        &:hover {
            letter-spacing: 1px;
        }
    }

}
</style>