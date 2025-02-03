<template>
    <div class="section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 mx-auto">
                    <div class="row row-cols-lg-12 row-cols-md-2 row-cols-sm-2 row-cols-1 mtn-30">
                        <!-- Email Failure Start -->
                        <div class="col-12" data-aos="fade-up">
                            <div class="emailresponse">
                                <h6 class="text"> {{ $t('email_failure_message') }} </h6>
                               <NuxtLink to="/contact-us-2">{{ $t('contact_us_label') }}</NuxtLink>
                            </div>
                        </div>
                        <!-- Email Failure End
                        <ContactForm />
                        -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
