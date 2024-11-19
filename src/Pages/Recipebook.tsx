import { useEffect, useState } from "react";
//import "./Recipebook.css";

export function Recipebook() {
  const [recipes, setRecipes] = useState<any[]>([]); // Recipes fetched from JSON
  const [results, setResults] = useState<any[]>([]); // Combined results

  // Get user-added recipes from localStorage
  const getLocalRecipes = (): any[] => {
    const storedRecipes = localStorage.getItem("userRecipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  };

  // Save user-added recipes to localStorage
  //const saveLocalRecipes = (newRecipes: any[]) => {
  //  localStorage.setItem("userRecipes", JSON.stringify(newRecipes));
  //};

  // Combine recipes from the file with user-added recipes
  const addedRecipes = (fetchedRecipes: any[]) => {
    const localRecipes = getLocalRecipes();
    const combinedRecipes = [...fetchedRecipes, ...localRecipes]; // Merge fetched and local
    setResults(combinedRecipes); // Update results state
  };

  // Add a new recipe to localStorage and refresh results
  //const addNewRecipe = (newRecipe: any) => {
  // const updatedLocalRecipes = [...getLocalRecipes(), newRecipe];
  //  saveLocalRecipes(updatedLocalRecipes);
  //  addedRecipes(recipes); // Recompute the results to include new recipes
  //};

  // Fetch recipes from the file and initialize results
  useEffect(() => {
    fetch("/user-recipes.json")
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json);
        console.log(recipes);
        addedRecipes(json); // Combine with local recipes
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="search-results">
      <p></p>
      <p></p>
      <p></p>

      <div className="scroll-container">
        {results.length > 0 ? (
          <div className="recipe-grid">
            {results.map((result) => (
              <div className="recipe-card" key={result.id}>
                <h3>{result.title}</h3>
                <p>
                  <strong>Instructions:</strong> {result.instructions}
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
    </div>
  );
}
