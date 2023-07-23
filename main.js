import "./style.css";
import "./components/comments/comments.js";
import "./components/cart/cart.js";

import { initializeSearch } from "./components/search/search";
import { showStock } from "./components/shop/shop";
import { toggleCart, showCart} from "./components/cart/cart";
import { state } from "./src/state";
import contactTemplate from "./components/contact";

const navbarContainer = document.querySelector('.navbar-container');
const navbarHeight = navbarContainer.offsetHeight;

// Mostrar el "welcome" al inicio
const loading = document.getElementById('welcome');
loading.classList.add('show');

// Mostrar el contenido y otros elementos después de cargar la página
window.addEventListener('DOMContentLoaded', () => {
  // Ocultar el "welcome" cuando la página esté lista
  $('#welcome').fadeOut(3000, () => {
    $(loading).remove();
    navbarContainer.classList.remove('welcome-hidden'); // elimina la clase 'hidden' del navbar
  });

  // Mostrar todo el contenido
  document.body.style.visibility = "visible";

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
    
  const showSearchForm = searchForm.classList.contains('show-search');
  // Cambiar la dirección flexible del navbar según si el formulario de búsqueda está abierto o cerrado
  const navbarUl = document.querySelector("#navbar ul");
  if (showSearchForm) {
    navbarUl.classList.add("column");
  } else {
    navbarUl.classList.remove("column");
  }
  });





state.init();


window.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbarContainer.classList.add('fixed');
  } else {
    navbarContainer.classList.remove('fixed');
  }
});

showStock();
initializeSearch()
showCart(state.getCart());
});

const contactContainer= document.getElementById('contactInfo');
contactContainer.innerHTML= contactTemplate;