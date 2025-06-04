import { useNavigate } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'
import Notes from './Notes'

function Dashboard() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/addNote')
  }

  return (
    <div>
      <Container>
        <Card className='bg-primary border-0 my-5'>
          <Card.Header className='bg-primary border-0 text-center py-0'>
            <h1 className='header'>Welcome to your personal notebook</h1>
          </Card.Header>
          <Card.Body className='bg-primary border-0 text-center py-0'>
            <h3 className='subtitle'>
              Jot down ideas, memories, or anything that comes to mind
            </h3>
          </Card.Body>
          <Card.Footer className='bg-primary border-0 mt-5'>
            <Button onClick={handleClick}>+ Add Note</Button>
          </Card.Footer>
        </Card>
        <Notes />
      </Container>
    </div>
  )
}

export default Dashboard
