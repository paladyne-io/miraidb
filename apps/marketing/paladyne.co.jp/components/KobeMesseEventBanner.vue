<template>
  <div>
        <div
          class="intro-section overlay bg-cover"
          :style="{ backgroundImage: `url(${banner.bgImgSrc})` }"
        >
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
  </div>
</template>

<script>
export default {
    data() {
        return {
              banner: {
                    heading: this.$t('Kobemesse2023_heading1'),
                    text:this.$t('Kobemesse2023_text1'),
                    bgImgSrc: "/images/events/KobeMesse2023_Virtag_Paladyne.png"
                }
              }
        }
};
</script>
