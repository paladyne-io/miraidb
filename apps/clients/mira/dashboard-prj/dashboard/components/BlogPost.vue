<template>
  <q-card class="my-card">
    <q-card-section
      no-padding
      :class="['top-section', { 'hero-post': isHero }]"
    >

      <q-img
        fit="contain"
        :src="postImage"
        class="header-img"
        @click="viewPost"
      >
        <div class="absolute-bottom text-h6 title">
         {{ post.title }}
        </div>
      </q-img>

    </q-card-section>

    <q-card-section>
      <div class="row items-center q-gutter-x-md">
        <div class="text-subtitle1">by {{ post.author || 'Anonymous' }}</div>
        <q-chip
          color="primary"
          text-color="white"
          size="sm"
        >
          {{ post.category || 'Uncategorized' }}
        </q-chip>
        <div class="row fmt-date text-subtitle2">{{ formattedDate }}</div>
        <span class="text-red-6">Admin page post</span>
    
        <div
          v-if="post.linked_post_id && post.translation_language && post.translation_language !== post.language"
          class="other-content-avail text-subtitle2"
        >
          This content is also available in {{ post.translation_language.charAt(0).toUpperCase() + post.translation_language.slice(1) }}
        </div>
      </div>

    </q-card-section>

    <q-card-section class="q-pt-none">
      {{ truncatedContent }}
    </q-card-section>

    <q-card-actions
      align="right"
      class="actions"
    >
      <q-btn
        v-if="showEditButtons"
        flat
        round
        color="orange"
        icon="edit"
        @click="editPost"
      />
      <q-btn
        v-if="showEditButtons"
        flat
        round
        color="red"
        icon="delete"
        @click="deletePost"
      />
      <q-btn
        flat
        color="primary"
        @click="viewPost"
        label="Read More"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { date } from 'quasar'
import { useSupabaseAPI } from '../composables/useSupabase.js';
import { usePostsStore } from '../store/postsStore.js';

const postsStore = usePostsStore();

const defaultImage = '/images/placeholders/esaias-tan-MKvjc2kar7Q-unsplash.jpg'
// const defaultImage = '/assets/placeholder_images/krzysztof-kowalik-KiH2-tdGQRY-unsplash.jpg'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  showEditButtons: {
    type: Boolean,
    default: false
  },
  isHero: {
    type: Boolean,
    default: false
  }
})

const postImage = ref(null); // Initialize as null

const emit = defineEmits(['edit-post', 'delete-post', 'view-post'])
// const { loading, error, downloadImage } = useSupabaseAPI();

const formattedDate = computed(() => {
  return date.formatDate(props.post.created_at, 'MMMM D, YYYY')
})

const truncatedContent = computed(() => {
  if (!props.post.content) return '';
  return props.post.content.length > 150
    ? props.post.content.substring(0, 150) + '...'
    : props.post.content;
})

const deletePost = () => {
  emit('delete-post', props.post.id)
}

const editPost = () => {
  emit('edit-post', props.post.id)
}

const viewPost = () => {
  emit('view-post', props.post.id)
}

onMounted(async () => {
  // console.log("Blogpost on Mounted Post: " + JSON.stringify(props.post));
  // console.log("getImageForPost is local_image: " + props.post.local_image);
  // console.log("props.post.image_url: " + props.post.image_ur);

  if (!props.post.image_url) {
    postImage.value = defaultImage
  }
  else {
    postImage.value = await postsStore.getImageForPost(props.post);
    // console.log("retrieved image: " + postImage.value);
  }
});
</script>

<style scoped>
.fmt-date {
  width: 100%;
}

.other-content-avail {
  width: 100%;
  color: rgb(45, 142, 226);
}

/*
.hero-post .header-img {
  height: 520px; // Allow hero post to have auto height
}
*/

.top-section {
  padding: 0;
  height: 250px;
  /* Ensure all top sections have the same height */
  overflow: hidden;
}

.top-section:not(.hero-post) .header-img {
  height: 240px;
  /* Ensure all top sections have the same height */
  overflow: hidden;
}

/* Allow hero post to have auto height */
.hero-post {
  height: auto;
}

.title {
  text-align: left;
  /* Center title text */
  white-space: nowrap;
  /* Prevent text wrapping */
  overflow: hidden;
  /* Hide overflow */
  text-overflow: ellipsis;
  /* Show ellipsis for overflowed text */
}

.my-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  /* Ensure card sections stack vertically */
}

.actions {
  margin-top: auto;
  /* Push actions to the bottom */
}

.css-fix {
  white-space: pre-wrap;
}
</style>
