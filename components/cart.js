import {stock} from "../src/stock";
import  "./cart.css"
import { state } from '../main';


//Variables para almacenar el carrito y el contador del carrito
let cart = [];
let cartCount = 0;

// Obtener los elementos del DOM necesarios
const itemList = document.getElementById("itemList");
const cartList = document.getElementById("cartList");
const emptyCartBtn = document.getElementById("emptyCartBtn");
const cartContainer = document.getElementById("cartContainer");
const cartCountElem = document.getElementById("cartCount");



// Función para encontrar un objeto del inventario por su ID
const getItemById = (id) => {
    const item = stock.find(item => item.id === id);
    return item;
  }
  
// Función para añadir un objeto al carrito
const addToCart = (id) => {
  const item = state.stock.find((item) => item.id === id);
  if (item) {
    const itemInCart = state.cart.find((cartItem) => cartItem.id === id);
    if (itemInCart) {
      itemInCart.quantity++;
    } else {
      state.cart.push({ ...item, quantity: 1 });
    }
    updateCart();
  }
};

  

const removeFromCart = (id) => {
  const itemIndex = state.cart.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    state.cart.splice(itemIndex, 1);
    updateCart();
  }
};


const updateCart = () => {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';

  state.cart.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cartItem">
        <h3>${item.name}</h3>
        <p>${item.price} x ${item.quantity}</p>
        <button class="removeFromCartBtn" data-id="${item.id}">Eliminar</button>
      </div>
    `;
    cartList.appendChild(li);
  });

 
  const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCountElem.textContent = cartCount.toString();

  
  if (state.cart.length > 0) {
    cartContainer.classList.remove('hidden');
  } else {
    cartContainer.classList.add('hidden');
  }
};