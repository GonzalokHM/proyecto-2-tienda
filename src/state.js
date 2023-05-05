import { stock } from "./stock.js";

const state = {
  stock: [],
  cart: [],

  init: function () {
    // Inicializa el estado del stock agregando la cantidad a cada elemento y creando una propiedad `selected` para marcar los elementos seleccionados.
    this.stock = stock.map(item => {
      return { ...item, quantity: 0, selected: false };
    });
  },

  getStock: function () {
    // Devuelve una copia del stock actual.
    return this.stock.slice();
  },

  getCart: function () {
    // Devuelve una copia del carrito actual.
    return this.cart.slice();
  },

  addToCart: function (id) {
    // Busca el elemento en el stock y lo agrega al carrito si hay suficientes unidades disponibles.
    const item = this.stock.find(item => item.id === id);
    const cartItem = this.cart.find(item => item.id === id);
    if (item && item.quantity > 0 && (!cartItem || !cartItem.selected)) {
      if (cartItem) {
        cartItem.quantity++;
      } else {
        this.cart.push({ ...item, quantity: 1 });
      }
      item.quantity--;
    }
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
      const stockItem = this.stock.find(item => item.id === item.id);
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
