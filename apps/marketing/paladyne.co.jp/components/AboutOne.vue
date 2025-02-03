<template>
    <div class="section-padding-t90 section-padding-bottom-200">
        <div class="container">
            <!-- Section Title Start
            <div class="section-title" >
                <h2 class="title"> {{ $t('digix') }} </h2>
                <p class="sub-title">{{ $t('we_build_webapps') }}</p>
            </div>
           -->
            <!-- Section Title End -->

            <!-- About Wrapper Start -->
            <div class="row">
                <!-- About Image Area Start data-aos="fade-up"-->
                <div class="col-xl-7 col-lg-6" >
                    <div class="about-image-area">

                        <div class="about-image js-tilt">
                            <img src="/images/about/agency_about_1.jpg" alt="image1">
                        </div>

                        <div class="about-image js-tilt">
                            <img src="/images/about/agency_about_2.jpg" alt="image2">
                        </div>

                        <!-- Animation Shape Start -->
                        <ShapeWithAnimation addClassName="shape-1" :dataDepth="1" imgSrc="/images/shape-animation/about-shape-1.png" />
                        <!-- Animation Shape End -->
                    </div>
                </div>
                <!-- About Image Area Start -->

                <!-- About Start data-aos="fade-up" -->
                <div class="col-xl-5 col-lg-6">
                    <div class="about-content-area about-one">
                        <!-- Section Title Two Start -->
                        <div class="section-title-two">
                            <span class="sub-title"> {{ $t('everyday_newcha') }} </span>
                            <h3 class="title"> {{ $t('get_in_touch') }}</h3>
                        </div>
                        <!-- Section Title Two End -->

                        <p>{{ $t('our_vision') }}</p>
                       <NuxtLink to="/contact-us" class="btn btn-primary btn-hover-secondary mt-4">{{ $t('contact_us_label') }}</NuxtLink>
                    </div>
                </div>
                <!-- About Start -->
            </div>
            <!-- About Wrapper End -->
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            ShapeWithAnimation: () => import('@/components/ShapeWithAnimation'),
        },
    };
</script>
