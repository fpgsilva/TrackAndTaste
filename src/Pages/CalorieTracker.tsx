import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Calories.css"; // Styles for this component
import Navbar from "../components/Navbar";

interface Recipe {
  id: number;
  title: string;
  calories: number;
  rating: number;
  image: string;
}

export function CalorieTracker() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [dailyGoal, setDailyGoal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch("calories.json");
        if (!response.ok) throw new Error("Failed to fetch calorie data");

        const jsonData: Recipe[] = await response.json();

        const trackedRecipes = JSON.parse(
          localStorage.getItem("trackedRecipes") || "[]"
        );

        const allRecipes = [...trackedRecipes, ...jsonData];

        // Remove duplicates (if needed)
        const uniqueRecipes = allRecipes.reduce(
          (acc: Recipe[], recipe: Recipe) => {
            if (!acc.some((r: Recipe) => r.id === recipe.id)) {
              acc.push(recipe);
            }
            return acc;
          },
          [] as Recipe[]
        );

        setRecipes(uniqueRecipes);

        // Calculate total calories for daily goal
        const totalCalories = uniqueRecipes.reduce(
          (sum: number, recipe: Recipe) => sum + recipe.calories,
          0
        );
        setDailyGoal(totalCalories);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleClick = (id: number) => {
    // Save the recipe id to local storage
    localStorage.setItem("selectedRecipeId", id.toString());

    // Redirect to the Recipe page
    navigate("/Recipe");
  };

  return (
    <div>
      <div className="calories-tracker">
        {/* Header */}
        <header className="back-container">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Go back
          </button>
        </header>

        {/* Calories Tracker */}
        <section className="calories-overview">
          <h1>Calories Tracker</h1>
          <p>This week Progress: 9000</p>
          <p>Last week Calories: 11,200</p>
        </section>

        <section className="recently-tracked">
          <h3>Recently Tracked Recipes:</h3>
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="recipe-card"
                onClick={() => handleClick(recipe.id)}
              >
                <div className="recipe-info">
                  <p>
                    <strong>{recipe.title}</strong>
                  </p>
                  <p>Calories: {recipe.calories}</p>
                  <p>Rating: {recipe.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Daily Goal */}
        <section className="daily-goal">
          <p>
            Daily Goal Progress: {dailyGoal}/{2000}
          </p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(dailyGoal / 2000) * 100}%` }}
            ></div>
          </div>
        </section>
      </div>
      <Navbar />
    </div>
  );
}
