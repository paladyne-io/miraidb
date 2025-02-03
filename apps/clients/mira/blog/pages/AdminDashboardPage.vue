<template>
  <div class="full-width">
    <div class="row dashboard-header">
      <div class="col-9 text-left">
        Admin Dashboard
      </div>
    <div class="col-3">
    <q-btn @click="fetchPosts" label="Refresh" color="primary" />
    </div>
  </div>
  <div>
    <q-table
      :rows="posts"
      :columns="columns"
      row-key="id"
      @request="fetchPosts"
      style="width: 90%; margin: 10px auto;"
    >
    <!--
      <template v-slot:top>
        <q-btn @click="fetchAssistants" label="Refresh" color="primary" />
      </template>
    -->
    </q-table>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSupabaseAPI } from '../composables/useSupabase';

import { usePostsStore } from '../store/postsStore';
const postsStore = usePostsStore();
const { posts, loading, error, fetchPosts } = useSupabaseAPI();

/*
onMounted(() => {
  console.log("Fetch posts..")
  fetchPosts();
});
*/

onMounted(async () => {
  console.log("BlogPage mounted")
  await postsStore.loadPosts();
  console.log("loadPosts done")
});

const assistants = ref([]); // Use ref to make it reactive

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id' },
  { name: 'title', label: 'Name', align: 'left', field: 'name' },
  { name: 'content', label: 'Status', align: 'left', field: 'status', 
    format: val => (val ? 'Enabled' : 'Disabled') },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' }
];

</script>

<style scoped>
.dashboard-header {
  font-size: 28px; /* Adjusted font size */
  color: white; /* Change text color for better contrast */
  background-color: #41439d; /* Dark grey background */
  padding: 16px 0px 16px 40px;
  text-align: center;
  border-radius: 8px;
}
</style>