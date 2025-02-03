<template>
    <div class="">
        <div class="container">
            <div class="row col-lg-12">
                <div class="col-lg-12 m-auto">
                    <!-- Section Title Start -->
                    <div class="about-content-full mb-20" >
                        <h2 class="title"> {{ $t('programming_text_header') }} </h2>

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
