import './Review.css'; // Import the CSS file
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


interface RecipeInt {
  id: number;
  title: string;
  ingredients: string[];
  instructions: string;
  time: number;
  difficulty: "easy" | "medium" | "hard";
  type: "main" | "side" | "dessert";
  vegan: boolean;
  glutenFree: boolean;
  calories: number;
  description: string;
}

interface Review {
  recipeId: number;
  rating: number;
  comment: string;
}
export function RecipeReviews() {
    const navigate = useNavigate();

    const [recipeID, setRecipeID] = useState<number | null>(null);

  
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewCount, setReviewCount] = useState(0);
    useEffect(() => {
        const storedRecipeID = localStorage.getItem("selectedRecipeId");
        if (!storedRecipeID)
          throw new Error("No recipe ID found in localStorage");

        const parsedID = parseInt(storedRecipeID, 10);
        if (isNaN(parsedID))
          throw new Error("Invalid recipe ID stored in localStorage");

        setRecipeID(parsedID);
      }, [recipeID]);
      useEffect(() => {
        const fetchReviews = () => {
            console.log(recipeID);
          if (recipeID === null) return;
      
          // Initialize arrays for localStorage and JSON file reviews
          const allReviews: Review[] = [];
      
          // Get reviews from localStorage
          const storedReviews = localStorage.getItem("userReviews");
          if (storedReviews) {
            const parsedReviews: Review[] = JSON.parse(storedReviews);
            const localReviews = parsedReviews.filter((review) => review.recipeId === recipeID);
            allReviews.push(...localReviews);
          }
      
          // Fetch reviews from the reviews.json file
          fetch("reviews.json")
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to fetch reviews.json");
              }
              return response.json();
            })
            .then((jsonReviews: Review[]) => {
              const fileReviews = jsonReviews.filter((review) => review.recipeId === recipeID);
              allReviews.push(...fileReviews);
      
              // Update state with combined reviews
              setReviews(allReviews);
              setReviewCount(allReviews.length);
            })
            .catch((err) => {
              console.error("Error fetching reviews.json:", err);
              // Even if fetching JSON fails, we still update the state with what we have
              setReviews(allReviews);
              setReviewCount(allReviews.length);
            });
        };
      
        fetchReviews();
      }, [recipeID]);
      
    
  return (
    <div className="review-container">

        <div className="back-container1">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>
      <div>
          <h3>Reviews ({reviewCount})</h3>
          {reviews.length > 0 ? (
            reviews.map((r, i) => (
              <div key={i} className="review-item">
                <p>Rating: {r.rating} ⭐</p>
                <p>Comment: {r.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to add one!</p>
          )}
        </div>
      
      <Navbar />

    </div>
  );
}