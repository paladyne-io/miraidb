<template>
    <nav class="site-main-menu">
        <ul>
            <li class="has-children">
               <NuxtLink to="/">Home</NuxtLink>
                <ul class="sub-menu">
                    <li>
                       <NuxtLink to="/">Home One</NuxtLink>
                    </li>
                    <li>
                       <NuxtLink to="/home-two">Home Two</NuxtLink>
                    </li>
                    <li>
                       <NuxtLink to="/home-three">Home Three</NuxtLink>
                    </li>
                </ul>
            </li>
            <li>
               <NuxtLink to="/about">About Us</NuxtLink>
            </li>
            <li>
               <NuxtLink to="/service">Services</NuxtLink>
            </li>
            <li class="has-children">
               <NuxtLink to="/project">Project</NuxtLink>
                <ul class="sub-menu">
                    <li>
                       <NuxtLink to="/project">Project</NuxtLink>
                    </li>
                    <li>
                       <NuxtLink to="/project-details">Project Details</NuxtLink>
                    </li>
                </ul>
            </li>
            <li class="has-children">
               <NuxtLink to="/blog-grid">Blog</NuxtLink>
                <ul class="sub-menu">
                    <li>
                       <NuxtLink to="/blog-grid">Blog Grid</NuxtLink>
                    </li>
                    <li>
                       <NuxtLink to="/blog-classic">Blog Classic</NuxtLink>
                    </li>
                    <li>
                       <NuxtLink to="/blog-details">Blog Details</NuxtLink>
                    </li>
                </ul>
            </li>
            <li>
               <NuxtLink to="/contact-us">Contact Us</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup>
// Component is template-only, no script logic needed
</script>
