import "./style.css";
import "./components/comments.js";
import "./components/search.js";
import "./components/cart.js";

import { showStock } from "./components/shop";
import { toggleCart } from "./components/cart";
import { state } from "./src/state";
console.log(toggleCart)
const navbarContainer = document.querySelector('.navbar-container');
const navbarHeight = navbarContainer.offsetHeight;

window.addEventListener('load', function() {
  const loading = document.getElementById('welcome');
  loading.classList.add('show');
  const navbar = document.querySelector('.navbar-container');
  setTimeout(function() {
    $('#welcome').fadeOut(1000, function() {
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

menuIcon.addEventListener('click', function() {
  menuIcon.classList.toggle('open');
  navbar.classList.toggle('open');
  nav.classList.toggle('hidden');

});



state.init();

window.addEventListener('load', showStock);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > navbarHeight) {
    navbarContainer.classList.add('fixed');
  } else {
    navbarContainer.classList.remove('fixed');
  }
});

showStock(state);