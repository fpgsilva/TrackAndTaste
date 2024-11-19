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

  // Combine recipes from the file with user-added recipes
  const addedRecipes = (fetchedRecipes: any[]) => {
    const localRecipes = getLocalRecipes();
    const combinedRecipes = [...fetchedRecipes, ...localRecipes]; // Merge fetched and local
    setResults(combinedRecipes); // Update results state
  };

  const navigate = useNavigate(); // Hook to handle navigation

  const handleClick = (id: number) => {
    // Save the recipe id to local storage
    localStorage.setItem("selectedRecipeId", id.toString());

    // Redirect to the /Recipe/ page
    navigate("/Recipe");
  };

  useEffect(() => {
    fetch("user-recipes.json")
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
