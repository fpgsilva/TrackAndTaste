import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";
import Navbar from "../components/Navbar";

export function AddRecipe() {
  const navigate = useNavigate();
  const stepsContainerRef = useRef<HTMLDivElement>(null); // Reference to the steps container

  const [recipe, setRecipe] = useState({
    title: "",
    time: "",
    difficulty: "",
    calories: "",
    description: "",
    ingredients: [] as string[],
    steps: [] as string[], // Store steps as an array of strings
    image: "", // New state for storing the image file
  });

  const [ingredientsInput, setIngredientsInput] = React.useState(recipe.ingredients.join(", "));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
  
    if (name === "calories") {
      const numericValue = Math.max(0, parseInt(value) || 0); // Ensure value is at least 0
      setRecipe({ ...recipe, [name]: numericValue.toString() });
    } else if (name === "ingredients") {
      setIngredientsInput(value); // Update the temporary input state
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };
  
  const handleBlur = () => {
    // Transform the input string into an array on blur
    const ingredientsArray = ingredientsInput
      .split(",")
      .map((ingredient) => ingredient.trim())
      .filter((ingredient) => ingredient !== "");
  
    setRecipe({ ...recipe, ingredients: ingredientsArray });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setRecipe({ ...recipe, image: reader.result as string });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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

  const handleRemoveStep = (index: number) => {
    const updatedSteps = recipe.steps.filter((_, i) => i !== index);
    setRecipe({ ...recipe, steps: updatedSteps });
  };

  const handleCreate = () => {
    const existingRecipes = JSON.parse(
      localStorage.getItem("userRecipes") || "[]"
    );
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(), // Generate a unique ID
    };

    const updatedRecipes = [...existingRecipes, newRecipe];
    localStorage.setItem("userRecipes", JSON.stringify(updatedRecipes));

    alert("Recipe Created!");
    navigate("/recipebook"); // Navigate back to the Recipebook page
  };

  const handleContinueLater = () => alert("Recipe Saved for Later!");
  const handleDelete = () => {
    setRecipe({
      title: "",
      time: "",
      difficulty: "",
      calories: "",
      description: "",
      ingredients: [],
      steps: [],
      image: "",
    });
  };

  return (
    <div>
      <div className="add-recipe">
        {/* Top left Go Back button */}
        <div className="back-container">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>

        <h1 className="recipe-header">Create New Recipe</h1>

        <form className="recipe-form">
          {/* Title */}
          <label>
            <span>Title: </span>
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
              <p></p>
              <span>Calories (kcal):</span>
              <input
                type="text" // Changed from "number" to "text"
                name="calories"
                value={recipe.calories}
                onChange={(e) => {
                  // Allow only numeric values
                  const numericValue = e.target.value.replace(/[^0-9]/g, "");
                  setRecipe({ ...recipe, calories: numericValue });
                }}
                inputMode="numeric" // Ensures a numeric keyboard on mobile devices
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
              className="no-resize"
            ></textarea>
          </label>

          <label>
            <span>Ingredients:</span>
            <textarea
              name="ingredients"
              value={ingredientsInput} // Use the temporary input state
              onChange={handleChange}
              onBlur={handleBlur} // Update the ingredients array when input loses focus
              placeholder="List all ingredients"
              className="no-resize"
            ></textarea>
          </label>

          {/* Image Upload */}
          <div className="image-upload">
            <span>Upload Image:</span>
            <div className="image-square">
              {recipe.image ? (
                <img
                  src={recipe.image}
                  alt="Recipe Preview"
                  className="image-preview"
                />
              ) : (
                <span className="placeholder">No Image</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="choose-file"
            />
          </div>

          {/* Steps */}
          <div ref={stepsContainerRef} className="steps-container">
            <span>Steps:</span>
            {recipe.steps.map((step, index) => (
              <div key={index} className="step-item">
                <textarea
                  name={`step-${index}`}
                  value={step}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  placeholder={`Step ${index + 1}`}
                  className="no-resize"
                ></textarea>
              </div>
            ))}
            <div className="step-buttons-container">
              <button
                type="button"
                onClick={handleAddStep}
                className="btn add-step"
              >
                Add Step
              </button>
              <button
                type="button"
                onClick={() => handleRemoveStep(recipe.steps.length - 1)}
                className="btn remove-step"
                disabled={recipe.steps.length === 0}
              >
                Remove Step
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
      <Navbar />
    </div>
  );
}
