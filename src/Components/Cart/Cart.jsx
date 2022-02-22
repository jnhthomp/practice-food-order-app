import React, { useState, useContext } from 'react';
// Give access to Cart state
import CartContext from '../../store/cart-context.js';
import classes from './Cart.module.css';
import Modal from '../UI/Modal.jsx';
import CartItem from './CartItem.jsx';
import Checkout from './Checkout.jsx';

// This component displays the cart modal
// Includes a list of items in the cart retrieved from CartContext which holds an array of items in state
// Accepted props: onHideCart (used to dismiss/remove this modal component)
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  // Gain access to CartContext and its values/methods
  const cartCtx = useContext(CartContext);
  
  // Retrieve the total cost of all items in cart from CartContext
  // Format the cost as a price amount two decimal places with a dollar sign in front as a string 
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`; // => ex: $5.00
  // Check that the cart is not empty
  // This needs to be true in order for the "Order" button to display in jsx return
  const hasItems = cartCtx.items.length > 0;

  // onClick action passed to '-' button within <CartItem>
  // Removes clicked item from cart by being passed the id of the item to be removed
  const cartItemRemoveHandler = (id) => {
    // Access CartContext to remove an item from cartState/context
    // passes id of item to remove
    cartCtx.removeItem(id);
  }

  // onClick action passed to '+' button within <CartItem>
  // Adds clicked item from cart by being passed information about the object to be added
  const cartItemAddHandler = (item) => {
    // Access CartContext to add an item to cartState/context
    // passes the current item but adjusts the amount down to 1 
    // This is because the item being increased may already have more than 1 item in the cart
    // If the amount was not set to 1 when adding it would double the number of that item in the cart every click
    cartCtx.addItem({...item, amount: 1})
  }


  const orderHandler = () => {
    setIsCheckout(true);
  }


  // This is a jsx object that hold an unordered list
  // Each list item is an item in the cart that is retrieved from CartContext
  // For each item in CartContext render a <CartItem> component in order to display details and controls for that cart item
  const cartItems =(
    // Full list containing all cart items
    <ul className={classes['cart-items']}>
      {/* Run a function on each item in CartContext.items to create listing in the cart modal */}
      {cartCtx.items.map((item) => {
          return (
            // For each item create a <CartItem> (<li> wraps all children in <CartItem>)
            // for onRemove and onAdd:
            // .bind is used to bind the current value of item.id and item of the <CartItem> being created
            //   as arguments to be passed into the function when called
            // This prevents us from having to pass these values down through props and provide handler functions
            <CartItem 
              key={item.id}
              price={item.price}
              name={item.name}
              amount={item.amount}
              onRemove={cartItemRemoveHandler.bind(null, item.id)}
              onAdd={cartItemAddHandler.bind(null, item)}
            />
          )
        })
      }
    </ul>
  );

  const modalActions = (
    // Hold cart action buttons such as "Close" and "Order" 
    < div className = { classes.actions } >
      {/* Close Cart modal button */ }
      < button
          className = { classes['button--alt']}
          onClick = { props.onHideCart }> Close</ button>
      {/* Conditionally show "Order" button depending on if there are items in the cart
      hasItems will only be true if cart is not empty (set above)*/}
      {hasItems &&
      <button
        className={classes.button}
        onClick={orderHandler}>Order</button>
      }
    </div >
  );

  return (
    // Modal UI component to display the cart inside of
    // <Modal> contains a backdrop and an area to accept children such as the content of this card component
    // Accepts `onHideCart` to close modal when backdrop is clicked
    <Modal onHideCart={props.onHideCart}>
      {/* Output cartItem <ul> with items rendered as <CartItem>; if empty then empty list rendered*/}
      <div>{cartItems}</div>
      {/* Total cart value and label */}
      <div className={classes.total}>
        {/* Label */}
        <span>Total Amount</span>
        {/* Formatted value */}
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onCancel={props.onHideCart}/>}
      {!isCheckout && modalActions}
    </Modal>
  )
}

export default Cart
