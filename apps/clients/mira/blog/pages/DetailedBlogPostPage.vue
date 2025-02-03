<template>
  <q-page class="detailed-blog-page q-pa-md">
    <div
      v-if="loading"
      class="text-center q-mt-xl"
    >
      <q-spinner-dots
        color="primary"
        size="40px"
      />
    </div>

    <div
      v-else-if="error"
      class="text-center text-negative q-mt-xl"
    >
      {{ error }}
    </div>

    <template v-else-if="post">
      <!-- Back Button -->
      <q-btn
        flat
        color="primary"
        icon="arrow_back"
        label="Back to Blog"
        to="/blog"
        class="q-mb-md"
      />

      <div class="post-container">

        <!-- Main Post Content -->
        <div class="post-header q-mb-xl hero-header">
          <div class="row justify-between q-mt-md">

            <div class="col-8">
              <h1 class="text-h3">{{ post.title }}</h1>

              <div class="row post-meta q-gutter-x-md">
                <span class="text-grey-7">{{ formatDate(post.created_at) }}</span>
                <span class="text-primary">{{ post.category || 'Uncategorized' }}</span>
                <span class="text-grey-8">by {{ post.author || 'Anonymous' }}</span>
              </div>
            </div>
            <!-- Translation Available Button -->
            <div
              class="col-4 self-end"
              v-if="post.translation_available && post.linked_post_id"
            >
            <!--
               TODO:Change the labe based on the translation_language of the post
                :label="`View (Japanese) Version`"
             -->
              <div class="text-right">
                linked_post_id{{ post.linked_post_id }}
                <q-btn
                  color="secondary"
                  :label="`View Japanese Version`"
                  @click="loadPost(post.linked_post_id)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Add click event to load post -->
        <q-img
          fit="contain"
          :src="postImage"
    
          class="post-image q-mb-lg"
          @click="openPost(post.id)"
        />

        <div class="post-content q-mb-xl">
          <p class="text-body1 css-fix">{{ post.content }}</p>
        </div>

        <!-- Interaction Section -->
        <div class="interaction-section q-mb-xl">
          <div class="row justify-between q-gutter-md">
            <div
              class="like-section row items-center cursor-pointer"
              @click="handleLike"
            >
              <q-icon
                name="favorite"
                :color="post.liked ? 'red' : 'grey'"
                size="24px"
              />
              <span class="q-ml-sm text-body1">{{ post.likes || 0 }}</span>
            </div>
            <q-btn
              unelevated
              color="orange-8"
              icon="comment"
              :label="`Comments (${comments.length})`"
              @click="showComments = !showComments"
            />
          </div>
        </div>

        <!-- Comments Section -->
        <div
          v-if="showComments"
          class="comments-section q-mt-lg"
        >
          <h2 class="text-h5 q-mb-md">Comments</h2>
          <div
            v-if="commentsLoading"
            class="text-center"
          >
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
          <div
            v-else
            class="text-subtitle1"
          >
            <q-list>
              <q-item
                v-for="comment in comments"
                :key="comment.id"
              >
                <q-item-section>

                  <q-item-label v-if="comment.approved">{{ comment.username }} : {{ comment.content }}</q-item-label>
                  <q-item-label
                    v-else
                    class="text-negative text-italic"
                  >{{ comment.username }} : Comment awaiting approval</q-item-label>
                  <q-item-label caption>
                    {{ formatDate(comment.created_at) }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <NewCommentComponent
              :post="post"
              @commentAdded="commentAdded"
            />
          </div>
        </div>
      </div>

      <!-- Related Posts -->
      <div
        class="related-posts q-mt-xl"
        v-if="relatedPosts.length > 0"
      >
        <h2 class="text-h5 q-mb-lg">Related Posts</h2>
        <div class="row q-col-gutter-md">
          <div
            v-for="relatedPost in relatedPosts"
            :key="relatedPost.id"
            class="col-12 col-md-4 col-sm-6"
          >
            <BlogPost
              :post="relatedPost"
              @view-post="openPost"
            />
          </div>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostsStore } from '../store/postsStore';
import { useSupabaseAPI } from '../composables/useSupabase';
import BlogPost from '../components/BlogPost.vue';
import NewCommentComponent from '../components/NewCommentComponent.vue';

const route = useRoute();
const router = useRouter();

const postsStore = usePostsStore();
const { user, formatDate, getComments, getTranslatedPostId, likePost, getPost } = useSupabaseAPI();

const post = ref(null);
const comments = ref([{}]);
const showComments = ref(false);
const postImage = ref(null);
const loading = ref(true);
const error = ref(null);
const commentsLoading = ref(true);

const relatedPosts = computed(() => {
  if (!post.value || !postsStore.posts) return [];

  return postsStore.posts
    .filter(p => {
      if (p.id === post.value.id) return false;
      return (
        p.category === post.value.category ||
        p.author === post.value.author
      );
    })
    .slice(0, 3);
});

const loadComments = async (postId) => {
  commentsLoading.value = true;
  comments.value = await getComments(postId);
  commentsLoading.value = false;
};

function commentAdded(newComment) {
  // console.log("commentAdded: " + JSON.stringify (newComment) )
  if (newComment) {
    if (!comments.value || comments.value.length === 0) {
      comments.value.unshift(newComment);
    } else {
      comments.value.push(newComment);
    }
  }
  // postsStore.getPostComments(post.value.id)
}

const handleLike = async () => {
  if (!post.value || post.value.liked) return;
  await likePost(post.value.id);
  post.value.liked = true;
  post.value.likes = (post.value.likes || 0) + 1;
};

/* its on the same page so we don't want to change the route  */
const viewPost = async (postId) => {
  console.log("Viewing post for ID: " + postId)
  const navigationResult = await router.push(postId)
  //const navigationResult = await router.push({ name: 'view-post', params: { id: postId } })

  if (navigationResult) {
    console.log("Navigation prevented: " + navigationResult)
  } else {
    // navigation succeeded (this includes the case of a redirection)
    console.log("Navigation succeeded.")
  }
}

/*
const viewPost = async (postId) => {
  console.log("Viewing post for ID: " + postId)
try {
  const navigationResult = await router.push({ name: 'view-post', params: { id: postId } }).catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // show a small notification to the user
    console.log("VisNavigationFailure: " + failure)
  }
  if (navigationResult) {
    console.log("Navigation prevented: " + navigationResult)
} else {
  // navigation succeeded (this includes the case of a redirection)
  console.log("Navigation succeeded: ")
}
}).then(() => {
    console.log('Updated route', route)
    // process the updated route params
})
}catch (error) {
  console.log(" router.push eror: " + error)
}
}
*/

const openPost = async (postId) => {
  console.log("Opening post...")
  router.push({ name: 'view-post', params: { id: postId } })
};

const loadPost = async (postId) => {
  console.log("Detailed blog post (re)loaded");
  // const postId = route.params.id;
  post.value = postsStore.posts.find(p => p.id === postId);
  if (!post.value) {
    try {
      post.value = await getPost(postId);
    } catch (err) {
      error.value = 'Failed to load post';
    }
  }
  if (post.value) {
    await loadComments(post.value.id);
    
    postImage.value = await postsStore.getImageForPost(post.value);
  }
  loading.value = false;
};

/*
const viewJapaneseVersion = async (postId) => {
  console.log('view Japanese Version fpor post', route)
  // const translatedPostId = await getTranslatedPostId(postId);
  // if (translatedPostId) {
    loadPost(postId)
  / }
};
*/

/* This is necessary to load the post when the id changes */
watch(
    () => route.params.id,
    async (id) => {
        loadPost(id)
    },
);

/* This is necessary to load the post when the page first loads */
onMounted(async () => {
  loadPost(route.params.id);
})

</script>

<style scoped>
.css-fix {
  white-space: pre-wrap;
}

.detailed-blog-page {
  max-width: 1200px;
  margin: 0 auto;
}

.post-container {
  max-width: 800px;
  margin: 0 auto;
}

.post-image {
  border-radius: 8px;
}

/*
.hero-image {
  height: 340px;
}

.hero-header {
  height: 340px;
}
*/

.post-content {
  font-size: 1.2rem;
  line-height: 1.8;
}

.post-meta {
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
}

.comments-section {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 8px;
  padding: 2rem;
}

.new-comment-form {
  max-width: 600px;
}

.like-section {
  transition: all 0.2s ease;
}

.like-section:hover {
  transform: scale(1.1);
}

.interaction-section {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
}
</style>
