
<!-- DON'T DELETE THIS COMMENT
This page can be opened by a route containing the ID of an existing post. If the ID is provided, a post matching the ID will be looked up in the postsStore and passed to the NewBlogPostComponent.

If a post ID is not provided the NewBlogPostComponent can be used to create a new post.
-->

<template>
  <div v-if="post">
    <NewBlogPostComponent :post="post"></NewBlogPostComponent>
</div>
<div v-else>
  <NewBlogPostComponent/>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePostsStore } from '../store/postsStore';
import NewBlogPostComponent from '../components/NewBlogPostComponent.vue';

const route = useRoute();
const post = ref();
const postsStore = usePostsStore();

async function getPostToEdit (postID) {
  // console.log("Editing post with ID: " + postID)
  const postToEdit = postsStore.posts.find(p => p.id === postID)
  if (postToEdit) {
    // console.log("Found the post to edit:", JSON.stringify(postToEdit))
    postToEdit.image = await postsStore.getImageForPost(postToEdit)
    if( !postToEdit.language) {
      postToEdit.language = "English"
    }
    // console.log("Retrieved image: " + postToEdit.image)
    post.value = {...postToEdit} // Create a new object to ensure reactivity
  }
}

onMounted( async() => {
  const postId = route.params.id; // Assuming the post ID is passed as a route parameter
  console.log('NewBlogPostPage mounted with postId:', postId);
  if (postId) {
    await getPostToEdit(postId)
  }
})
</script>

<style scoped>
</style>
