# Food Order App 🍴
<a href="https://jtdev.netlify.app/" target="_blank" rel="noreferrer"> <img src="https://drive.google.com/uc?id=19ZZ2aDajCwqqMiawXZRcjEKScT1z5657" alt="JTDEV" width="100%" height="auto"/> </a> 
This is a react application that fetches a list of food items and details from a Firebase database. Users can select items to be added to the cart. Upon checkout order details are sent to a Firebase database.

<!-- Live Demo Link -->
<a href="https://jnhthomp.github.io/practice-food-order-app/">Live Demo!<a>
<!-- Application gif -->
<a href="https://drive.google.com/file/d/1wj_2J5nBtVIsl287iwUp_Cvz8VYSZI_r/view?usp=sharing" target="_blank" rel="noreferrer"> <img src="https://drive.google.com/uc?id=1wj_2J5nBtVIsl287iwUp_Cvz8VYSZI_r" alt="Food Order Application demo gif" width="100%" height="auto" /> </a> 

## How It's Made:
**Tech used:** <!--JavaSCript =>--><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <!-- React --><a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a><!-- Node.js =>--><a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><!-- Firebase =>--><a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-plain-wordmark.svg" alt="postman" width="40" height="40"/> </a> <!-- Postman =>--><a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> 

On load the menu will make a fetch request to a firebase api which stores a set of meals with their details in state via a `useReducer` function.
Once the data is retrieved these meals are displayed to the user via the menu.
The user can adjust the amount of an item that you want
Then when the user clicks the '+Add' add to cart button that quantity of that item will be added to the cart (default 1).
This cart data is stored and updated via React Context

Once items are added to the cart the user is able to click the cart to view items.
There they modify the quantity of the items and checkout.
When checking out a form is shown that allows the user to enter their information to be submitted.
Upon submission the users order data is sent and stored in Firebase.



### How to install/use
1. Clone the project
2. Run `npm install`
3. Create/setup firebase database and drop in URL in `Cart.jsx` and `AvailableMeals.jsx`
4. Run `npm start`

### Create new menu items
Since menu items are retrieved from firebase and the item itself is not important you can simply create new object in firebase itself following this pattern
```json
{"id":{
  "description": "description string",
  "name": "Meal Name",
  "price": 99.99
}}
```

## Optimizations
- Make firebase url private and import from `config.json` file
- Add better form validation and feedback (see form project)
- Add different types of meal sections (breakfast, lunch, dinner)
  - Make these sections collapsable
- Integrate with restaurant project for a more reasistic experience

## Other Examples:
Take a look at other examples from my <a href="https://jtdev.netlify.app/">portfolio</a> using the lessons learned from these classes:
**Blog Site W/ Categories and Authentification:** https://github.com/jnhthomp/alpha-blog2
**Stock Based Social Network:** https://github.com/jnhthomp/finance-tracker
**Restaurant Web-Based Ordering System:** https://github.com/jnhthomp/practice-food-order-app