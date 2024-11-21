import { useEffect, useState } from "react";
import "./RecentCooked.css";
import Navbar from "./Navbar";


export function RecentCooked() {

  const [recipes, setRecipes] = useState<any[]>([]);

  useEffect(() => {
    fetch("recipes.json")
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  return (
    <div className="recent-cooked">
      <h2 className="title">Recently Cooked Recipes</h2>
      <div className="scroll-container">
        {recipes.length > 0 ? (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <div className="recipe-card" key={recipe.id}>
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