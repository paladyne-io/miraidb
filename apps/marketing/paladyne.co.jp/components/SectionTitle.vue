<template>
    <div class="section-title text-center" :class="addClassName">
        <h2 class="title">{{ title }}</h2>
        <p class="sub-title">{{ subTitle }}</p>
    </div>
</template>

<script>
    export default {
        name: 'SectionTitle',

        props: ["title", "subTitle", "addClassName"]
    };
</script>
