import React, { Fragment } from 'react'; // Fragment used as wrapper div
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

// Modal Component is resonsible for handling any and all modals to display within the app
// Will render to index.html <div> where id=overlay as a root level component 
// even though it is called within the components we want to make a modal

// Backdrop is responsible for providing a dark background over the top of the normal webpage
// This is placed behind the modal content itself
// Accepted props: onClose (allows clicking on background to dismiss modal entirely)
const Backdrop = (props) => {
  return (
    // Returns a clickable div with darkened transparent background
    // Clikcing dismisses <Modal> component
    <div className={classes.backdrop} onClick={props.onClose} />
  )
}

// Overlay used to hold moda content renders on top of <Backdrop>
// Accepted props: children
// Children displayed here are children of the <Modal> component when <Modal> is called
export const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {/* Display <Modal> content/children here */}
        {props.children}
      </div>      
    </div>
  )
}

// Create a portal that we can reference to display content inside of
// Used to target index.html <div id='overlays'>
const portalElement = document.getElementById('overlays');

// <Modal component used to render backdrop and modal content>
// Accepted props: onHideCart (allows dismissal over modal element for cart), children (display modal content)
const Modal = (props) => {
  return (
    // <Fragment> used to wrap <Backdrop> and <ModalOverlay>
    <Fragment>
      {/* Create portal and render <Backdrop> within it */}
      {ReactDOM.createPortal(<Backdrop onClose={props.onHideCart} />, portalElement)}
      {/* Create portal and render <ModalOverlay> containing modal content within it */}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  )
}

export default Modal
