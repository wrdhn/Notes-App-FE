import { useRef, useState } from 'react'
import { useImmer } from 'use-immer'
import { useNotes } from '../context/NotesContext'
import { Container, Form, Row, Col, Card, Button } from 'react-bootstrap'

function AddNote() {
  const { addNote, notes } = useNotes()
  const [isExpanded, setIsExpanded] = useState(false)
  const [noteData, setNoteData] = useImmer({
    title: '',
    tags: [],
    body: '',
  })

  const contentRef = useRef(null)

  const handleFormFocus = () => {
    setIsExpanded(true)

    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.focus()
        contentRef.current.style.height = 'auto'
      }
    }, 100)
  }

  const handleTextareaResize = e => {
    const textarea = e.target

    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'

    handleChange(e)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const parsedTags = noteData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const note = {
      ...noteData,
      tags: parsedTags,
    }

    console.info('Payload', note)
    console.info('notes state updated', notes)
    addNote(note)
    setNoteData({
      title: '',
      tags: [],
      body: '',
    })
    setIsExpanded(false)

    if (contentRef.current) {
      contentRef.current.style.height = 'auto'
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNoteData(draft => {
      draft[name] = value
    })
  }

  const handleCloseForm = () => {
    setNoteData({
      title: '',
      tags: [],
      body: '',
    })

    setIsExpanded(false)

    if (contentRef.current) {
      contentRef.current.style.heigth = 'auto'
    }
  }

  return (
    <Container className='container-transition mt-4'>
      <Row className='justify-content-center'>
        <Col className='md-8'>
          <Card className='bg-primary border-0'>
            <Card.Body>
              <div
                className={`mb-4 note-form-card ${isExpanded ? 'card-expanded' : 'card-collapsed'}`}
              >
                {!isExpanded ? (
                  <div className='form-placeholder' onClick={handleFormFocus}>
                    Take a note...
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <div className='mb-3 content-input-container'>
                        <Form.Control
                          type='text'
                          name='title'
                          placeholder='Title'
                          value={noteData.title}
                          onChange={handleChange}
                          className='border-0 shadow-none title-input'
                        />
                      </div>
                      <div className='mb-3 content-input-container'>
                        <Form.Control
                          type='text'
                          name='tags'
                          placeholder='Tags'
                          value={noteData.tags}
                          onChange={handleChange}
                          className='border-0 shadow-none tags-input'
                        />
                      </div>
                      <div className='mb-3 content-input-container'>
                        <Form.Control
                          as='textarea'
                          ref={contentRef}
                          rows={1}
                          type='text'
                          name='body'
                          placeholder='Body'
                          value={noteData.body}
                          onChange={handleTextareaResize}
                          className='border-0 shadow-none content-input auto-resize'
                        />
                      </div>
                      <div className='d-flex justify-content-between align-items-center action-buttons'>
                        <div className='button-group'>
                          <Button
                            type='button'
                            className='btn-close-form btn-sm me-2'
                            onClick={handleCloseForm}
                          >
                            Close
                          </Button>
                          <Button type='submit' className='btn-sm btn-done'>
                            Done
                          </Button>
                        </div>
                      </div>
                    </Form.Group>
                  </Form>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AddNote
