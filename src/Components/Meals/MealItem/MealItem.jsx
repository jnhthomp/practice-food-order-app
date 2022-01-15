import React, { useContext } from 'react';
import cartContext from '../../../store/cart-context.js';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm.jsx';

// <MealItem> is used to display individual meal details within <AvailableMeals>
// Available props: id, name, description, price (all properties of the item being rendered)
const MealItem = (props) => {

  // Access CartContext in order to add new items to CartContext.items[] via CartContext.addItem()
  const cartCtx = useContext(cartContext);

  // Format price of item being called 
  // FOR DISPLAY PURPOSES ONLY
  //  Price is still submitted as a number when we add an item to cart
  const price = `$${props.price.toFixed(2)}`;

  // This is passed down to <MealItemForm> and called from there
  //  That way <MealItemForm> can receive an amount that was input by the user (default 1)
  // Receives an amount and adds the meal item for the rendered component to be added with that amount
  const addToCartHandler = (amount) => {
    // Add new item to CartContext.items[]
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
  }

  return (
    // Parent to this component is <ul> so each component is a <li>
    <li className={classes.meal}>
      {/* First section to hold meal information */}
      <div>
        {/* Name of rendered meal */}
        <h3>{props.name}</h3>
        {/* Description of rendered meal */}
        <div className={classes.description}>{props.description}</div>
        {/* Price (formatted) of rendered Meal */}
        <div className={classes.price}>{price}</div>
      </div>
      {/* Second section to hold form to add rendered meal item to cart */}
      <div>
        {/* id manadatory since many of these will be generated 
            onAddToCart used to add the rendered meal to the cart */}
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  )
}

export default MealItem
