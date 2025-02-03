<template>
  <q-page class="flex flex-center">
    <div class="q-pt-md full-width text-center">
      <q-img
      class="logo"
        width="300px"
        src="../assets/logo.png"
      />
    </div>
    <q-form
      @submit.prevent="signIn"
      class="q-gutter-md"
    >
      <div>
        <div class=" q-pa-lg">
          <div class=" q-pb-lg text-h3 header">
       Welcome to Mira. Written in JavaScript with Supabase, Vue 3, and Quasar.
      </div>
     
        <p class="description">Sign in to Supabase</p>
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
    </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router' // useRoute,
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

  // console.log("Signing in with email: " + email.value)
  const signinResult = await signInWithEmailAndPassword(email.value, password.value)
  
  if (!signinResult) {
    alert("Couldn't sign in");
  } else {
    //alert('Sign in successful!');
    router.push('admin-profile')
  }
};

onMounted(async () => {
    if (user) {
      console.log('User is signed in')
      router.push('/dashboard')
    }
})

</script>


<style>
.logo {
  width: 240px;
}

.inputField {
  width: 60%;
  /* margin-left:8px; */
}

.signin-field {
  padding-bottom: 16px;
}

.signin-button {
  width: 200px;
  padding-top: 20px;
}
</style>
