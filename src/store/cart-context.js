import React from 'react';

// This is the default context called by <CartProvider
// This CartContext object is only used for initialization and gets overwritten immediately
// This is because <CartProvider> has a value set to a cartContext object within CartProvider.jsx
const CartContext = React.createContext({
  // Holds and array of cart item objects
  // each item object contains: { id, name, amount, price }
  items: [],
  // Contains sum of all items[item.price] values
  totalAmount: 0,
  // Initiate a function to add an item to the cart
  // Is given functionality within <CartProvider> cartContext.addItem
  addItem: (item) => {},
  // Initiate a function to remove an item from the cart
  // Is given functionality within <CartProvider> cartContext.removeItem
  removeItem: (item) => {}
});

export default CartContext