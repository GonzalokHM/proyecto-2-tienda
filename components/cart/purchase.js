import purchaseTemplate from './purchaseTemplate.js';
import { state } from '../../src/state';
import templateForm from '../comments/commentsTemplateForm.js';
import quotes from './quotesBag.js';
import { handleFormSubmit } from '../comments/comments.js';

const cartContainer = document.getElementById('cartContainer');
cartContainer.insertAdjacentHTML('afterend', purchaseTemplate);


const purchaseContainer = document.getElementById('purchaseContainer');
const purchaseProducts = purchaseContainer.querySelector('#purchaseProducts');
const purchaseCloseBtn = purchaseContainer.querySelector('#purchaseCloseBtn');
const commentsPurchaseBtn = purchaseContainer.querySelector('#commentsPurchaseBtn');
let commentsFormAdded = false;

const showPurchaseContainer = () => {   

    const cart = state.getCart();
    
    if (cart.length === 0) {
        alert('¡¡Carrito vacio!!');
        return; // Detener si el carrito esta vacio.
    }

    // Agregar efecto de confeti
    const confettiContainer = document.getElementById('confettiContainer');
    confettiContainer.innerHTML = ''; // Limpiar el contenedor de confeti
    
    // Crear elementos de confeti
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        const randomColor = getRandomColor();
        confetti.style.background = randomColor;
        
        confettiContainer.appendChild(confetti);
    }
    
    
    purchaseProducts.innerHTML = cart
    .map((item) => `<p>${item.name} - Cantidad: ${item.quantity}</p>`)
    .join('');
    randomQuotes()
    
    purchaseContainer.style.display = 'flex';
    cartContainer.classList.add('cart-hidden')
    
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.disabled = true;
    
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000); // Desaparece el confeti

};



const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const closePurchaseContainer = () => {
    purchaseContainer.style.display = 'none';
    const navContainer = document.querySelector('.navbar-container');
    navContainer.classList.remove('blurNone') 
    const cartBtn = document.getElementById('cartBtn');
    cartBtn.disabled = false;
};

const continueComment = () => {

    if (!commentsFormAdded) {
  const commentsContainer = document.createElement('div');
  commentsContainer.classList.add('commentsContainerPurchase');
  commentsContainer.innerHTML = '<h2>Dejar un comentario</h2>' + '<div id="purchaseCloseBtn"><span class="closeIcon">&#x2716;<span></div>' 
    + templateForm;

  const commentsForm = commentsContainer.querySelector('#comments-form');
  commentsForm.addEventListener('submit', handleFormSubmit);

  const purchaseCloseBtn = commentsContainer.querySelector('#purchaseCloseBtn');
  purchaseCloseBtn.addEventListener('click', closePurchaseContainer);

  purchaseContainer.appendChild(commentsContainer);
  commentsFormAdded = true;
}};


const randomQuotes=()=>{
    const quoteTextElement = document.querySelector('.textQuote');
    const quoteAuthorElement = document.querySelector('.author');
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteTextElement.textContent = randomQuote.texto;
    quoteAuthorElement.textContent = randomQuote.autor;
}

purchaseCloseBtn.addEventListener('click', closePurchaseContainer);
commentsPurchaseBtn.addEventListener('click', continueComment);

export { showPurchaseContainer };
