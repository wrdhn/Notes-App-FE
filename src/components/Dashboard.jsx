import { Container, Card, Button } from 'react-bootstrap'
import AddNote from './AddNote'
import Notes from './NoteList'
import CurrentUpdate from './LatestNotes'

function Dashboard() {
  return (
    <div>
      <Container className='container-transition'>
        <Card className='dashboard bg-primary border-0'>
          <Card.Body className='dashboard-item bg-primary border-0'>
            <div className='header text-center mb-5'>
              Welcome to your <br /> personal notebook
            </div>
            <h3 className=' subtitle text-center'>
              Jot down ideas, memories, or anything that comes to mind
            </h3>
            <div className='form-note my-5'>
              <AddNote />
            </div>
            <CurrentUpdate />
          </Card.Body>
        </Card>
      </Container>
      <div className='note-list'></div>
    </div>
  )
}

export default Dashboard
