import { useQuasar, openURL } from 'quasar'
import { computed } from 'vue'

export default function useDetectPlatform () {
  const $q = useQuasar()

  /*
  function mobilePlatform () {
    if ($q.platform.is.mobile) return true
  }

  function androidPlatform () {
    if ($q.platform.is.android) return true
  }

  function iosPlatform () {
    if ($q.platform.is.ios) return true
  }

  function desktopPlatform () {
    if ($q.platform.is.desktop) return true
  }
  */

  const checkOpenURL = testUrl => {
    if (testUrl.startsWith('http://') || testUrl.startsWith('https://')) {
      // its OK as it is
    } else {
      testUrl = 'http://' + testUrl
    }
    // console.log('openURL: ' + testUrl)
    openURL(testUrl)
  }

  const isIOS = computed(() => {
    if ($q.platform.is.ios) return true
    else {
      return false
    }
  })

  const isDesktop = computed(() => {
    if ($q.platform.is.desktop) return true
    else {
      return false
    }
  })

  const isAndroid = computed(() => {
    return $q.platform.is.android
  })

  const isMobile = computed(() => {
    // return $q.platform.is.mobile
    if ($q.platform.is.mobile) return true
    else {
      return false
    }
  })

  const isNativeMobile = computed(() => {
    // return $q.platform.is.nativeMobile
    if ($q.platform.is.nativeMobile) return true
    else {
      return false
    }
  })

  const isCapacitor = computed(() => {
    // return $q.platform.is.capacitor
    if ($q.platform.is.capacitor) return true
    else {
      return false
    }
  })

  const isCordova = computed(() => {
    if ($q.platform.is.cordova) return true
    else {
      return false
    }
  })

  const isIphone = computed(() => {
    return $q.platform.is.iphone
  })

  return {
    isIOS,
    isAndroid,
    isCordova,
    isDesktop,
    isMobile,
    isNativeMobile,
    isCapacitor,
    isIphone,
    checkOpenURL
    /*
    iosPlatform,
    mobilePlatform,
    androidPlatform,
    desktopPlatform
    */
  }
}
