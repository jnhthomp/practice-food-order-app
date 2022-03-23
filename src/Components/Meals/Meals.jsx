import React, { Fragment } from 'react'
import MealsSummary from './MealsSummary.jsx';
import AvailableMeals from './AvailableMeals.jsx';

// Component holding the main body/content of the website through <MealsSummary> and <AvailableMeals>
//  <MealsSummary> is a short block/card of text describing the food and restaurant
//  <AvailableMeals> Contains a list of meals that users can click to add them to the cart
const Meals = () => {
  return (
    <Fragment>
      {/* Short text describing meals/restaurant */}
      <MealsSummary />
      {/* List of meals users can click to add to cart */}
      <AvailableMeals />
    </Fragment>
  )
}

export default Meals
