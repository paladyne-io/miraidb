import { QRCode } from '../assets/js/js-qrcode-es6.js'
// import { QRCode } from qrcodejs

export default ({ app }) => {
  app.component('QRCode', QRCode)
}

/* or if declared it in a .vue file
import qrcodejs from '../../path/to/MyUploader' // the file from above
export default {
  // ...
  components: {
    // ...
    MyUploader
  }
}
*/
