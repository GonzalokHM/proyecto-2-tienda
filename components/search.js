import { stock } from '../src/stock';
import stringSimilarity from 'string-similarity';
import { showStock } from './shop';




const searchItems = (query) => {
    
    const threshold = 0.28; // Umbral de similitud
    const filteredItems = stock.filter(item => {
        // Normalizamos el query y el nombre y descripción del item
        const normalizedQuery = query.toLowerCase();
        const normalizedName = item.name.toLowerCase();
        const normalizedDescription = item.description.toLowerCase();
        
        // Calculamos la similitud entre el query y el nombre y descripción del item
        const similarityName = stringSimilarity.compareTwoStrings(normalizedQuery, normalizedName);
        const similarityDescription = stringSimilarity.compareTwoStrings(normalizedQuery, normalizedDescription);

        // Verificamos si la similitud es mayor al umbral
        return similarityName > threshold || similarityDescription > threshold;
    });
    return filteredItems;
};
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLowerCase();
  const filteredItems = searchItems(query);
  showStock(filteredItems);
});