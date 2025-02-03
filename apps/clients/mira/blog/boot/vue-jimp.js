// import { boot } from 'quasar/wrappers'
import jimp from 'jimp'

/*
export default boot(({ app }) => {
  app.component('vue-cropper', VueCropper)
})
*/

export default ({ app }) => {
  app.use(jimp)
}
