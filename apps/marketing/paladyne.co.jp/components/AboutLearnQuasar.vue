<template>
    <div class="section-padding-top section-padding-bottom-180">
        <div class="container">
            <div class="row">
                <div class="col-xl-7 col-lg-6 col-12" >
                    <div class="about-image-area">
                     <!--
                        <div class="about-image js-tilt">
                  s          <img src="/images/about/learn_quasar/learn_quasar1.png" alt="learn quasar screenshot 1">
                        </div>
                         -->
                        <div class="about-image js-tilt">
                            <img src="/images/about/learn_quasar/learn_quasar2.png" alt="learn quasar screenshot 2">
                        </div>

                        <!-- Animation Shape Start -->
                        <ShapeWithAnimation addClassName="shape-1" data-depth="1" imgSrc="/images/shape-animation/about-shape-1.png" />
                    </div>
                </div>
                <div class="col-xl-5 col-lg-6 col-12" >
                    <div class="about-content-area about-four">
                        <div class="section-title-two">
                            <span class="sub-title">{{ $t('category_education') }}</span>
                            <h3 class="title">{{ $t('make_a_web_app') }}</h3>
                        </div>
                        <p> {{ this.$t('learn_quasar_app_descr_head') }} </p>
                         <ul>
                          <li>{{ this.$t('learn_quasar_app_descr_bp1') }}</li>
                          <li>{{ this.$t('learn_quasar_app_descr_bp2') }}</li>
                          <li>{{ this.$t('learn_quasar_app_descr_bp3') }}</li>
                         </ul>
                        <div class="section-title">
                         {{ this.$t('learn_quasar_app_descr_closer') }}
                        </div>
                        <div class="section-title-two">
                        </div>

                        <a href="https://www.makeaweb.app/" class="btn btn-primary btn-hover-secondary mt-30">{{ this.$t('try_it_out') }}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        components: {
            ShapeWithAnimation: () => import('@/components/ShapeWithAnimation')
        },
    };
</script>
