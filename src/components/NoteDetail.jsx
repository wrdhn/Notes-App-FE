import { useEffect } from 'react'
import { useNotes } from '../context/NotesContext'
import { useImmer } from 'use-immer'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Dropdown,
} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

function NoteDetail() {
  const { note, getNoteById, loading, editNote, deleteNote } = useNotes()
  const { id } = useParams()
  const navigate = useNavigate()
  const [noteData, setNoteData] = useImmer({
    title: '',
    tags: '',
    body: '',
  })

  useEffect(() => {
    if (id && noteData !== note) {
      console.log('Calling getNoteById...')
      getNoteById(id)
    }
  }, [id])

  useEffect(() => {
    if (note && noteData !== note) {
      setNoteData(draft => {
        draft.title = note.title || ''
        draft.tags = Array.isArray(note.tags)
          ? note.tags.join(', ')
          : note.tags || ''
        draft.body = note.body || ''
      })
      console.info('noteData.tags: ', noteData.tags)
    }
  }, [note, getNoteById])

  console.info('NoteData: ', noteData)

  const handleDelete = () => {
    deleteNote(id)
    navigate('/')
  }

  const handleSubmit = e => {
    e.preventDefault()

    const parsedTags = noteData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const note = {
      title: noteData.title,
      tags: parsedTags,
      body: noteData.body,
    }

    editNote(id, note)
    console.info('form submited')
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNoteData(draft => {
      draft[name] = value
    })
  }

  const handleTextareaResize = e => {
    const textarea = e.target

    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'

    handleChange(e)
  }

  const handleclose = () => {
    navigate(-1)
    console.log('navigate to dashboard')
  }

  const date = () => {
    const updatedAt = note.updatedAt
    const date =
      updatedAt instanceof Date
        ? updatedAt.toLocaleString('id-ID')
        : new Date(updatedAt).toLocaleString('id-ID')

    return date
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!note && !loading) {
    return <div>Note not found</div>
  }
  return (
    <div>
      <Container className='container-transition py-5'>
        <Card className='note-detail p-0'>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                type='text'
                name='title'
                placeholder='Title'
                value={noteData.title}
                onChange={handleChange}
                className='title-edit'
              />
              <hr className='line' />
              <InputGroup>
                <InputGroup.Text className='input-icon'>
                  <i className='bi bi-calendar'></i>
                </InputGroup.Text>
                <Form.Control
                  type='text'
                  value={`Last updated: ${date()}`}
                  className='date'
                  readOnly
                />
              </InputGroup>
              <hr className='line' />
              <InputGroup>
                <InputGroup.Text className='input-icon'>#</InputGroup.Text>
                <Form.Control
                  type='text'
                  name='tags'
                  placeholder='Tags'
                  value={noteData.tags}
                  onChange={handleChange}
                  className='tags-edit'
                />
              </InputGroup>
              <hr className='line' />
              {noteData.tags &&
                noteData.tags.split(',').map((tag, index) => (
                  <div key={index} className='badge ms-2 my-2'>
                    {tag.trim()}
                  </div>
                ))}
              <hr className='line' />
              <Form.Control
                as='textarea'
                name='body'
                placeholder='Body'
                value={noteData.body}
                onChange={handleTextareaResize}
                className='content-edit mb-3'
              />
              <div className='d-flex justify-content-between align-items-center action-buttons'>
                <div>
                  <Button
                    type='button'
                    className='btn-close-form btn-sm me-2'
                    onClick={handleclose}
                  >
                    Close
                  </Button>
                  <Button type='submit' className='btn-sm btn-done'>
                    Save Changes
                  </Button>
                </div>
                <div className='trash-button' onClick={handleDelete}>
                  <i className='bi bi-trash'></i>
                </div>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default NoteDetail
