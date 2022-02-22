import { useRef, useReducer } from 'react';
import classes from './Checkout.module.css';

// TODO: Update form validation to use `isTouched` and hooks to check validity

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const INITIAL_INPUTS_VALIDITY_STATE = {
  name: true,
  street: true,
  city: true,
  postal: true,
}

const inputsValidityReducer = (state, action) => {

  if (action.type === 'VALIDATE_FORM'){
    return {
      ...state,
      name: action.value.enteredNameIsValid,
      street: action.value.enteredStreetIsValid,
      city: action.value.enteredCityIsValid,
      postal: action.value.enteredPostalIsValid
    };
  }

  return INITIAL_INPUTS_VALIDITY_STATE;
}

const Checkout = (props) => {

  const [formInputsValidity, formDispatch] = useReducer(inputsValidityReducer, INITIAL_INPUTS_VALIDITY_STATE)

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalInputRef = useRef()
  const cityInputRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalIsValid = isFiveChars(enteredPostal);

    formDispatch({type: 'VALIDATE_FORM', value: {
      enteredNameIsValid,
      enteredStreetIsValid,
      enteredCityIsValid,
      enteredPostalIsValid
    }});

    const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid;

    if(!formIsValid) {
      //set an error and give feedback
      return;
    }

  }

  const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid }`
  const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
  const postalControlClasses = `${classes.control} ${formInputsValidity.postal ? '' : classes.invalid}`
  const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please enter a valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
}

export default Checkout