<template>
<div class="main-container">
    <TheHeader />
    <OffCanvasMobileMenu />
    <BreadcrumbOne :items="items" :title="page_header" backgroundUrl="/images/bg/virtag_banner_bg.png" />
    <AboutProgrammingSchool2 />
    <ContactFormProgrammingSchool />
    <TheFooter />
</div>
</template>

<script>
export default {
    components: {
        TheHeader: () => import('@/components/TheHeader'),
        OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
        BreadcrumbOne: () => import('@/components/BreadcrumbOne'),
        AboutProgrammingSchool2: () => import('@/components/AboutProgrammingSchool2'),
        ContactForm: () => import('@/components/ContactFormProgrammingSchool'),
        TheFooter: () => import('@/components/TheFooter'),
    },

    data() {
        return {
            page_header: this.$t('programming_school_header'),
            items: [{
                    text: this.$t('home'),
                    to: "/"
                },
                {
                    text: this.$t('programming_school'),
                    active: true
                }
            ]
        }
    },

    head() {
        return {
            title: this.$t('programming_school_header')
        }
    },
};
</script>
