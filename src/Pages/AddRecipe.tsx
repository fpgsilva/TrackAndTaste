import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";

export function AddRecipe() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    title: "",
    time: "",
    difficulty: "",
    calories: "",
    description: "",
    ingredients: "",
    steps: [] as string[], // Store steps as an array of strings
    stepCount: 1, // Number of steps (default to 1)
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Update steps if stepCount changes
    if (name === "stepCount") {
      const stepCount = parseInt(value) || 1; // Ensure stepCount is at least 1
      setRecipe({
        ...recipe,
        stepCount,
        steps: Array(stepCount).fill(""), // Reset steps array to match step count
      });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleStepChange = (index: number, value: string) => {
    const steps = [...recipe.steps];
    steps[index] = value;
    setRecipe({ ...recipe, steps });
  };

  const handleCreate = () => {
    alert("Recipe Created!"); // Update with modal or toast notification later
  };

  const handleContinueLater = () => {
    alert("Recipe Saved for Later!");
  };

  const handleDelete = () => {
    setRecipe({
      title: "",
      time: "",
      difficulty: "",
      calories: "",
      description: "",
      ingredients: "",
      steps: [],
      stepCount: 1,
    });
  };

  return (
    <div className="add-recipe">
      {/* Back button */}
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <h1>Create New Recipe</h1>

      <form className="recipe-form">
        {/* Title */}
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            placeholder="Enter your recipe title"
          />
        </label>

        {/* Recipe Details */}
        <div className="recipe-details">
          <label>
            <span>Time:</span>
            <input
              type="text"
              name="time"
              value={recipe.time}
              onChange={handleChange}
              placeholder="e.g., 30 mins"
            />
          </label>
          <label>
            <span>Difficulty:</span>
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <label>
            <span>Calories (kcal):</span>
            <input
              type="number"
              name="calories"
              value={recipe.calories}
              onChange={handleChange}
              placeholder="e.g., 200"
            />
          </label>
        </div>

        {/* Brief Description */}
        <label>
          <span>Brief Description:</span>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleChange}
            placeholder="A short description of your recipe"
          ></textarea>
        </label>

        {/* Ingredients */}
        <label>
          <span>Ingredients:</span>
          <textarea
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            placeholder="List all ingredients"
          ></textarea>
        </label>

        {/* Number of Steps */}
        <label>
          <span>Number of Steps:</span>
          <input
            type="number"
            name="stepCount"
            min="1"
            value={recipe.stepCount}
            onChange={handleChange}
            placeholder="e.g., 3"
          />
        </label>

        {/* Steps */}
        <div>
          <span>Steps:</span>
          {Array.from({ length: recipe.stepCount }).map((_, index) => (
            <div key={index}>
              <textarea
                name={`step-${index}`}
                value={recipe.steps[index] || ""}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
              ></textarea>
            </div>
          ))}
        </div>

        {/* Add Images Section */}
        <div className="add-images">
          <span>Add Images:</span>
          <div className="image-buttons">
            <button type="button" className="add-image">
              +
            </button>
            <button type="button" className="add-image">
              +
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="buttons">
          <button type="button" onClick={handleDelete} className="btn delete">
            Delete
          </button>
          <button
            type="button"
            onClick={handleContinueLater}
            className="btn continue"
          >
            Continue Later
          </button>
          <button type="button" onClick={handleCreate} className="btn create">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}
