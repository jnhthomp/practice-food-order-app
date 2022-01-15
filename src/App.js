import { useState } from 'react';
// Provides context to children components wrapped in <CartProvider>
// Context contains information about items in the cart and the total
import CartProvider from './store/CartProvider.jsx';
// Content components
import Header from './Components/Layout/Header.jsx'; // Page header
import Meals from './Components/Meals/Meals.jsx'; // main content section
import Cart from './Components/Cart/Cart.jsx'; // cart modal w/ overlay

// Rendered by index.js on application launch
function App() {
  // state to determine whether cart modal should display
  // Initially false to hide cart
  const [cartIsShown, setCartIsShown] = useState(false);

  // Handler to activate when cart modal should be displayed
  const showCartHandler = () => {
    setCartIsShown(true);
  }

  // Handler to activate when cart modal should be hidden
  const hideCartHandler = () => {
    setCartIsShown(false);
  }
  
  return (
    // Provide cart state to all children wrapped in this context component
    <CartProvider>
      {/* Check state to determine whether <Cart> component should be displayed*/}
      {/* Pass hide cart so it can be hidden again */}
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      {/* Header contains button to cart that when clicked activates onShowCart */}
      <Header onShowCart={showCartHandler} />
      {/* Main application content below */}
      <main>
        {/* Outputs paragraph of text and card containing all meal items available */}
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
