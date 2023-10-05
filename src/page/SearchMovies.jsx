import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MovieItem from "../components/MovieItems";

const SearchMovies = () => {
  // Create state for movies that have been searched

  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const getSearchMovie = async () => {
      try {
        const query = searchParams.get("query");
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }        
        );
        const { data } = response;
        setMovies(data?.results);
      } catch (error) {
        console.error(error);
      }
    };

    getSearchMovie();
  }, []);

  // TODO: Foreach or map every object of movies array
  return (
    <div className="d-flex flex-row flex-wrap gap-5 mt-4 justify-content-center">
      {movies?.map((movie) => {
        return (
          <MovieItem id={movie.id} title={movie.title} overview={movie.overview} imageURL={import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path}/>
        )
      })}
    </div>
  )
};

export default SearchMovies;
