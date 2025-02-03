<template>

  <div class="intro-slider">
    <swiper :options="swiperOptions">
      <swiper-slide
        class="swiper-slide"
        v-for="(banner, index) in sliderData"
        :key="index"
      >
        <div
          class="intro-section bg-cover"
          :style="{ backgroundImage: `url(${banner.bgImgSrc})` }"
        >
        <a href="https://www.virtag.app/vt?uid=4c207936-7338-4f7b-b8e3-b9f76a767cde">
          <div class="container mt-60">
            <div class="row row-cols-lg-1 row-cols-1">

              <div class="col align-self-center">
                <div
                  class="intro-content mt-xl-8 mt-lg-8 mt-md-8 mt-sm-8 mt-xs-8"
                >
                <div class="row">
                  <p>&nbsp;</p>
                </div>
                  <h2 class="title">{{ banner.heading }}</h2>

                  <div class="desc">
                    <p>{{ banner.text }}</p>
                  </div>
                  <!--
                 <NuxtLink to="/team" class="btn btn-primary btn-hover-secondary"
                    >{{ $t('meet_team_btn_label') }}</NuxtLink>
                  -->
                  <!-- { $t('welcome') }}
                     <nuxt-link :to="localePath('index')">{{ $t('home') }}</nuxt-link>
                    -->
                  <!--
                   <NuxtLink to="/about" class="btn btn-outline-white btn-hover-primary">Learn More</NuxtLink>
                    -->
                </div>
              </div>
            </div>
          </div>
        </a>
        </div>

      </swiper-slide>
    </swiper>

    <!-- pagination class -->
    <div class="home-slider-prev swiper-button-prev main-slider-nav">
      <i class="fal fa-angle-left"></i>
    </div>
    <div class="home-slider-next swiper-button-next main-slider-nav">
      <i class="fal fa-angle-right"></i>
    </div>
  </div>

</template>

<script>
export default {
    data() {
        return {
            swiperOptions: {
                speed: 1000,
                loop: true,
                autoplay: false,
                spaceBetween : 30,
                navigation: {
                    nextEl: '.home-slider-next',
                    prevEl: '.home-slider-prev',
                },
            },
            //computed: {
            // sliderData() { return [
            sliderData: [
                {
                id: 1,
                    heading: this.$t('virtag'),
                    text:this.$t('virtag_slogan'),
                    bgImgSrc: "/images/hero-image/hero-virtag.png"
                },
                {
                id: 2,
                    heading: '',
                    text: '',
                    bgImgSrc: "/images/hero-image/hero-virtag2.png"
                },
                /*
                {
                    id: 3,
                    heading: this.$t('heading3'),
                    text:this.$t('text3'),
                    bgImgSrc: "/images/hero-image/hero-4.jpg"
                },
                {
                    id: 4,
                    heading: this.$t('heading4'),
                    text:this.$t('text4'),
                    bgImgSrc: "/images/hero-image/hero-3.jpg"
                }
                */
                 //Employing design thinking techniques and agile practices with an understanding of the end-to-end user experience
            ]
        }
        }
};
</script>
