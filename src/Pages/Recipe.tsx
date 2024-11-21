import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Recipe.css"; // Ensure to create this stylesheet

// Define a type for the recipe objects
interface RecipeInt {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string;
  time: number;
  difficulty: "easy" | "medium" | "hard"; // Restricted to specific values
  type: "main" | "side" | "dessert"; // Add other types as needed
  vegan: boolean;
  glutenFree: boolean;
  calories: number;
  description: string;
  rating: number;
}

export function Recipe() {
  const [recipeID, setRecipeID] = useState<number | null>(null);
  const [recipeData, setRecipeData] = useState<RecipeInt | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>("");

  recipeID != null;
  rating != null;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const storedRecipeID = localStorage.getItem("selectedRecipeId");
        if (!storedRecipeID)
          throw new Error("No recipe ID found in localStorage");

        const parsedID = parseInt(storedRecipeID, 10);
        if (isNaN(parsedID))
          throw new Error("Invalid recipe ID stored in localStorage");

        setRecipeID(parsedID);

        const response = await fetch("user-recipes.json");
        if (!response.ok) throw new Error("Failed to fetch data.json");

        const data: RecipeInt[] = await response.json();
        const targetObject = data.find((obj: RecipeInt) => obj.id === parsedID);
        if (!targetObject)
          throw new Error(`Recipe with ID ${parsedID} not found`);

        setRecipeData(targetObject);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);

  const handleRating = (value: number) => {
    setRating(value);
    console.log("User rating:", value);
  };

  const handleReviewSubmit = () => {
    console.log("User review:", review);
    setReview("");
  };

  if (loading) return <p>Loading recipe data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipeData) return <p>No recipe data available.</p>;

  return (
    <div>
      <div className="back-container1">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
        <p>
          <p></p>
        </p>
      </div>
      <div className="recipe-details1">
        {/* Top Section */}
        <h1>{recipeData.title}</h1>
        <div className="recipe-meta">
          <p>🕒 Time: {recipeData.time} min</p>
          <p> Difficulty: {recipeData.difficulty}</p>
          <p>🔥 Calories: {recipeData.calories}</p>
        </div>
        <p>{recipeData.description}</p>
        <p>Rating: {recipeData.rating}</p>

        {/* Ingredients Section */}
        <div className="ingredients">
          <h3>Ingredients</h3>
          <p>{recipeData.ingredients.join(", ")}</p>
        </div>

        {/* Buttons Section */}
        <div className="actions">
          <button onClick={() => console.log("Save Recipe")}>
            Save to Recipe Book
          </button>
          <button onClick={() => console.log("Start Steps")}>
            Start Steps
          </button>
          <button onClick={() => console.log("Track Calories")}>
            Track Calories
          </button>
        </div>

        {/* Review Section */}
        <div className="submit">
          <h1>Review the Recipe!</h1>
          <button onClick={handleReviewSubmit}>Start Review!</button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
