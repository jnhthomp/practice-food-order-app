import React, { Fragment } from 'react'
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton.jsx';

// Header component hold bar across top, heading, cart button, and extended background image
// Background image could be moved out of this component but is meant to stay at the top of the page so it is fine here too
// Accepted props: onShowCart (toggles <Cart> modal to on)
const Header = (props) => {
  
  return (
    // Fragment used since header and background should be siblings
    <Fragment>
      {/* "Real" header section of red bar with title and cart button */}
      <header className={classes.header}>
        {/* Header title */}
        <h1>ReactMeals</h1>
        {/* Cart button receives action in order to open cart modal */}
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      {/* Secondary background image below header */}
      <div className={classes['main-image']}>
        {/* Image to display under header (replace import to change) */}
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  )
}

export default Header
