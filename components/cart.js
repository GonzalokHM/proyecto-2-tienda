import {stock} from "../src/stock";


const itemList = document.getElementById('itemList');
const cartList = document.getElementById('cartList');
const emptyCartBtn = document.getElementById('emptyCartBtn');

let cart = [];

const getItemById = (id) => {
    const item = stock.find(item => item.id === id);
    return item;
  }
  
 

function addToCart(id) {
    let itemExists = false;
    const item = getItemById(id);
    
    for (const cartItem of cart) {
      if (cartItem.id === id) {
        cartItem.quantity++;
        itemExists = true;
        break;
      }
    }
    
    if (!itemExists) {
      cart.push({...item, quantity: 1 });
    }
    
    updateCart(stock);
  }
  

const removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCart(stock);
}

const updateCart = (stock) => {
  cartList.innerHTML = '';

  cart.forEach(item => {
    const stockItem = stock.find(i => i.id === item.id);
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cartItem">
        <h3>${stockItem.name}</h3>
        <p>${stockItem.price} x ${item.quantity}</p>
        <button class="removeFromCartBtn" data-id="${stockItem.id}">Eliminar</button>
      </div>
    `;
    cartList.appendChild(li);
  });
}
itemList.addEventListener('click', event => {
    if (event.target.classList.contains('addToCartBtn')) {
      const id = parseInt(event.target.dataset.id);
      addToCart(id);
    }
  });
  
  cartList.addEventListener('click', event => {
    if (event.target.classList.contains('removeFromCartBtn')) {
      const id = parseInt(event.target.dataset.id);
      removeFromCart(id);
    }
  });
  
  emptyCartBtn.addEventListener('click', () => {
    cart = [];
    updateCart(stock);
  });