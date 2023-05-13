import "./shop.css"
import { state } from '../src/state';
import {showCart} from "./cart";

const itemList = document.getElementById('itemList');
const cartList = document.getElementById('cartList');
const cartContainer = document.getElementById('cartContainer');
const stock = state.getStock();

const showStock = () => {
  itemList.innerHTML = '';
  
  stock.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="item">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}</p>
        <button id="addToCartBtn-${item.id}" class="addToCartBtn" data-add-to-cart="${item.id}">Agregar al Carrito</button>
        <div class="description-container hidden">
          <p class="description">${item.description}</p>
        </div>
        <button class="showMoreBtn">+ Info</button>
      </div>
    `;
    const addToCartButtons = li.querySelectorAll('.addToCartBtn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
        const itemId = button.getAttribute('data-add-to-cart');
        // Obtener el carrito actual
        const cart = state.getCart();
        // Agregar el elemento seleccionado al carrito
        const updatedCart = state.addToCart(itemId, cart);
        // Actualizar el estado del carrito con el carrito actualizado
        state.setCart(updatedCart);
        console.log('updatecart>>',updatedCart);
        showCart(updatedCart);
        console.log('antes', cart);
        console.log('despues', updatedCart);
        // Mostrar mensaje de éxito
        const itemToAdd = updatedCart.find(item => item.id === itemId);
        const message = document.createElement('p');
        message.textContent = `${itemToAdd.name} se ha añadido al carrito!`;
        message.classList.add('success-message');
        document.body.appendChild(message);
        // Desvanecer mensaje después de 2 segundos
        setTimeout(() => {
          message.remove();
        }, 2000);
      });
    });
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