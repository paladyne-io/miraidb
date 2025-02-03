<template>
<div class="contact-form-section section-padding-t90-b100" :style="{backgroundColor: '#f8faff'}">
    <div class="container">
        <div class="row">
            <div class="col-md-12 center-text">
                <!-- Section Title Start data-aos="fade-up" -->
                <div class="section-title text-center">
                    <h2 class="title fz-48">{{ $t('virtag_contact_page_heading') }}</h2>
                    <p class="sub-title">{{ $t('virtag_contact_page_subtitle') }}</p>
                </div>
                <!-- Section Title End -->

                <!-- Use when testing to prevent redirection
                   @submit.prevent
                 -->

                <div class="contact-form">
                    <form method="POST" action="/webemail.php" id="contact-form" @submit="checkForm">
                        <div class="row mtn-30">
                            <div class="col-md-6 col-12 mt-30">
                                <input type="text" :placeholder="name_placeholder" v-model="name" name="name" />
                            </div>
                            <div class="col-md-6 col-12 mt-30">
                                <input type="email" :placeholder="email_placeholder" v-model="email" name="email"/>
                            </div>
                            <div class="col-md-12 col-12 mt-30">
                                <input type="text" :placeholder="subject_placeholder" v-model="subject" name="subject" />
                            </div>
                            <div class="col-12 mt-30">
                                <textarea name="message" :placeholder="message_placeholder" v-model="message"></textarea>
                            </div>
                            <div class="col-12 mt-30" v-if="errors.length">

                                <b>{{ contact_validation_error }} </b>
                                <ul>
                                    <li v-for="error in errors">{{ error }}</li>
                                </ul>

                            </div>
                            <!-- <input v-on:keyup.enter="submit"> -->
                            <div class="col-12 text-center mb-8 mt-14">
                                <button class="text-lg inline-block px-6 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" name="sendflag" type="submit" value="send"> {{ email_send_button_label }} </button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import footerData from '~/data/footer.json';

export default {
    methods: {
        checkForm: function (e) {
            this.validateEmail();

             if (this.email_validated) {
                console.log("Email's ok");
            }

            if (this.name && this.email && this.subject && this.message && email_validated) {
                console.log("Everythings ok");
                // e.preventDefault();
                return true;
            }
            // console.log("Checking errors...");

            this.errors = [];

            if (!this.name) {
                this.errors.push(this.$t('contact_name_required'));
            }
            if (!this.email) {
                this.errors.push(this.$t('contact_email_required'));
            } else {
                  if (!this.email_validated) {
                //if (!this.validateEmail()) {
                    this.errors.push(this.$t('invalid_email_warning'));
                }
            }
            if (!this.subject) {
                this.errors.push(this.$t('contact_subject_required'));
            }
            if (!this.message) {
                this.errors.push(this.$t('contact_message_required'));
            }

            e.preventDefault();
        },
        validateEmail() {
            //if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))+$/.test(this.email)) {
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
            //if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
                //this.msg['email'] = 'Please enter a valid email address';
                this.email_validated = true
            } else {
                this.errors.push(this.$t('invalid_email_warning'));
                this.email_validated = false

                //this.msg['email'] = '';
            }
        }
    },
    data() {
        return {
            errors: [],
            name: null,
            email: null,
            subject: this.$t('virtag_subject_placeholder'),
            message: null,
            email_validated: false,

            name_placeholder: this.$t('email_name_placeholder') + " *",
            email_placeholder: this.$t('email_address_placeholder') + " *",
            subject_placeholder: this.$t('virtag_email_subject_placeholder'),
            message_placeholder: this.$t('virtag_email_message_placeholder') + " *",
            //message_text: this.$t('email_message_text'),
            //message_text: '',
            email_send_button_label: this.$t('email_send_button_label'),
            contact_validation_error: this.$t('contact_validation_error')
        }
    },
};
</script>

<!--
https://stackoverflow.com/questions/60334658/how-to-use-a-variable-value-as-placeholder-in-vue-with-typescript

<input class="btn btn-primary btn-hover-secondary" name="sendflag" type="submit" value="send" />
-->
