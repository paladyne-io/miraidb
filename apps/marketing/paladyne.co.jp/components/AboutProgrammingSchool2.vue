<template>
  <div >
    <div class="container mt-3">
      <div class="row">
        <!--
                <div class="col-xl-7 col-lg-6 col-12" >
                    <div class="about-image-area">
                        <div class="about-image js-tilt">
                            <img src="/images/programmming-school/Part1.jpg" alt="Part 1">
                        </div>
                        <div class="about-image js-tilt">
                            <img src="/images/about/programmming_school/programming_school2.png" alt="about screenshot 2">
                        </div>
                        <ShapeWithAnimation addClassName="shape-1" data-depth="1" imgSrc="/images/shape-animation/about-shape-1.png" />
                    </div>
                </div>
                -->
        <!--
                <div class="col-xl-5 col-lg-6 col-12" >
                  <div class="about-content-area about-four">
                     <div class="section-title-two">
                      <span class="sub-title">{{this.$t('category_education')}}</span>
                        <h3 class="title">{{ this.$t('programming_school_title') }}</h3>
                      </div>
                        <div class="section-title">
                          <p>一緒にWebアプリを作りませんか</p>
                        </div>
                        <div class="section-title">
                          <p>{{ this.$t('programming_school_usp')}}</p>
                        </div>
                  </div>
                -->
        <div>
          <div class="row m-4">
            <div class="col-md-6 col-sm-6 col-12">
              <img src="/images/programmming-school/Part1.jpg" alt="Part 1" />
            </div>
            <div class="col-md-6 col-sm-6 col-12">
              <img src="/images/programmming-school/Part2.jpg" alt="Part2" />
            </div>
            <div class="col-md-6 col-sm-6 col-12">
              <img src="/images/programmming-school/Part3.jpg" alt="Part3" />
            </div>
            <div class="col-md-6 col-sm-6 col-12">
              <img src="/images/programmming-school/Part4.jpg" alt="Part4" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <img
          src="/images/programmming-school/Curriculum.jpg"
          alt="Curriculum"
        />
      </div>
      <div class="col-12">
        <img
          src="/images/programmming-school/Course1Program.jpg"
          alt="Course 1 Program"
        />
      </div>
      <div class="col-12">
        <img
          src="/images/programmming-school/TuitionFee.jpg"
          alt="TuitionFee"
        />
      </div>
      <div class="col-12">
        <img
          src="/images/programmming-school/StudentsVoices.jpg"
          alt="StudentsVoices"
        />
      </div>
    </div>

    <div class="mt-6">
      <img
        src="/images/programmming-school/BottomPanel.jpg"
        alt="BottomPanel"
      />
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <img src="/images/programmming-school/FAQ.jpg" alt="FAQ" />
        </div>
        <div class="col-12">
          <img
            src="/images/programmming-school/AccessHeader.jpg"
            alt="AccessHeader"
          />
        </div>
        <div class="row mx-3 mb-4">
          <div class="col-md-6 col-sm-6 col-12">
            <div class="contact-map-area">
              <iframe
                class="contact-map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3278.310819345234!2d135.3089159853193!3d34.74776236996335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f33ab53ee351%3A0x18d4e61a574ba357!2z44CSNjU5LTAwMTIg5YW15bqr55yM6Iqm5bGL5biC5pyd5pel44Kx5LiY55S677yT77yQ4oiS77yZIOacneaXpeODtuS4mOmbhuS8muaJgA!5e0!3m2!1sja!2sjp!4v1662022605321!5m2!1sja!2sjp"
                width="600"
                height="450"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div class="col-md-6 col-sm-6 col-12">
            <img
              src="/images/programmming-school/AccessDetails2.jpg"
              alt="AccessDetails"
            />
        <div class="mt-2">
         <OpenMapButton />
        </div>
          </div>
          </div>
        </div>
      </div>

      <!--
                      <div class="number"><span class="counter"></span>場所</div>
                        <b>朝日ヶ丘集会所</b>
                        <p>〒659-0012 朝日ヶ丘町30番9号</p>
                      </div>
                      <p></p>
                       <p>阪急バス「芦屋病院南口」から南へ徒歩5分
                       <br>または
                       <br>阪急バス「岩ケ平」から西へ徒歩5-6分</p>
                      <p></p>
                    </div>
                    <div>
                        <a href="https://www.google.co.jp/maps/place/%E3%80%92659-0012+%E5%85%B5%E5%BA%AB%E7%9C%8C%E8%8A%A6%E5%B1%8B%E5%B8%82%E6%9C%9D%E6%97%A5%E3%82%B1%E4%B8%98%E7%94%BA%EF%BC%93%EF%BC%90%E2%88%92%EF%BC%99+%E6%9C%9D%E6%97%A5%E3%82%B1%E4%B8%98%E9%9B%86%E4%BC%9A%E6%89%80/@34.746868,135.3093814,19.26z/data=!4m13!1m7!3m6!1s0x6000f33ab53ee351:0x18d4e61a574ba357!2z44CSNjU5LTAwMTIg5YW15bqr55yM6Iqm5bGL5biC5pyd5pel44Kx5LiY55S677yT77yQ4oiS77yZIOacneaXpeOCseS4mOmbhuS8muaJgA!3b1!8m2!3d34.7469095!4d135.3098551!3m4!1s0x6000f33ab53ee351:0x18d4e61a574ba357!8m2!3d34.7469095!4d135.3098551?hl=ja" target="_blank">地図はこちら（Google&nbsp;Mapsを開く）</a>
                    </div>
                  </div>
                  </div>
                  -->
            <!-- Google Map Area Start
                  <div class="google-map-area section-padding-bottom">
                      <div class="container">
                        <div class="contact-map-area">
                            <iframe class="contact-map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3278.310819345234!2d135.3089159853193!3d34.74776236996335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f33ab53ee351%3A0x18d4e61a574ba357!2z44CSNjU5LTAwMTIg5YW15bqr55yM6Iqm5bGL5biC5pyd5pel44Kx5LiY55S677yT77yQ4oiS77yZIOacneaXpeODtuS4mOmbhuS8muaJgA!5e0!3m2!1sja!2sjp!4v1662022605321!5m2!1sja!2sjp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                      </div>
                  </div>
             <a :href="mapURL" target="_blank">
            グーグルマップを開く
        </a>
      -->
    </div>

</template>

<script>
const mapURL = "https://www.google.com/maps/place/朝日ケ丘集会所/@34.746944,135.309855,16z/data=!4m5!3m4!1s0x6000f33ab53e152b:0x654e34b67d778057!8m2!3d34.7469641!4d135.3098517?hl=ja"
import OpenMapButton from "@/components/ButtonOpenGoogleMaps"

export default {

  methods: {
      openGoogleMap() {
        window.open(
          mapURL, "_blank"
        );
      },
    },
  components: {
    OpenMapButton,
    ShapeWithAnimation: () => import("@/components/ShapeWithAnimation"),
  },
 data() {
  return {
    mapURL
  }
},

  head() {
    return {
      bodyAttrs: {
        class: "reset-body",
      },

    };
  },
};
</script>

<style>
.reset-body {
  margin: 0;
}
</style>
