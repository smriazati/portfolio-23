<template>
    <div class="loading">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>
<style lang="scss" scoped>
.loading {
    display: flex;
    gap: 12px;
    padding-left: $spacer*2;
}

.loading div {
    width: $spacer;
    height: $spacer;
    background: #000;
    border-radius: 50%;
    box-shadow: 0 -0.4rem rgba(155, 155, 155, 0.1) inset;

    animation: cycle 1s ease-in-out infinite;
}

.loading div:nth-child(1) {
    animation-delay: 0;
}

.loading div:nth-child(2) {
    animation-delay: 0.2s;
}

.loading div:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes cycle {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(1rem);
    }

    100% {
        transform: translateY(0);
    }
}
</style>