<template>
  <q-card class="dashboard-page">
  <div class="full-width">
    <div class="row dashboard-header">
      <div class="col-9 text-left">
        Admin Dashboard
      </div>
    <div class="col-3">
    <q-btn @click="fetchPosts" label="Refresh" color="primary" />
    </div>
  </div>
<!--
  <div class="q-pa-lg">
    <RagTool></RagTool>
  </div>
-->
  <div class="q-pa-lg">
    <q-table
      :rows="posts"
      :columns="columns"
      row-key="id"
      @request="fetchPosts"
      @delete-post="deletePost"
      @edit-post="editPost"
    >
    <!--
      <template v-slot:top>
        <q-btn @click="fetchAssistants" label="Refresh" color="primary" />
      </template>
    -->
    </q-table>
  </div>
    <div class="blog-grid q-pa-lg">
      <template v-for="(post, index) in paginatedPosts" :key="post.id">
        <BlogPost
          :post="post"
          :showEditButtons="true"
          @view-post="viewPost"
          @delete-post="deletePost"
          @edit-post="editPost"
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

</div>
</q-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
// import { useSupabaseAPI } from '../composables/useSupabase';
import { usePostsStore } from '../store/postsStore';
import BlogPost from '../components/BlogPost.vue';

// import RagTool from '../components/RagToolComponent.vue';

import { useRoute, useRouter } from 'vue-router';
// const route = useRoute();
const router = useRouter();

// const { posts, loading, error, fetchPosts } = useSupabaseAPI();
const postsStore = usePostsStore();

const postsPerPage = 6; // Number of posts per page
const currentPage = ref(1); // Current page state

const posts = computed(() => {if (postsStore.posts) return postsStore.posts; return []; }); // Define computed property for posts 

const maxPage = computed(() => { if (posts.value) return Math.ceil(posts.value.length / postsPerPage); return 0; });

const assistants = ref([]); // Use ref to make it reactive

const columns = [
// , format: val =>  val (val) }

  { name: 'title', label: 'Title', align: 'left', field: 'title' },
  { name: 'content', label: 'Content', align: 'left', field: 'content',
    format: val =>  truncatedContent(val) },
  { name: 'language', label: 'Language', align: 'left', field: 'language' },
  { name: 'Linked', label: 'Linked', align: 'left', field: 'linked_post_id'},
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' },
  { name: 'id', label: 'ID', align: 'left', field: 'id' }
];

async function fetchPosts() {
  console.log("load posts..")
  postsStore.loadPosts();
}

onMounted( () => {
  console.log("AdminDashboardPage mounted")
   fetchPosts()
});

function onPageChange(newPage) {
  currentPage.value = newPage;
}

const truncatedContent = (content) => {
  if (!content) return '';
  return content.length > 25
    ? content.substring(0, 25) + '...'
    : content;
}

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  if (posts.value) {
    return posts.value.slice(start, start + postsPerPage);
  }
});

function deletePost (postID) {
  console.log("Deleting post with ID: " + postID);
  const result = confirm("Are you sure you want to delete this post?");
  if (result) {
    postsStore.deletePost(postID);
  }
}

/*
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

/* check if the post exists */
async function editPost (postID) {
  console.log("Editing post with ID: " + postID)
  const postToEdit = postsStore.posts.find(p => p.id === postID)
  // console.log("Editing post: " +  JSON.stringify(postToEdit))

  if (postToEdit) {
    console.log("Admin Pushing to dashboard-edit-post with id: " + postID)
    router.push({ name: 'admin-edit-post', params: { id: postID} })
  }
}

/* check if the post exists */
async function viewPost (postID) {
  console.log("Viewing post with ID: " + postID)
  const postToEdit = postsStore.posts.find(p => p.id === postID)
  if (postToEdit) {
    console.log("Pushing to admin-view-post with id: " + postID)
    router.push({ name: 'admin-view-post', params: { id: postID} })
  }
}

</script>

<style scoped>
.dashboard-header {
  font-size: 28px; /* Adjusted font size */
  color: white; /* Change text color for better contrast */
  background-color: #41439d; /* Dark grey background */
  padding: 16px 0px 16px 40px;
  text-align: center;

}
.dashboard-page {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

</style>