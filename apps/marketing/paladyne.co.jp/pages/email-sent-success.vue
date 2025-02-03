<template>
    <div class="main-container">

        <TheHeader />
        
        <OffCanvasMobileMenu />

        <SearchPopup />

        <BreadcrumbOne :title="page_header" backgroundUrl="/images/bg/breadcrumb-bg-five.jpg" />

        <EmailSuccess />

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
            EmailSuccess: () => import('@/components/EmailSuccess'),
            TheFooter: () => import('@/components/TheFooter'),
        },

        data() {
            return {
                page_header: this.$t('success_page_header'),

                 items: [{
                    text: this.$t('home'),
                    to: "/"
                },
                {
                    text: this.$t('success_page_title'),
                    active: true
                }
            ]
        }
        },

        head() {
            return {
                title: this.$t('email_success_page')
            }
        },
    };
</script>
