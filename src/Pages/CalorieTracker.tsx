import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Calories.css";
import Navbar from "../components/Navbar";

interface Recipe {
  instanceId: string;
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
  const [weeklyProgress, setWeeklyProgress] = useState<number>(9000);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const trackedRecipes = JSON.parse(
          localStorage.getItem("trackedRecipes") || "[]"
        );

        const baseWeeklyProgress = parseInt("9000");

        const allRecipes = [...trackedRecipes];

        setRecipes(allRecipes);

        const totalCalories = allRecipes.reduce(
          (sum: number, recipe: Recipe) => sum + recipe.calories,
          0
        );
        setDailyGoal(totalCalories);

        const updatedWeeklyProgress =
          baseWeeklyProgress +
          trackedRecipes.reduce(
            (sum: number, recipe: Recipe) => sum + recipe.calories,
            0
          );
        setWeeklyProgress(updatedWeeklyProgress);
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
    localStorage.setItem("selectedRecipeId", id.toString());

    navigate("/Recipe");
  };

  const updateWeeklyProgress = (newCalories: number) => {
    const updatedWeeklyProgress = weeklyProgress + newCalories;
    setWeeklyProgress(updatedWeeklyProgress);
    localStorage.setItem("weeklyProgress", updatedWeeklyProgress.toString());
  };

  const removeRecipe = (instanceId: string) => {
    const recipeToRemove = recipes.find(
      (recipe) => recipe.instanceId === instanceId
    );
    if (!recipeToRemove) return;

    const updatedRecipes = recipes.filter(
      (recipe) => recipe.instanceId !== instanceId
    );

    setRecipes(updatedRecipes);

    localStorage.setItem("trackedRecipes", JSON.stringify(updatedRecipes));

    const totalCalories = updatedRecipes.reduce(
      (sum: number, recipe: Recipe) => sum + recipe.calories,
      0
    );
    setDailyGoal(totalCalories);
    updateWeeklyProgress(-(recipeToRemove.calories));
  };

  return (
    <div>
      <div className="calories-tracker">
        <header className="back-container">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Go back
          </button>
        </header>

        <section className="calories-overview">
          <h1>Calories Tracker</h1>
          <p>This week Progress: {weeklyProgress}</p>
          <p>Last week Calories: 11,200</p>
        </section>

        <section className="daily-goal">
          <p>
            Daily Goal Progress: {dailyGoal}/{4000}
          </p>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(dailyGoal / 4000) * 100}%` }}
            ></div>
          </div>
        </section>

        <section className="recently-tracked">
          <h3>Recently Tracked Recipes:</h3>
          <div className="scroll-container3">
            <div className="recipes-grid">
              {recipes.map((recipe) => (
                <div
                  key={recipe.instanceId}
                  className="recipe-card"
                  onClick={() => handleClick(recipe.id)}
                  style={{
                    backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 70%), url(${recipe.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="recipe-info">
                    <p>
                      <strong>{recipe.title}</strong>
                    </p>
                    <p>Calories: {recipe.calories}</p>
                    <p>Rating: {recipe.rating}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeRecipe(recipe.instanceId);
                    }}
                    className="remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Navbar />
    </div>
  );
}
