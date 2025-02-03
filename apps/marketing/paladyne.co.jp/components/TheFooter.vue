<template>
<div class="footer-section" :style="{backgroundColor: '#030e22'}">
    <div class="container">
        <!-- Footer Top Widgets Start -->
        <div class="row section-padding pt-0 mtn-30">
            <!-- Footer About Widget Start -->
            <div class="col-md-4 col-sm-6 col-12 mt-30">
                <div class="footer-widget">
                    <div class="footer-widget-content">
                        <div class="content">
                            <p> <a :href="'mailto:' + $t('contact_email')">{{ $t('contact_email') }}</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Footer About Widget End -->

            <!-- Footer Widget Start -->
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 mt-30">
                <div class="footer-widget">
                    <h4 class="footer-widget-title">{{ translate(footerData.footerLinkTitleOne) }}</h4>
                    <div class="footer-widget-content">
                        <ul>
                            <li v-for="(nav, index) in footerData.navListOne" :key="index">
                               <NuxtLink :to="nav.navUrl">{{ translate(nav.navTitle) }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Footer Widget End -->

            <!-- Footer Widget Start -->
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mt-30">
                <div class="footer-widget">
                    <h4 class="footer-widget-title">{{ translate(footerData.footerLinkTitleTwo) }}</h4>
                    <div class="footer-widget-content">
                        <ul>
                            <li v-for="(nav, index) in footerData.navListTwo" :key="index">
                               <NuxtLink :to="nav.navUrl">{{ translate(nav.navTitle) }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Footer Widget End -->

            <!-- Footer Widget Start -->
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mt-30">
                <div class="footer-widget">
                    <h4 class="footer-widget-title">{{ translate(footerData.footerLinkTitleThree) }}</h4>
                    <div class="footer-widget-content">
                        <ul>
                            <li v-for="(nav, index) in footerData.navListThree" :key="index">
                               <NuxtLink :to="nav.navUrl">{{ translate(nav.navTitle) }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Footer Widget End -->

            <!-- Footer Widget Start -->
            <div class="col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 mt-30">
                <div class="footer-widget">
                    <h4 class="footer-widget-title">{{translate(footerData.footerLinkTitleFour)}}</h4>
                    <div class="footer-widget-content">
                        <ul>
                            <li v-for="(nav, index) in footerData.navListFour" :key="index">
                                <NuxtLink :to="nav.navUrl">{{ translate(nav.navTitle) }}</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Footer Widget End -->
        </div>
        <!-- Footer Top Widgets End -->

        <!-- Footer Copyright Start -->
        <div class="row">
            <div class="col">
                <p class="copyright">Copyright &copy; 2023 <a href="#">Paladyne LLC</a>. All Rights Reserved.</p>
            </div>
        </div>
        <!-- Footer Copyright End -->
    </div>
</div>
</template>

<script setup>
import footerData from '~/data/footer.json'

const translate = (str) => {
    return useNuxtApp().$i18n.t(str)
}
</script>
