import Navbar from "../components/Navbar";
import MainScreen from "../components/MainScreen";
import SearchBar from "../components/SearchBar";
import TopPicks from "../components/TopPicks";

export function Home() {
  return (
    <>
      <div>
        <SearchBar />
      </div>
      <div>
        <TopPicks />
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
