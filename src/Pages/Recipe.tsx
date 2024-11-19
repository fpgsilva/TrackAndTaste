import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";


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
    description: string;
  }

export function Recipe() {
  const [recipeID, setRecipeID] = useState<number | null>(null);
  const [recipeData, setRecipeData] = useState<RecipeInt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Retrieve recipe ID from localStorage
        const storedRecipeID = localStorage.getItem("selectedRecipeId");
        if (!storedRecipeID) {
          throw new Error("No recipe ID found in localStorage");
        }

        const parsedID = parseInt(storedRecipeID, 10);
        if (isNaN(parsedID)) {
          throw new Error("Invalid recipe ID stored in localStorage");
        }

        setRecipeID(parsedID); // Save the valid ID to state

        // Fetch JSON data
        const response = await fetch("user-recipes.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data.json");
        }

        const data: RecipeInt[] = await response.json(); // Use the Recipe[] type

        // Find the recipe by ID
        const targetObject = data.find((obj: RecipeInt) => obj.id === parsedID); // obj has type Recipe
        if (!targetObject) {
          throw new Error(`Recipe with ID ${parsedID} not found`);
        }

        setRecipeData(targetObject); // Save recipe data to state
      } catch (err: any) {
        setError(err.message); // Save any errors
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchRecipe();
  }, []); // Empty dependency array, runs once when the component mounts

  return (
    <div>
        <div className="back-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
      {loading ? (
        <p>Loading recipe data...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : recipeData ? (
        <div>
          <h1>{recipeData.title}</h1>
          <p>{recipeData.description}</p>
          {/* Render other recipe details */}
        </div>
      ) : (
        <p>No recipe data available.</p>
      )}
    <Navbar />
    </div>
  );
}