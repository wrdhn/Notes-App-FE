import { useState } from 'react'
import { useNotes } from '../context/NotesContext'
import { Container, Form } from 'react-bootstrap'

function AddNote() {
  const { addNote, notes } = useNotes()
  const [title, setTittle] = useState('')
  const [tags, setTags] = useState('')
  const [body, setBody] = useState('')

  const handleSubmit = e => {
    e.preventDefault()

    const parsedTags = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)

    const note = {
      title: title,
      body: body,
      tags: parsedTags,
    }

    console.info('Payload', note)
    console.info('notes state updated', notes)
    addNote(note)
    setTittle('')
    setTags('')
    setBody('')
  }

  return (
    <Container className='mt-5'>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Title'
            value={title}
            onChange={e => setTittle(e.target.value)}
            className='fs-1 mt-5 border-0'
          />
          <Form.Control
            type='text'
            placeholder='Tags'
            value={tags}
            onChange={e => setTags(e.target.value)}
            className=' fs-3 mt-3 border-0'
          />
          <Form.Control
            as='textarea'
            rows={20}
            type='text'
            placeholder='Body'
            value={body}
            onChange={e => setBody(e.target.value)}
            className=' fs-5 mt-5 border-0'
          />
        </Form.Group>
      </Form>
    </Container>
  )
}

export default AddNote
