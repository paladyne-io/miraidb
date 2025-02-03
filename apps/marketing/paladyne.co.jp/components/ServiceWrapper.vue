<template>
    <div class="section-padding-t90 section-padding-bottom">
        <div class="container">
            <!-- Section Title Start -->
            <div class="section-title text-center" data-aos="fade-up">
                <h2 class="title fz-32"> {{ service_page_subtitle}}</h2>
                <p class="sub-title">  {{ service_page_title }} </p>
            </div>
            <!-- Section Title End -->

            <!-- About Wrapper Start -->
            <div class="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 icon-box-shape-animation mtn-30">
                <div class="col mt-30" data-aos="fade-up" v-for="(service, index) in serviceData" :key="index">
                    <ServiceItem :service="service" addClassName="box-border" />
                </div>

                <ShapeWithAnimation addClassName="shape-1" data-depth="1" imgSrc="/images/shape-animation/video-shape-1.png" />
            </div>
            <!-- About Wrapper End -->
        </div>
    </div>
</template>

<script>
    import serviceData from '~/data/service.json';

    export default {
        components: {
            ServiceItem: () => import('@/components/ServiceItem'),
            ShapeWithAnimation: () => import('@/components/ShapeWithAnimation'),
        },


        data() {
             return {
                serviceData,
                service_page_subtitle: this.$t('service_page_subtitle'),
                service_page_title: this.$t('service_page_title'),

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
    };
</script>