<template>
  <q-page class="blog-page">
    <div class="blog-grid">
      <template v-for="(post, index) in paginatedPosts" :key="post.id">
        <BlogPost
          :post="post"
          :is-hero="index === 0"
          :class="{ 'hero-image': index === 0 }"
          :showEditButtons="false"
          @view-post="viewPost"
        />
      </template>
    </div>
    <div class="q-pa-lg flex flex-center">
    <q-pagination
      v-model="currentPage"
      :max="maxPage"
      @update:model-value="onPageChange"
      class="q-mt-md"
    />
  </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePostsStore } from '../store/postsStore';
import BlogPost from '../components/BlogPost.vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const postsStore = usePostsStore();

const posts = computed(() => postsStore.posts); // Define computed property for posts
const postsPerPage = 7; // Number of posts per page
const currentPage = ref(1); // Current page state

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  return posts.value.slice(start, start + postsPerPage);
});

const maxPage = computed(() => Math.ceil(posts.value.length / postsPerPage));

onMounted(async () => {
  console.log("BlogPage mounted")
  await postsStore.loadPosts();
  console.log("loadPosts done")
});

function onPageChange(newPage) {
  currentPage.value = newPage;
}

async function deletePost (postID) {
  // console.log("Deleting post with ID: " + postID)
  const result = confirm("Are you sure you want to delete this post?");
  if (result) {
    await postsStore.deletePost(postID); // Ensure the deletion is awaited
  }
}

/* check if the post exists */
async function editPost (postID) {
  // console.log("Editing post with ID: " + postID)
  const postToEdit = postsStore.posts.find(p => p.id === postID)
  if (postToEdit) {
    // console.log("Pushing to edit-post with id: " + postID)
    router.push({ name: 'edit-post', params: { id: postID} })
  }
}

/* check if the post exists */
async function viewPost (postID) {
  console.log("Viewing post with ID: " + postID)
  const postToEdit = postsStore.posts.find(p => p.id === postID)
  if (postToEdit) {
    // console.log("Pushing to edit-post with id: " + postID)
    router.push({ name: 'view-post', params: { id: postID} })
  }
}

</script>

<style scoped>
.blog-page {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

/* Make the hero post span full width */
.blog-grid > :first-child {
  grid-column: 1 / -1;
  max-width: none;
}

/*
.hero-image {
  height: 540px;
}
  */

@media (max-width: 600px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1200px) {
  .blog-page {
    margin-left: 24px;
    margin-right: 24px;
  }
}
</style>
