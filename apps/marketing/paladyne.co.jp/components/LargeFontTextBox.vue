<template>
    <div class="section-padding-t90-b100">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 m-auto">
                    <!-- Section Title Start -->
                    <div class="about-content-full mb-50" >
                        <h2 class="title"> {{ $t('design_direction_title') }} </h2>
                        <p> {{ $t('design_direction_text') }} </p>
                        <p> {{ $t('design_direction_text_2') }} </p>
                       <NuxtLink to="/contact-us" class="link"> <mark>{{ $t('contact_us_label') }}</mark> </NuxtLink>

                    </div>
                    <!-- Section Title End -->
                </div>

                <div class="col-12">
                        <!-- Video Popup End -->

                        <!-- Animation Shape Start
                        <ShapeWithAnimation addClassName="shape-1" data-depth="1" imgSrc="/images/shape-animation/video-shape-1.png" />
                        -->

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            ShapeWithAnimation: () => import('@/components/ShapeWithAnimation'),
        },

        data() {
            return {
                videos: [
                    { src: "https://www.youtube.com/watch?v=eS9Qm4AOOBY" }
                ]
            }
        },
    };
</script>
