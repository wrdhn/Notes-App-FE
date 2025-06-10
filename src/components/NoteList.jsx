import { useNavigate } from 'react-router-dom'
import { useNotes } from '../context/NotesContext'
import Note from './Note'
import { Container, Row } from 'react-bootstrap'

function NoteList() {
  const { notes } = useNotes()
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  console.info('data to build a note list', notes)

  return (
    <div>
      <Container className='container-transition mt-4'>
        <div className='d-flex align-items-center justify-content-between p-3 mb-5'>
          <button
            className='back-btn d-flex align-items-center fs-5'
            onClick={handleBackClick}
          >
            <i className='bi bi-chevron-left me-1'></i>
            Back
          </button>
          <h4 className='mb-0 position-absolute start-50 translate-middle-x text-white'>
            NoteList
          </h4>
        </div>
        <Row className='g-3'>
          {notes.map(note => {
            return <Note note={note} />
          })}
        </Row>
      </Container>
    </div>
  )
}

export default NoteList
