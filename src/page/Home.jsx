import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import MovieItem from "../components/MovieItems";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/3/movie/popular?language=en-US&page=2`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }
        );
        const { data } = response;

        setPopularMovies(data?.results);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          alert(error?.response?.data?.status_message);
          return;
        }
        alert(error?.message);
      }
    };

    getPopularMovies();
  }, []);

  if (popularMovies.length === 0) {
    return <h1>Loading....</h1>;
  }

  return (
    <Container className="mt-5">
      <Row className="g-5">
        {popularMovies.map((movie) => (
          <Col md={3} key={movie?.id}>
            <MovieItem
              id={movie?.id}
              imageURL={import.meta.env.VITE_API_IMAGE_URL + movie?.poster_path}
              overview={movie?.overview}
              title={movie?.title}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
