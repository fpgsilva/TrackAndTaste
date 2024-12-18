import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./SearchResults.css";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export function SearchResults() {
  const location = useLocation();
  const query = location.state?.query.toLowerCase() || "";
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch all recipe files in parallel
        const files = ["recipes.json", "calories.json", "recent.json", "recipeBook.json", "user-recipes.json"];
        const fetchPromises = files.map((file) => fetch(file).then((res) => res.json()));
        const jsonResults = await Promise.all(fetchPromises);

        // Combine all fetched recipes
        let combinedRecipes: any[] = jsonResults.flat();

        // Retrieve user recipes from local storage
        const localUserRecipes = localStorage.getItem("userRecipes");
        if (localUserRecipes) {
          const parsedUserRecipes = JSON.parse(localUserRecipes);
          combinedRecipes = combinedRecipes.concat(parsedUserRecipes);
        }

        const uniqueRecipes = Array.from(
          new Map(combinedRecipes.map((recipe) => [recipe.id, recipe])).values()
        );

        // Set recipes and apply initial filters
        setRecipes(uniqueRecipes);
        filterResults(uniqueRecipes, query, filter);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [filter]);

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

  const handleClick = (id: number) => {
    // Save the recipe id to local storage
    localStorage.setItem("selectedRecipeId", id.toString());

    // Redirect to the /Recipe/ page
    navigate("/Recipe");
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
              <div
                className="recipe-card"
                key={recipe.id}
                onClick={() => handleClick(recipe.id)}
                style={{
                  backgroundImage: `linear-gradient(to left, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 70%), url(${recipe.image})`,
                  backgroundSize: "cover", // Ensures the image covers the entire div
                  backgroundPosition: "center", // Centers the image
                  backgroundRepeat: "no-repeat", // Prevents tiling
                }}
              >
                <h3>{recipe.title}</h3>
                <p>
                  <strong>Ingredients:</strong> {recipe.ingredients.join(", ")}
                </p>
                <p>
                  <strong>Description:</strong> {recipe.description}
                </p>
                <p>
                  <strong>Time:</strong> {recipe.time} mins
                </p>
                <p>
                  <strong>Difficulty:</strong> {recipe.difficulty}
                </p>
                <p>
                  <strong>Rating:{recipe.rating}</strong>
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
