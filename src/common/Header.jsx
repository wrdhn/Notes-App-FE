import { useState, useEffect } from 'react'
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScrolled = () => {
      setHasScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScrolled)

    return () => window.removeEventListener('scroll', handleScrolled)
  }, [])

  const handleToHome = () => {
    navigate('/')
  }

  return (
    <Navbar
      expand='lg'
      className={`bg-primary ${hasScrolled ? 'navbar-scrolled' : ''}`}
      sticky='top'
    >
      <Container className='d-flex align-items-center'>
        <Navbar.Brand onClick={handleToHome} className='icon fw-bold fs-3 p-0'>
          N<span className='icon2'>otes</span>
        </Navbar.Brand>
        <Nav>
          <Nav.Link className='logout-link d-flex align-items-center gap-2 fw-medium p-0'>
            <i className='logout-icon bi bi-box-arrow-right fs-5'></i>
            Logout
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
