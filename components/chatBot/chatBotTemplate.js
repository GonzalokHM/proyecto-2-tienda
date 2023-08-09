const chatBotTemplate = `
<div class="chatbot-container">
  <div class="chatbot-header">
    <span class="chatbot-title">Chatbot</span>
    <button class="chatbot-close-btn">x</button>
  </div>
  <div class="chatbot-messages" id="chatbotMessages">
    <!-- Aquí se mostrarán los mensajes del chatbot y del usuario -->
  </div>
  <div class="chatbot-input">
    <input type="text" id="chatbotInput" placeholder="Escribe tu mensaje...">
    <button id="chatbotSendBtn">Enviar</button>
  </div>
</div>
`;

export default chatBotTemplate