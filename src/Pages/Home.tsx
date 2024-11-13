import Navbar from "../components/Navbar";
import MainScreen from "../components/MainScreen";
import SearchBar from "../components/SearchBar";

export function Home() {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <SearchBar />
      </div>
      <div>
        <MainScreen />
      </div>
    </>
  );
}
