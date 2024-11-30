import './Review.css';
import Navbar from "../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";


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
export function Review() {
    const navigate = useNavigate();

    const [recipeID, setRecipeID] = useState<number | null>(null);
    const [recipeData, setRecipeData] = useState<RecipeInt | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [review, setReview] = useState<string>("");
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [hover, setHover] = useState<number | null>(null);
  
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const savedLoginState = localStorage.getItem("isLoggedIn");
        return savedLoginState ? JSON.parse(savedLoginState) : false; // Convert string to boolean
      });

      useEffect(() => {
        const storedRecipeID = localStorage.getItem("selectedRecipeId");
        if (!storedRecipeID)
          throw new Error("No recipe ID found in localStorage");

        const parsedID = parseInt(storedRecipeID, 10);
        if (isNaN(parsedID))
          throw new Error("Invalid recipe ID stored in localStorage");

        setRecipeID(parsedID);
      }, [recipeID]);

    const handleReviewSubmit = () => {
        if(!isLoggedIn){
            alert("Must be Logged In");
            return;
          }
        if (selectedRating == null) {
          alert("Please rate 1-5 stars");
          return;
        }
      
        // Create the new review
        const newReview: Review = {
          recipeId: recipeID as number, // Ensure recipeID is not null
          rating: selectedRating,
          comment: review,
        };
      
        // Get existing reviews from localStorage
        const storedReviews = localStorage.getItem("userReviews");
        const existingReviews: Review[] = storedReviews ? JSON.parse(storedReviews) : [];
      
        // Add the new review to the existing reviews
        const updatedReviews = [...existingReviews, newReview];
        
        // Update localStorage with the new list of reviews
        localStorage.setItem("userReviews", JSON.stringify(updatedReviews));
      
        // Update state to include the new review
        setReviews((prevReviews) => [...prevReviews, newReview]);
        setReviewCount((prevCount) => prevCount + 1);
      
        // Clear the form
        setSelectedRating(null);
        setReview("");
        navigate(-1);
      };
    
  return (
    <div className="review-container">

        <div className="back-container1">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </div>




      <div className="ratings">
          <h3>Leave a Rating</h3>
          <div style={{ display: "flex", gap: "0px" }}>
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={index}
                  onClick={() => setSelectedRating(starValue)}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer" }}
                >
                  {starValue <= (hover || selectedRating || 0) ? (
                    <AiFillStar size={30} color="#ffc107" />
                  ) : (
                    <CiStar size={30} color="#e4e5e9" />
                  )}
                </span>
              );
            })}
          </div>
        </div>

        <div className="review">
          <h3>Add a Comment to Your Review</h3>
          <textarea
            id="reviewText"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
          />
          <button onClick={handleReviewSubmit}>Submit</button>
        </div>

      
      <Navbar />

    </div>
  );
}