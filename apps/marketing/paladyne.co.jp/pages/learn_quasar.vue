<template>
<div class="main-container">
    <TheHeader />
    <OffCanvasMobileMenu />
    <BreadcrumbOne :items="items" :title="page_header" backgroundUrl="/images/bg/virtag_banner_bg.png" />

    <AboutLearnQuasar />
    <ContactFormLearnQuasar/>

    <TheFooter />
</div>
</template>

<script>
export default {
    components: {
        TheHeader: () => import('@/components/TheHeader'),
        OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
        BreadcrumbOne: () => import('@/components/BreadcrumbOne'),
        AboutVirtag: () => import('@/components/AboutVirtag'),
        ContactForm: () => import('@/components/ContactForm'),
        TheFooter: () => import('@/components/TheFooter'),
    },

    data() {
        return {
            page_header: this.$t('learn_quasar_header'),
            items: [{
                    text: this.$t('home'),
                    to: "/"
                },
                {
                    text: this.$t('learn_quasar'),
                    active: true
                }
            ]
        }
    },

    head() {
        return {
            title: this.$t('virtag_header')
        }
    },
};
</script>
