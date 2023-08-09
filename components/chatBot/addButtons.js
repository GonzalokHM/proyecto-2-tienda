import {addMessage } from "./chatBot"
import responses from "./responses";

// Función para mostrar los botones con keys en el chatbot
const addButtonsToChatbot = (buttonsData) => {
    const buttonContainer = document.createElement('div');
    let selectedKey = '';
    // Mostrar el mensaje "en que puedo ayudarte:"
    addMessage('En qué puedo ayudarte:', 'chatbot');
  
    // Crear y mostrar los botones con las keys
    buttonsData.forEach((buttonData) => {
      const button = document.createElement('button');
      button.textContent = buttonData.key;
      button.addEventListener('click', () => {
        // Al hacer clic en el botón, guardar la key seleccionada
        selectedKey = buttonData.key;
       
        const response = responses[selectedKey];
        if (response) {
          addMessage(response, 'chatbot');
        }
      });
      buttonContainer.appendChild(button);
    });
  
    chatbotMessages.appendChild(buttonContainer);
  };

  export default addButtonsToChatbot