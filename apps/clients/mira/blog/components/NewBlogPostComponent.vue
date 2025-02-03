<!-- DON'T DELETE THIS COMMENT

This component provides two tabs, one for filling out the details of a blog past, including the title, category, language, and image. The other tab is for styling the blog post and previewing the result.

If a language is not provided it is assumed to be English.

If an existing post is passed as a prop the 'beingEdited' state will be set and the title, contents etc. of the post will be loaded for editing.

When a post is passed as a prop, the user can chose to update it (including replacing the image and after translating it) or publish it as a new post linked to the post passed as a prop. The user can also cancel the edit and return to the list of posts.

If a post ID is not provided the NewBlogPostComponent can be used to create a new post.

The main functions of this component are:

1) updatePost(). When the Save button is pressed, the existing post is updated.

2) publishNewPost(). The post is published (stored in the Supabase database) and added to the list of posts in postsStore.

If beingEdited is true:
- the created post should be linked to the post being edited by adding the id of the existing post to the created post (using linked_post_id). If it is translated, translation_language should be updated and translation_available is set to true

- After the post is published, if it was translated, 'translation_available', 'linked_post_id' and 'translation_language' of the post being edited should be updated with the ID and language of the newly published post.
-->

<template>
  <div class="q-pa-md">
    <div class="text-center q-mb-lg">
      <h2 class="text-h4 q-mx-lg q-mb-none gradient-title">Create and Stylize your new post</h2>
      <p class="text-subtitle1 text-grey-7 q-mt-sm">Share your thoughts with style</p>
      <div
        v-if="newPost"
        class="text-left q-mb-sm"
      >
      </div>Post ID: {{ newPost.id }}
    </div>

    <q-tabs
      v-model="activeTab"
      class="text-grey-8"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab
        name="details"
        icon="edit"
        label="Post Details"
      />
      <q-tab
        name="style"
        icon="style"
        label="Style & Preview"
      />
    </q-tabs>

    <q-tab-panels
      v-model="activeTab"
      keep-alive
      animated
      class="bg-transparent"
    >
      <!-- Post Details Tab -->
      <q-tab-panel name="details">
        <div v-if="post">
      
          <BlogPostEditor
            :post="post || newPost"
            :postImage="selectedFile"
            @imageUpdate="updateSelectedImage"
            @postupdate="updatePostData"
          ></BlogPostEditor>
        </div>
        <div v-else> 
          selectedFile {{ selectedFile }}
          <BlogPostEditor @imageUpdate="updateSelectedImage" @postupdate="updatePostData"></BlogPostEditor>
        </div>
      </q-tab-panel>

      <!-- Style & Preview Tab -->
      <q-tab-panel
        name="style"
        keep-alive
      >
        <CustomisationPanel
          :post="post || newPost"
          :postTitle="newPost.title"
          :postImage="selectedFile"
          @updateStyles="updateStyles"
        />
      </q-tab-panel>
    </q-tab-panels>

    <div class="row justify-between q-ma-md">
      <q-btn
        @click="handleCancel"
        :label="post ? 'Cancel' : 'Close'"
        color="negative"
        unelevated
      />
      <div class="row">
        <q-btn
          v-if="beingEdited"
          class="q-mr-md"
          @click="savePost"
          label="Save"
          color="primary"
          :loading="isSubmitting"
          unelevated
        />
        <q-btn
          @click="publishNewPost"
          :label="beingEdited ? 'Publish linked Post' : 'Publish Post'"
          color="secondary"
          :loading="isSubmitting"
          unelevated
        />
      </div>
      <div
        class="error-message"
        v-if="error"
      >
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useSupabaseAPI } from '../composables/useSupabase.js';
import CustomisationPanel from './CustomisationPanel.vue';
import BlogPostEditor from './BlogPostEditor.vue';
import { useRouter } from 'vue-router' // useRoute,
import { Loading } from 'quasar';

import { usePostsStore } from '../store/postsStore.js';
const postsStore = usePostsStore();

const router = useRouter()

const { user, loading, error, createPost, uploadReplaceImage, uploadImage, getSignedInUserProfile, getSignedInUser, isUserSignedIn, updateLinkedPost, updatePost } = useSupabaseAPI();

const props = defineProps({
  post: {
    type: Object
  }
})

// Reactive reference for the post, initialized with prop or null
const post = ref(props.post)
const activeTab = ref('details');

const newPost = ref({
  title: 'Test title',
  using_placeholder_image: true,
  content: 'Test contents',
  language: 'English',
  category: 'Project Update', // Default category
  translation_available: false, // New property for translation availability
});

const translatedPost = ref({
  title: '',
  content: '',
  category: '',
});

const userProfile = ref(null);
const username = ref('anon'); // Reactive reference for username
const beingEdited = ref(false)
const selectedFile = ref(null);

const imageHandling = ref('use-existing');

const customizationStyles = ref('');
const isSubmitting = ref(false);

onMounted(async () => {
  console.log("onMounted... " + newPost.value.title)

  if (props.post) {
    // console.log("Received post in NewBlogPost:", JSON.stringify(props.post))
    newPost.value = { ...props.post }
    translatedPost.value = { ...props.post }
    translatedPost.value.content = ''
    beingEdited.value = true

    const imageURL = props.post.image_url
    console.log("updatePostData image_url: " + imageURL)

    let image = props.post.image
    if (image) {
      console.log("Image was already set so set selectedFile to it")
      selectedFile.value = image; // ?
    }
    // Use postsStore.getImageForPost
    else {
      // console.log("No Image so try to load if image url provided")
      if (imageURL) {
        //image = await downloadImage(imageURL)
        image = await postsStore.getImageForPost(props.post)
        //console.log("Loading image from URL: " + imageURL)
        if (image) {
          // console.log("Image exists so set selectedFile")
          selectedFile.value = image;
        }
      }
    }
  }

  userProfile.value = await getSignedInUserProfile()
  if (userProfile.value) {
    username.value = userProfile.value.username
  }

});

watch(error, (newError) => {
  console.log("Error: " + newError)
  if (newError) {
    // alert(newError)
  }
})

function updatePostData(updatedPost) {
  newPost.value = updatedPost; // Update newPost with the emitted post data
 /*
  console.log("updatePostData title: " + updatedPost.title)
  console.log("updatePostData content: " + updatedPost.content)
  console.log("updatePostData category: " + updatedPost.category)
  console.log("updatePostData language: " + updatedPost.language)
  console.log("updatePostData translated language: " + updatedPost.translation_language)
  console.log("updatePostData content: " + updatedPost.content)
  */
}

const newImage = ref(null);
const newImageName = ref('');

function updateSelectedImage(file, filename) {

  console.log("updateSelectedImage file: " + file)
  console.log("updateSelectedImage filename: " + filename)

  newImage.value = file; // Update newPost with the emitted post data
  newImageName.value = filename; 
}

function updateStyles(config) {
  customizationStyles.value = config;
}

const savePost = async () => {
  console.log("Updating post with title: " + newPost.value.title);
  const result = await updatePost(newPost.value.id, newPost.value.title, newPost.value.category, newPost.value.content);
  if (!result) {
    alert("Error Saving the post. Check you are signed in with the same account that created the post.")
  } else {
    alert("The changes were saved successfully.")
  }
}

const resetFormAfterPosting = false

const resetForm = async () => {
  newPost.value = {
    title: '',
    content: '',
    category: 'Project Update', // Reset to default category
    translation_available: false, // Reset translation availability
  };

  translatedPost.value = {
    title: '',
    content: '',
    category: '',
  };

  customizationStyles.value = '';
  selectedFile.value = null;
  activeTab.value = 'details';
}

const uploadPostImage = (async () => {
  console.log("uploading  Image: " + newImageName.value);
  let imageUrl = null;
  console.log("uploading PostImage...");
  if (imageHandling.value === 'replace') {
    imageUrl = await uploadReplaceImage(newImage.value);
  } else {
    imageUrl = await uploadImage(newImage.value, true);
  }

  if (!imageUrl) {
    // throw new Error("Failed to upload image");
    console.log("Failed to upload image.")
    return null
  }
  newPost.value.image_url = imageUrl
  console.log("uploaded PostImage: " + imageUrl);
  return imageUrl
})

// New function to publish a new post
const publishNewPost = async () => {
  console.log("publishNewPost...");
  isSubmitting.value = true;

  // TODO: Check if the post is linked to another post and if so, update the existing post.

  if (!isUserSignedIn) {
    alert("You must be signed in to publish a post.")
    return
  }
  try {
  if (newImage.value) {
    await uploadPostImage()
  }

  let postToBePublished = newPost.value;
  let isTranslatedPost = false;
  let translationLanguage = '';
  let translationAvailable = false;
  let isLocalPlaceholderImage = true;

  let postImageUrl = postToBePublished.image_url;

  console.log("postImageUrl: " + postImageUrl)

  if (translatedPost.value.content) {
    console.log("Using translated post...")
    postToBePublished = translatedPost.value
    isTranslatedPost = true;
    translationLanguage = translatedPost.value.translation_language;
    translationAvailable = true
  }

  console.log("postToBePublished: " + JSON.stringify(postToBePublished))
  if (postImageUrl && postImageUrl.startsWith('/images')) {
    postImageUrl = null;
  }

  console.log("isLocalPlaceholderImage: " + isLocalPlaceholderImage)
  const postTitle = postToBePublished.title;
  const postContent = postToBePublished.content;
  const postCategory = postToBePublished.category;
  // const postImageUrl = isLocalPlaceholderImage ? null : postToBePublished.image_url
  const postAuthor = username.value;
  const linked_post_id = newPost.id;

  console.log("postContent: " + postContent)

  // let newPostCreated = false
  let linkedPostCreated = false

  const newPostData = await createPost(
    postTitle,
    postContent,
    postImageUrl,
    customizationStyles.value,
    postCategory,
    postAuthor,
    newPost.id,
    newPost.value.language,
    translationAvailable,
    translationLanguage
  );
  if (!newPostData) {
    alert("Error creating the post. Check your internet connection and if the error persists, please contact the administrator.")
    return
  }

  // If the post is being edited, update the linked post
  if (beingEdited.value) {
    const existingPostId = newPost.value.id;
    if (!existingPostId) {
      alert("Error updating the linked post. No post ID provided.")
      return
    }
    const linkedPost = await updateLinkedPost(existingPostId, newPostData.id,
      translationLanguage, translationAvailable);

    console.log("linkedPost: " + JSON.stringify(linkedPost))
    if (linkedPost) {
      console.log("linkedPostCreated! ")
      linkedPostCreated = true
    }

    console.log("linkedPostCreated: " + linkedPostCreated)
  }
  if (resetFormAfterPosting) {
    resetForm()
  }
  if (linkedPostCreated) {
    alert("Your new linked post was published.")
  }
  else {
    alert("Your new post was published.")
  }
} catch (err) {
    console.error('Error creating post:', err);
  } finally {
    isSubmitting.value = false;
  }
};

const handleCancel = () => {
  if (beingEdited.value) {
    const confirmClose = confirm("You have unsaved changes. Are you sure you want to cancel? Changes will be lost.");
    if (confirmClose) {
      router.push({ name: 'blog' });
    }
  }
};
</script>

<style scoped>
.gradient-title {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: bold;
}
</style>
