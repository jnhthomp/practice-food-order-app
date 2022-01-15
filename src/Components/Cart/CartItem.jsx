import classes from './CartItem.module.css';

// This component is rendered for each individual item in the cart
// Accepted props: price, name, amount, onRemove, onAdd
const CartItem = (props) => {
  // Format price of individual cart item to a readable string
  // Places '$' in front of number and fixes two decimal places to the end
  const price = `$${props.price.toFixed(2)}`; // ex: props.price = 5 => $5.00

  return (
    // list item for individual cart items
    <li className={classes['cart-item']}>
      {/* Display details for item in cart */}
      <div>
        {/* Name of item in cart */}
        <h2>{props.name}</h2>
        {/* Description of item in cart */}
        <div className={classes.summary}>
          {/* Price of item in cart */}
          <span className={classes.price}>{price}</span>
          {/* Number of this same item in the cart (1x, 2x, 3x etc.) */}
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      {/* Actions to take on this individual cart item */}
      <div className={classes.actions}>
        {/* Decrease the amount of this cart item by 1 */}
        <button onClick={props.onRemove}>−</button>
        {/* Increase the amount of this cart item by 1 */}
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
