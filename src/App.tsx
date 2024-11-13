import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainScreen from "./components/MainScreen";
import Navbar from "./components/Navbar";
import RecipeBook from "./components/RecipeBook"; // Create this component for the new page

function App() {
  return (
    <Router>
      <div>
        <Navbar />
      </div>
      <div>
        <Routes>
          {/* Define routes here */}
          <Route path="/" element={<MainScreen />} />
          <Route path="/recipe-book" element={<RecipeBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
