import { ref } from 'vue'
import { supabase } from '../../shared/supabase'

// Format date helper function
export const formatDate = dateString => {
  if (!dateString) return ''
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

let user = null
let session = null

const fetchCurrentUser = async () => {
  console.log('Fetching user...')
  if (user) {
    console.log("User already fetched")
    return user
  }
  const {
    data: { user: fetchedUser },
    error
  } = await supabase.auth.getUser()
  if (error) {
    console.error('Error fetching user:', error)
    return null
  }
  user = fetchedUser
  console.log('Returning user...')
  return user
}

fetchCurrentUser()

export const useSupabaseAPI = () => {
  const posts = ref([])
  const loading = ref(false)
  const commentsLoading = ref(false)
  const error = ref(null)

  const likePost = async postId => {
    try {
      const { data: post } = await supabase
        .from('blog_posts')
        .select('likes')
        .eq('id', postId)
        .single()

      const currentLikes = post?.likes || 0

      const { data, error: updateError } = await supabase
        .from('blog_posts')
        .update({ likes: currentLikes + 1 })
        .eq('id', postId)
        .select('likes')
        .single()

      if (updateError) throw updateError

      const postIndex = posts.value.findIndex(p => p.id === postId)
      if (postIndex !== -1) {
        posts.value[postIndex] = {
          ...posts.value[postIndex],
          likes: data.likes
        }
      }
      return data
    } catch (err) {
      console.error('Error liking post:', err)
      error.value = err.message
    }
  }

  const getPost = async postId => {
    try {
      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single()

      if (fetchError) throw fetchError
      return data
    } catch (err) {
      console.error('Error fetching post:', err)
      error.value = err.message
      return null
    }
  }

  const deletePost = async (postId) => {
    console.log("Deleting post for iD: ", postId);

    const post = await getPost(postId);
    if (!post) return;

    const imageUrl = post.image_url;

    console.log("Checking if other posts use the same image");

    // Check if other posts use the same image
    const { data: otherPosts, error: fetchError } = await supabase
      .from('blog_posts')
      .select('image_url')
      .eq('image_url', imageUrl)
      .neq('id', postId);

    if (fetchError) {
      console.error('Error checking image usage:', fetchError);
      return;
    }

    console.log("Number of other posts using the same image: ", otherPosts.length);

    // If no other posts use the image, delete it
    if (otherPosts.length === 0 && imageUrl) {
      console.log("No other posts use the same image so deleting it...");
      const { error: deleteImageError } = await supabase.storage
        .from('images/public')
        .remove([imageUrl]);
      if (deleteImageError) {
        console.error('Error deleting image:', deleteImageError);
      }
    }

    // console.log("Deleting the post from the database...");
    // Delete the post from the database
    const { error: deletePostError } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', postId);

    if (deletePostError) {
      console.error('Error deleting post:', deletePostError);
      return;
    }
    // console.log("Deleting the post from the store...");
    // Remove the post from the store
    posts.value = posts.value.filter(p => p.id !== postId);
  };

  const createPost = async (
    title,
    content,
    imageUrl,
    styles,
    category,
    author,
    linkedPostID,
    language,
    translationAvailable,
    translatedLanguage
  ) => {
    console.log('Creating post with title: ' + title)
    console.log('content ' + content)
    console.log('category ' + category)
    console.log('author ' + author)
    console.log('language ' + language)
    console.log('linkedPostID :' + linkedPostID)
    console.log('translationAvailable ' + translationAvailable)
    console.log('translatedLanguage ' + translatedLanguage)
    try {
      const { data, error: createError } = await supabase
        .from('blog_posts')
        .insert([
          {
            title,
            content,
            image_url: imageUrl || '',
            styles,
            likes: 0,
            category,
            author,
            language,
            linked_post_id:linkedPostID,
            translation_available: translationAvailable ? true : false,
            translation_language: translatedLanguage ? translatedLanguage : 'japanese'
          }
        ])
        .select()
        .single() // select only the created post

      if (createError) throw createError
      posts.value.unshift(data) // Add the created post to the posts list
      return data
    } catch (err) {
      console.error('Error creating post:', err)
      error.value = err.message
      return null
    }
  }

  const getTranslatedPostId = async (postId) => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('linked_post_id')
        .eq('id', postId)
        .single()

      if (error) throw error
      return data.linked_post_id;
    } catch (err) {
      console.error('Error fetching translated post ID:', err)
      error.value = err.message
      return null
    }
  }

  const fetchPosts = async () => {
    try {
      loading.value = true
      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      posts.value = data
      return data
    } catch (err) {
      console.error('Error fetching posts:', err)
      error.value = err.message
      return null
    } finally {
      loading.value = false
    }
  }

  const updateLinkedPost = async (postId, linkedPostID, translation_language, translation_available) => {
    console.log('Updating linked post with postId: ' + postId )
    console.log('linkedPostID: ' + linkedPostID)
    console.log('translation_language: ' + translation_language)
    console.log('translation_available: ' + translation_available)

    if (!linkedPostID) {
      console.error('Error updating linked post. No post ID provided')
      error.value = err.message
      return null
    }
    try {
      const { data, error: updateError } = await supabase
        .from('blog_posts')
        .update({ linked_post_id: linkedPostID, translation_language, translation_available })
        .eq('id', postId)
        .select()
        .single()

      if (updateError) throw updateError
      
      const postIndex = posts.value.findIndex(p => p.id === postId)
      if (postIndex !== -1) {
        posts.value[postIndex] = data
      }
      console.log('Returning new post data')
      return data
    } catch (err) {
      console.error('Error updating linked post:', err)
      error.value = err.message
      return null
    }
  }

  const updatePost = async (postId, title, category, content) => {
    console.log('Updating post with title: ' + title)
    console.log('postId: ' + postId)
    console.log('category: ' + category)
    console.log('content: ' + content)

    try {
      const { data, error: updateError } = await supabase
        .from('blog_posts')
        .update({ title, category, content })
        .eq('id', postId)
        .select()
        .single()

      if (updateError) throw updateError
      
      const postIndex = posts.value.findIndex(p => p.id === postId)
      if (postIndex !== -1) {
        posts.value[postIndex] = data
      }
      return data
    } catch (err) {
      console.error('Error updating post:', err)
      error.value = err.message
      return null
    }
  }

  const publishTranslatedPost = async (originalPostId, content, language) => {
    try {
      const { data, error: publishError } = await supabase
        .from('blog_posts')
        .insert([
          {
            title: `Translated Post of ${originalPostId}`,
            content,
            linked_post_id: originalPostId,
            translation_language: language,
            translation_available: true
          }
        ])
        .select()
        .single()

      if (publishError) throw publishError
      return data
    } catch (err) {
      console.error('Error publishing translated post:', err)
      error.value = err.message
      return null
    }
  }

  const uploadReplaceImage = async file => {
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .update(`${file.name}`, file, {
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) {
      error.value = uploadError.message
    }
    return data.path // Return the image path
  }

  const uploadImage = async (file, ignoreDuplicate = true) => {
    const { data, error } = await supabase.storage
      .from('images/public')
      .upload(file.name, file)

    if (error) {
      console.error('Error uploading image:', error)
      /* if (error.code === 'storage/quota_exceeded') {
        error.value = 'You have reached your storage limit'
      }
      else   
      */
     if (error.error === 'Duplicate') { // error statusCode 409
      console.log('Duplicate image - will use existing: ' + ignoreDuplicate)
       if (ignoreDuplicate)
         return file.name
       else
         error.value = 'Image already exists'
     }
      return null
    }
    return data.path // Return the image path
  }

  const downloadImage = async imagePath => {
    try {
      const { data, error: downloadError } = await supabase.storage
        .from('images/public/')
        .download(imagePath)
      if (downloadError) throw downloadError
      return URL.createObjectURL(data)
    } catch (err) {
      console.error('Error downloading image:', err)
      console.log('Problem with image path:', imagePath)
      error.value = err.message
      return null
    }
  }

  const updateUserProfile = async updates => {
    if (!typeof updates === 'object') {
      error.value = 'Pass an Update object to update the profile'
      return
    }

    if (!updates.id) {
      error.value = 'Pass a user ID to update the profile'
      return
    }
    try {
      loading.value = true
      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
    } catch (error) {
      error.value = error.message
    } finally {
      loading.value = false
    }
  }

  const addComment = async (postId, content, username) => {
    // console.log("addComment: " + JSON.stringify(content))
    console.log("addComment content: " + content)
    console.log("addComment username: " + username)

    const guestUserID = import.meta.env.VITE_GUEST_USER_ID
    console.log("guestUserID: " + guestUserID)
    if (!postId) {
      throw "No postId provided"
    }
    if (!content) {
      throw "No content provided"
    }
 
    let userID = guestUserID
    let isApproved = false

    if (user) {
      userID = user.id
      isApproved = true
    }

    // TODO: Do other checking here?
    try {
      const { data, error: commentError } = await supabase
        .from('comments')
        .insert([
          {
            post_id: postId,
            user_id: userID,
            content,
            username,
            approved:isApproved
          }
        ])
        .select()
        .single()
      if (commentError) throw commentError
      return data
    } catch (err) {
      console.error('Error adding comment:', err)
      error.value = err.message
      return null
    }
  }

  const getComments = async postId => {
    try {
      commentsLoading.value = true
      const { data, error: fetchError } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('approved', true)
        .order('created_at', { ascending: true })

      if (fetchError) throw fetchError
      return data
    } catch (err) {
      console.error('Error fetching comments:', err)
      error.value = err.message
      return []
    } finally {
      commentsLoading.value = false
    }
  }

  const downloadUserAvatar = async (filename) => {
    try {
        const { data, error } = await supabase.storage
            .from('avatars')
            .download(filename)
        if (error) throw error
        return URL.createObjectURL(data)
    } catch (error) {
        console.error('Error downloading avatar: ', error.message)
        return null
    }
  }

  const getSignedInUserProfile = async () => {

    if (!user) {
      console.log('getSignedInUserProfile no user...')

      const tempUser = await fetchCurrentUser()
      if (!tempUser || !tempUser.id) {
        return null
      }
      user = tempUser
    }
    let { data, error } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
    if (error) {
      error.value = error.message
      return null
    }
    return data
  }

  async function signOut () {
    try {
      loading.value = true
      let { error } = await supabase.auth.signOut()
      return true
      if (error) throw error
    } catch (error) {
      error.value = error.message
      return false
    } finally {
      loading.value = false
    }
  }

  const signInWithEmailAndPassword = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      // alert(error.message);
      console.error('Error signing in: ', error.message)
      return false
    } else {
      // alert('Sign in successful!');
      return true
    }
  };

  return {
    posts,
    loading,
    commentsLoading,
    error,
    user,
    updateLinkedPost,
    signInWithEmailAndPassword,
    uploadImage,
    uploadReplaceImage,
    downloadImage,
    fetchPosts,
    getPost,
    createPost,
    updatePost,
    publishTranslatedPost,
    getTranslatedPostId, // Expose the new function
    addComment,
    getComments,
    likePost,
    signOut,
    formatDate,
    getSignedInUserProfile,
    isUserSignedIn: () => user !== null,
    getSignedInUser: () => user,
    downloadUserAvatar,
    updateUserProfile,
    deletePost // Export the deletePost function
  }
}
