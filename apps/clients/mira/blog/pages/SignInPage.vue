<template>
  <q-page class="flex flex-center">
    <div class="q-pt-md full-width text-center">
      <div class="white-bg">
        <q-img
          class="logo"
          width="320px"
          src="../assets/logo.png"
        />
      </div>
      <div class="q-pt-lg text-h4">
        <router-link to="/blog">Back to Blog</router-link>
      </div>
    </div>
    <q-form
      @submit.prevent="signIn"
      class="q-gutter-md"
    >
      <div>
        <div class=" q-pb-lg">
          <h3 class="header">Sign in to Comment</h3>
        </div>
        <!--
        <p class="description">Sign in to Comment</p>
        -->
        <div class="signin-field">
          <q-input
            v-model="email"
            type="email"
            label="Your email"
            autocomplete="username"
            required
            class="inputField"
          />
        </div>
        <div class="signin-field">
          <q-input
            v-model="password"
            autocomplete
            type="password"
            label="Password"
            required
            class="inputField"
          />
        </div>
        <div class="signin-button">
          <q-btn
            type="submit"
            color="blue"
            :label="loading ? 'Loading' : 'Sign in'"
            :loading="loading"
            :disable="loading"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router' // useRoute,
// import { supabase } from '../supabase'
import { useSupabaseAPI } from '../composables/useSupabase';

const { user, signInWithEmailAndPassword } = useSupabaseAPI();

const router = useRouter()
const loading = ref(false)
const email = ref('');
const password = ref('');

const signIn = async () => {
  if (!email.value) {
    alert("Please enter your email address")
    return
  }
  if (!password.value) {
    alert("Please enter your password")
    return
  }
  console.log("Signing in with email: " + email.value)
  const signinResult = await signInWithEmailAndPassword(email.value, password.value)

  if (!signinResult) {
    alert("Couldn't sign in");
  } else {
    //alert('Sign in successful!');
    // router.go()
    // router.push('/')
    router.push('profile')
  }
};

onMounted(async () => {
  if (user) {
    console.log('User is signed in')
    router.push('blog')
  }
})
</script>

<style>
.logo {
  width: 320px;
  background-color: white;
  border-radius: 8px;
  /* padding: 4%; */
}

.inputField {
  width: 60%;
  /* margin-left:8px; */
}

.signin-field {
  padding-bottom: 16px;
}

/* Dark Mode Optimizations */
.body--dark a {
  color: #d8ecfc;
}

.signin-button {
  width: 200px;
  padding-top: 20px;
}
</style>
