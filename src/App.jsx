import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import SearchMovies from "./page/SearchMovies";
import DetailMovies from "./page/DetailMovies";
import NavbarComponent from "./components/Navbar";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <NavbarComponent />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchMovies />} />
          <Route path="/details/:movieId" element={<DetailMovies />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

