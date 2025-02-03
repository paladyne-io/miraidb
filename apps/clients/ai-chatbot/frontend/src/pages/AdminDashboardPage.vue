<template>
  <div class="full-width">
    <div class="row dashboard-header">
      <div class="col-9 text-left">
        Admin Dashboard
      </div>
    <div class="col-3">
    <q-btn @click="fetchAssistants" label="Refresh" color="primary" />
    </div>
  </div>
  <div>
    <q-table
      :rows="assistants"
      :columns="columns"
      row-key="id"
      @request="fetchAssistants"
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
import { supabase } from "../supabase"

/*
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
*/

const assistants = ref([]); // Use ref to make it reactive

const columns = [
  { name: 'id', label: 'ID', align: 'left', field: 'id' },
  { name: 'name', label: 'Name', align: 'left', field: 'name' },
  { name: 'status', label: 'Status', align: 'left', field: 'status', 
    format: val => (val ? 'Enabled' : 'Disabled') },
  { name: 'actions', label: 'Actions', align: 'center', field: 'actions' }
];

async function fetchAssistants() {
  const { data, error } = await supabase.from('assistants').select('*');
  if (error) {
    console.error('Error fetching assistants:', error);
  } else {
    console.log('Retrieved assistants', data);
    assistants.value = data; // Update the reactive variable
  }
}

async function toggleAssistant(id, currentStatus) {
  const { error } = await supabase
    .from('assistants')
    .update({ status: !currentStatus })
    .eq('id', id);
  if (error) {
    console.error('Error updating assistant status:', error);
  } else {
    await fetchAssistants(); // Refresh the list
  }
}

onMounted(() => {
  console.log ("Load assistants here...")
  fetchAssistants(); // Fetch assistants when the component is mounted
});
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