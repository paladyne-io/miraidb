<template>
    <div class="main-container">

        <TheHeader />

        <OffCanvasMobileMenu />
      
        <SearchPopup />

        <BreadcrumbOne :items="items" :title="page_header" backgroundUrl="/images/bg/breadcrumb-bg-five.jpg" />
        
         <!--
        <CallToActionOne />

        -- Google Map Area Start --
        <div class="google-map-area section-padding-bottom">
            <div class="container">
                <div class="contact-map-area">
                    <iframe class="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2136.986005919501!2d-73.9685579655238!3d40.75862446708152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258e4a1c884e5%3A0x24fe1071086b36d5!2sThe%20Atrium!5e0!3m2!1sen!2sbd!4v1585132512970!5m2!1sen!2sbd" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                </div>
            </div>
        </div>
        -->

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
            ContactForm2: () => import('@/components/ContactForm2'),
            TheFooter: () => import('@/components/TheFooter'),
        },

        data() {
            return {
                page_header: this.$t('contact_page_header'),

                 items: [{
                    text: this.$t('home'),
                    to: "/"
                },
                {
                    text: this.$t('contact_page_title'),
                    active: true
                }
            ]
        }
        },

        head() {
            return {
                title: this.$t('contact_page_title')
            }
        },
    };
</script>
