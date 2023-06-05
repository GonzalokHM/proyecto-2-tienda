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
  findItemById: function(id) {
    const stock = this.stock;
    const item = stock.find(function(item) {
      return item.id === id;
    });
    
    return item;
  },

  getItemById: function(id) {
    const item = this.findItemById(id);
    
    if (!item) {
      console.log(`No se encontró ningún elemento con id ${id}`);
      return;
    }
    return item;
  },
  
  addToCart: function(itemId, cart) {
    const existingCartItem = cart.find(item => item.id === itemId);
    if (existingCartItem) {
      const updatedCart = cart.map(item => {
        if (item.id === itemId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return updatedCart;
    } else {
      const itemToAdd = this.getItemById(itemId);
      const updatedCart = [...cart, { ...itemToAdd, quantity: 1 }];
      return updatedCart;
    }
  },
  


  
removeFromCart: function(itemId) {
  const cartItemIndex = this.cart.findIndex(item => item.id.toString() === itemId.toString());
  if (cartItemIndex !== -1) {
    const cartItem = this.cart[cartItemIndex];
    const stockItem = this.stock.find(item => item.id.toString() === itemId.toString());
    if (cartItem.quantity === 1) {
      stockItem.quantity += 1; // Aumentar la cantidad en 1 en el stock
      this.cart.splice(cartItemIndex, 1); // Eliminar el elemento del carrito si la cantidad llega a 1
    } else if (cartItem.quantity > 1) {
      cartItem.quantity -= 1; // Disminuir la cantidad en 1 en el carrito
    }
  }
  return this.cart;
},

  
  
    
  
  clearCart: function () {
    // Vacia el carrito y restaura las unidades en el stock.
    this.cart.forEach(item => {
      const stockItem = this.stock.find(stockItem => stockItem.id === item.id);
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
