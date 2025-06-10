import { useNavigate } from 'react-router-dom'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { useNotes } from '../context/NotesContext'

function Note({ note }) {
  const { getNoteById } = useNotes()
  const navigate = useNavigate()

  const handleClick = () => {
    getNoteById(note.id)
    navigate(`/note-detail/${note.id}`)
  }

  console.log('noteId', note.id)

  return (
    <Col key={note.id} sm={6} md={4} lg={3}>
      <Card className='h-100 note-card'>
        <Card.Body>
          <Card.Title className='fs-4 fw-semibold'>{note.title}</Card.Title>
          <Card.Subtitle className='fw-medium'>
            {note.tags.map(tag => (
              <span className='tags'>{tag}</span>
            ))}
          </Card.Subtitle>
          <Card.Text className='mt-2 fw-normal'>{note.body}</Card.Text>
          <Card.Link>
            <Button size='sm' className='btn-secondary' onClick={handleClick}>
              Detail
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Note
