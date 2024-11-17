import { useNavigate } from "react-router-dom";
import "./Calories.css"; // Styles for this component

export function CalorieTracker() {
  const navigate = useNavigate();

  // Mock data - replace with actual data as needed
  const weeklyCalories = 1997;
  const dailyGoal = 2000;
  const caloriesToday = 500;

  const recipes = [
    {
      id: 1,
      title: "Recipe 1",
      calories: "xx",
      rating: 3,
      image: "image-url-1",
    },
    {
      id: 2,
      title: "Recipe 2",
      calories: "yy",
      rating: 5,
      image: "image-url-2",
    },
    {
      id: 3,
      title: "Recipe 3",
      calories: "ww",
      rating: 2,
      image: "image-url-3",
    },
    {
      id: 4,
      title: "Recipe 4",
      calories: "vv",
      rating: 4,
      image: "image-url-4",
    },
  ];

  return (
    <div className="calories-tracker">
      {/* Header */}
      <header className="tracker-header">
        <button onClick={() => navigate(-1)} className="back-button">
          ←
        </button>
      </header>

      {/* Calories Tracker */}
      <section className="calories-overview">
        <h2>Calories Tracker</h2>
        <p>Calories This Week: {weeklyCalories}</p>
      </section>

      {/* Recently Tracked Recipes */}
      <section className="recently-tracked">
        <h3>Recently Tracked Recipes:</h3>
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
              <div className="recipe-info">
                <p>
                  <strong>{recipe.title}</strong>
                </p>
                <p>Calories: {recipe.calories}</p>
                <p>Rating: {"⭐".repeat(recipe.rating)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Goal */}
      <section className="daily-goal">
        <p>
          Daily Goal: {caloriesToday}/{dailyGoal}
        </p>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${(caloriesToday / dailyGoal) * 100}%` }}
          ></div>
        </div>
      </section>
    </div>
  );
}
