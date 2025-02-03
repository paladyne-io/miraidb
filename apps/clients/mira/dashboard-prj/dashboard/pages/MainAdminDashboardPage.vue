<!-- src/views/DashboardLayout.vue -->
<template>
  <div class="dashboard-layout">
    <nav class="sidebar">
      <div class="logo-container">
        <img src="/assets/logo.png" alt="Logo" class="logo">
      </div>
      
      <div class="nav-menu">
        <router-link to="/dashboard" class="nav-item">
          <i class="fas fa-home"></i>
          <span>Dashboard</span>
        </router-link>
        
        <router-link to="/dashboard/create" class="nav-item">
          <i class="fas fa-pen-nib"></i>
          <span>Create Blog Post</span>
        </router-link>
        
        <router-link to="/blog/manage" class="nav-item">
          <i class="fas fa-blog"></i>
          <span>Manage Blog</span>
        </router-link>
        
        <router-link to="/categories" class="nav-item">
          <i class="fas fa-tags"></i>
          <span>Manage Categories</span>
        </router-link>
        
        <router-link to="/context-snippets" class="nav-item">
          <i class="fas fa-puzzle-piece"></i>
          <span>Context Snippets</span>
        </router-link>
        
        <router-link to="/ai-assistant" class="nav-item">
          <i class="fas fa-robot"></i>
          <span>Prompt Assistant</span>
        </router-link>
        
        <router-link to="/chatbots" class="nav-item">
          <i class="fas fa-comments"></i>
          <span>Manage Chatbots</span>
        </router-link>
        
        <router-link to="/customization" class="nav-item">
          <i class="fas fa-palette"></i>
          <span>Customization</span>
        </router-link>
        
        <router-link to="/deployment" class="nav-item">
          <i class="fas fa-cloud-upload-alt"></i>
          <span>Deployment</span>
        </router-link>
      </div>
      
      <div class="user-section">
        <div class="user-profile">
          <img :src="userAvatar" alt="User Avatar" class="avatar">
          <div class="user-info">
            <span class="user-name">{{ userName }}</span>
            <span class="user-email">{{ userEmail }}</span>
          </div>
        </div>
        <button @click="logout" class="logout-btn">
          <i class="fas fa-sign-out-alt"></i>
        </button>
      </div>
    </nav>
    
    <main class="main-content">
      <header class="top-bar">
        <div class="search-container">
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            class="search-input"
          >
          <i class="fas fa-search search-icon"></i>
        </div>
        
        <div class="header-actions">
          <button class="notification-btn">
            <i class="fas fa-bell"></i>
            <span class="notification-badge">3</span>
          </button>
          
          <div class="theme-toggle">
            <button @click="toggleTheme">
              <i :class="themeIcon"></i>
            </button>
          </div>
        </div>
      </header>
      
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// User information (replace with actual authentication)
const userName = ref('John Doe')
const userEmail = ref('john.doe@example.com')
const userAvatar = ref('https://via.placeholder.com/150')

// Theme management
const isDarkTheme = ref(false)
const themeIcon = computed(() => 
  isDarkTheme.value ? 'fas fa-sun' : 'fas fa-moon'
)

const toggleTheme = () => {
  isDarkTheme.value = !isDarkTheme.value
  document.body.classList.toggle('dark-theme', isDarkTheme.value)
}

const logout = () => {
  // Implement logout logic
  router.push('/login')
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  background-color: #f4f6f9;
}

.sidebar {
  width: 250px;
  background-color: #ffffff;
  border-right: 1px solid #e0e6ed;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.logo-container {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  max-width: 150px;
}

.nav-menu {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 15px;
  color: #4a5568;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: #e6f2ff;
  color: #3182ce;
}

.nav-item i {
  font-size: 1.2rem;
}

.user-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-top: 1px solid #e0e6ed;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
}

.user-email {
  font-size: 0.8rem;
  color: #718096;
}

.logout-btn {
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e6ed;
}

.search-container {
  position: relative;
  flex-grow: 1;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 10px 15px 10px 40px;
  border: 1px solid #e0e6ed;
  border-radius: 8px;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.notification-btn {
  position: relative;
  background: none;
  border: none;
  color: #4a5568;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e53e3e;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.7rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Dark Theme Styles */
body.dark-theme {
  background-color: #1a202c;
  color: #e2e8f0;
}

body.dark-theme .sidebar {
  background-color: #2d3748;
  border-right-color: #4a5568;
}

body.dark-theme .nav-item {
  color: #e2e8f0;
}

body.dark-theme .nav-item:hover,
body.dark-theme .nav-item.router-link-active {
  background-color: #4a5568;
  color: white;
}
</style>
