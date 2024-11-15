import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./SearchResults.css";

export function SearchResults() {
  const location = useLocation();
  const query = location.state?.query.toLowerCase() || ""; // Retrieve and lowercase query for case-insensitive search

  const [recipes, setRecipes] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);

  // Fetch recipes.json once when component mounts
  useEffect(() => {
    fetch('/recipes.json')
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json);
        filterResults(json); // Filter results immediately after fetching
      })
      .catch((error) => console.error('Error fetching recipes:', error));
  }, []);

  // Filter recipes based on query
  const filterResults = (recipeList: any[]) => {
    const filtered = recipeList.filter((recipe) =>
      recipe.title.toLowerCase().includes(query)
    );
    setResults(filtered);
  };

  // Run filterResults whenever recipes or query changes
  useEffect(() => {
    filterResults(recipes);
  }, [recipes, query]);

  return (
    <div className="search-results">
      <SearchBar />
      <h2>Search Results for "{query}"</h2>
      <div className="scroll-container">
        {results.length > 0 ? (
          <div className="recipe-grid">
            {results.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
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