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
    const fetchCaloriesData = async () => {
      try {
        setLoading(true);
        const response = await fetch("calories.json"); // Ensure the file is in the public folder or adjust the path.
        if (!response.ok) throw new Error("Failed to fetch calorie data");

        const data: Recipe[] = await response.json();
        setRecipes(data);

        // Calculate the total calories for the daily goal
        const totalCalories = data.reduce(
          (sum, recipe) => sum + recipe.calories,
          0
        );
        setDailyGoal(totalCalories);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCaloriesData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
          <p>Last week Calories: 11,200</p>
        </section>

        <section className="recently-tracked">
          <h3>Recently Tracked Recipes:</h3>
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card"
                style={{
                  backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 70%), url(${recipe.image})`,
                  backgroundSize: "cover", // Ensures the image covers the entire div
                  backgroundPosition: "center", // Centers the image
                  backgroundRepeat: "no-repeat", // Prevents tiling
                }}
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
