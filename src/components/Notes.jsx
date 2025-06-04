import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { useNotes } from '../context/NotesContext'

function Notes() {
  const { notes } = useNotes()

  console.info('data to build a note list', notes)

  return (
    <div>
      <Container>
        <Row className='g-3 mt-3'>
          {notes.map(note => {
            return (
              <Col key={note.id} sm={6} md={4} lg={3}>
                <Card className='h-100'>
                  <Card.Body>
                    <Card.Title className='fs-4 fw-semibold'>
                      {note.title}
                    </Card.Title>
                    <Card.Subtitle className=' tags fs-5 medium'>
                      {note.tags}
                    </Card.Subtitle>
                    <Card.Text className='fw-normal'>{note.body}</Card.Text>
                    <Card.Link>
                      <Button size='sm' className='btn-secondary'>
                        Detail
                      </Button>
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  )
}

export default Notes
