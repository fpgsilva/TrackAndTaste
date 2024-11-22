import { useEffect, useState } from "react";
import "./RecentCooked.css";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export function RecentCooked() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("recent.json")
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  const handleClick = (id: number) => {
    // Save the recipe id to local storage
    localStorage.setItem("selectedRecipeId", id.toString());

    // Redirect to the /Recipe/ page
    navigate("/Recipe");
  };

  return (
    <div className="recent-cooked">
      <h2 className="title">Recently Cooked Recipes</h2>
      <div className="scroll-container1">
        {recipes.length > 0 ? (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
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
                <strong>Rating:</strong> {recipe.rating}
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
