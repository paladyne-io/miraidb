<template>
  <q-page class="flex">
    <q-img ref='image' src="/images/virtag_launch_promo_banner.png" />
    <div class="q-ma-md">
      <div class="row q-ma-md">
        For a limited time we are offering a 50% discount on the purchase of Virtag apps for
        Android and IOS and, <b> <i> for the first 20 purchasers </i></b>, a free NFC card and 10 NFC tags delivered anywhere in the world.
      </div>

      <q-btn rounded color="green" label="Test"></q-btn>

      <div class="row text-bold">
        <div class="col q-ma-md">
          <div class="q-pb-sm">
            Virtag NFC for iPhone
          </div>
          <q-btn width="150px" dense flat no-caps href="https://apps.apple.com/jp/app/virtag-nfc/id1632357617"
            target="_blank">
            <q-img style="width:150px;" src="/icons/appstore-download.png" />
          </q-btn>
        </div>

        <div class="col q-ma-md">
          <div class="q-pb-sm">
            Virtag NFC for Android
          </div>
          <q-btn dense flat no-caps href="https://play.google.com/store/apps/details?id=jp.co.paladyne.virtag.app"
            target="_blank">
            <q-img style="width:150px;" src="/icons/google-play-badge.png" />
          </q-btn>
        </div>

        <div class="row q-ma-md">
          After purchasing please email virtag@paladyne.co with your address and preferred type of NFC card (White, Wooden
          or Carbon-fiber). You can see examples on our web store. <a href="https://virtag.theshop.jp"> Virtag store</a>
        </div>

        <div class="full-width text-weight-light text-left">
          * An NFC-enabled phone is required
        </div>
       <!--
        <div class="q-my-md text-center full-width">
          <q-btn no-caps size="lg" to="/" :label="$t('home')" color="green" />
        </div>
        <div class="full-width text-caption text-weight-light text-left">
          {{ $t('app_store_legal_notice') }} {{ $t('play_store_legal_notice') }}
        </div>
      -->
      </div>

    </div>
  </q-page>
</template>

<script setup>
definePageMeta({
  layout: 'quasarlayout'
})
import { useQuasar } from 'quasar'
// import { QBtn } from 'quasar';
const $q = useQuasar()
// const isCapacitor = $q.platform.is.capacitor
const isDark = $q.dark.isActive
console.log("Dark mode: " + isDark)



</script>
