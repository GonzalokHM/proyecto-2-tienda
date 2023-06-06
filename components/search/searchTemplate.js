const searchTemplate = `
<div class= "search-form">
  <div class="input">
    <input type="text" id="searchInput" placeholder="Buscar producto por nombre" size="21">
  </div>
  <div class="filter">
    <h3>Filtrar por precio:</h3>
    <input type="range" id="minPrice" min="0" max="3000" value="0">
    <input type="range" id="maxPrice" min="0" max="3000" value="3000">
    <p id="selectedPrice">Precio: $0 - $3000</p>
  </div>
  <div class="filter">
    <h3>Filtrar por categoría:</h3>
    <select id="categorySelect">
      <option value="">Todas las categorías</option>
      <option value="solar">Solar</option>
      <option value="eolica">Eólica</option>
      <option value="baterias">Baterías</option>
      <option value="otros">inversores</option>
    </select>
  </div>
  <div class="sort">
    <h3>Ordenar por:</h3>
    <select id="sortSelect">
      <option value="price-asc">Precio</option>
      <option value="price-desc">Precio (descendente)</option>
      <option value="stars-asc">Estrellas</option>
      <option value="stars-desc">Estrellas (descendente)</option>
    </select>
  </div>
  </div>
`;

export default searchTemplate;
