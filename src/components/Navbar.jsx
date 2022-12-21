import { Nav, Navbar, Container } from 'react-bootstrap'

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#">Brasil Tools 🔨</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
        </Nav>
        <Nav className="">
          <Nav.Link href="#">Address Finder</Nav.Link>
          <Nav.Link href="#">CEP Finder</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
