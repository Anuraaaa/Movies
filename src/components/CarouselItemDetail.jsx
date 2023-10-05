import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Carousel, Container, Image } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

export default function CarouselItemDetail({image, title, genres, detail, rating}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const getTrailerMovie = async () => {
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
      } catch (error) {
        console.error(error);
      }
    };

    getTrailerMovie();
  }, []);

  return (
    <Container>
        <Carousel>
          <Carousel.Item>
            <Image src={image} fluid />
            <Carousel.Caption>
              <h1>{title}</h1>
              {genres?.map((data, i) => {
                return <h5 key={i} style={{display: "inline", margin: "4px"}}>{data.name}</h5>
              })}
              <p>{detail}</p>
              <p>⭐{rating}/10</p>
              <Button variant="primary" onClick={handleShow}>
                Watch Trailer
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>  
      </Container>
    )
}