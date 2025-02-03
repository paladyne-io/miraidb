<template>
    <div class="intro-slider">
        <div class="intro-section overlay bg-cover" :style="{ backgroundImage: `url('/images/hero-image/hero-3.jpg')` }">
            <div class="container">
                <div class="row row-cols-lg-1 row-cols-1">
                    <div class="col align-self-center">
                        <div class="intro-content m-auto text-center">
                            <h2 class="title">{{ services_page_header }}</h2>
                                <client-only>
                                    <vue-typer
                                       :text="items"
                                        erase-style='backspace'
                                        :erase-delay='100'
                                    ></vue-typer>
                                </client-only>
                            <div class="desc">
                                <p>{{ services_page_subheader }}</p>
                            </div>
                            <!--
                           <NuxtLink to="/about" class="btn btn-primary btn-hover-secondary">Get Started</NuxtLink>
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
                services_page_header: this.$t('services_page_header'),
                services_page_subheader: this.$t('services_page_subheader'),

                items: [
                  this.$t('design_label'), this.$t('project_management_label'), "IoT", this.$t('programming_label')
                ]
            }
         }
    };
</script>
