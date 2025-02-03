<template>
  <div class="chatbox-container">
    <div class="container">

      <!-- Original chat classes
      <div :class="message.from == 'user' ? 'userMessageWrapper' : 'chatGptMessageWrapper'">
      <div :class="message.from == 'user' ? 'userMessageContent' : 'chatGptMessageContent'"
      -->

      <q-expansion-item
        expand-separator
        icon="lightbulb"
        label="AI Chatbot"
        header-class="chatbot-header"
        popup
        default-opened
      >
        <template v-slot:header>
          <q-item-section avatar>
            <q-icon
              color="purple"
              name="img:icons8-chatgpt-48.png"
              size="36px"
            />
          </q-item-section>
          <q-item-section>
            <div class="text-subtitle1">
              AI ChatBot
            </div>
          </q-item-section>
          <q-item-section>
            <div
              v-if="messages.length > 0"
              class="text-center"
            >
              <q-btn
                :disable="!threadID"
                @click="deleteThread()"
                flat
                color="blue"
              >Clear</q-btn>
            </div>
          </q-item-section>
        </template>
        <q-card>

          <div
            class="messageBox mt-8 scroll"
            id="message-container"
            ref="aiChatBot"
          >
            <q-chat-message
              v-for="(message, index) in messages"
              :key="index"
              :sent="message.from !== 'user'"
              :avatar="message.from !== 'user' ? 'icons8-chatgpt-48.png' : 'user_32.png'"
              :text-color="message.from === 'user' ? 'white' : 'blue-grey-10'"
              :bg-color="message.from === 'user' ? 'blue' : 'light-blue-1'"
              :size="message.from === 'user' ? '6' : '9'"
            >
              message.from : {{ message.from }}
              <div :class="message.from === 'user' ? 'messageFromUser' : 'messageFromChatGpt'">
                <div :class="message.from === 'user' ? 'userMessageContent' : 'chatGptMessageContent'">
                  {{ message.data }}
                </div>
              </div>
            </q-chat-message>

            <q-chat-message
              v-if="waitingForResponse"
              avatar='icons8-chatgpt-48.png'
              text-color='blue-grey-10'
              bg-color='light-blue-1'
              size="8"
              sent
            >
            <div class='chatGptMessageContent'>
                <q-spinner-dots size="2em" class='text-center'/>
                  </div>
            </q-chat-message>
          </div>

          <div class="inputContainer">
            <q-input
              borderless
              dense
              v-model="currentMessage"
              @keydown.enter.prevent="sendMessage(currentMessage)"
              type="text"
              class="messageInput"
              placeholder="Ask me about Virtag..."
            />
            <button
              @click="sendMessage(currentMessage)"
              class="askButton"
            >
              Ask
            </button>
          </div>

          <div
            v-if="errorMessage"
            class="error"
          >
            {{ errorMessage }}
          </div>

        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue' // useTemplateRef
import axios from 'axios';
import Notify from 'simple-notify'
import 'simple-notify/dist/simple-notify.css'
import { scroll } from 'quasar'
const { getScrollTarget, getScrollHeight, setVerticalScrollPosition, getVerticalScrollPosition } = scroll

// const aiChat = useTemplateRef('aiChatBot')
const aiChatBot = ref()

const host = "https://virtag-ai.fly.dev/chat-gpt"
const localHost = "http://localhost:3000/chat-gpt"

const asstHostUrl = "https://virtag-ai.fly.dev/chat-gpt-asst?id=12345"
const localAsstHostUrl = "http://localhost:3000/chat-gpt-asst?id=12345"

const asstHost = document.location.hostname === 'localhost' ? localAsstHostUrl : asstHostUrl

console.log ("document.location: " +  document.location.hostname)
console.log ("Connect to asst host: " +  asstHost)

const currentMessage = ref('')
const messages = ref([])
const errorMessage = ref('')
const lastMessageID = ref()
const threadID = ref()
const waitingForResponse = ref(false)

// Function to scroll to a specific item

function scrollToBottom() {
  console.log("scrollToBottom...")
  let pageChat = aiChatBot.value
  // onMounted(() => console.log(root.value.outerHTML))

  // console.log("pageChat: " + JSON.stringify(pageChat))
  // console.log("pageChat outerHTML: " + JSON.stringify(pageChat.outerHTML))

  // const target = getScrollTarget(aiChat.value.el)
  const scrollTarget = getScrollTarget(pageChat)
  // console.log("scrollTarget: " + JSON.stringify(scrollTarget))

  // console.log("target: " + target)
  // const scrolllHeight = getScrollHeight(target) // returns a Number
  // console.log("scrolllHeight: " + scrolllHeight)
  // const offset = pageChat.offsetTop + pageChat.offsetParent.offsetTop
  setVerticalScrollPosition(scrollTarget, scrollTarget.scrollHeight, 1000)

  // pageChat.setScrollPosition(scrollTarget, 1000);
  // pageChat.setScrollPosition(scrollTarget.scrollHeight, 1000);
  //setTimeout(() => {
  // window.scrollTo(0, pageChat.scrollHeight)
  //}, 20);
}

/*
function scrollToItem(selector) {
  nextTick(() => {
    const el = document.querySelector(`#asset-${selector}`)
    const listContainer = document.getElementById(
      'message-container'
    )

    if (el && listContainer) {
      const offset = el.offsetTop - listContainer.offsetTop;
      const duration = 100;
      animVerticalScrollTo(listContainer, offset, duration);
    }
  })
}
  */

watch(messages, (newList, oldList) => {
  console.log("messages changed")
  scrollToBottom() // newItem.id
  /*
  if (newList.length > oldList.length) {
    const newItem = newList.find(
      (item) => !oldList.some((oldItem) => oldItem.id === item.id)
    )

    if (newItem) {
      selectedAssetItem.value = newItem.name
      scrollToBottom() // newItem.id
    }
  }
    */
},
  { deep: true }
)

function pushNotify(title, message) {
  new Notify({
    title,
    text: message,
    autoclose: true,
    autotimeout: 1500,
    status: 'warning',
    effect: 'fade',
    customIcon: null,
    type: 'filled',
    position: 'bottom right'
  })
}

function reset(clearMessages) {
  if (clearMessages) {
    messages.value = []
  }
  threadID.value = null
  lastMessageID.value = null
  waitingForResponse.value = false
}

async function deleteThread(message) {
  errorMessage.value = ""
  // threadID.value = "thread_ltQeIABGU73qCJGPTYwYthN7"
  console.log("Deleting Thread ID: " + threadID.value)
  if (!threadID.value) {
    console.log("Request to delete thread was ignored. (No Thread ID)")
    return
  }

  const endPoint = asstHost.includes("?") ? (asstHost + "&threadid=" + threadID.value) : asstHost + "?threadid=" + threadID.value

  console.log("Sending Delete request: " + endPoint)
  await axios
    .delete(endPoint)
    .then((response) => {
      console.log('Delete thread. Axios response:', response);
      // Even if it fails clear the threadID and lastMessageID

      if (response.ok) {
        console.log("Thread ID: " + threadID.value + " was deleted.")
        const result = confirm("The chat thread was deleted on the server. Clear the chat messages in the AI Chatbot assistant as well?")
        reset(result)
      }
      else {
        pushNotify("Warning", "Sorry The chat thread couldn't be cleared on the server but it will be deleted after a month or so automatically.")
        reset(true)
      }
    })
    .catch(error => {
      if (error.response) {
        console.error('Axios error:', error.response.data);
        errorMessage.value = error.response.data
      }
      pushNotify("Warning", "Sorry The chat thread couldn't be cleared on the server but it will be deleted after a month or so automatically.")
      reset(true)
    })
}

async function sendMessage(message) {
  errorMessage.value = ""

  if (!message || message.length === 0) {
    pushNotify("Please enter a question.")
    return
  }

  waitingForResponse.value = true
  messages.value.push({
    from: 'user',
    data: message,
  });
  await axios
    .post(asstHost, {
      timeout: 5000, // Set a timeout of 5 seconds
      message: message,
      threadID: threadID.value,
      lastMessageID: lastMessageID.value
    })
    .then((response) => {
      // console.log('Axios response:', response);
      const msg = response.data.bot

      waitingForResponse.value = false
      messages.value.push({
        from: 'chatGpt',
        data: msg // Access the 'data' property of the response object
      })
      // console.log('Asst response: ', msg);
      threadID.value = response.data.threadID
      console.log('Thread ID was stored: ', threadID.value);
      lastMessageID.value = response.data.lastMessageID
      console.log('lastMessageID was stored: ', lastMessageID.value);

    })
    .catch(error => {
      if (error.response) {
        console.error('Axios error:', error.response.data);
        errorMessage.value = error.response.data
      }
    })
}

</script>

<style>
.chatbot-header {
  padding-top: 16px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background: white;
  color: purple;
  font-size: 24px;
}
</style>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap'); */

.chatbox-container {
  position: fixed;
  bottom: 18px;
  right: 18px;
  z-index: 1000;
}

.q-expansion-item--popup.q-expansion-item--expanded {
  padding: 0;
}

.q-expansion-item--popup.q-expansion-item {
  padding: 0;
}

.container {
  width: 380px;
  /* height: 600px; */
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
}

h1 {
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  color: #222;
  padding: 16px;
  margin: 0;
  background-color: #f7f7f7;
  border-bottom: 1px solid #e7e7e7;
}

.messageBox {
  padding: 16px;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.error {
  padding: 16px;
  color: red;
}

.messageFromUser,
.messageFromChatGpt {
  display: flex;
}

.messageBox {
  max-height: 400px;
  overflow-y: auto;
  padding: 0 8px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  flex-grow: 1;
}

.messageFromUser,
.messageFromChatGpt {
  display: flex;
  margin-bottom: 8px;
}

.userMessageWrapper,
.chatGptMessageWrapper {
  display: flex;
  flex-direction: column;
}

.userMessageWrapper {
  align-self: flex-end;
}

.chatGptMessageWrapper {
  align-self: flex-start;
}

.userMessageContent,
.chatGptMessageContent {
  /* max-width: 60%; */
  padding: 8px 12px;
  border-radius: 18px;
  margin-bottom: 2px;
  font-size: 16px;
  line-height: 1.4;
}

/*
.userMessageContent {
  background-color: #1877F2;
  color: white;
  border-top-left-radius: 0;
}

.chatGptMessageContent {
  background-color: #EDEDED;
  color: #222;
  border-top-right-radius: 0;
}
  */

.userMessageTimestamp,
.chatGptMessageTimestamp {
  font-size: 10px;
  color: #999;
  margin-top: 2px;
}

.userMessageTimestamp {
  align-self: flex-end;
}

.chatGptMessageTimestamp {
  align-self: flex-start;
}

.inputContainer {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #f0f0f0;
}

.messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 6px;
  font-size: 16px;
  background-color: white;
  border-radius: 24px;
  margin-right: 8px;
}

.askButton {
  background-color: #1877F2;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 24px;
  transition: background-color 0.3s ease-in-out;
}

.askButton:hover {
  background-color: #145CB3;
}

@media (max-width: 480px) {
  .container {
    width: 100%;
    max-width: none;
    border-radius: 0;
  }
}

.chatbox-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.messageBox {
  padding: 16px;
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.messageFromUser,
.messageFromChatGpt {
  display: flex;
}
</style>