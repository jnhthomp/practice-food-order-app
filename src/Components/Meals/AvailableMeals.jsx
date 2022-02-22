import { useReducer, useEffect } from 'react'
import classes from './AvailableMeals.module.css';
import Card from '../UI/Card.jsx';
import MealItem from './MealItem/MealItem.jsx';

// List of meals that are offered by the restaurant
// Ideally these would actually be stored on a server and we would request a list
//  but this is the basic shape the response might look like when we request a list of meals
// All meals must have a unique id, name, price, and description 
//  description is only used within <MealItem> but could technically be an empty string without messing up the rest of the application too much
//  Try to keep description < 30 chars if adding new meals
// Price should be stored as number so calculations are easier and are formatted when displayed to users
// const DUMMY_MEALS = [
//   {
//     id: 'm1',
//     name: 'Sushi',
//     description: 'Finest fish and veggies',
//     price: 22.99,
//   },
//   {
//     id: 'm2',
//     name: 'Schnitzel',
//     description: 'A german specialty!',
//     price: 16.5,
//   },
//   {
//     id: 'm3',
//     name: 'Barbecue Burger',
//     description: 'American, raw, meaty',
//     price: 12.99,
//   },
//   {
//     id: 'm4',
//     name: 'Green Bowl',
//     description: 'Healthy...and green...',
//     price: 18.99,
//   },
// ];

// Used to hold and display full list of available meals users can select and add

const initialMealState = {
  meals: [],
  isLoading: false,
  httpError: null
}

const mealStateReducer = (state, action) => {
  if (action.type === 'UPDATE_MEALS') {
    return {...state, meals: action.value};
  }

  if (action.type === 'UPDATE_LOADING') {
    return {...state, isLoading: action.value};
  }

  if (action.type === 'UPDATE_ERROR') {
    return {...state, httpError: action.value}
  }
  return initialMealState;
}

const AvailableMeals = () => {
  const [mealState, dispatch] = useReducer(mealStateReducer, initialMealState)

  useEffect(() => {
    const fetchMeals = async () => {
      dispatch({type: 'UPDATE_LOADING', value: true});

      const response = await fetch('https://react-http-82bca-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const responseData = await response.json()

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }

      dispatch({type: 'UPDATE_MEALS', value: loadedMeals});
      dispatch({type: 'UPDATE_LOADING', value: false});

    }

    fetchMeals().catch((error)=>{
      dispatch({type: 'UPDATE_LOADING', value: false});
      dispatch({type: 'UPDATE_ERROR', value: error.message})
    });
  }, [])

  if(mealState.isLoading){
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    )
  }

  if(mealState.httpError){
    return (
      <section className={classes.mealsError}>
        <p>{mealState.httpError}</p>
      </section>
    )
  }
  

  // Create a <MealItem> for all meals within DUMMY_MEALS array to display individual information
  // Use meal.id as key since those should be unique and only 1 <MealItem> is generated per meal
  const mealsList = mealState.meals.map((meal) => {
    return (<MealItem 
              id={meal.id}
              key={meal.id}
              name={meal.name}
              description={meal.description}
              price={meal.price}
            />)
  })

  return (
    // Section to hold meals list and sepearte it from <MealsSummary sibling in dom>
    <section className={classes.meals}>
      {/* Card to hold and style overall list of meals */}
      <Card>
        <ul>
          {/* Full list of mapped <MealItem> components (1 for each meal in DUMMY_MEALS) */}
          {mealsList}
        </ul> 
      </Card>
    </section>
  )
}

export default AvailableMeals
