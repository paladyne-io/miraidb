import SupabaseFileUploader from '../assets/js/SupabaseFileUploader.js'

export default ({ app }) => {
  app.component('SupabaseFileUploader', SupabaseFileUploader)
}

/* or if declared it in a .vue file
import MyUploader from '../../path/to/MyUploader' // the file from above
export default {
  // ...
  components: {
    // ...
    MyUploader
  }
}
*/
