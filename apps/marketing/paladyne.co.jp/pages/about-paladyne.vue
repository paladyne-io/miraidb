<template>
<div class="main-container">

    <TheHeader />

    <OffCanvasMobileMenu />

    <BreadcrumbOne :items="items" :title="team_page_header" backgroundUrl="/images/bg/breadcrumb-bg-five.jpg" />

    <CorporateInfo />

    <ContactForm2 />

    <TheFooter />

</div>
</template>

<script>
export default {
    components: {
        TheHeader: () => import('@/components/TheHeader'),
        OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
        BreadcrumbOne: () => import('@/components/BreadcrumbOne'),
        CorporateInfo: () => import('@/components/CorporateInfo'),
        ContactForm: () => import('@/components/ContactForm'),
        TheFooter: () => import('@/components/TheFooter'),
    },

    data() {

        return {
            team_page_header: this.$t('corp_info_page_header'),

            items: [{
                    text: this.$t('home'),
                    to: "/"
                },
                {
                    text: this.$t('corp_info'),
                    active: true
                }
            ]
        }
    },

    head() {
        return {
            title: this.$t('corp_info')
        }
    },
};
</script>
