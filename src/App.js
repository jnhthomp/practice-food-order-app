import { Fragment } from 'react';
import Header from './Components/Layout/Header.jsx';
import Meals from './Components/Meals/Meals.jsx';
import Cart from './Components/Cart/Cart.jsx';

function App() {
  return (
    <Fragment>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
