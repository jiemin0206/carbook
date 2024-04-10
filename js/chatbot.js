(function () {
// add the template to html on page load

var chatBotHtml = `
<div class="chatbot">
  <div class="chatbot__header">
    <h3 class="chatbox__title">Chatbot</h3>
    <span class="material-symbols-outlined">close</span>
  </div>
  <ul class="chatbot__box">
    <li class="chatbot__chat incoming">
      <span class="material-symbols-outlined">smart_toy</span>
      <p>Hi, this is SACommunity. How can I help you today?</p>
    </li>
  </ul>
  <div class="chatbot__input-box">
    <textarea
      class="chatbot__textarea"
      placeholder="Enter a message..."
      required
    ></textarea>
    <span id="send-btn" class="material-symbols-outlined">send</span>
  </div>
`;
var template = `
<!-- Code :) -->
<button class="chatbot__button">
  <span class="material-symbols-outlined">mode_comment</span>
  <span class="material-symbols-outlined">close</span>
</button>
<div class="chatbot">
  <div class="chatbot__header">
    <h3 class="chatbox__title">Chatbot</h3>
    <span class="material-symbols-outlined">close</span>
  </div>
  <ul class="chatbot__box">
    <li class="chatbot__chat incoming">
      <span class="material-symbols-outlined">smart_toy</span>
      <p>Hi, this is SACommunity. How can I help you today?</p>
    </li>
  </ul>
  <div class="chatbot__input-box">
    <textarea
      class="chatbot__textarea"
      placeholder="Enter a message..."
      required
    ></textarea>
    <span id="send-btn" class="material-symbols-outlined">send</span>
  </div>
</div>
`

document.body.insertAdjacentHTML('afterbegin', template);

// var placeholder = document.getElementById('chatbot-placeholder');
// placeholder.innerHTML = chatBotHtml;
const chatbotToggle = document.querySelector('.chatbot__button');
const sendChatBtn = document.querySelector('.chatbot__input-box span');
const chatInput = document.querySelector('.chatbot__textarea');
const chatBox = document.querySelector('.chatbot__box');
const chatbotCloseBtn = document.querySelector('.chatbot__header span');

let userMessage;
// Need GPT key
const inputInitHeight = chatInput.scrollHeight;
const API_KEY = 'HERE';

const createChatLi = (message, className) => {
  const chatLi = document.createElement('li');
  chatLi.classList.add('chatbot__chat', className);
  let chatContent =
    className === 'outgoing'
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span> <p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector('p').textContent = message;
  return chatLi;
};

const generateResponse = (incomingChatLi) => {
  const messageElement = incomingChatLi.querySelector('p');
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: userMessage }),
  };

  fetch('http://localhost:5000/chatbot', requestOptions)
      .then((response) => response.json())
      .then((data) => {
          messageElement.textContent = data.reply;
      })
      .catch((error) => {
          messageElement.classList.add('error');
          messageElement.textContent = 'Oops! Please try again!';
          console.log(error);
      })
      .finally(() => chatBox.scrollTo(0, chatBox.scrollHeight));
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;
  chatInput.value = '';
  chatInput.style.height = `${inputInitHeight}px`;

  chatBox.appendChild(createChatLi(userMessage, 'outgoing'));
  chatBox.scrollTo(0, chatBox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi('Thinking...', 'incoming');
    chatBox.appendChild(incomingChatLi);
    chatBox.scrollTo(0, chatBox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
};

chatInput.addEventListener('input', () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});
chatInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});
chatbotToggle.addEventListener('click', () =>
  document.body.classList.toggle('show-chatbot')
);
chatbotCloseBtn.addEventListener('click', () =>
  document.body.classList.remove('show-chatbot')
);
sendChatBtn.addEventListener('click', handleChat);
})();
