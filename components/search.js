import { stock } from '../src/stock';
import stringSimilarity from 'string-similarity';
import { showStock } from './shop';
import "./shop.css"



const searchItems = (query) => {
    
    const threshold = 0.28; // Umbral de similitud
    const filteredItems = stock.filter(item => {
       // Normalizamos el query y el nombre y descripción del item
       const normalizedQuery = query.trim().toLowerCase();
       const normalizedName = item.name.trim().toLowerCase();
       const normalizedDescription = item.description.trim().toLowerCase();

        
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
  const query = searchInput.value;
  const filteredItems = searchItems(query);
  showStock(filteredItems);;
});