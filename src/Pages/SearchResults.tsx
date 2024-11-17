import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./SearchResults.css";


export function SearchResults() {
  const location = useLocation();
  const query = location.state?.query.toLowerCase() || "";

  const [recipes, setRecipes] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("/recipes.json")
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json);
        filterResults(json, query, filter); // Apply initial filters
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  // Filter recipes based on query
  const filterResults = (recipeList: any[], query: string, filter: string) => {
    let filtered = recipeList.filter((recipe) =>
      recipe.title.toLowerCase().includes(query)
    );

    if (filter !== "all") {
      switch (filter) {
        case "time":
          filtered = filtered.sort((a, b) => a.time - b.time);
          break;
        case "difficulty":
          filtered = filtered.sort((a, b) =>
            a.difficulty.localeCompare(b.difficulty)
          );
          break;
        case "vegan":
          filtered = filtered.filter((recipe) => recipe.vegan);
          break;
        case "glutenFree":
          filtered = filtered.filter((recipe) => recipe.glutenFree);
          break;
        case "main":
        case "side":
        case "dessert":
          filtered = filtered.filter((recipe) => recipe.type === filter);
          break;
        default:
          break;
      }
    }

    setResults(filtered);
  };

  useEffect(() => {
    filterResults(recipes, query, filter);
  }, [recipes, query, filter]);

  return (
    <div className="search-results">
      <SearchBar />
      <div className="controls">
        <select
          className="filter-dropdown"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="time">Shortest Time</option>
          <option value="difficulty">Easiest First</option>
          <option value="vegan">Vegan</option>
          <option value="glutenFree">Gluten Free</option>
          <option value="main">Main Dish</option>
          <option value="side">Side Dish</option>
          <option value="dessert">Dessert</option>
        </select>
      </div>
      <h2>Search Results for "{query}"</h2>
      <div className="scroll-container">
        {results.length > 0 ? (
          <div className="recipe-grid">
            {results.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>
                <p>
                  <strong>Instructions:</strong> {recipe.instructions}
                </p>
                <p>
                  <strong>Time:</strong> {recipe.time} mins
                </p>
                <p>
                  <strong>Difficulty:</strong> {recipe.difficulty}
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