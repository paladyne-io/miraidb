<template>
    <div class="section-padding-t90-b100">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 m-auto">
                    <!-- Section Title Start -->
                    <div class="about-content-full mb-50" >
                        <h2 class="title"> {{ $t('programming_title') }} </h2>
                        <p> {{ $t('programming_text') }} </p>
                        <p> {{ $t('programming_text_2') }} </p>

                       <NuxtLink to="/contact-us" class="link"> <mark>{{ $t('contact_us_label') }}</mark> </NuxtLink>

                    </div>
                    <!-- Section Title End -->
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
