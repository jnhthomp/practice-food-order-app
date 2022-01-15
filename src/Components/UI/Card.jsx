import React from 'react';
import classes from './Card.module.css';

// <Card> is used to create a cart shaped background for other components 
// Accepted props: children (to display content within card)
const Card = (props) => {
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  )
}

export default Card
