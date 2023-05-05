import "./style.css";
import "./components/comments.js";
import "./components/search.js";
import "./components/cart.js";
import "./components/cart.js"

import { showStock } from "./components/shop";
import { state } from "./src/state";

const navbarContainer = document.querySelector('.navbar-container');
const navbarHeight = navbarContainer.offsetHeight;


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