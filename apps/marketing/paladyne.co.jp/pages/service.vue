<template>
    <div class="main-container">

        <TheHeader />

        <OffCanvasMobileMenu />

        <SearchPopup />

        <BreadcrumbOne :items="items" :title= "service_page_header" backgroundUrl= "/images/bg/breadcrumb-bg-three.jpg" />

        <ServiceWrapper />

        <!--
        <SuccessStory :style="{backgroundColor: '#f8faff'}" />

        <AboutFour />

        <FunfactWithTitle />

        <ContactSectionTwo />
        -->

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
            ServiceWrapper: () => import('@/components/ServiceWrapper'),
            SuccessStory: () => import('@/components/SuccessStory'),
            AboutFour: () => import('@/components/AboutFour'),
            FunfactWithTitle: () => import('@/components/FunfactWithTitle'),
            ContactSectionTwo: () => import('@/components/ContactSectionTwo'),
            TheFooter: () => import('@/components/TheFooter'),
        },

        data() {
            return {
                service_page_header: this.$t('service_page_header'),
                items: [
                    {
                        text: this.$t('home'),
                        to: "/"
                    },
                    {
                        text:  this.$t('service_label'),
                        active: true
                    }
                ]
            }
        },

        head() {
            return {
                title: 'Service'
            }
        },
    };
</script>


