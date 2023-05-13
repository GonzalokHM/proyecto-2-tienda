import { stocks } from "./stock.js";

const state = {
  stock: [],
  cart: [],

  // Inicializa el estado del stock agregando la cantidad a cada elemento y creando una propiedad `selected` para marcar los elementos seleccionados.
   init: function () {
    this.stock = stocks.map(item => {
      return { ...item, quantity: item.quantityStock, selected: false };
    });
  },

  
  getStock: function () {
    // Devuelve una copia del stock actual.
    return this.stock.slice();
  },

  setCart: function(cart) {
    this.cart = cart;
  },
  
  
  getCart: function () {
    // Devuelve una copia del carrito actual.
    return this.cart.slice();
  },
  getItemById: function(id) {
    console.log('id received by getItemById function:', id);
    const stock = this.stock;
    const item = stock.find(function(item) {
      console.log('item being checked:', item);
      console.log('item id:', item.id);
      return item.id === id;
    });
    if (item === undefined) {
      console.log('item with id ' + id + ' not found');
      return;
    }
    console.log('item found by getItemById function:', item);
    return item;
  },
  
  addToCart: function(itemId, cart) {
    console.log('id passed to getItemById function:', itemId);
    const itemToAdd = this.getItemById(itemId);
    console.log('add>>>>>>>>',itemToAdd)
    if (!itemToAdd) {
      console.log(`No se encontró ningún elemento con id ${itemId}`);
      return cart.slice(); // Devuelve una copia del carrito actual sin hacer cambios
    }
  
    // Verifica si el item ya está en el carrito
    const existingCartItem = cart.find(item => item.id === itemId);
  
    if (existingCartItem) {
      // Si el item ya está en el carrito, actualiza la cantidad
      existingCartItem.quantity++;
    } else {
      // Si el item no está en el carrito, agrégalo
      cart.push({ ...itemToAdd, quantity: 1 });
    }

    console.log('updated cart:', cart);
    return cart.slice(); // Devuelve una copia actualizada del carrito
},


  removeFromCart: function (id) {
    // Busca el elemento en el carrito y lo elimina.
    const cartItem = this.cart.find(item => item.id === id);
    if (cartItem) {
      const stockItem = this.stock.find(item => item.id === id);
      stockItem.quantity += cartItem.quantity;
      this.cart.splice(this.cart.indexOf(cartItem), 1);
    }
  },

  clearCart: function () {
    // Vacia el carrito y restaura las unidades en el stock.
    this.cart.forEach(item => {
      const stockItem = this.stock.find(item => item.id === id);
      stockItem.quantity += item.quantity;
    });
    this.cart = [];
  },

  toggleSelected: function (id) {
    // Busca el elemento en el stock y cambia el estado de `selected`.
    const item = this.stock.find(item => item.id === id);
    if (item) {
      item.selected = !item.selected;
    }
  },

  getSelected: function () {
    // Devuelve una lista con los elementos seleccionados.
    return this.stock.filter(item => item.selected);
  },

  getTotal: function () {
    // Devuelve el total del carrito.
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
};

state.init();

export { state };
