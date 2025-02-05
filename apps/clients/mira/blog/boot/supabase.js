import { boot } from 'quasar/wrappers'
import { createClient } from '@supabase/supabase-js'
// import useAuthUser from 'src/composables/UseAuthUser'

// console.log('VITE_APP_NAME: ' + process.env.VITE_APP_NAME)

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY

// console.log('supabaseUrl: ' + supabaseUrl)

if (!supabaseUrl || !supabaseKey) {
  alert('Configuration error. Please contact the author.')
}

const supabaseClient = createClient(supabaseUrl, supabaseKey)
// console.log('Loaded supabase.')

export default boot(async ({ urlPath, app, store, router, redirect }) => {
  // export default boot(async ({ app, store, router, redirect }) => {
  supabaseClient.auth.onAuthStateChange(async (event, session) => {
    // console.log('Router: ' + router)
    // console.log('Event: ' + event)
    // console.log('session: ' + session) // is object
    // This is from the original app

    // This attempts to download the user`s profile.
    // const { user } = session
    if (event === 'SIGNED_IN') {
      // console.log('SIGNED_IN: ' + urlPath)
      // const { user } = session
      /*
      const {
        id,
        email,
        phone,
        user_metadata: userMetaData,
        app_metadata: { provider },
        updated_at: updatedAt
      } = user
      const { avatar_url: avatarUrl, full_name: fullName } =
        provider === 'google' ? userMetaData : { avatar_url: 'guest_avatar.png', full_name: '' }
      console.log('Retrieving and updating profile...')
      let resultQuery = await supabaseClient
        .from('profiles')
        .select()
        .eq('id', id)
      if (!resultQuery.error && !resultQuery.data) {
        console.log('Profile not found. Adding new profile...')
        resultQuery = await supabaseClient
          .from('profiles')
          .insert([
            {
              id,
              email,
              phone,
              avatar_url: avatarUrl,
              full_name: fullName,
              updated_at: updatedAt
            }
          ])
      }
      // const { error, data } = resultQuery
      // if (!error && data.length) store.dispatch('user/setProfile', data)
      // redirect({ path: '/' })
      // return
    } else if (event === 'SIGNED_OUT') {
      // redirect({ path: '/auth/login' })
      redirect({ path: '/' })
      return
      */
    }

    if (event === 'USER_UPDATE') {
      // store.dispatch('auth/showInfo', 'User password changed successfully')
      redirect({ path: '/' })
    } else if (event === 'PASSWORD_RECOVERY') {
      /*
      example from Supabase docs
      const newPassword = prompt('Please type a new password')
      const { data, error } = await supabase.auth.update({
        password: newPassword,
      })
      if (data) alert('Password updated successfully!')
      if (error) alert('There was an error updating your password.')
      */
      // better to send to the password reset page

      // const slug = router.slug
      // console.log('slug: ' + slug)
      // alert(slug.toString())
      // console.log('token...')

      if (router.currentRoute) {
        const fullPath = router.currentRoute.value.fullPath
        // console.log('Router Full path: ' + fullPath)
        // console.log('router Full path: ' + JSON.stringify(router.currentRoute._rawValue.fullPath))
        // console.log('router current route: ' + JSON.stringify(router.currentRoute))
        const accessToken = fullPath.split('&')[0] // extract the access token from the url. The first parameter of the url, separated by &, is the access token
        // console.log('accessToken: ' + accessToken)

        // console.log('router current queryString: ' + router.queryString) //empty
        // console.log('token q: ' + queryString.parse(router.asPath.split('#')[1]))

        router.push({
          pathname: 'reset-password',
          query: accessToken
        })
      }

      /*
        if (slug.startsWith('token')) {
          console.log('Got authentication access token: ' + slug)
          // const refreshTokenPlus = slug.split('&refresh_token=').pop()
          // const refreshToken = refreshTokenPlus.split('&token').shift()
          redirect({ path: 'reset-password?token=' + slug })
          return
        }
        */
      // redirect({ path: 'reset-password' })

      // console.log(
      //  'PASSWORD_RECOVERY event data (URL? or Token): ' + JSON.stringify(event)
      // )
    } else if (event === 'SIGNED_OUT') {
      // redirect({ path: '/auth/login' })
      // redirect({ path: 'login' })
      redirect({ path: 'welcome' })
    }
  })
  // return supabaseClient
})

export function useSupabase () {
  return { supabaseClient }
}

export async function getLoggedinUser () {
  console.log('get Authenticated User..')
  try {
    const {
      data: { user }
    } = await supabaseClient.auth.getUser()
    // console.log('user: ' + user)
    return user
  } catch (error) {
    console.log('Error: ' + error)
    throw error
  }
}
