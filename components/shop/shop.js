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
          <p class="stars">${item.stars}
        </div>
        <button class="showMoreBtn">+ Info</button>
      </div>
    `;

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