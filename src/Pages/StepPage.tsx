import { useNavigate } from "react-router-dom";
import "./StepPage.css"; // Import the CSS file

function StepPage() {
  const navigate = useNavigate();

  return (
    <div className="step-page">
      {/* Go Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Go Back
      </button>

      {/* Step Title */}
      <h1 className="step-title">Recipe Completed!</h1>

      {/* Time and Completion Message */}
      <div className="step-details">
        <p>🕒 Time: 0m</p>
        <p className="last-step">
          Final Step: Plate the dish and garnish it as desired.
        </p>

        <h2>Your recipe is done and ready to eat!</h2>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button
          onClick={() => navigate("/review")}
          className="nav-button review-button"
        >
          Review Recipe
        </button>
        <button
          onClick={() => navigate("/")}
          className="nav-button home-button"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default StepPage;
