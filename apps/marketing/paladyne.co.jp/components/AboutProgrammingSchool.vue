<template>
    <div class="section-padding-top">
        <div class="container">
            <div class="row">
                <div class="col-xl-7 col-lg-6 col-12" >
                    <div class="about-image-area">
                        <div class="about-image js-tilt">
                            <img src="/images/about/programmming_school/programming_school1.png" alt="about screenshot 1">
                        </div>
                       <!--
                        <div class="about-image js-tilt">
                            <img src="/images/about/programmming_school/programming_school2.png" alt="about screenshot 2">
                        </div>
                        -->
                        <!-- Animation Shape Start -->
                        <ShapeWithAnimation addClassName="shape-1" data-depth="1" imgSrc="/images/shape-animation/about-shape-1.png" />
                    </div>
                </div>
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

                     <div>
                        <div class="row mtn-40">
                            <div class="col-md-5 col-sm-6 col-12 mt-30" >
                                <div class="about-funfact">
                                    <div class="number"><span class="counter"></span>魅力</div>
                                    <ul>
                                      <li>義務教育の必修化により成績UP</li>
                                      <li>価値の高いIT人材になれる </li>
                                      <li>論理的思考力UP</li>
                                      <li>脳トレにもピッタリ</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-5 col-sm-6 col-12 mt-30" >
                                <div class="about-funfact">
                                    <div class="number"><span class="counter"></span>こんな方にオススメ </div>
                                    <ul>
                                      <li>学生: 小学生（４年生～大学生）</li>
                                      <li>キャリアの選択肢を増やしたい方 </li>
                                      <li>ITリテラシーを強化したいシニアの方</li>
                                    </ul>
                                 </div>
                            </div>
                                <div class="col-md-5 col-sm-6 col-12 mt-30" >
                                <div class="about-funfact">
                                    <div class="number"><span class="counter"></span>講師</div>
                                      <ul>
                                        <li>ニュージーランド人</li>
                                        <li>30年のプログラミング経験</li>
                                        <li>8年間のESOL教育経験</li>
                                        <li>芦屋市在28年</li>
                                        <li>人当たりが柔らかくとても話しやすい</li>
                                  </ul>
                                </div>
                            </div>
                        </div>
                    <p></p>
                   <div class="about-funfact">
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
                  <!-- Google Map Area Start -->
                  <div class="google-map-area section-padding-bottom">
                      <div class="container">
                        <div class="contact-map-area">
                          <!--
                            <iframe class="contact-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2136.986005919501!2d-73.9685579655238!3d40.75862446708152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258e4a1c884e5%3A0x24fe1071086b36d5!2sThe%20Atrium!5e0!3m2!1sen!2sbd!4v1585132512970!5m2!1sen!2sbd" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
                            -->
                            <iframe class="contact-map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3278.310819345234!2d135.3089159853193!3d34.74776236996335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f33ab53ee351%3A0x18d4e61a574ba357!2z44CSNjU5LTAwMTIg5YW15bqr55yM6Iqm5bGL5biC5pyd5pel44Kx5LiY55S677yT77yQ4oiS77yZIOacneaXpeODtuS4mOmbhuS8muaJgA!5e0!3m2!1sja!2sjp!4v1662022605321!5m2!1sja!2sjp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                          <!--
                            <iframe class="contact-map" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3278.310819345234!2d135.3089159853193!3d34.74776236996335!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f33ab53ee351%3A0x18d4e61a574ba357!2z44CSNjU5LTAwMTIg5YW15bqr55yM6Iqm5bGL5biC5pyd5pel44Kx5LiY55S677yT77yQ4oiS77yZIOacneaXpeODtuS4mOmbhuS8muaJgA!5e0!3m2!1sja!2sjp!4v1662022605321!5m2!1sja!2sjp" allowfullscreen="" aria-hidden="false" tabindex="0" </iframe>
                          -->
                      </div>
                  </div>
              </div>
          </div>
      </div>
</template>

<script>
export default {
  components: {
    ShapeWithAnimation: () => import("@/components/ShapeWithAnimation"),
  },
};
</script>
