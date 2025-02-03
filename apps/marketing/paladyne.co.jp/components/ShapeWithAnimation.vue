<template>
    <ClientOnly>
        <div class="shape" :class="addClassName" v-parallax="dataDepth">
            <span>
                <img :src="imgSrc" alt="shape image">
            </span>
        </div>
        <template #fallback>
            <div class="shape" :class="addClassName">
                <span>
                    <img :src="imgSrc" alt="shape image">
                </span>
            </div>
        </template>
    </ClientOnly>
</template>

<script setup>


defineProps({
    addClassName: {
        type: String,
        default: ''
    },
    imgSrc: {
        type: String,
        required: true
    },
    dataDepth: {
        type: Number,
        default: 0.2
    }
})
</script>

<style scoped>
.shape {
    position: absolute;
    z-index: 1;
    will-change: transform;
}

.shape span {
    display: block;
    position: relative;
}

.shape img {
    max-width: 100%;
    height: auto;
}
</style>
