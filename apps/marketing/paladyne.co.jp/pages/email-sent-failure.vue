<template>
    <div class="main-container">

        <TheHeader />
        
        <OffCanvasMobileMenu />

        <SearchPopup />

        <BreadcrumbOne :items="items" :title="page_header" backgroundUrl="/images/bg/breadcrumb-bg-five.jpg" />

        <EmailFailure />
      
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
            EmailFailure: () => import('@/components/EmailFailure'),
            TheFooter: () => import('@/components/TheFooter'),
        },

        data() {
            return {
                page_header: this.$t('error_page_header'),

                 items: [{
                    text: this.$t('home'),
                    to: "/"
                },
                {
                    text: this.$t('error_page_title'),
                    active: true
                }
            ]
        }
        },

        head() {
            return {
                title: this.$t('email_failed_page')
            }
        },
    };
</script>
