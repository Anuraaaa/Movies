import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailMovies = () => {
  const { movieId } = useParams();

  // TODO: Hit the movie details API and render it
  useEffect(() => {}, []);

  return <div>{movieId}</div>;
};

export default DetailMovies;
