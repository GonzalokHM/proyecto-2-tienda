import "./shop.css"
import { stock } from '../src/stock';
import { state } from '../main';

 const itemList = document.getElementById('itemList');

const showStock = (items = state.stock) => {
  itemList.innerHTML = '';

  state.stock.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="item">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button class="addToCartBtn" data-id="${item.id}">Agregar al Carrito</button>
        <div class="description-container hidden">
        <p class="description">${item.description}</p>
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
}

const cart = document.getElementById('cart');
const cartContainer = document.getElementById('cartContainer');

cart.addEventListener('click', () => {
  cartContainer.classList.toggle('hidden');
});


showStock()
console.log(showStock)


export {showStock};


  

