<template>
    <div class="main-container">

        <TheHeader />

        <OffCanvasMobileMenu />

        <SearchPopup />

        <HeroFixedBanner />

        <AboutServices />

        <TheFooter />

    </div>
</template>

<script>
    export default {
        components: {
            TheHeader: () => import('@/components/TheHeader'),
            OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
            SearchPopup: () => import('@/components/SearchPopup'),
            HeroFixedBanner: () => import('@/components/HeroFixedBanner'),
            AboutServices: () => import('@/components/AboutServices'),
            TheFooter: () => import('@/components/TheFooter'),
        },

        head() {
            return {
                title: 'Paladyne Consulting and Design'
            }
        },
    };
</script>


