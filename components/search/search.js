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

// Ocultar el formulario de búsqueda al cargar la página
searchForm.classList.add('hide-search');

togleSearch.addEventListener('click', () => {
  const isSearchVisible = searchForm.classList.contains('show-search');

  // Si el menú está abierto y el formulario de búsqueda no está visible, mostrarlo
  if (togleSearch.classList.contains('open') && !isSearchVisible) {
    searchForm.classList.add('show-search');
    searchForm.classList.remove('hide-search');
    searchOptionsContainer.innerHTML = searchTemplate;
  } else {
    // De lo contrario, ocultar el formulario de búsqueda y limpiar el contenedor
    searchForm.classList.remove('show-search');
    searchForm.classList.add('hide-search');
    searchOptionsContainer.innerHTML = '';
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

  showStock(filteredItems);
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
  updateSelectedPrice();
  filterItems();
});
maxPriceInput.addEventListener('input', () => {
  updateSelectedPrice();
  filterItems();
});
categorySelect.addEventListener('change', filterItems);
sortSelect.addEventListener('change', filterItems);
};

export {initializeSearch};