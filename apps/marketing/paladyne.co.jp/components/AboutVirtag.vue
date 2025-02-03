<template>
  <div class="section-padding-top section-padding-bottom">
    <div class="container">
      <div class="row">
        <div class="col-xl-7 col-lg-6 col-12">
          <div class="about-image-area">
            <div class="about-image js-tilt">
              <img src="/images/about/virtag/virtag_ss_1.png" alt="virtag screenshot 1">
            </div>
            <div class="about-image js-tilt">
              <img src="/images/about/virtag/virtag_ss_2.png" alt="virtag screenshot 2">
            </div>

            <!-- Animation Shape Start -->
            <ShapeWithAnimation addClassName="shape-1" data-depth="1"
              imgSrc="/images/shape-animation/about-shape-1.png" />
          </div>
        </div>

        <div class="col-12">
          <div class="about-content-area about-four mt-10">
            <div class="section-title-two">
              <span class="sub-title">iot</span>
              <h3 class="title">Virtag</h3>
            </div>
            <div >
              {{ this.$t('virtag_app_descr_head') }}
              <ul>
                <li>&nbsp; - {{ this.$t('virtag_app_descr_bp1') }}</li>
                <li>&nbsp; - {{ this.$t('virtag_app_descr_bp2') }}</li>
                <li>&nbsp; - {{ this.$t('virtag_app_descr_bp3') }} </li>
                <li>&nbsp; - {{ this.$t('virtag_app_descr_bp4') }} </li>
              </ul>
            </div>
            <div class="section-title-one mt-10">
              <p>{{ this.$t('virtag_app_descr_bp5') }}</p>
              <p>{{ this.$t('virtag_app_descr_bp6') }}</p>
            </div>
              <div class="section-title-two mt-10">
                <p>
                  {{ this.$t('virtag_app_descr_closer') }}</p>
              </div>
            </div>
            <div class="mb-10">
              <a href="https://virtag-dist-sosiu.ondigitalocean.app" class="btn btn-primary btn-hover-secondary mt-30">{{
                this.$t('try_it_out') }}</a>
            </div>
          </div>

      <div class="col-12">
        <B>{{ this.$t('where_to_get_nfc_tags_heading') }} </B>
        <p>{{ this.$t('where_to_get_nfc_tags') }}
        {{ this.$t('about_nfc_virtag_store') }}</p>
      </div>
      <div class="col-12 mb-10">
        <a href="https://virtag.theshop.jp" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-hover-secondary mt-30">{{
          this.$t('visit_virtag_store') }}</a>
      </div>

      <div class="col-12 mb-10">
        <B>{{ this.$t('about_nfc_iphones_heading') }} </B>
        <p>{{ this.$t('about_nfc_iphones_text') }}</p>
      </div>

      <div class="col-12 mb-10">
        <B>{{ this.$t('about_nfc_android_phones_heading') }}</B>
        <p>{{ this.$t('about_nfc_android_phones_text') }}</p>
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
