<template>
    <div class="contact-form-section section-padding-t90-b100" :style="{backgroundColor: '#f8faff'}">
        <div class="container">
    
                <div class="col-md-12 center-text">
                    <!-- Section Title Start -->
                      <div class="section-title text-center" data-aos="fade-up">
                        <h2 class="title fz-48">{{ $t('contact_us_page_heading') }}</h2>
                        <p class="sub-title">{{ $t('contact_us_page_subtitle') }}</p>
                    </div>
                    <!-- Section Title End -->
                <div>
                    <MailtoForm/>
                </div> 
               </div>
              
        </div>
    </div>
</template>