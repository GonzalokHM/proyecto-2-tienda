const searchTemplate = `
<div class= "search-form ">
  <div class="input">
    <input type="text" id="searchInput" placeholder="Buscar producto por nombre" size="21">
    <i class="icon">🔍</i>
  </div>
  <div class="filter">
    <i>💲</i>
    <input type="range" id="minPrice" min="0" max="3000" value="0">
    <input type="range" id="maxPrice" min="0" max="3000" value="3000">
    <p id="selectedPrice">Precio: $0 - $3000</p>
  </div>
  <div class="filter">
    <select id="categorySelect">
      <option value="">Todas las categorías</option>
      <option value="solar">Solar</option>
      <option value="eolica">Eólica</option>
      <option value="baterias">Baterías</option>
      <option value="inversores">inversores</option>
    </select>
  </div>
  <div class="sort">
    <select id="sortSelect">
      <option value="">ordenar por:</option>
      <option value="price-asc">Precio</option>
      <option value="price-desc">Precio (descendente)</option>
      <option value="stars-asc">Estrellas</option>
      <option value="stars-desc">Estrellas (descendente)</option>
    </select>
  </div>
  <button id= "resetFilters">♻️</button>
  </div>
`;

export default searchTemplate;
