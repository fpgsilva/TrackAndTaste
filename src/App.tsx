import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Layout } from "./Layout";
import { Recipebook } from "./Pages/Recipebook";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/Recipebook" element={<Recipebook />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
