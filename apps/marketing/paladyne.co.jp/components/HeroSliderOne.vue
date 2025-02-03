<template>
  <div class="intro-slider">
    <swiper
      :slides-per-view="1"
      :space-between="50">
      <swiper-slide

        class="swiper-slide"
        v-for="(banner, index) in sliderData"
        :key="index"
      >
        <div
          class="intro-section overlay bg-cover"
          :style="{ backgroundImage: `url(${banner.bgImgSrc})` }"
        >
          <div class="container  mt-60">
            <div class="row row-cols-lg-1 row-cols-1">
              <div class="col align-self-center">
                <div
                  class="intro-content mt-xl-8 mt-lg-8 mt-md-8 mt-sm-8 mt-xs-8"
                >
                  <h2 class="title">{{ banner.heading }}</h2>
                  <div class="row">
                    <p>&nbsp;</p>
                  </div>
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

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const swiperOptions = {
                speed: 1000,
                loop: true,
                autoplay: false,
                spaceBetween : 30,
                navigation: {
                    nextEl: '.home-slider-next',
                    prevEl: '.home-slider-prev',
                },
}

 const sliderData = [
                {
                id: 1,
                    heading: t('heading1'),
                    text: t('text1'),
                    bgImgSrc: "/images/hero-image/hero-1.jpg"
                },
                {
                id: 2,
                    heading: t('heading2'),
                    text: t('text2'),
                    bgImgSrc: "/images/hero-image/hero-2.jpg"
                },
                {
                    id: 3,
                    heading: t('heading3'),
                    text: t('text3'),
                    bgImgSrc: "/images/hero-image/hero-4.jpg"
                },
                {
                    id: 4,
                    heading: t('heading4'),
                    text: t('text4'),
                    bgImgSrc: "/images/hero-image/hero-3.jpg"
                }
                 //Employing design thinking techniques and agile practices with an understanding of the end-to-end user experience
]

</script>
