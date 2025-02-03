<template>
  <div class="not-signed-in-container">
    <div class="not-signed-in-message">
      <q-icon name="warning" size="lg" color="warning" />
      <p>You are not signed in. Please sign in to access this feature.</p>
      <q-btn
      size="lg"
          padding="sm lg"
        color="primary"
        label="Sign In"
        to="/dashboard/admin-signin"
      />
    </div>
  </div>
</template>

<script setup>
// Not signed in component for dashboard
</script>

<style scoped>
.not-signed-in-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
}

.not-signed-in-message {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.not-signed-in-message p {
  margin: 0;
  font-size: 16px;
  color: #666;
}
</style>
