import { useEffect, useState } from "react";
import "./TopPicks.css";

const TopPicks = () => {
    const [recipes, setRecipes] = useState<any[]>([]);
    const [offset, setOffset] = useState(0);

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
        setOffset((prevOffset) => (prevOffset - 1 + recipes.length) % recipes.length);
    };

    const handleScrollRight = () => {
        setOffset((prevOffset) => (prevOffset + 1) % recipes.length);
    };

    return (
        <div className="carousel-container">
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
                <div className="carousel-card" key={recipe.id}>
                <h3>{recipe.title}</h3>
                <p>
                    <strong>Time:</strong> {recipe.time} mins
                </p>
                <p>
                    <strong>Difficulty:</strong> {recipe.difficulty}
                </p>
                <p>
                    <strong>Ratting:</strong>
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
