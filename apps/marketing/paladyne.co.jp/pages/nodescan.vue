<template>
<div class="main-container">
    <TheHeader />
    <OffCanvasMobileMenu />
    <BreadcrumbOne :items="items" :title="page_header" backgroundUrl="/images/bg/nodescan_banner_bg.png" />

    <AboutNodescan />
    <ContactFormNodescan />

    <TheFooter />
</div>
</template>

<script>
export default {
    components: {
        TheHeader: () => import('@/components/TheHeader'),
        OffCanvasMobileMenu: () => import('@/components/OffCanvasMobileMenu'),
        BreadcrumbOne: () => import('@/components/BreadcrumbOne'),
        AboutNodescan: () => import('@/components/AboutNodescan'),
        ContactFormNodescan: () => import('@/components/ContactFormNodescan'),
        TheFooter: () => import('@/components/TheFooter'),
    },

    data() {
        return {
            page_header: this.$t('nodescan_header'),
            items: [{
                    text: this.$t('home'),
                    to: "/"
                },
                {
                    text: this.$t('nodescan'),
                    active: true
                }
            ]
        }
    },

    head() {
        return {
            title: this.$t('nodescan_header')
        }
    },
};
</script>
