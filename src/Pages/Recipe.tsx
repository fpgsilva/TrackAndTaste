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

  recipeID != null;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [review, setReview] = useState<string>(""); // For reviews
  const [buttonText, setButtonText] = useState<string>("Track Calories"); // For track calories button text
  const [saveButtonText, setSaveButtonText] = useState<string>(
    "Save to Recipe Book"
  ); // Save button text

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

  const handleReviewSubmit = () => {
    console.log("User review:", review);
    setReview("");
  };

  const handleTrackCalories = () => {
    const trackedRecipes = JSON.parse(
      localStorage.getItem("trackedRecipes") || "[]"
    );
    const updatedRecipes = [...trackedRecipes, recipeData]; // Add the current recipe
    localStorage.setItem("trackedRecipes", JSON.stringify(updatedRecipes));
    setButtonText("Calories Tracked!");
  };

  // New method for saving recipe
  const handleSaveRecipe = () => {
    const savedRecipes = JSON.parse(
      localStorage.getItem("userRecipes") || "[]"
    );
    const updatedSavedRecipes = [...savedRecipes, recipeData]; // Add the current recipe
    localStorage.setItem("userRecipes", JSON.stringify(updatedSavedRecipes));
    setSaveButtonText("Recipe Saved!"); // Change the button text after saving
  };

  if (loading) return <p>Loading recipe data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recipeData) return <p>No recipe data available.</p>;

  return (
    <div className="scroll-container2">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Go Back
      </button>
      <div className="recipe-details1">
        <h1>{recipeData.title}</h1>
        <div className="recipe-meta">
          <p>🕒 Time: {recipeData.time} min</p>
          <p> Difficulty: {recipeData.difficulty}</p>
          <p>🔥 Calories: {recipeData.calories}</p>
        </div>
        <p>{recipeData.description}</p>
        <p>Rating: {recipeData.rating}</p>

        <div className="ingredients">
          <h3>Ingredients</h3>
          <p>{recipeData.ingredients.join(", ")}</p>
        </div>

        <div className="actions">
          <button onClick={handleSaveRecipe}>{saveButtonText}</button>
          <button onClick={() => navigate("/step")}>Start Steps</button>
          <button onClick={handleTrackCalories}>{buttonText}</button>
        </div>

        <div className="submit">
          <h1>Review the Recipe!</h1>
          <button onClick={handleReviewSubmit}>Start Review!</button>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
