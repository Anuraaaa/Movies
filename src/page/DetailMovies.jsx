import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarouselItemDetail from "../components/CarouselItemDetail";

const DetailMovies = () => {
  const { movieId } = useParams();
  const [detailMovie, setDetailMovie] = useState([]);

  // TODO: Hit the movie details API and render it
  useEffect(() => {
    const getDetailMoviesByID = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/movie/${movieId}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setDetailMovie(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data?.status_message);
          return;
        }
        alert(error?.message);
      }
    };
    
    getDetailMoviesByID();    

  }, []);
  
  return (
    <CarouselItemDetail image={`${import.meta.env.VITE_API_IMAGE_URL}/${detailMovie.backdrop_path}`} title={detailMovie.original_title} genres={detailMovie.genres} detail={detailMovie.overview} rating={detailMovie.vote_average}/>
  )
};

export default DetailMovies;
