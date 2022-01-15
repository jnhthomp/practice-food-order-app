import React,{ useReducer } from 'react';
// default context to import/use; is overwritten immediately
import CartContext from './cart-context.js';

// empty cart to initiate the cartState with
const defaultCartState = {
  items: [],  // Array of items held in cart (initialized to none)
  totalAmount: 0 // Running total of all items[item.price] values from above
}

// Dispatch actions to manage cart state
// Has access to previous state and an action
// Action shold be an object with a 'type' key to determine the action to take
// Include an extra key(s) to add other needed parameters
const cartReducer = (state, action) => {
  // Add item to state.items[] cartContext.addItem=>addItemToCartHandler=>'ADD'
  // Receives an item object; uses it to update total and cartContext.items through state
  if(action.type === 'ADD'){
    // Update total by checking previous total and adding the total for the current item times the amount added to the cart
    const updatedTotal = state.totalAmount + (action.item.price * action.item.amount)
    
    // Find index to check for existing matching item in the cart
    // Checks the id of items in the cart vs the id of the item we are trying to add
    // If it matches returns the index of the matching item in the cartState.items array
    // If it does not match any of the id's in the cart with the id to add this will return -1
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    // Create a reference to the cart item found via index search
    // If an index was found it will reference the item with a matching id
    // If an index was not found state.items[] will receive -1 and existingCartItem will be undefinded
    const existingCartItem = state.items[existingCartItemIndex];

    // updatedItems to be used and returned by this 'ADD' action if it exists in cart or not
    // Will hold a list of cart items to update state.items with
    let updatedItems;
    
    // If existingCartItem exists we want to incrememnt the count by the amount specified on the action.item object
    if(existingCartItem){
      // Create a new item using the existing item data
      // This new item will be edited and added to updatedItems and used to update state
      const updatedItem = {
        // Fill object with existing state data for the appropriate item
        ...existingCartItem,
        // Update the amount by the amount of items already in the cart + the amount requested to add to cart
        amount: existingCartItem.amount + action.item.amount
      }
      
      // create a copy of the current cart
      updatedItems = [...state.items]
      // replace the item in cart in state with the updated added amounts
      updatedItems[existingCartItemIndex] = updatedItem
    } else { // If existingCartItem does not exist we can just add it to the array of items in state/cart
      // Create a copy of state including the new item that was passed via actions
      updatedItems = state.items.concat(action.item);
    }

    // 'ADD' returns new state object with items updated (either increasing amount or adding to array)
    // Also updates total
    return {
      items: updatedItems,
      totalAmount: updatedTotal
    }
  }
  
  // Remove item from state.items[] cartContext.removeItem=>removeItemFromCartHandler=>'REMOVE'
  // Receives an item id; uses it to check cart for item with matching id and subtract 1 from amount
  // If new amount would be 0 it removes it from the list entirely
  if(action.type === 'REMOVE'){
    // Find index to check for existing matching item in cart 
    // (must exist because we are using the cart list to render the button performing this action in <CartItem>)
    // Checks id of items in cart vs id of item we are trying to remove
    // WHEN it matches will return the index of the matching item 
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    // Create a reference to teh cart item found via index search
    // Will reference the item matching the id that was passed via action
    const existingItem = state.items[existingCartItemIndex];
    // Updates total by checking price of the item that was found and removing it from previous total
    const updatedTotal = state.totalAmount - existingItem.price;

    // updatedItems will be used to update the new state.items
    // edited within either if/else block depending on item count and returned outside both so must be initialized here
    let updatedItems;
    // See if there is only 1 of the item we want to remove in the cart
    // If so we will be removing it from the array entirely
    if(existingItem.amount === 1){
      // Returns a new array containing each item which returns true
      // If the id of the currently checked item does not match the id of the item to remove it is added to updatedItems
      // The item to be removed is not added to this new array
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      // Create a new item where we will update the amount to be -1 the current state.items[item]
      // Maintains all the other same data only the amount is decreased
      const updatedItem = {...existingItem, amount: existingItem.amount - 1};
      // Create a copy of the current state array
      updatedItems = [...state.items];
      // Find the item we are updating in our copy of the state array;
      // replace it with our updated version that has -1 amount
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    // 'REMOVE' returns new state object with items updated (either decreasing amount or removing from array)
    // Also updates total
    return {
      items: updatedItems,
      totalAmount: updatedTotal
    }
  }

  // Default return if no action found 
  // Will return empty cart
  return defaultCartState;
}

// Provider component allows us to wrap other components giving them access to cart context
// Props used: children
const CartProvider = (props) => {
  // Create/manage cartState
  // access values with cartState 
  // access actions within cartReducer with dispatch and passing in object with 'type: 'ACTION''
  // defaultCartState (empty cart) used to initialize cartState
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  // activated via cartContext.addItem
  // Triggers state management for adding an item to the cart
  // Can handle initialization/validation of that data before passing if needed
  const addItemToCartHandler = (item) => {
    // Calls cartReducer 'ADD' action
    // Must include an item to pass which includes at LEAST {id, name, price amount}
    dispatchCartAction({type: 'ADD', item: item});
  }

  // activated via cartContext.removeItem
  // Triggers state management for removing an item from the cart
  // Can handle initialization/validation of that data before passing if needed
  const removeItemFromCartHandler = (id) => {
    // Calls cartReducer 'REMOVE' action
    // Only needs to pass an id of the item to remove
    // 'REMOVE' action will assume an amount of 1 to remove for an item matching that id
    dispatchCartAction({type: 'REMOVE', id: id})
  }

  // Context to pass onto components that use this provider component by using this as the value within our <CartContext.Provider> below
  const cartContext = {
    // Array of item objects within cart copied from state
    items: cartState.items,
    // Running total price of all objects in cartState.items; updated during 'ADD' and 'REMOVE' dipatch actions
    totalAmount: cartState.totalAmount,
    // Pass function allowing children components to add item objects to cart
    addItem: addItemToCartHandler,
    // Pass function allowing children component to remove item objects from cart
    removeItem: removeItemFromCartHandler
  }

  return (
    // Creates a provider initially with cart-context.js but instead passes the value of cartContext created just above
    <CartContext.Provider value={cartContext}>
      {/* Chilren passed into this component will have access to cartContext */}
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
