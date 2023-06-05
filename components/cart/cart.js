import './cart.css';
import { state } from '../../src/state';

const cartList = document.getElementById('cartList');
const cartCountElem = document.getElementById('cartCount');
const cartContainer = document.getElementById('cartContainer');

const showCart = () => {
  const cart = state.getCart();
  const total = state.getTotal();

  cartList.innerHTML = '';
  cart.forEach((item) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cart-item">
        <h3>${item.name}</h3>
        <p>Cantidad: ${item.quantity}</p>
        <button class="removeFromCartBtn" data-remove-from-cart="${item.id}">Eliminar</button>
      </div>
    `;
    cartList.appendChild(li);
  });

  const cartCount = total.quantity;
  cartCountElem.textContent = cartCount;

  if (cart.length > 0) {
    cartList.style.display = 'block';
  } else {
    cartList.style.display = 'none';
  }
};

const toggleCart = () => {
  cartContainer.classList.toggle('cart-hidden');
};

const cartCount = state.getTotal().quantity;
cartCountElem.textContent = cartCount;

if (state.getCart().length > 0) {
  cartContainer.classList.remove('cart-hidden');
} else {
  cartContainer.classList.add('cart-hidden');
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

export { toggleCart, showCart };
