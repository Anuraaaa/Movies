import { Container, Navbar, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-danger fs-2">
          Movielist
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="What do you want to watch?"
              className="me-2"
              aria-label="Search"
            />
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
