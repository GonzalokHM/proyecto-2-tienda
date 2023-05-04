import "./style.css";
import "./components/comments.js";
import "./components/search.js";
import "./components/cart.js";
import "./components/cart.js"


const navbarContainer = document.querySelector('.navbar-container');
const navbarHeight = navbarContainer.offsetHeight;
const updatedStock = stock.map(item => {
  return { ...item, quantity: 0 };
});

const state = {
  stock,
  cart: []
};
showStock(state.stock);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > navbarHeight) {
    navbarContainer.classList.add('fixed');
  } else {
    navbarContainer.classList.remove('fixed');
  }
});

export { state, updatedStock };

  




  



