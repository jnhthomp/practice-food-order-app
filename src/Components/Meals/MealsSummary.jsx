import classes from './MealsSummary.module.css';

// Component with some styling and hardcoded text content
// Gives description of the meals and restaurant to users

const MealsSummary = () => {
  return (
    <section className={classes.summary}>
      {/* Paragraph tagline */}
      <h2>Delicious Food, Delivered To You</h2>
      {/* Paragraph 1 content */}
      <p>
        Choose your favorite meal from our broad selection of available meals
        and enjoy a delicious lunch or dinner at home.
      </p>
      {/* Paragraph 2 content */}
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
