import stringSimilarity from 'string-similarity';
import { showStock } from '../shop/shop';
import searchTemplate from './searchTemplate';
import { state } from '../../src/state';
import "./search.css"


 const initializeSearch = () => {

   const searchOptionsContainer = document.getElementById('searchOptionsContainer');
   searchOptionsContainer.insertAdjacentHTML('afterbegin', searchTemplate);
   const togleSearch = document.querySelector('.searchOpen');
   const searchForm = document.querySelector('.search-form');
   searchForm.classList.add('hide-search');

// Ocultar el formulario de búsqueda al cargar la página


togleSearch.addEventListener('click', () => {
  searchForm.classList.toggle('show-search');
  searchForm.classList.toggle('hide-search');
  const navbarUl = document.querySelector("#navbar ul");
  const showSearchForm = searchForm.classList.contains('show-search');
  if (showSearchForm) {
    navbarUl.classList.add("column");
  } else {
    navbarUl.classList.remove("column");
  }
});




const searchInput = document.getElementById('searchInput');
const minPriceInput = document.getElementById('minPrice');
const maxPriceInput = document.getElementById('maxPrice');
const categorySelect = document.getElementById('categorySelect');
const sortSelect = document.getElementById('sortSelect');
const selectedPrice = document.getElementById('selectedPrice');

const filterItems = () => {
  const searchText = searchInput.value.toLowerCase();
  const minPrice = parseFloat(minPriceInput.value);
  const maxPrice = parseFloat(maxPriceInput.value);
  const category = categorySelect.value;
  const sortOption = sortSelect.value;

  const threshold = 0.28; // Umbral de similitud

  const filteredItems = state.getStock().filter(item => {
    const normalizedName = item.name.trim().toLowerCase();
    const normalizedDescription = item.description.trim().toLowerCase();

    const nameMatch = searchText === '' || stringSimilarity.compareTwoStrings(searchText, normalizedName) > threshold;
    const descriptionMatch = searchText === '' || stringSimilarity.compareTwoStrings(searchText, normalizedDescription) > threshold;
    const priceMatch = item.price >= minPrice && item.price <= maxPrice;

    const categoryMatch = category === '' || item.category === category;

    return (nameMatch || descriptionMatch) &&
    ((priceMatch && (minPrice !== '' || maxPrice !== '')) || (minPrice === '' && maxPrice === '')) &&
    (categoryMatch || category === '');
  
  

  });

  

  const sortOptions = {
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    'stars-asc': (a, b) => a.stars - b.stars,
    'stars-desc': (a, b) => b.stars - a.stars
  };

  if (sortOption in sortOptions) {
    filteredItems.sort(sortOptions[sortOption]);
  }

  state.setFilteredStock(filteredItems); // Almacenar los elementos filtrados en el estado


  if (filteredItems.length === 0) {
    // Si no hay productos en el rango de precios seleccionado, muestra un mensaje en lugar de los productos
    showNoProductsMessage();
  } else {
    // Si hay productos en el rango de precios seleccionado, muestra los productos normalmente
    showStock(filteredItems);
  }
};

const showNoProductsMessage = () => {
  const productsList = document.getElementById('itemList');
  productsList.innerHTML = '<p class="no-products-message">¡No hay productos en ese rango de precios!</p>';
};


// Actualizar el rango de precios seleccionado
const updateSelectedPrice = () => {
  const minPrice = parseFloat(minPriceInput.value);
  const maxPrice = parseFloat(maxPriceInput.value);
  selectedPrice.textContent = `Precio: $${minPrice} - $${maxPrice}`;
};

// Event listeners para los campos de búsqueda, rango de precios y select de ordenamiento
searchInput.addEventListener('input', filterItems);

minPriceInput.addEventListener('input', () => {
  const minPrice = parseFloat(minPriceInput.value);
  const maxPrice = parseFloat(maxPriceInput.value);

  if (minPrice > maxPrice) {
    maxPriceInput.value = minPrice + 1;
  }
  updateSelectedPrice();
  filterItems();
});
maxPriceInput.addEventListener('input', () => {
  const minPrice = parseFloat(minPriceInput.value);
  const maxPrice = parseFloat(maxPriceInput.value);

  if (maxPrice < minPrice) {
    minPriceInput.value = maxPrice - 1;
  }
  updateSelectedPrice();
  filterItems();
});
categorySelect.addEventListener('change', filterItems);
sortSelect.addEventListener('change', filterItems);


const resetFiltersButton = document.getElementById('resetFilters');

resetFiltersButton.addEventListener('click', () => {
  // Restablecer los valores de los campos de filtro
  searchInput.value = '';
  minPriceInput.value = 0;
  maxPriceInput.value = 3000;
  categorySelect.value = '';
  sortSelect.value = '';

  // Actualizar el texto del rango de precios seleccionado
  updateSelectedPrice();

  // Aplicar los filtros
  filterItems();
});
};

export {initializeSearch};