import "./shop.css"
import {stock,searchItems,getItemById} from "../src/api"

const itemList = document.getElementById('itemList');
const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItemBtn');
const searchInput = document.getElementById('searchInput');

// Función para mostrar los productos en la lista
function showItems(items) {
  itemList.innerHTML = ''; // Vaciar la lista

  items.forEach(item => {
    const li = document.createElement('li');
    const img = document.createElement('img');
    const span = document.createElement('span');
    const deleteBtn = document.createElement('button');

    img.src = item.image; // Agrega la imagen del producto
    img.alt = item.name; // Agrega el nombre del producto como texto alternativo de la imagen
    span.textContent = item.name;
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', function() {
      li.remove();
    });

    li.appendChild(img);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    itemList.appendChild(li);
  });
}

function searchItemsHandler(query) {
  const filteredItems = searchItems(query);
  if (filteredItems.length === 0) {
    itemList.innerHTML = '<li>No se encontraron resultados</li>';
  } else {
    showItems(filteredItems);
  }
}
// Función para agregar productos a la lista
function addItemToList(item) {
  const itemInfo = getItemById(item);
  if (!itemInfo) {
   alert('Producto no encontrado en el stock');
    return;
  }
  const li = document.createElement('li');
  const img = document.createElement('img');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('button');

  img.src = itemInfo.image; // Agrega la imagen del producto
  img.alt = itemInfo.name; // Agrega el nombre del producto como texto alternativo de la imagen
  span.textContent = itemInfo.name;
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.addEventListener('click', function() {
    li.remove();
  });

  li.appendChild(img);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  itemList.appendChild(li);
  
}


// Adjuntar el controlador de eventos al botón Agregar
addItemBtn.addEventListener('click', () => {
  const item = parseInt(itemInput.value);
  addItemToList(item);
  itemInput.value = '';
  itemInput.focus();
});


// Adjuntar el controlador de eventos al input de búsqueda
searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  searchItemsHandler(query);
});

