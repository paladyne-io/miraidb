// AI Chatbot Widget with i18n
(function() {
 
  // const host = "chat-gpt-asst/?id=12345"; // chatbotfileserver/
  
  // const host = "http://localhost:3000/chat-gpt-asst";
  const host = "https://virtag-ai.fly.dev/chat-gpt-asst/?id=12345";

  // i18n implementation
  const i18n = {
    translations: {
      en: {
        chatbotHeader: "AI Chatbot",
        askPlaceholder: "Ask me...",
        askButton: "Ask",
        clearButton: "Clear",
        errorMessage: "An error occurred. Please try again.",
        introMessage: "I am the Virtag virtual assistant. I am here to help answer your questions and get you started."
      },
      ja: {
        chatbotHeader: "AIチャットボット",
        askPlaceholder: "聞いてください…",
        askButton: "送信",
        clearButton: "クリア",
        errorMessage: "エラーが発生しました。もう一度お試しください。",
        introMessage: "私はVirtag AIアシスタントです。あなたの質問に答え、使い始めるお手伝いをします。"
      },
      es: {
        chatbotHeader: "Chatbot de IA",
        askPlaceholder: "Pregúntame sobre...",
        askButton: "Preguntar",
        clearButton: "Borrar",
        errorMessage: "Ocurrió un error. Por favor, inténtalo de nuevo.",
        introMessage: "Soy el asistente AI de Virtag. Estoy aquí para ayudarte a responder tus preguntas y ayudarte a comenzar."
      }
      // Add more languages as needed
    },
    currentLanguage: 'en', // Default language

    translate(key) {
      return this.translations[this.currentLanguage][key] || key;
    },

    setLanguage(lang) {
      this.currentLanguage = lang;
    }
  };

  // Function to detect browser language
  function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage; // Get browser language
    const langCode = browserLang.split('-')[0]; // Get the language code (e.g., "en", "es")

    // Check if the language is supported
    if (i18n.translations[langCode]) {
      i18n.setLanguage(langCode);
    } else {
      i18n.setLanguage('en'); // Fallback to default language
    }
  }

  // Call the function to set the language based on the browser's language
  detectBrowserLanguage();

 // Styles
const styles = `
.chatbox-container {
  position: fixed;
  bottom: 10px;
  right: 10px;
  z-index: 1000;
  font-family: 'Arial', sans-serif;
  transition: transform 0.3s ease;
}
.container {
  min-width: 160px;
  max-width: 400px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: height 0.3s ease;
}
.chatbot-header {
  padding: 8px;
  background: #41439d;
  color: white;
  font-size: 20px; /* Increased font size */
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  text-align: center;
  /* display: flex; */
  align-items: center;
  justify-content: space-between; /* Align items with space between */
}
.chatbot-header img {
  width: 24px; /* Icon size */
  height: 24px; /* Icon size */
  margin-right: 8px; /* Space between icon and text */
}

.closeButton {
  background: dark-grey;
  border: none;
  color: white;
  font-size: 20px; /* Close button size */
  cursor: pointer;
}

.messageBox {
  max-height: 400px;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  background-color: #f9f9f9;
  color: blue;
  font-size: 14px;
}

.messageFromUser, .messageFromChatGpt {
  display: flex;
  margin-bottom: 8px;
}

.messageFromChatGpt {
  align-self: flex-end; /* Right align */
}

.userMessageWrapper {
  align-self: flex-end;
}

.chatGptMessageWrapper {
  align-self: flex-start;
}

.userMessageContent, .chatGptMessageContent {
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 16px; /* Increased font size */
  line-height: 1.4;
  min-width: 20%;
  max-width: 80%;
  transition: background-color 0.3s ease;
}

.userMessageContent {
  background-color: #1877F2;
  color: white;
  border-top-left-radius: 0;
}

.chatGptMessageContent {
  background-color: #eaf3fe; /* Light blue background */
  color: #222;
  border-top-right-radius: 0;
  padding-right: 10px; /* Reduced right padding */
}
.inputContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #f0f0f0;
  border-top: 1px solid #e0e0e0;
}
.messageInput {
  flex-grow: 1;
  border: none;
  outline: none;
  padding: 12px;
  font-size: 14px;
  background-color: white;
  border-radius: 24px;
  margin-right: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.askButton {
  background-color: #41439d;
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
  background-color: #5c00d6;
}
.error {
  padding: 8px;
  color: #dc3545;
  font-size: 14px;
  text-align: center;
}
.clearButtonContainer {
  padding-bottom: 8px;
  display: flex;
  justify-content: center;
}
.clearButton {
  width: 40%; /* Reduced width */
  padding: 8px 16px;
  background-color: #848080;
  color: #ffffff;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}
.clearButton:hover {
  background-color: #5a5a5a;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
}
.dot {
  width: 8px;
  height: 8px;
  background-color: #333;
  border-radius: 50%;
  margin: 0 4px;
  animation: bounce 1.4s infinite ease-in-out both;
}
.dot:nth-child(1) { animation-delay: -0.32s; }
.dot:nth-child(2) { animation-delay: -0.16s; }
@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}
@media (max-width: 480px) {
  .container {
    width: 80%;
    max-width: 300px;
    border-radius: 0;
  }
}
`;

  // Create chatbot HTML
  const chatbotHTML = `
    <div class="chatbox-container">
      <div class="container">
        <div class="chatbot-header">${i18n.translate('chatbotHeader')}</div>
        <div class="messageBox" id="messageBox">
         ${i18n.translate('introMessage')}
       </div>
        <div class="inputContainer">
          <input type="text" class="messageInput" placeholder="${i18n.translate('askPlaceholder')}" />
          <button class="askButton">${i18n.translate('askButton')}</button>
        </div>
        <div class="error"></div>
        <div class="clearButtonContainer">
        Powered by Paladyne®
        </div>
      </div>
    </div>
  `;

  // Insert chatbot HTML into the page
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  // Get DOM elements
  const container = document.querySelector('.container');
  const header = document.querySelector('.chatbot-header');
  const messageBox = document.getElementById('messageBox');
  const input = document.querySelector('.messageInput');
  const askButton = document.querySelector('.askButton');
  const errorElement = document.querySelector('.error');
  // const clearButton = document.querySelector('.clearButton');

  // Create style element
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);

  // Chatbot state
  let messages = [];
  let currentMessage = '';
  let errorMessage = '';
  let threadID = null;
  let lastMessageID = null;
  let isExpanded = true;
  let isLoading = false;

  // Toggle chatbot expansion
  header.addEventListener('click', () => {
    isExpanded = !isExpanded;
    container.style.height = isExpanded ? 'auto' : '48px';
    messageBox.style.display = isExpanded ? 'flex' : 'none';
    input.style.display = isExpanded ? 'block' : 'none';
    askButton.style.display = isExpanded ? 'block' : 'none';
    // clearButton.style.display = isExpanded ? 'block' : 'none';
  });

  // Send message function
  async function sendMessage() {
    if (!currentMessage.trim() || isLoading) return;
    errorMessage = '';
    messages.push({ from: 'user', data: currentMessage });
    updateUI();

    isLoading = true;
    updateUI();

    console.log("Sending message to: " +  host +  ". currentMessage: " + currentMessage)

    try {
      const response = await fetch(host, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentMessage,
          threadID,
          lastMessageID
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      messages.push({ from: 'chatGpt', data: data.bot });
      threadID = data.threadID;
      lastMessageID = data.lastMessageID;
    } catch (error) {
      console.error('Fetch error:', error);
      errorMessage = error.message;
    } finally {
      isLoading = false;
      currentMessage = '';
      updateUI();
    }
  }

  // Delete thread function
  async function deleteThread() {
    errorMessage = '';

    if (!threadID) {
      console.log('Request to delete thread was ignored. (No Thread ID)');
      return;
    }

    try {
      const response = await fetch(`${host}/?threadid=${threadID}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Thread ID: ' + threadID + ' was deleted.');
      threadID = null;

      if (confirm('The chat thread was deleted on the server. Clear the chat as well?')) {
        messages = [];
      }
    } catch (error) {
      console.error('Fetch error:', error);
      errorMessage = error.message;
    }

    updateUI();
  }

  // Update UI function
  function updateUI() {
    messageBox.innerHTML = messages.map(message => `
      <div class="${message.from === 'user' ? 'messageFromUser' : 'messageFromChatGpt'}">
        <div class="${message.from === 'user' ? 'userMessageWrapper' : 'chatGptMessageWrapper'}">
          <div class="${message.from === 'user' ? 'userMessageContent' : 'chatGptMessageContent'}">
            ${message.data}
          </div>
        </div>
      </div>
    `).join('');

    if (isLoading) {
      messageBox.innerHTML += `
        <div class="messageFromChatGpt">
          <div class="chatGptMessageWrapper">
            <div class="chatGptMessageContent loading">
              <span class="dot"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      `;
    }

    messageBox.scrollTop = messageBox.scrollHeight;
    input.value = currentMessage;
    errorElement.textContent = errorMessage;
  }

  // Event listeners
  input.addEventListener('input', (e) => {
    currentMessage = e.target.value;
  });

  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  askButton.addEventListener('click', sendMessage);
  // clearButton.addEventListener('click', deleteThread);

  // Initial UI update
  updateUI();

})();
