import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
//import "./Recipebook.css";

export function Recipebook() {
  const [recipes, setRecipes] = useState<any[]>([]); // Recipes fetched from JSON
  const [results, setResults] = useState<any[]>([]); // Combined results

  recipes != null;

  // Get user-added recipes from localStorage
  const getLocalRecipes = (): any[] => {
    const storedRecipes = localStorage.getItem("userRecipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  };

  // Combine recipes from the file with user-added recipes, ensuring no duplicates
  const addedRecipes = (fetchedRecipes: any[]) => {
    const localRecipes = getLocalRecipes();

    // Combine the recipes and remove duplicates based on 'id'
    const combinedRecipes = [...fetchedRecipes, ...localRecipes];

    // Use a Map to filter out duplicates based on the id (keys will be unique)
    const uniqueRecipes = Array.from(
      new Map(combinedRecipes.map((recipe) => [recipe.id, recipe])).values()
    );

    setResults(uniqueRecipes); // Update results state with unique recipes
  };

  const navigate = useNavigate(); // Hook to handle navigation

  const handleClick = (id: number) => {
    // Save the recipe id to local storage
    localStorage.setItem("selectedRecipeId", id.toString());

    // Redirect to the /Recipe/ page
    navigate("/Recipe");
  };

  useEffect(() => {
    fetch("recipeBook.json")
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json);
        addedRecipes(json); // Combine with local recipes
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="search-results">
      <p></p>
      <p></p>
      <div className="scroll-container">
        {results.length > 0 ? (
          <div className="recipe-grid">
            {results.map((result) => (
              <div
                className="recipe-card"
                key={result.id}
                onClick={() => handleClick(result.id)}
                style={{
                  backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 70%), url(${result.image})`,
                  backgroundSize: "cover", // Ensures the image covers the entire div
                  backgroundPosition: "center", // Centers the image
                  backgroundRepeat: "no-repeat", // Prevents tiling
                }}
              >
                <h3>{result.title}</h3>
                <p>
                  <strong>Description:</strong> {result.description}
                </p>
                <p>
                  <strong>Time:</strong> {result.time} mins
                </p>
                <p>
                  <strong>Difficulty:</strong> {result.difficulty}
                </p>
                <p>
                  <strong>Rating</strong> {result.rating}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>
      <Navbar />
    </div>
  );
}
