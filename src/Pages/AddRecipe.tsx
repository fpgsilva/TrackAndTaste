import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";

export function AddRecipe() {
  const navigate = useNavigate();
  const stepsContainerRef = useRef<HTMLDivElement>(null); // Reference to the steps container
  const [recipe, setRecipe] = useState({
    title: "",
    time: "",
    difficulty: "",
    calories: "",
    description: "",
    ingredients: "",
    steps: [] as string[], // Store steps as an array of strings
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleStepChange = (index: number, value: string) => {
    const steps = [...recipe.steps];
    steps[index] = value;
    setRecipe({ ...recipe, steps });
  };

  const handleAddStep = () => {
    setRecipe((prev) => ({
      ...prev,
      steps: [...prev.steps, ""], // Add a new empty step
    }));
  };

  const handleCreate = () => alert("Recipe Created!");
  const handleContinueLater = () => alert("Recipe Saved for Later!");
  const handleDelete = () => {
    setRecipe({
      title: "",
      time: "",
      difficulty: "",
      calories: "",
      description: "",
      ingredients: "",
      steps: [],
    });
  };

  return (
    <div className="add-recipe">
      {/* Top left Go Back button */}
      <div className="back-container">
        <button className="back-button" onClick={() => navigate("/")}>
          ← Go Back
        </button>
      </div>

      <h1 className="recipe-header">Create New Recipe</h1>

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

        {/* Steps */}
        <div ref={stepsContainerRef} className="steps-container">
          <span>Steps:</span>
          {recipe.steps.map((step, index) => (
            <div key={index}>
              <textarea
                name={`step-${index}`}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
              ></textarea>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddStep}
            className="btn add-step"
          >
            Add Step
          </button>
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
