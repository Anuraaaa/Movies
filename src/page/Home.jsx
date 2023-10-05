import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Container, Carousel, Image, Button } from "react-bootstrap";
import MovieItem from "../components/MovieItems";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [show, setShow] = useState(false);
  const [trailer, setTrailer] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    
    popularMovies.map(async(movie) => {        
        try {
            const response = await axios.get(
                `${
            import.meta.env.VITE_API_URL
          }/3/movie/${movie.id}/videos`,
          {
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_AUTH_TOKEN}`,
            },
          }        
        );
        const { data } = response;
        setTrailer(data?.results);
      } catch (error) {
          console.error(error);
        }
    })
  }, []);
  if (popularMovies.length === 0) {
    return <h1>Loading....</h1>;
  }
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Carousel>
            {popularMovies.map((movie, i) => {
                if (i <= 3) {
                  return (
                    <Carousel.Item key={i}>
                      <Image src={`${import.meta.env.VITE_API_IMAGE_URL}/${movie.backdrop_path}`} fluid />
                      <Carousel.Caption>
                        <h3>{movie.original_title}</h3>
                        <p>{movie.overview}</p>
                        <Button variant="primary" onClick={handleShow}>
                          Watch Trailer
                        </Button>
                      </Carousel.Caption>
                    </Carousel.Item>
                  )
                }
              })}
          </Carousel>
        </Col>
      </Row>
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
