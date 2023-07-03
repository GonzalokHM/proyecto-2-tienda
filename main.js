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

    // Ocultar el formulario de búsqueda si está visible
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
      searchForm.classList.add('hide-search');
      searchForm.classList.remove('show-search');
    }
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
      const productText = document.createElement('span');
      productText.textContent = itemToAdd.name;
      const addText = document.createTextNode(' se ha añadido al carrito!');
      message.appendChild(productText);
      message.appendChild(addText);
      
      productText.style.color = 'black'; 
      productText.style.fontWeight = 'bold'; 
      
      message.classList.add('success-message');
      document.body.appendChild(message);
      
      const blurBackground = document.createElement('div');
      blurBackground.classList.add('fondo-translucido');
      document.body.appendChild(blurBackground);
      setTimeout(() => {
        message.classList.add('resaltado');
      }, 0);
      setTimeout(() => {
        message.remove();
      }, 2500);
    });
    
  });
 
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
      navbarContainer.classList.add('fixed');
    } else {
      navbarContainer.classList.remove('fixed');
    }
  });
});
