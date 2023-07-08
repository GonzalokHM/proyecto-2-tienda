import "./shop.css"
import { state } from '../../src/state';
import { showCart } from "../cart/cart"; 

const itemList = document.getElementById('itemList');
const itemsPerPage = 8; // Cantidad de productos por página
let currentPage = 1; // Página actual
const stock = state.getStock();


const showStock = () => {
   let filteredItems = state.getFilteredStock();// Obtener los filtros desde el estado
   console.log('filteredItems',filteredItems)
   console.log('stock',stock)

  if (filteredItems.length === 0) {
    filteredItems = stock; // Mostrar todo el stock si no hay elementos filtrados
  }
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentPageItems = filteredItems.slice(startIndex, endIndex);
  
  itemList.innerHTML = '';

  currentPageItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="item">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.price}<span class="green-dollar">$</span></p>
        <button id="addToCartBtn-${item.id}" class="addToCartBtn" data-add-to-cart="${item.id}">Agregar al Carrito</button>
        <div class="description-container hidden">
          <p class="description">${item.description}</p>
          <div class="rating" data-rating="${item.stars}"></div> 
        </div>
        <button class="showMoreBtn">+ Info</button>
      </div>
    `;

    
    // stars
    const ratingContainer = li.querySelector('.rating');
    const starsNumber = parseInt(ratingContainer.getAttribute('data-rating'));

    // Crea las estrellas según el número obtenido
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      
      if (i <= starsNumber) {
        star.classList.add('filled');
      }
      
      star.innerHTML = '&#9733;'; // Inserta el carácter de estrella
      ratingContainer.appendChild(star);
    }
    
    const showDescriptionButtons = li.querySelectorAll('.showMoreBtn'); 
    showDescriptionButtons.forEach(button => {
      button.addEventListener('click', () => {
        const descriptionContainer = button.previousElementSibling;
        descriptionContainer.classList.toggle('hidden');
      });
    });
    itemList.appendChild(li);
  });
  const addToCartButtons = itemList.querySelectorAll('.addToCartBtn');
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
  // Verificar si la página actual está más allá del número total de páginas
  if (startIndex >= filteredItems.length) {
   currentPage--;
   showStock(filteredItems);
  }
  updatePageNumbers();
};


const nextPage = () => {
  currentPage++;
  showStock();
  
}

const previousPage=()=> {
  if (currentPage > 1) {
    currentPage--;
    showStock();
    

  }
}

const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= getTotalPages()) {
    currentPage = pageNumber;
    showStock();
    
  }
};

const getTotalPages = () => {
  const filteredItems = state.getFilteredStock();
  const totalItems = filteredItems.length > 0 ? filteredItems.length : stock.length;
  return Math.ceil(totalItems / itemsPerPage);
};

const updatePageNumbers = () => {
  const totalPages = getTotalPages();
  const currentPageNumber = document.getElementById('currentPageNumber');
  currentPageNumber.innerHTML = '';

  const previousButton = document.createElement('a');
  previousButton.textContent = '<';
  previousButton.href = '#products';
  previousButton.classList.add('previous-button')
  previousButton.addEventListener('click', previousPage);
  currentPageNumber.appendChild(previousButton);

  for (let i = 1; i <= totalPages; i++) {
    const pageLink = document.createElement('a');
    pageLink.textContent = i;
    pageLink.href = '#products';
    pageLink.addEventListener('click', () => goToPage(i));

    if (i === currentPage) {
      pageLink.classList.add('current-page');
    }

    currentPageNumber.appendChild(pageLink);
  }
  const nextButton = document.createElement('a');

  nextButton.textContent = '>';
  nextButton.href = '#products';
  nextButton.classList.add('next-button')
  nextButton.addEventListener('click', nextPage);
  currentPageNumber.appendChild(nextButton);

};

showStock();
updatePageNumbers();

export {showStock};