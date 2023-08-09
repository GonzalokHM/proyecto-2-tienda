import "./chatBot.css"
import chatBotTemplate from "./chatBotTemplate"
import responses from "./responses"
import addButtonsToChatbot from "./addButtons"

let botReply = ''
let botJustAsked = false;

// Función para enviar un mensaje al chatbot
const sendMessage = () => {
  const input = document.getElementById('chatbotInput');
  const message = input.value.trim();

  if (message !== '') {
    addMessage(message, 'user');
    getBotReply(message);
    input.value = '';
  }
};

// Función para agregar un mensaje al contenedor del chat
const addMessage = (text, sender) => {
  const chatbotMessages = document.getElementById('chatbotMessages');
  const messageContainer = document.createElement('div');

  if (sender === 'chatbot') {
    messageContainer.classList.add('chatbot-message');
  } else if (sender === 'user') {
    messageContainer.classList.add('user-message');
  }
  messageContainer.textContent = text;
  chatbotMessages.appendChild(messageContainer);
};

//Obtener respuesta del chatbot
const getBotReply = (userMessage) => {
  const lowerCaseMessage = userMessage.toLowerCase();
  let matchedResponses = [];
  let foundMatch = false
console.log(botJustAsked)
  // Buscar palabras clave en el mensaje del usuario y agregar las respuestas correspondientes
  for (const keyword in responses) {
      if (lowerCaseMessage.includes(keyword.toLowerCase())) {
          matchedResponses.push(responses[keyword]);
          foundMatch = true;
      }
  }

  if (matchedResponses.length > 0) {
      // Mostrar todas las respuestas que coinciden con las palabras clave
      for (const response of matchedResponses) {
          addMessage(response, 'chatbot');
      
      if (response.includes('?')) {
        botJustAsked = true;
  }}} 
  // Verificar si el usuario dijo "sí" o "vale" y responder en consecuencia
if (botJustAsked && (lowerCaseMessage.includes('si') || lowerCaseMessage.includes('vale'))) {
  addButtonsToChatbot([
    { key: 'productos' },
    { key: 'placas solares' },
    { key: 'envio' },
    { key: 'formas pago' },
    { key: 'garantia' },
    { key: 'contacto' },
    { key: 'devoluciones' },
  ], addMessage, sendMessage);
 botJustAsked = false
}
    // Mostrar respuesta predeterminada si no hay coincidencias de palabras clave
   else if (!foundMatch || !botJustAsked) {

     botReply = 'Lo siento, no entiendo tu pregunta.';
    addMessage(botReply, 'chatbot');
    botJustAsked = false; // Establecer en falso ya que no se encontró una coincidencia 
  }
}



//Agregar el chatbot al DOM + eventliseners
const showChatbot = () => {
  const chatbotContainer = document.querySelector('.chatbot-container');
  if (!chatbotContainer) {
    const chatbotContainer = document.createElement('div');
    chatbotContainer.innerHTML = chatBotTemplate;
    document.body.appendChild(chatbotContainer);
    
    // Agregar evento al botón de cierre
    const closeButton = chatbotContainer.querySelector('.chatbot-close-btn');
    closeButton.addEventListener('click', closeChatbot);
    
    // Evento al botón de enviar chatBot
    const sendButton = document.getElementById('chatbotSendBtn');
    sendButton.addEventListener('click', sendMessage);
  }

  // Evento para enviar el mensaje con "Enter"
  const input = document.getElementById('chatbotInput');
  input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendMessage();
  }
});
};


// cambio color chatbotButton
let getRandomColor= () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const changeButtonColor= () =>{
  const randomColor = getRandomColor();
  chatbotButton.style.backgroundColor = randomColor;
}

let colorChangingInterval; // Variable para almacenar el intervalo

// Evento para mostrar el chatbot cuando se haga clic en el botón fijo
const chatbotButton = document.createElement('button');
chatbotButton.textContent = '❓';
chatbotButton.classList.add('chatbot-button'); // Clase para el botón fijo
chatbotButton.addEventListener('click', () => {
  showChatbot();
  clearInterval(colorChangingInterval); // Detener el intervalo al mostrar chatbotContainer
});
document.body.appendChild(chatbotButton);

// Iniciar el intervalo para cambiar el color solo si chatbotContainer no está presente
if (!document.querySelector('.chatbot-container')) {
  colorChangingInterval = setInterval(changeButtonColor, 500);
}

// Función para cerrar el chatbot
const closeChatbot = () => {
  const chatbotContainer = document.querySelector('.chatbot-container');
  clearInterval(colorChangingInterval);
  chatbotContainer.remove();
  if (!document.querySelector('.chatbot-container')) {
    colorChangingInterval = setInterval(changeButtonColor, 2800)
}};
export {addMessage}