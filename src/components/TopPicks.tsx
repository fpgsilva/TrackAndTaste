import { useEffect, useState } from "react";
import "./TopPicks.css";
import { useNavigate } from "react-router-dom";

const TopPicks = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("recipes.json")
      .then((response) => response.json())
      .then((json) => {
        setRecipes(json);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prevOffset) => (prevOffset + 1) % recipes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [recipes.length]);

  const handleScrollLeft = () => {
    setOffset(
      (prevOffset) => (prevOffset - 1 + recipes.length) % recipes.length
    );
  };

  const handleScrollRight = () => {
    setOffset(
        (prevOffset) => (prevOffset + 1 + recipes.length) % recipes.length
    );
  };

  const handleClick = (id: number) => {
    // Save the recipe id to local storage
    localStorage.setItem("selectedRecipeId", id.toString());

    // Redirect to the /Recipe/ page
    navigate("/Recipe");
  };

  return (
    <div className="carousel-container">
      <header className="carousel-header">Top Picks of the Week</header>
      <p></p>
      <button className="carousel-button left" onClick={handleScrollLeft}>
        &#8249;
      </button>
      <div className="carousel-wrapper">
        <div
          className="carousel"
          style={{
            transform: `translateX(-${offset * 15}%)`,
            display: "flex",
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {recipes.map((recipe) => (
            <div className="carousel-card" 
            key={recipe.id}
            onClick={() => handleClick(recipe.id)}
            >
              <h3>{recipe.title}</h3>
              <p>
                <strong>Time:</strong> {recipe.time} mins
              </p>
              <p>
                <strong>Difficulty:</strong> {recipe.difficulty}
              </p>
              <p>
                <strong>Ratting:{recipe.rating}</strong>
              </p>
            </div>
          ))}
        </div>
      </div>
      <button className="carousel-button right" onClick={handleScrollRight}>
        &#8250;
      </button>
    </div>
  );
};

export default TopPicks;
