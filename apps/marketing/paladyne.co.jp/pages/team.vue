<template>
    <div class="main-container">

        <TheHeader />

        <OffCanvasMobileMenu />

        <SearchPopup />

        <BreadcrumbOne :items="items" :title="team_page_header" backgroundUrl="/images/bg/breadcrumb-bg-five.jpg" />

        <TeamOne />

        <ContactForm2 />

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
            CallToActionOne: () => import('@/components/CallToActionOne'),
            ContactForm2: () => import('@/components/ContactForm2'),
            TheFooter: () => import('@/components/TheFooter'),
        },

        data() {
            return {
                team_page_header: this.$t('team_page_header'),

                items: [
                    {
                        text: this.$t('home'),
                        to: "/"
                    },
                    {
                        text:  this.$t('contact_us_label'),
                        active: true
                    }
                ]
            }
        },

        head() {
            return {
                title: 'Contact Us'
            }
        },
    };
</script>
