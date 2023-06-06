import "./shop.css"
import { state } from '../../src/state';

const itemList = document.getElementById('itemList');
const cartList = document.getElementById('cartList');
const cartContainer = document.getElementById('cartContainer');
const stock = state.getStock();

const showStock = (filteredItems = stock) => {
  itemList.innerHTML = '';

  filteredItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="item">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button id="addToCartBtn-${item.id}" class="addToCartBtn" data-add-to-cart="${item.id}">Agregar al Carrito</button>
        <div class="description-container hidden">
          <p class="description">${item.description}</p>
          <div class="rating" data-rating="${item.stars}"></div> 
        </div>
        <button class="showMoreBtn">+ Info</button>
      </div>
    `;
    // stars
    const ratingContainer = li.querySelector('.rating');
    const starsNumber = parseInt(ratingContainer.getAttribute('data-rating'));

    // Crea las estrellas según el número obtenido
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      
      if (i <= starsNumber) {
        star.classList.add('filled');
      }
      
      star.innerHTML = '&#9733;'; // Inserta el carácter de estrella
      ratingContainer.appendChild(star);
    }
    
    const showDescriptionButtons = li.querySelectorAll('.showMoreBtn'); 
    showDescriptionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const descriptionContainer = button.previousElementSibling;
        descriptionContainer.classList.toggle('hidden');
      });
    });
    itemList.appendChild(li);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  showStock();
  cartList.addEventListener('click', () => {
    cartContainer.classList.toggle('Cart-hidden');
  });
});

export {showStock};