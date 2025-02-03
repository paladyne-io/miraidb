<template>
    <div class="main-container">

        <TheHeader />

        <OffCanvasMobileMenu />

        <SearchPopup />

        <BreadcrumbOne :items="items" :title="page_header" backgroundUrl= "/images/bg/breadcrumb-bg.jpg" />
        <!--
        <AboutTwo class="section-padding-top about-section-padding-bottom-200" />
       
        <CallToActionVideo />
     
        <AboutFour />
        
        <TestimonialSectionOne :style="{backgroundColor: '#f8faff'}" />
        -->

        <CorporateInfo />

        <CallToActionThree />

        <TheFooter />

    </div>
</template>

<script>
    export default {
        components: {
            TheHeader: () => import('@/components/TheHeader'),
            OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
            SearchPopup: () => import('@/components/SearchPopup'),
            BreadcrumbOne: () => import('@/components/BreadcrumbOne'),
            CorporateInfo: () => import('@/components/CorporateInfo'),
            CallToActionThree: () => import('@/components/CallToActionThree'),
            TheFooter: () => import('@/components/TheFooter'),
        },

        data() {
            return {
                page_header: this.$t('about_page_header'),

                 items: [{
                    text: this.$t('home'),
                    to: "/"
                },
                {
                    text: this.$t('about_page'),
                    active: true
                }
            ]
        }
        },

        head() {
            return {
                title: 'About us'
            }
        },
    };
</script>


