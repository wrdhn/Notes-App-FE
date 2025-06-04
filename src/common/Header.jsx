import { useState } from 'react'
import { Navbar, Nav, Container, Modal, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function Header() {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const handleToHome = () => {
    navigate('/')
  }
  const handleLogout = () => {
    setShow(true)
  }

  const handleCLose = () => {
    setShow(false)
  }

  return (
    <div>
      <Navbar expand='lg' className='bg-primary'>
        <Container>
          <Navbar.Brand
            onClick={handleToHome}
            className='icon fw-semibold fs-4'
          >
            Notes
          </Navbar.Brand>
          <Nav>
            <Nav.Link className='text-white' onClick={handleLogout}>
              <i class='bi bi-box-arrow-right me-2'></i>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleCLose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className='text-center'>
          Authentication is under development
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-primary' onClick={handleCLose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Header
