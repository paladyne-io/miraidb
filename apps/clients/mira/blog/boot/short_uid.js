import { boot } from 'quasar/wrappers'
import ShortUniqueId from 'short-unique-id'

export default boot(({ app }) => {
  // app.use(ShortUniqueId)

  const generateUID = () => {
    const { randomUUID } = new ShortUniqueId({ length: 10 })
    return randomUUID
  }

  app.config.globalProperties.$generateUID = generateUID
})
