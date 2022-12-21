import { Nav, Navbar, Container } from 'react-bootstrap'

export default function NavBar() {
  return (
  <Navbar bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#">Brasil Tools 🔨</Navbar.Brand>
      <Nav className="">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#features">Find your address</Nav.Link>
        <Nav.Link href="#pricing">CEP Finder</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
  )
}
