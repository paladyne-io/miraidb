<template>
    <div class="section-padding">
        <div class="container">
            <div class="row">
                <!-- About Content Start -->
                <div class="col-lg-6" >
                    <div class="about-content-area">
                        <!-- Section Title Two Start -->

                        <div class="section-title-two">
                            <span class="sub-title">{{ $t('design_page_subtitle') }}</span>
                            <h3 class="title"> {{ $t('design_page_title') }} </h3>
                        </div>
                        <!-- Section Title Two End -->

                        <div class="row mtn-30">
                            <div class="col-md-5 col-sm-6 col-12 mt-30" >
                                <div class="about-funfact">
                                    <div class="number"><span class="counter"></span>+</div>

                                    <h6 class="text"> {{ $t('design_label') }} </h6>
                                    <p> {{ $t('design_services') }}</p>
                                </div>
                            </div>
                            <div class="col-md-5 col-sm-6 col-12 mt-30" >
                                <div class="about-funfact">
                                    <div class="number"><span class="counter"></span>+</div>
                                    <h6 class="text"> {{ $t('project_management_label') }} </h6>
                                    <p> {{ $t('services_page_digital_innovation') }}</p>
                                </div>
                            </div>
                        </div>
              </div>
            </div>
                <!-- About Content Start -->

                <!-- About Image Area Start data-aos="fade-up">
                about-two right-0 mr-0">
                -->
               <div class="col-xl-7 col-lg-6" >
                    <div class="about-image-area about-shape-animation ">
                        <div class="about-image js-tilt">
                            <img src="/images/about/about-1.jpg" alt="image">
                        </div>
                        <div class="about-image js-tilt">
                            <img src="/images/about/design_process.jpg" alt="image">
                        </div>

                        <!-- Animation Shape Start -->

                        <ShapeWithAnimation addClassName="shape-1" data-depth="1" imgSrc="/images/shape-animation/video-shape-1.png" />

                    </div>
                </div>
                <!-- About Image Area Start -->
            </div>
        </div>
    </div>
</template>
