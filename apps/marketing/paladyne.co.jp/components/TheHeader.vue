<template>
    <div class="header-section header-transparent" :class="{'is-sticky': isSticky}">
        <div class="header-inner">
            <div class="container position-relative">
                <div class="row justify-content-between align-items-center">
                    <!-- Header Logo Start -->
                    <div class="col-xl-2 col-auto order-0">
                        <div class="header-logo">
                           <NuxtLink to="/">
                                <img class="dark-logo" src="/images/logo/logo.png" alt="Paladyne Logo">
                                <img class="light-logo" src="/images/logo/logo.png" alt="Paladyne Logo">
                            </NuxtLink>
                        </div>
                    </div>
                    <!-- Header Logo End -->

                    <!-- Header Main Menu Start -->
                    <div class="col-auto col-xl d-none d-flex align-items-center justify-content-end order-2 order-xl-1">

                        <div class="menu-column-area d-none d-xl-block position-static">
                            <Navigation />
                        </div>

                        <!-- Header Search Start -->
                        <div class="header-search-area">
                        </div>
                        <!-- Header Search End -->

                        <!-- Header Mobile Menu Toggle Start -->
                        <div class="header-mobile-menu-toggle d-xl-none ml-sm-2">
                            <button class="toggle" @click="mobileToggleClass('addClass', 'show-mobile-menu')">
                                <i class="icon-top"></i>
                                <i class="icon-middle"></i>
                                <i class="icon-bottom"></i>
                            </button>
                        </div>
                        <!-- Header Mobile Menu Toggle End -->
                    </div>
                    <!-- Header Main Menu End -->

                    <!-- Header Right Start -->
                    <div class="header-lang-switcher col-xl-2 col d-sm-flex justify-content-end order-1 order-xl-2">
                        <NuxtLink :to="switchLocalePath('en')">en</NuxtLink>
                         &nbsp; | &nbsp;
                        <NuxtLink :to="switchLocalePath('ja')">jp</NuxtLink>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import Navigation from '@/components/Navigation'

const isSticky = ref(false)

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath() // Nuxt i18n plugin

onMounted(() => {
    window.addEventListener('scroll', () => {
        let scrollPos = window.scrollY
        if(scrollPos >= 200){
            isSticky.value = true
        } else {
            isSticky.value = false
        }
    })
})

// offcanvas mobilemenu
const mobileToggleClass = (addRemoveClass, className) => {
    const el = document.querySelector('#offcanvas-menu')
    if (addRemoveClass === 'addClass') {
        el.classList.add(className)
    } else {
        el.classList.remove(className)
    }
}

//offcanvas search
const toggleClass = (addRemoveClass, className) => {
    const el = document.querySelector('#search-popup')
    if (addRemoveClass === 'addClass') {
        el.classList.add(className)
    } else {
        el.classList.remove(className)
    }
}
</script>
