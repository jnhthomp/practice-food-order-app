import React, { useRef, useState } from 'react'
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input.jsx';

// <MealItemForm> used to collect a numerical value for the amount of a given meal wants
// Accepted props: id (unique identifier since there will be many forms), 
//                 onAddToCart (action used to submit amount value to item being added to cart)
const MealItemForm = (props) => {

  // state used to validate user input 
  // Initial values in input is 1 so initialized to true (valid)
  // If amountIsValid is false then triggers a message to the user below input
  const [amountIsValid, setAmountIsValid] = useState(true)

  // Reference to input to collect user informatoin directly from input field
  const amountInputRef = useRef()

  // Retrieve and validate amount from user
  // If valid will add the item that rendered this form to the cart
  const submitHandler = (event) => {
    // Prevent the browser from submitting the form somewhere
    event.preventDefault();

    // Retrieve and store the amount from the input field (targetted by useRef)
    const enteredAmount = amountInputRef.current.value;
    // Input will always submit a string so; convert to a number
    const enteredAmountNumber = +enteredAmount;
    
    // Validate amount from user input
    if (
      // Remove whitespace and validate that there is still input
      enteredAmount.trim().length === 0 || 
      // Validate that number version of amount is not less than 1 or greater than 5
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5 ||
      // Validate was not a letter
      // If it was a letter than enteredAmountNumber will be NaN because of conversion above
      isNaN(enteredAmountNumber)
    ) {
      // If validation checks above are triggered then setAmountIsValid to false and don't call function to add to cart
      // forces display of message to the user
      setAmountIsValid(false);
      return;
    }
    // If validation checks are not triggered the amount is valid
    // Must be reset here in order to hide any previous invalid attempt messages
    setAmountIsValid(true);
    // Trigger function to submit an amount for an item to be added to the cart
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    // Form to contain input field and button and collect amount number from the user
    <form className={classes.form} onSubmit={submitHandler}>
      {/* Input to hold number box
          Given id from props w/ min and max of 1 and 5 (default 1) */}
      <Input 
        ref={amountInputRef}
        label="Amount" 
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }} 
      />
      {/* Will triggeer submit function of form to validate input and submit to cart*/}
      <button type='Submit'>+ Add</button>
      {/* If user enteres invalid amount then state value amountIsValid will be false
          If false then trigger a message to the user */}
      {!amountIsValid && <p>Please Enter a Valid Amount (1-5)</p>}
    </form>
  )
}

export default MealItemForm
