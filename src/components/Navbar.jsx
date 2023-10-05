import { useState } from "react";
import { Container, Navbar, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const [input, setInput] = useState('');

  const cleanAndPrepareQuery= (userInput) => {
    // Replace spaces with plus signs for a URL query
    const sanitizedInput = userInput.replace(/ /g, '+');
  
    // Encode the input to make it URL-safe
    const encodedInput = encodeURIComponent(sanitizedInput);
  
    return encodedInput;
  }
  
  const handleInputChange = (event) => {
      setInput(event.target.value);
  }

  const submitSearch = (e) => {
    e.preventDefault();
    const cleanInput = cleanAndPrepareQuery(input);
    window.location = `/search?query=${cleanInput}`;
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-danger fs-2">
          Movielist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form onSubmit={submitSearch}>
            <Form.Control
              type="search"
              placeholder="What do you want to watch?"
              className="me-2"
              aria-label="Search"
              onChange={handleInputChange}
            />
          </Form>
          <Form className="d-flex">
            <Button variant="outline-success">Login</Button>
            <Button
              variant="outline-success"
              className="btn btn-danger text-white"
            >
              Register
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
