import purchaseTemplate from './purchaseTemplate.js';
import { state } from '../../src/state';
import commentsTemplate from '../comments/commentsTemplate.js';
import quotes from './quotesBag.js';

const cartContainer = document.getElementById('cartContainer');
cartContainer.insertAdjacentHTML('afterend', purchaseTemplate);


const purchaseContainer = document.getElementById('purchaseContainer');
const purchaseProducts = purchaseContainer.querySelector('#purchaseProducts');
const purchaseCloseBtn = purchaseContainer.querySelector('#purchaseCloseBtn');
const commentsShoppingBtn = purchaseContainer.querySelector('#commentsShoppingBtn');

const showPurchaseContainer = () => {   
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
    const cart = state.getCart();
    
    
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
    }, 5000); // Desaparecer el confeti después de 5 segundos

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

const continueShopping = () => {
    const purchaseContainer = document.getElementById('purchaseContainer');
    purchaseContainer.innerHTML = '<h2>Dejar un comentario</h2>' + '<div id="purchaseCloseBtn"><span class="closeIcon">&#x2716;<span></div>' 
    + commentsTemplate;
    const purchaseCloseBtn = purchaseContainer.querySelector('#purchaseCloseBtn');
    purchaseCloseBtn.addEventListener('click', closePurchaseContainer);
    const loadCommentsButton = document.getElementById('load-comments');
    if (loadCommentsButton.closest('#purchaseContainer')) {
        loadCommentsButton.style.display = 'none';
    }
};

const randomQuotes=()=>{
    const quoteTextElement = document.querySelector('.textQuote');
    const quoteAuthorElement = document.querySelector('.author');
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteTextElement.textContent = randomQuote.texto;
    quoteAuthorElement.textContent = randomQuote.autor;
}

purchaseCloseBtn.addEventListener('click', closePurchaseContainer);
commentsShoppingBtn.addEventListener('click', continueShopping);

export { showPurchaseContainer };
