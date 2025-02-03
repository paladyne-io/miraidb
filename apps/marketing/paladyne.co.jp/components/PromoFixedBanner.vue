<template>
        <div class="intro-section overlay bg-cover" :style="{ backgroundImage: `url('/images/hero-image/hero_programming_school.jpg')` }">
            <div class="container">
                <div class="row row-cols-lg-1 row-cols-1">
                    <div class="col align-self-center">
                    <NuxtLink to="/programming_school">
                        <div class="intro-content m-auto">
                          <h4 class="title">{{ this.$t('ashiya_programming_school') }}</h4>
                          <div class="row">
                            <p>&nbsp;</p>
                          </div>
                            <h5 class="title">{{ this.$t('learn_programming_by_web_app') }}</h5>
                               <!-- <client-only>
                                    <vue-typer class="vuetyper"
                                       :text="items"
                                        erase-style='backspace'
                                        :erase-delay='100'
                                    ></vue-typer>
                                </client-only>
                              -->
                             <div class="desc">
                                <p>{{ this.$t('for_study_for_work_for_person_dev') }}</p>
                            </div>

                         </div>
                      </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
         data() {
            return {
                services_page_header: this.$t('services_page_header'),
                services_page_subheader: this.$t('services_page_subheader'),

                items: [
                  this.$t('ashiya_programming_school_started')
                ]
            }
         }
    };
</script>

<style lang="scss">
/*
.container {
 background-color: red;
}

div{
 background-color: red;
}
*/

.intro-content .vue-typer span {
    font-size: 28px;
    line-height: 1.0;
    color: #fff;
    margin-top: 10px;
    margin-bottom: 30px;
    font-weight: 600
}

.title {
  font-size:26px !Important;
}
</style>
