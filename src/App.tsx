import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "./Pages/Home";
import { Recipebook } from "./Pages/Recipebook";
import { Profile } from "./Pages/Profile";
import { AddRecipe } from "./Pages/AddRecipe";
import { Settings } from "./Pages/Settings";
import { CalorieTracker } from "./Pages/CalorieTracker";
import { SearchResults } from "./Pages/SearchResults";
import { Recipe } from "./Pages/Recipe";
import { Review } from "./Pages/Review";
import { RecipeReviews } from "./Pages/RecipeReviews";

import StepPage from "./Pages/StepPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Recipebook" element={<Recipebook />}></Route>
          <Route path="/Profile" element={<Profile />}></Route>
          <Route path="/AddRecipe" element={<AddRecipe />}></Route>
          <Route path="/CalorieTracker" element={<CalorieTracker />}></Route>
          <Route path="/SearchResults" element={<SearchResults />}></Route>
          <Route path="/Recipe" element={<Recipe />}></Route>
          <Route path="/Settings" element={<Settings />}></Route>
          <Route path="/Review" element={<Review />}></Route>
          <Route path="/RecipeReviews" element={<RecipeReviews />}></Route>

          <Route path="/Step" element={<StepPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
