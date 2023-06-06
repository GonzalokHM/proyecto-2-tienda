import "./style.css";
import "./components/comments/comments.js";
import "./components/cart/cart.js";


import { initializeSearch } from "./components/search/search";
import { showStock } from "./components/shop/shop";
import { toggleCart, showCart} from "./components/cart/cart";
import { state } from "./src/state";

const navbarContainer = document.querySelector('.navbar-container');
const navbarHeight = navbarContainer.offsetHeight;



window.addEventListener('load', () => {
  
  const loading = document.getElementById('welcome');
  loading.classList.add('show');
  const navbar = document.querySelector('.navbar-container');
  setTimeout(() => {
    $('#welcome').fadeOut(1000, () => {
      $(this).remove();
      navbar.classList.remove('welcome-hidden'); // elimina la clase 'hidden' del navbar
    });
  }, 3000);
});

const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('#navbar');
const nav = document.querySelector('.nav');
const cartBtn = document.getElementById('cartBtn');
cartBtn.addEventListener("click", toggleCart);



menuIcon.addEventListener('click', () => {
  menuIcon.classList.toggle('open');
  navbar.classList.toggle('open');
  nav.classList.toggle('hidden');
});





state.init();

// window.addEventListener('load', showStock);

window.addEventListener('DOMContentLoaded', () => {
  showStock();
  initializeSearch()
  showCart(state.getCart());
  const addToCartButtons = document.querySelectorAll('.addToCartBtn');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemId = parseInt(button.getAttribute('data-add-to-cart'));
      const cart = state.getCart();
      const updatedCart = state.addToCart(itemId, cart);
      state.setCart(updatedCart);
      showCart(updatedCart);
      const itemToAdd = updatedCart.find(item => item.id === itemId);
      const message = document.createElement('p');
      message.textContent = `${itemToAdd.name} se ha añadido al carrito!`;
      message.classList.add('success-message');
      document.body.appendChild(message);
      setTimeout(() => {
        message.remove();
      }, 2000);
    });
  });

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > navbarHeight) {
      navbarContainer.classList.add('fixed');
    } else {
      navbarContainer.classList.remove('fixed');
    }
  });
  
});
