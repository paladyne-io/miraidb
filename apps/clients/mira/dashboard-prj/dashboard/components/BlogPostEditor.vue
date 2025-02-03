<!-- DON'T DELETE THIS COMMENT
This component displays a form to the user for entering or editing a blog post. It can be used to create a new post or to edit an existing one.

The main functions of this component are:

translatePost(). Translate the Title, Category and Content using an AI translation service provided by an external API.

Returned translations are stored in translatedPost. The user can switch between the original and translated versions of the post.

The user can then edit the translated post and click the 'Save' button to update the post in the Supabase database.

Or the user can click the 'Publish' button to publish the post in the Supabase database and add it to the list of posts. The  new post will be linked to the post being edited if it exists.

TODO: Modify the translation request to translate the post to the selected 'translation to' language.

TODO: Provide an Admin dashboard with 'global' customization options, e.g. Preferred language, default image, custom categories, company logo, etc.

TODO: When the user selects a language, the post is translated to that language and the translated post is stored in translatedPost.
-->

<template>
  <q-card flat class="post-form">
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-6">
          <q-input
            outlined
            hide-bottom-space
            borderless
            v-model="editableTitle"
            label="Title"
            :rules="[val => !!val || 'Title is required', val => val.length <= 200 || 'Title must be 200 characters or less']"
            class="post-input q-mb-lg"
            @input="emitPostUpdate"
          >
            <template v-slot:append>
              <div
                v-if="translatedPost.title"
                class="all-pointer-events translation-badge"
              >
                <div class="col ">
                  <q-badge
                    @click="toggleView"
                    :label="isViewingTranslated ? 'Original' : 'Translated'"
                    class="col q-my-md text-subtitle2"
                    size="lg"
                  />
                </div>
              </div>
            </template>
          </q-input>
        </div>
        <div class="col-6">
          <q-select
            outlined
            hide-bottom-space
            v-model="changeableCategory"
            :options="isViewingTranslated ? categoriesJapanese: categories "
            label="Category"
            :rules="[val => !!val || 'Category is required']"
            class="post-input q-mb-md"
            @input="emitPostUpdate"
          />
        </div>
        <div class="col-6">
          <q-select
            outlined
            hide-bottom-space
            borderless
            v-model="newPost.language"
            :options="languages"
            label="Language"
            :rules="[val => !!val || 'Language is required']"
            class="post-input q-mb-md"
            @update:model-value="emitPostUpdate"
          />
        </div>
        <div class="col-6">
          <q-select
            outlined
            hide-bottom-space
            borderless
            v-model="newPost.translation_language"
            :options="languages"
            label="Translate to"
            :rules="[val => !!val || 'Language is required']"
            class="post-input q-mb-md"
            @update:model-value="emitPostUpdate"
          />
        </div>
        <div class="col-12">
          <q-input
            outlined
            hide-bottom-space
            v-model="editableContent"
            label="Content"
            type="textarea"
            rows="6"
            :rules="[val => !!val || 'Content is required', val => val.length <= 10000 || 'Content must be 10,000 characters or less']"
            class="post-input q-mb-md"
            bottom-slots
            counter
            label-slot
            maxlength="10000"
            @input="emitPostUpdate"
          >
            <template v-slot:hint>
              <span
              v-if="translatedPost.content"
              class="all-pointer-events"
            >
              <q-badge
                @click="toggleView"
                :label="isViewingTranslated ? 'Original' : 'Translated'"
                class="text-subtitle2"
              />
            </span>
              <span class="q-ml-lg text-center">
                <span :class="{ 'text-blue': wordCount < 1000, 'text-red': wordCount >= 1000 }">
                  {{ wordCount }} / 1000 words
                </span>
              </span>
            </template>
          </q-input>
        </div>
        <div class="col-12">
          <q-card-section class="q-pa-none">
            <div class="row q-col-gutter-md items-center">
              <div class="col-12 col-sm-8">
              <div class="col-12">
                <q-file
                  outlined
                  v-model="selectedFile"
                  :label="imagePreview? 'Replace Image': 'Add Header Image'"
                  accept="image/*"
                  @update:model-value="handleFileSelected"
                  class="post-input"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
          
              </div>
              <div class="col-12" v-if="imageFileName">
                Image name: {{ imageFileName }}
              </div>

              <div class="col-12">
                <q-radio
                  v-model="imageHandling"
                  val="use-existing"
                  label="Use existing file"
                />
                <q-radio
                  v-model="imageHandling"
                  val="replace"
                  label="Replace file"
                  class="q-ml-md"
                />
              </div>
            </div>
        
            <div class="col-12 col-sm-4">
            <div class="col-12 image-container" v-if="imagePreview">
              <q-img
                :src="imagePreview"
                fit="contain"
                style="width: 100%; height:240px; object-fit: cover; border-radius: 8px;"
              />
            </div>
            </div>
          </div>
          </q-card-section>
        </div>
        <div
        v-if="waitingForResponse"
        class="loading-overlay"
      >
        <div class="loading-animation">
          <q-spinner color="primary" />
          <p>Translating...</p>
          <q-btn
            @click="cancelTranslation"
            label="Cancel"
            color="negative"
          />
        </div>
      </div>
      </div>

      <div class="row justify-end items-center q-mt-lg">
        <div class="posting-as row items-end">

          <q-btn
          @click="translatePost"
          label="Translate"
          :disabled="!newPost.content || translationsReceived || isTranslating"
          color="green"
          class="q-mr-md"
        />
          <div
            v-if="errorMessage"
            class="q-mr-md text-negative"
          >
            {{ errorMessage }}
          </div>

        <PostingAsComponent/>
        </div>
      </div>
    </q-card-section>

  </q-card>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch, computed } from 'vue';
import { useSupabaseAPI } from '../composables/useSupabase.js'
import PostingAsComponent from './PostingAsComponent.vue';

const emit = defineEmits([,'postupdate','imageUpdate'])

// const { loading, error, getSignedInUserProfile } = useSupabaseAPI();

const props = defineProps({
  post: {
    type: Object
  },
  postImage: {
    type: [String, File]
  }
})

const dummyPost = ref({
  title: '',
  content: '',
  category: 'Innovation',
  language: 'English',
  translation_language: 'Japanese',
  translationAvailable: false
})

const translatedPost = ref({
  title: '',
  content: '',
  category: '',
  language: 'English',
  translation_language: 'Japanese',
  translationAvailable: true
})

const hostUrl = "https://virtag-ai.fly.dev/chat-gpt/translate" // Use localHost for translation service
const localHostUrl = "http://localhost:3000/chat-gpt/translate"

const host = document.location.hostname === 'localhost' ? localHostUrl : hostUrl
// const host = hostUrl

console.log("Using host: " + host)

const categoriesJapanese = [
  'イノベーション',
  '人工知能',
  'プロジェクトアップデート',
  '新規プロジェクト',
  'テクノロジー',
  '開発',
  'その他'
]

const categories = [
  'Innovation',
  'Artificial Intelligence',
  'Project Update',
  'New Project',
  'Technology',
  'Development',
  'Miscellaneous'
]

const languages = [
  'English',
  'Japanese',
  'French',
  //'German',
  //'Spanish',
]

/* An existing post is being edited */

const newPost = ref(props.post)
// console.log ("newPost: " +  JSON.stringify(newPost.value))

if (!newPost.value) {
  // console.log ("Set new post to dummy post")
  newPost.value = dummyPost.value
}

const isViewingTranslated = ref(false);

const emitPostUpdate = () => {
  emit('postupdate', isViewingTranslated.value ? translatedPost.value : newPost.value);
};

const imagePreview = ref();
const imageFileName = ref();

const waitingForResponse = ref(false)
const isTranslating = ref(false)
const translationAvailable = ref(false)
const imageHandling = ref('use-existing')
const translationsReceived = ref(false);
const wordCount = ref(0)
const userProfile = ref(null)
const errorMessage = ref('')
const selectedFile = ref()

const defaultAvatarImage = "../assets/virtag_icon_128x128.png"
const userAvatar = ref(defaultAvatarImage)
const username = ref('anon')

// userAvatar

onMounted( () => {
  console.log('BlogPostEditor mounted.');

})

onBeforeUnmount(() => {
  if (imagePreview.value) {
    URL.revokeObjectURL(imagePreview.value);
  }
});

// Watch for changes in content to update word count
watch(() => newPost.value.content, (newContent) => {
  wordCount.value = newContent.split(/\s+/).filter(word => word.length > 0).length; // Count words
  translationsReceived.value = false // reset the translation status
});

watch(() => props.postImage, (newImage) => {
  if (newImage) {
    if (newImage instanceof File) {
      imagePreview.value = URL.createObjectURL(newImage);
      imageFileName.value = newImage.name;
    } else {
      imagePreview.value = newImage;
    }
  } else {
    imagePreview.value = '';
  }
}, { immediate: true });

const handleFileSelected = (file) => {
  if (file && file.type.startsWith('image/')) {
    imageFileName.value = file.name;
    if (file instanceof File) { // If it's a file, create a URL from it
      imagePreview.value = URL.createObjectURL(file);
    } else {
      imagePreview.value = newImage;
    }
    console.log("emit imageUpdate: " + file.name)
    emit('imageUpdate', file, file.name)
  } else {
    selectedFile.value = null;
  }
};

const editableTitle = computed({
  get: () => isViewingTranslated.value ? translatedPost.value.title : newPost.value.title,
  set: (value) => {
    if (isViewingTranslated.value) {
      translatedPost.value.title = value;
    } else {
      newPost.value.title = value;
    }
    emitPostUpdate(); // Emit the updated post
  }
});

const editableContent = computed({
  get: () => isViewingTranslated.value ? translatedPost.value.content : newPost.value.content,

  set: (value) => {
    if (isViewingTranslated.value) {
      translatedPost.value.content = value;
    } else {
      newPost.value.content = value;
    }
    emitPostUpdate(); // Emit the updated post
  }
});

const changeableCategory = computed({
  get: () => {
    const category = isViewingTranslated.value ? translatedPost.value.category : newPost.value.category;
    if (!category) {
      return 'Miscellaneous'
    }
    return category;
  },
  set: (value) => {
    if (isViewingTranslated.value) {
      translatedPost.value.category = value;
    } else {
      newPost.value.category = value;
    }
    emitPostUpdate(); // Emit the updated post
  }
});

const translatePost = async () => {
  isTranslating.value = true;
  waitingForResponse.value = true;

  const postTitle = newPost.value.title
  const postContent = newPost.value.content
  const postCategory = newPost.value.category

  const translatedContent = await translateByAI(postContent);

  if (!translatedContent) {
    alert("Error translating the post. Check your internet connection and if the error persists, please contact the administrator.")

    isTranslating.value = false;
    waitingForResponse.value = false;
    return
  }

  const translatedTitle = await translateByAI(postTitle);

  const catIndex = categories.indexOf(newPost.value.category)
  const translatedCategory = categoriesJapanese[catIndex]

  translatedPost.value.title = translatedTitle;
  translatedPost.value.content = translatedContent;
  translatedPost.value.category = translatedCategory;

  // console.log("translatedCategory: " + translatedCategory)

  if (!errorMessage.value) {
    translationsReceived.value = true
    translationAvailable.value = true
    newPost.value.translation_available = true
    isViewingTranslated.value = true
  }
  waitingForResponse.value = false;
}

const translateByAI = async (message) => {
  errorMessage.value = "";

  if (!message || message.length === 0) {
    return;
  }

  const formattedMessage = message.replace(/"/g, '\\"').replace(/\n/g, '\\n');

  try {
    const response = await fetch(host, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        timeout: 10000,
        message: formattedMessage,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
    const translation = data.bot;

    return translation;
  } catch (error) {
    console.error('Fetch error:', error);
    errorMessage.value = 'Error: ' + error.message;
  }
};

const cancelTranslation = () => {
  waitingForResponse.value = false;
};

const toggleView = () => {
  isViewingTranslated.value = !isViewingTranslated.value;
};

</script>

<style scoped>
.translation-badge .q-field_append {
  align-self: flex-end;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-animation {
  text-align: center;
  font-size: 2.0rem;
}

.body--light .post-form {
  background: #f5f3f3;
}

.body--light .q-field {
  background: white;
}

.body--light a {
  color: #045aa1;
}

.body--dark .post-form {
  background: #1d1d1d;
}

.body--dark .q-field {
  background: #151414;
}

.body--dark .posting-as {
  color: #e0e0e0;
}

.body--dark a {
  color: #78b5e7;
}
</style>
