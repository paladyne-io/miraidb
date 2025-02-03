<template>
    <div class="icon-box text-center" :class="addClassName">
        <div class="icon">
            <img class="svgInject" :src="service.iconSrc" :alt="service.title">
        </div>
        <div class="content">
            <h3 class="title">{{  $t(service.title) }}</h3>
            <div class="desc">
                <p>{{  $t(service.text) }}</p>
            </div>
            <!-- project-details -->
           <NuxtLink to="/contact-us" class="link">{{ this.$t('learn_more') }} </NuxtLink>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['service', 'addClassName']
    };
</script>
