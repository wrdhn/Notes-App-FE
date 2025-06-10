import { useImmer } from 'use-immer'
import { useNotes } from '../context/NotesContext'
import Note from './Note'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Container } from 'react-bootstrap'

function LatestNotes() {
  const { notes } = useNotes()
  const navigate = useNavigate()
  const [currentUpdated, SetCurrentUpdated] = useImmer([
    {
      title: 'No new notes yet',
      tags: [],
      body: 'empty',
      id: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ])

  const getLatestNotes = (notes, limit = 4) => {
    return notes
      .filter(note => note.id)
      .sort(
        (a, b) =>
          new Date(b.updatedAt || b.createdAt) -
          new Date(a.updatedAt || a.createdAt)
      )
      .slice(0, limit)
  }

  const handleClick = () => {
    navigate('note-list')
  }

  useEffect(() => {
    SetCurrentUpdated(getLatestNotes(notes))
  }, [notes])

  console.log('current notes', currentUpdated)

  return (
    <Container className='newest-notes container-transition bg-secondary p-3'>
      <div className='d-flex justify-content-between px-1 mb-4'>
        <span className='text-white fs-5 fw-medium'>Latest Notes</span>
        <button onClick={handleClick} className='navigate-all-notes'>
          See All
        </button>
      </div>
      <Row className='g-3'>
        {currentUpdated.map(note => (
          <Note note={note} />
        ))}
      </Row>
    </Container>
  )
}

export default LatestNotes
