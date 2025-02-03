<template>
  <div>
    <q-card class="q-mt-md">
      <q-card-section>
        <span v-if="authenticatedUser" class="comment-text">Commenting as <router-link :to="{ name: 'profile' }">{{ username }}</router-link>.</span>
        <span v-else class="comment-text">Commenting as a guest.
          <router-link class="route-link" to="/signin">Please sign in </router-link> </span>
        <div class="q-pt-md full-width">
          <q-input
            v-model="newComment"
            type="textarea"
            label="Add a comment"
            filled
          />
        </div>
        <div v-if="authenticatedUser" class="row q-gutter-sm q-pt-lg">
          <q-btn
            @click="submitComment(post.id, newComment)"
            label="Post Comment"
            color="primary"
            :disabled="!newComment.trim()"
          />
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div v-if="!authenticatedUser">
    <q-card class=" q-mt-md">
        <q-card-section>
            <p class="comment-text">Please enter your email to register or press the button below to comment as a guest. If you submit a comment without an email address your comment will be moderated and shown after it is approved. After registering, check your email for a verification link. If you sign in you can comment without this form.</p>
            <div class="row q-gutter-sm q-pt-md">
                <div class="col-7">
                    <q-input
                        v-model="guestEmail"
                        type="email"
                        ref="emailAddress"
                        :rules="[val => !!val || $t('enter_your_email_address'), isValidEmail]"
                        autocomplete="username"
                        minlength="6"
                        maxlength="50"
                        outlined
                        :label="$t('email')"
                        hint="Your email will not be displayed"
                    />
                </div>
                <div class="col-4">
                    <q-input
                        v-model="username"
                        type="text"
                        minlength="2"
                        maxlength="20"
                        outlined
                        :label="$t('name')"
                        hint="The name that will be displayed next to your comment."
                    />
                </div>
            </div>
            <div class="row q-gutter-sm q-pt-lg">
                <q-btn
                    :disabled="!verifyEmail()"
                    @click="register"
                    label="Register"
                    color="secondary"
                />
                <q-btn
                    @click="submitGuestComment(post.id, newComment)"
                    label="Comment as Guest"
                    color="primary"
                />
            </div>
        </q-card-section>
    </q-card>
  </div>
  <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSupabaseAPI } from '../composables/useSupabase.js';
import { usePostsStore } from '../store/postsStore.js';
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router';

const router = useRouter()

const emit = defineEmits(['commentAdded'])

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// This will be used later. Don't remove!
const { t } = useI18n();

const { addComment, isUserSignedIn, getSignedInUserProfile } = useSupabaseAPI();
const postsStore = usePostsStore();

const guestEmail = ref('');
// const userName = ref(''); // For guest username
const newComment = ref('');
const username = ref(''); // Reactive reference for username
const errorMessage = ref('');

const authenticatedUser = isUserSignedIn();

// Function to get the username
const getUsername = async () => {
  if (!isUserSignedIn) {
    return 'guest';
  }
  const userProfile = await getSignedInUserProfile();
  // console.log("userProfile:" + userProfile);
  return userProfile ? userProfile.username : "anon"; // Use 'anon' if username is not defined
};

// Fetch username on component mount
onMounted(async () => {
  username.value = await getUsername(); // Fetch username and update reactive reference
});

const register = async (email) => {
    console.log("register here...")
    router.push('signin');
}

// Function to submit comment
const submitComment = async (postId, comment) => {
  console.log("submitting comment...", postId)
  /*
  const commentObject = {
    username: username.value,
    content: comment
  };
  */
  const addedComment = await addComment(postId, comment, username.value );

  if (addedComment) {
    console.log("Added user comment: " + comment);
    postsStore.updatePostComments(postId, addedComment); // Update the store with the new comment
    newComment.value = ''; // Clear the input field
    errorMessage.value = ''; // Clear any previous error message
    emit('commentAdded', addedComment); // Emit the added comment
  }
  else {
    errorMessage.value = "Error adding user comment!";
    console.error(errorMessage.value);
  }
};

// Function to submit guest comment
const submitGuestComment = async (postId, comment) => {
  console.log("submitGuestComment: " + comment);
  /*
  const commentObject = {
    username: userName.value || 'guest',
    content: comment
  };
  */
  const addedComment = await addComment(postId, comment, username.value || 'guest' );
  if (addedComment) {
    console.log("Added guest comment: " + comment);
    postsStore.updatePostComments(postId, addedComment); // Update the store with the new comment
    newComment.value = ''; // Clear the input field
    errorMessage.value = ''; // Clear any previous error message
    emit('commentAdded', addedComment); // Emit the added comment
  }
  else {
    errorMessage.value = "Error adding guest comment"
    console.error(errorMessage.value);
  }
};

function testEmail(val) {
    const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
    return emailPattern.test(val)
}

function getTypeEmailTranslation() {
    return t('type_email_address')
}

function isValidEmail(val) {
    const trans = getTypeEmailTranslation()
    if (!val || val.length === 0) {
        return true
    }
    return testEmail(val) || trans
}

const verifyEmail = () => {
    const vEmail = guestEmail.value.trim()
    console.log("verifyEmail: " + vEmail)
    console.log("Email OK: " + testEmail(vEmail))
    return testEmail(vEmail)
}

</script>

<style scoped>
.error-message {
  color: red;
}

/* Dark Mode Optimizations */
.body--dark a {
  color: #9cc8eb;
}

</style>
