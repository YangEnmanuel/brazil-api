import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import imgUrl from '../assets/icons8-github-64.png'

const goBottom = () => {
  window.scrollTo(0, document.body.scrollHeight)
}

export default function NavBar () {
  return (
    <Navbar fixed='top' collapseOnSelect expand='lg' bg='light' variant='light'>
      <Container>
        <Navbar.Brand href='#'>Brasil Tools 🔨</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='#top'>Address Finder</Nav.Link>
            <Nav.Link href='#' onClick={goBottom}>
              CEP Finder
            </Nav.Link>
          </Nav>
          <Nav className=''>
            <Nav.Link
              href='https://github.com/yangenmanuel/brazil-tools'
              className='p-0 m-0'
            >
              <img className='p-0' height={40} src={imgUrl} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
