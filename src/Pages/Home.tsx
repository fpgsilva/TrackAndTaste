import Navbar from "../components/Navbar";
import MainScreen from "../components/MainScreen";
import SearchBar from "../components/SearchBar";

export function Home() {
  return (
    <>
    <div>
        <SearchBar />
      </div>
      <div>
        <Navbar />
      </div>
      
      <div>
        <MainScreen />
      </div>
    </>
  );
}
