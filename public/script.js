const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const submitButton = form.querySelector('button[type="submit"]');
const quickPromptButtons = document.querySelectorAll('.quick-prompts button');

const conversation = [];
const MAX_HISTORY_ITEMS = 12;

quickPromptButtons.forEach((button) => {
  button.addEventListener('click', () => {
    input.value = button.dataset.prompt;
    input.focus();
  });
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const userMessage = input.value.trim();
  if (!userMessage) return;

  appendMessage('user', userMessage);
  conversation.push({ role: 'user', text: userMessage });
  trimConversationHistory();

  input.value = '';
  input.focus();

  const thinkingMessage = appendLoadingMessage();
  setFormDisabled(true);

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ conversation })
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || `Server responded with status ${response.status}`);
    }

    const resultText = data && typeof data.result === 'string' ? data.result.trim() : '';

    if (resultText) {
      conversation.push({ role: 'model', text: resultText });
      trimConversationHistory();
      updateMessageHTML(thinkingMessage, parseMarkdown(resultText));
    } else {
      updateMessage(thinkingMessage, 'Maaf, belum ada respons dari server. Coba ulangi pertanyaanmu.');
    }
  } catch (error) {
    console.error('Chat request failed:', error);
    updateMessage(thinkingMessage, `Gagal mendapatkan respons: ${error.message}`);
  } finally {
    setFormDisabled(false);
  }
});

function appendMessage(sender, text) {
  const message = document.createElement('div');
  message.classList.add('message', sender);
  message.textContent = text;
  chatBox.appendChild(message);
  scrollChatToBottom();
  return message;
}

function updateMessage(messageElement, text) {
  if (messageElement) {
    messageElement.textContent = text;
  }
  scrollChatToBottom();
}

function updateMessageHTML(messageElement, htmlContent) {
  if (messageElement) {
    messageElement.innerHTML = htmlContent;
  }
  scrollChatToBottom();
}

function appendLoadingMessage() {
  const message = document.createElement('div');
  message.classList.add('message', 'bot');

  const loader = document.createElement('div');
  loader.classList.add('loader');
  loader.setAttribute('aria-label', 'LocalBite sedang menyusun rekomendasi');
  loader.innerHTML = '<span></span><span></span><span></span>';

  message.appendChild(loader);
  chatBox.appendChild(message);
  scrollChatToBottom();
  return message;
}

function setFormDisabled(isDisabled) {
  input.disabled = isDisabled;
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Mencari...' : 'Cari';
}

function trimConversationHistory() {
  if (conversation.length > MAX_HISTORY_ITEMS) {
    conversation.splice(0, conversation.length - MAX_HISTORY_ITEMS);
  }
}

function scrollChatToBottom() {
  chatBox.scrollTop = chatBox.scrollHeight;
}

function parseMarkdown(text) {
  let html = escapeHTML(text)
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^---+$/gm, '<hr>')
    .replace(/^###\s?(.*)$/gm, '<h3>$1</h3>')
    .replace(/^##\s?(.*)$/gm, '<h3>$1</h3>')
    .replace(/^#\s?(.*)$/gm, '<h3>$1</h3>')
    .replace(/^-\s+(.*)$/gm, '<li>$1</li>')
    .replace(/\n\n+/g, '</p><p>')
    .replace(/\n/g, '<br>');

  html = html.replace(/(<li>.*?<\/li>)(<br>)?/gs, '<ul>$1</ul>');

  if (!html.startsWith('<p>') && !html.startsWith('<h3>') && !html.startsWith('<ul>')) {
    html = `<p>${html}</p>`;
  }

  return html;
}

function escapeHTML(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
