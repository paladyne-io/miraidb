<template>
    <div class="section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 mx-auto">
                    <div class="row row-cols-lg-4 mtn-30">
                        <!-- Email success Start -->
                        <div class="col mt-30" data-aos="fade-up">
                            <div class="emailresponse">
                                <h6 class="text"> {{ $t('email_sent_message') }} </h6>
                               <NuxtLink to="/">{{ $t('home') }}</NuxtLink>
                            </div>
                        </div>
                        <!-- Email success End -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
