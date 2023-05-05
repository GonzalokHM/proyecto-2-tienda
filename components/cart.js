import  "./cart.css"
import { state } from '../src/state';


// Obtener los elementos del DOM necesarios
const cartList = document.getElementById("cartList");
const cartContainer = document.getElementById("cartContainer");
const cartCountElem = document.getElementById("cartCount");

   
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



const updateCart = () => {
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

const removeFromCart = (id) => {
  const itemIndex = state.cart.findIndex((item) => item.id === id);
  if (itemIndex !== -1) {
    state.cart.splice(itemIndex, 1);
    updateCart();
  }
};

cartList.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".removeFromCartBtn");
  if (removeBtn) {
    const id = removeBtn.dataset.id;
    removeFromCart(id);
  }
});

export { addToCart, removeFromCart, updateCart };