import { Nav, Navbar, Container, Image } from 'react-bootstrap'
import imgUrl from '../assets/icons8-github-64.png'

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Container>
      <Navbar.Brand href="#">Brasil Tools 🔨</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#">Address Finder</Nav.Link>
          <Nav.Link href="#">CEP Finder</Nav.Link>
        </Nav>
        <Nav className="">
          <Nav.Link className='p-0 m-0'><img className='p-0' height={40} src={imgUrl} /></Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}
