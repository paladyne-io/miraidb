<template>
    <q-page class="flex flex-center">
        <q-card class="my-card q-pa-lg">
            <div class="row justify-between">
                  <div class="col-5">
                    <DarkModeSwitcher
                    class="outlined-btn"
                    :ignore-dark-mode="true"
                    :avatar="true"
                    :noPadding="true"
                    :showLabel="true"
                    key="darkmode">
                </DarkModeSwitcher>
            </div>
            <div class="col-5">
          <LanguageSwitcher style="min-width:280px;max-width:300px"> </LanguageSwitcher>
        </div>
        </div>
            <div class="profile-field q-mt-lg text-h5 text-center"
                v-if="!authenticatedUser">
                Please <router-link to="/dashboard/admin-signin">sign in</router-link>
                to edit your profile and publish and edit blog posts.
            </div>
            <div v-else>
            <form
                class="form-widget"
                @submit.prevent="updateProfile"
                @change="formUpdated()"
            >
                <q-card-section class="text-center">
                    <div class="avatar-container">
                        <Avatar
                            v-model:path="avatar_url"
                            @upload="updateProfile"
                        />
                    </div>
                    <!--
                    <div class="test-data">
                        avatar_url: {{ avatar_url }}
                    </div>
                    <div class="test-data">
                        session: {{ session }}
                    </div>
                    <div class="test-data">
                        user: {{ authenticatedUser }}
                    </div>
                   -->
                    <div
                        class="profile-field q-mt-lg"
                        v-if="authenticatedUser"
                    >
                        <q-input
                            outlined
                            id="email"
                            label="Email"
                            type="text"
                            v-model="authenticatedUser.email"
                            disable
                            class="q-mb-md"
                        >
                            <template v-slot:prepend>
                                <q-icon name="email" />
                            </template>
                        </q-input>
                    </div>
                    <div class="profile-field">
                        <q-input
                            outlined
                            id="username"
                            label="Name"
                            v-model="username"
                            class="q-mb-md"
                            @update:model-value="changed"
                        >
                            <template v-slot:prepend>
                                <q-icon name="person" />
                            </template>
                        </q-input>
                    </div>
                    <div class="profile-field">
                        <q-input
                            outlined
                            id="website"
                            label="Website"
                            type="url"
                            v-model="website"
                            class="q-mb-lg"
                        >
                            <template v-slot:prepend>
                                <q-icon name="language" />
                            </template>
                        </q-input>
                    </div>
                </q-card-section>

                <q-card-actions
                    align="center"
                    class="q-gutter-md"
                >
                    <q-btn
                        class="mira-button"
                        padding="sm md"
                        unelevated
                        :disabled="isLoading || !authenticatedUser || changesSaved"
                        type="submit"
                        color="primary"
                        @click="updateProfile()"
                        :label="isLoading ? 'Saving...' : 'Save Changes'"
                        :loading="isLoading"
                        icon="save"
                    />
                    <q-btn
                        padding="sm md"
                        unelevated
                        class="mira-button"
                        @click="signOutConfirm"
                        :disabled="isLoading || !authenticatedUser"
                        color="negative"
                        icon="logout"
                        label="Sign Out"
                    />
                </q-card-actions>

                <q-banner
                    v-if="error"
                    class="bg-negative text-white q-mt-md"
                >
                    {{ error }}
                </q-banner>

                <div class="text-center q-mt-lg">
                    <q-btn
                        flat
                        rounded
                        to="/dashboard/admin-blog"
                        color="primary"
                        icon="article"
                        label="Go to Blog"
                    />
                </div>
            </form>
        </div> 
        </q-card>
    </q-page>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import Avatar from '../components/Avatar.vue';
import { useSupabaseAPI } from '../composables/useSupabase.js';
import LanguageSwitcher from '../components/LanguageSwitcher.vue'
import DarkModeSwitcher from '../components/DarkModeSwitcher.vue'

const { error, user, loading, getSignedInUser, getSignedInUserProfile, signOut, updateUserProfile } = useSupabaseAPI();

import { useRouter } from 'vue-router' // useRoute,

const router = useRouter()

const isLoading = ref(loading)
// const currentUser = ref(user)

const username = ref('')
const website = ref('')
const avatar_url = ref('')

const changesSaved = ref(true)
const profileUpdated = ref(false)

const profile = ref()
const authenticatedUser = ref(user)

// console.log("isLoading: " + isLoading.value)
// console.log("authenticatedUser: " + authenticatedUser.value)

onMounted(async () => {
    console.log("getting profile: " + isLoading.value)
    await getProfile()
    // console.log("profile: " + JSON.stringify(profile.value))
})

function changed() {
    console.log("changed")
    changesSaved.value = false
}

async function signOutConfirm() {
    const result = confirm('Are you sure you want to sign out?'
    )
    if (result) {
      const result = await signOut()
      if (result) {
        // router.go()
        router.push('signin')
      }
    }
}

function formUpdated() {
    // console.log("form Updated.")
    changesSaved.value = false
    profileUpdated.value = false
}

async function getProfile() {
    // console.log("get Profile")
    try {
        isLoading.value = true

        if (!user) {
            authenticatedUser.value = await getSignedInUser()
        }

        if (!user || !authenticatedUser.value) {
           // alert("You are not signed in. Please try to log in again.")
            return
        }

        console.log("get user Profile")
        const data = await getSignedInUserProfile()
        profile.value = data

        if (data) {
            username.value = data.username
            website.value = data.website
            avatar_url.value = data.avatar_url
        }
    } catch (error) {
        error.value = error.message
    } finally {
        isLoading.value = false
    }
}

async function updateProfile() {
    console.log("updateProfile")

    if (authenticatedUser.value) {
        // console.log(" user.id: " +  user.id)
        // co
        const updates = {
            id: user.id,
            username: username.value,
            website: website.value,
            avatar_url: avatar_url.value,
            updated_at: new Date(),
        }
        await updateUserProfile(updates)
        console.log("Updated profile")
        changesSaved.value = true
        profileUpdated.value = true
    }
}
</script>

<style scoped>
.my-card {
    width: 100%;
    max-width: 500px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
}
/* This is also included in variables.css but it's not picked up by the app while other classes below are?? */
.mira-button {
    border-radius: 8px;
}

.round-btn {
    border-radius: 50%;
}

/*
.circle {
    border-radius: 50%;
    border: 4px solid #e0e0e0;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    transition: all 0.3s ease;
}

.circle:hover {
    border-color: var(--q-primary);
    transform: scale(1.02);
}

.circle img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
    */

.profile-field {
    max-width: 400px;
    margin: 0 auto;
}

/* Add smooth transitions */
.q-btn {
    transition: all 0.3s ease;
}

.q-input {
    transition: all 0.3s ease;
}

.q-input:hover {
    transform: translateY(-1px);
}
</style>
