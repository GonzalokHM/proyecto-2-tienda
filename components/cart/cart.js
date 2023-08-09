import './cart.css';
import { state } from '../../src/state';
import cTemplate from './cartTemplate.js';
import { showPurchaseContainer } from './purchase';


const cartContainer = document.getElementById('cartContainer');
cartContainer.innerHTML=cTemplate;


const showCart = () => {
  const cartList = document.getElementById('cartList');
  const cart = state.getCart();
  const total = state.getTotal();
  cartList.innerHTML = '';
  cart.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <div class="cart-item">
    <h3>${item.name}</h3>
    <p>Cantidad: ${item.quantity}</p>
    <button class="removeFromCartBtn" data-remove-from-cart="${item.id}"><span class="removeIcon">&#x2716;</span></button>
    </div>
    `;
    cartList.appendChild(li);
  });
  
  
  const cartCountElem = document.getElementById('cartCount');
  cartCountElem.innerHTML = `${total.toFixed(2)}<span class="green-dollar">$</span>`;

  if (cart.length > 0) {
    cartList.style.display = 'block';
  } else {
    cartList.style.display = 'none';
  }
};

const toggleCart = () => {
  const navContainer= document.querySelector('.navbar-container')
  navContainer.classList.toggle('blurNone')
  cartContainer.classList.toggle('cart-hidden');
};


if (state.getCart().length > 0) {
  cartContainer.classList.remove('cart-hidden');
  // cartContainer.classList.remove('blurNone');
} else {
  cartContainer.classList.add('cart-hidden');
  // cartContainer.classList.add('blurNone');
}

cartList.addEventListener('click', (event) => {
  const removeBtn = event.target.closest('.removeFromCartBtn');
  if (removeBtn) {
    const id = removeBtn.dataset.removeFromCart;
    state.removeFromCart(id);
    showCart();
  }
});

const emptyCartBtn = document.getElementById('emptyCartBtn');
emptyCartBtn.addEventListener('click', () => {
  state.clearCart();
  showCart();
});

const purchaseBtn = document.getElementById('purchase');
purchaseBtn.addEventListener('click', () =>{
showPurchaseContainer()
state.clearCart();
showCart();
});

export { toggleCart, showCart };
