<template>
  <q-page class="blog-page q-pa-md">
    <div class="blog-grid">
      <template v-for="(post, index) in posts" :key="post.id">
        <BlogPost
          :post="post"
          :is-hero="index === 0"
          :showEditButtons="true"
    
        />
      </template>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { usePostsStore } from '../store/postsStore';
import BlogPost from '../components/BlogPost.vue';

const postsStore = usePostsStore();

const posts = computed(() => postsStore.posts); // Define computed property for posts

/*
function deletePost (postID) {
  console.log("Deleting post with ID: " + postID);
  const result = confirm("Are you sure you want to delete this post?");
  if (result) {
    postsStore.deletePost(postID);
  }
}

async function editPost (postID) {
  console.log("Editing post with ID: " + postID);
  const postToEdit = postsStore.posts.find(p => p.id === postID);
  if (postToEdit) {
    console.log("Found post to edit: " + postToEdit);
    const newPost = await postsStore.getPost(postID);
    if (newPost) {
      console.log("Found new post: " + newPost);
      postsStore.editPost(newPost);
    }
  }
}
  */

onMounted(async () => {
  await postsStore.loadPosts();
});
</script>

<style scoped>
.blog-page {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Make the hero post span full width */
.blog-grid > :first-child {
  grid-column: 1 / -1;
  max-width: none;
}

@media (max-width: 600px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}
</style>
