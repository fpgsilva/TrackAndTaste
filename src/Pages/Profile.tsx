import { Link } from "react-router-dom";
import './Profile.css'; // Import the CSS file

export function Profile() {


  return (
    <div className="profile-container">
      <img src="/user-icon.png" alt="User Icon" className="profile-image" />
      <div className="profile-links">
        <Link to="/Recipebook">Recipe Book</Link>
        <Link to="/AddRecipe">Add Recipe</Link>
        <Link to="/CalorieTracker">Calorie Tracker</Link>
        <Link to="/Settings">Settings</Link>
      </div>
    </div>
  );
}
