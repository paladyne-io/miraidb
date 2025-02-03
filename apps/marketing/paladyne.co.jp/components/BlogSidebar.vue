<template>
    <div class="sidebar-widget-wrapper">
        <div class="sidebar-widget">
            <div class="sidebar-widget-content">
                <div class="sidebar-widget-search">
                    <form>
                        <input type="text" placeholder="Search...">
                        <button><i class="fas fa-search"></i></button>
                    </form>
                </div>
            </div>
        </div>
        <div class="sidebar-widget">
            <h3 class="sidebar-widget-title mb-2">Categories</h3>
            <div class="sidebar-widget-content">
                <ul class="sidebar-widget-cate-list">
                    <li>
                       <NuxtLink to="/"><span class="text">App</span> <span class="count">2</span></NuxtLink>
                    </li>
                    <li>
                       <NuxtLink to="/"><span class="text">Marketing</span> <span class="count">8</span></NuxtLink>
                    </li>
                    <li>
                       <NuxtLink to="/"><span class="text">UX Design</span> <span class="count">4</span></NuxtLink>
                    </li>
                    <li>
                       <NuxtLink to="/"><span class="text">Startup</span> <span class="count">3</span></NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar-widget">
            <h3 class="sidebar-widget-title mb-2">Popular Posts</h3>
            <div class="sidebar-widget-content">
                <ul class="sidebar-widget-list-post">
                    <li>
                        <span class="cate">Marketing</span>
                       <NuxtLink to="/blog-details"> How your sales can work together in account-based marketing</NuxtLink>
                    </li>
                    <li>
                        <span class="cate">Busniess</span>
                       <NuxtLink to="/blog-details">The six things marketers need to understand about DTC marketing</NuxtLink>
                    </li>
                    <li>
                        <span class="cate">Marketing</span>
                       <NuxtLink to="/blog-details">Eleven top tips for developing agile marketing</NuxtLink>
                    </li>
                    <li>
                        <span class="cate">Agency</span>
                       <NuxtLink to="/blog-details"> How your sales can work together in account-based marketing</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="sidebar-widget">
            <div class="sidebar-widget-content">
                <div class="sidebar-widget-banner bg-cover" data-overlay="0.7" :style="{ backgroundImage: `url('/images/bg/breadcrumb-bg.jpg')` }">
                    <h3 class="title">Subscribe to our newsletter</h3>
                    <p>All the latest marketing news, including updates on brand campaigns, and the most interesting insights</p>
                   <NuxtLink to="">Subscribe Now</NuxtLink>
                </div>
            </div>
        </div>
        <div class="sidebar-widget">
            <h3 class="sidebar-widget-title">Popular tags</h3>
            <div class="sidebar-widget-content">
                <div class="tagcloud">
                   <NuxtLink to="/">App</NuxtLink>
                   <NuxtLink to="/">Branding</NuxtLink>
                   <NuxtLink to="/">Development</NuxtLink>
                   <NuxtLink to="/">Design</NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
