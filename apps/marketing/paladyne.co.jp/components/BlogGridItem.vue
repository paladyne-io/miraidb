<template>
    <div class="blog">
        <div class="thumbnail">
           <NuxtLink to="/blog-details" class="image">
                <img :src="blog.imgSrc" :alt="blog.title">
            </NuxtLink>
        </div>
        <div class="info">
            <ul class="meta">
                <li><i class="far fa-calendar"></i>{{ blog.date }}</li>
                <li><i class="far fa-eye"></i>{{ blog.view }} Views</li>
            </ul>
            <h3 class="title">
               <NuxtLink to="/blog-details">{{ blog.title }}</NuxtLink>
            </h3>
           <NuxtLink to="/blog-details" class="link">
                <mark>Read More</mark>
            </NuxtLink>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['blog']
    };
</script>
