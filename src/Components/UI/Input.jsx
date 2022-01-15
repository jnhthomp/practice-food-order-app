import React from 'react';
import classes from './Input.module.css';

// <Input> is a custom input field such that we can pass a ref to inputs 
// This allows collection of user input more easily
// React.forwardRef used so we can add ref prop
// Accepted props: input (object with id and attribute settings allows flexibility)
//                 label (customize input label when calling <Input>)
//          ref: ref (pass ref to input field to collect info directly reference)
const Input = React.forwardRef((props, ref) => {
  return (
    // Contains input label and field
    <div className={classes.input}>
      {/* Input label; htmlFor assigns this label to the input field directly below because of matching ids */}
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* Input field; ref allows easily collection of input from parent form
          {...props.Input} allows us to pass in input attributes when calling <Input> */}
      <input ref={ref} {...props.input} />
    </div>
  )
})

export default Input
