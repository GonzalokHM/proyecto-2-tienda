import  "./cart.css"
import { state } from '../src/state';


// Obtener los elementos del DOM necesarios
const cartList = document.getElementById("cartList");
const cartCountElem = document.getElementById("cartCount");
const cartContainer = document.getElementById("cartContainer");

const cart = state.getCart();
const total = state.getTotal();

const toggleCart = () => {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.classList.toggle("cart-hidden");
};


  
  
  const cartCount = total.quantity;
  cartCountElem.textContent = cartCount;
  
  
  if (cart.length > 0) {
    cartContainer.classList.remove('cart-hidden');
  } else {
    cartContainer.classList.add('cart-hidden');
  }



cartList.addEventListener("click", (event) => {
  const removeBtn = event.target.closest(".removeFromCartBtn");
  if (removeBtn) {
    const id = removeBtn.dataset.id;
    removeFromCart(id);
  }
});

const showCart = () => {
  console.log('Mostrando carrito:');
  console.log(cart);
 
  
  cartList.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="cart-item">
      <h3>${item.name}</h3>
      <p>Cantidad: ${item.quantity}</p>
      <button class="removeBtn" data-remove-from-cart="${item.id}">Eliminar</button>
    </div>
    `;
    cartList.appendChild(li);
  });
    
  const cartCount = total.quantity;
  cartCountElem.textContent = cartCount;
  
  
  if (cart.length > 0) {
    cartContainer.classList.remove('cart-hidden');
  } else {
    cartContainer.classList.add('cart-hidden');
  }
  const removeButtons = document.querySelectorAll('.removeBtn');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = button.getAttribute('data-remove-from-cart');
      state.removeFromCart(itemId);
      showCart();
    });
  });
  console.log('Carrito mostrado.');

}

export {toggleCart, showCart};