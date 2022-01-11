import React, { useContext } from 'react';
import CartContext from '../../store/cart-context.js';
import classes from './Cart.module.css';
import Modal from '../UI/Modal.jsx';
import CartItem from './CartItem.jsx';

const Cart = (props) => {

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    
  }

  const cartItemAddHandler = (item) => {
    
  }

  const cartItems =(
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => {
          return (
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

  return (
    <Modal onHideCart={props.onHideCart}>
      <div>{cartItems}</div>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart
