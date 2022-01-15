import React, { useState, useContext, useEffect } from 'react';
import CartContext from '../../store/cart-context.js';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon.js';

// Button displayed in header that toggles <Cart> modal
//  Also dynamically displays count of items in the cart as a badge
// Accepted props: onClick (action received from header to show the <Cart> modal)
const HeaderCartButton = (props) => {

  // State used to toggle a class on/off
  // Toggling state on (true) triggers animation
  // Toggling state off (false) resets so the animation can be replayed
  // State change is triggered by the number of items in the cart changing (added or removed)
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  // useContext so we can get information on items in CartContext
  const cartCtx = useContext(CartContext);
 // Create a shortcut to access items in CartContext directly
  const { items } = cartCtx;

  // Count the number of items in the cart
  // Cannot simply count the length of the array since items[item].amount can be greater than 1
  // reduce will keep a running tally of the amount of each item and return the sum of all items[item].amount
  // ex: => numberOfCartItems = items[0].amount + items[1].amount + items[2].amount etc...
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  // Hold the classes to pass into our button
  // Only include classes.bump when state is true otherwise only classes.button will be listed
  const btnClassses = `${classes.button} ${btnIsHighlighted ? classes.bump: ''}`

  // useEffect triggers on each rerender of this component
  // Will only run if the items array changes (from CartContext)
  useEffect(() => {
    // Don't trigger the animation when someone empties their cart
    if (items.length === 0) {
      return;
    }
    // If the items array is changed change btnIsHighlighted state to true
    // This will inlcude class.bump within btnClasses
    setBtnIsHighlighted(true);

    // Start a timer of 300ms (length of bump animation)
    // At end of timer change btnIsHighlighted state to false
    // This will remove classes.bump from btnClasses so the animation can be replayed
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    // Cleanup function
    // Clear the timer we created so whenever useEffect is run again the timer can be reset
    // This will ensure an animation still plays at the end of multiple quick cart changes
    return () => {
      clearTimeout(timer);
    }

  }, [items]) // List of dependencies useEffect will only run if these values change

  return (
    // Attach <Cart> modal opening to button onClick action
    <button className={btnClassses} onClick={props.onClick}>
      {/* Hold and style <CartIcon> */}
      <span className={classes.icon}>
        {/* Component that returns an svg for our cart logo */}
        <CartIcon />
      </span>
      {/* Label text to display within button */}
      <span>Your Cart</span>
      {/* Badge displaying cart item count */}
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
