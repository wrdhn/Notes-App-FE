import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react'
import { NotesService } from '../services/NotesService'

const NotesContext = createContext()

const NOTES_ACTIONS = {
  SET_NOTES: 'SET_NOTES',
  SET_NOTE_BY_ID: 'SET_NOTE_BY_ID',
  SEARCH_QUERY: 'SEARCH_QUERY',
  NEW_NOTE: 'NEW_NOTE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
}

const initialState = {
  notes: [],
  note: null,
  searchQuery: '',
  loading: false,
  error: null,
}

function notesReducer(state, action) {
  switch (action.type) {
    case NOTES_ACTIONS.SET_NOTES:
      return {
        ...state,
        notes: action.payload.response.data.notes,
        loading: false,
        error: null,
      }
    case NOTES_ACTIONS.SET_NOTE_BY_ID:
      return {
        ...state,
        note: action.payload.response.data.note,
        loading: false,
      }
    case NOTES_ACTIONS.SEARCH_QUERY:
      return { ...state, searchQuery: action.payload }
    case NOTES_ACTIONS.NEW_NOTE:
      return { ...state, notes: action.payload.response.data.newNote }
    case NOTES_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case NOTES_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => clearTimeout(handler)
  }, [value, delay])

  return debounceValue
}

export function useNotes() {
  const context = useContext(NotesContext)

  if (!context) {
    throw new Error('useNotes must be used within NotesProvider')
  }

  return context
}

export function NotesProvider({ children }) {
  const [state, dispatch] = useReducer(notesReducer, initialState)
  const debouncedSearchQuery = useDebounce(state.searchQuery, 500)

  const filteredNotes = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return state.notes

    const query = debouncedSearchQuery.toLowerCase()
    return state.notes.filter(note => {
      return (
        note.title?.toLowerCase().includes(query) ||
        note.body?.toLowerCase().includes(query) ||
        note.tags?.some(tag => tag.toLowerCase().includes(query))
      )
    })
  }, [state.notes, debouncedSearchQuery])

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = async () => {
    try {
      dispatch({ type: NOTES_ACTIONS.SET_LOADING, payload: true })

      const result = await NotesService.getNotes()

      if (result.success) {
        dispatch({ type: NOTES_ACTIONS.SET_NOTES, payload: result })
        console.info('Success Get Note Data from API')
      } else {
        dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: result.error })
      }
    } catch (error) {
      dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: error.message })
    }
  }

  const searchNote = query => {
    dispatch({ type: NOTES_ACTIONS.SEARCH_QUERY, payload: query })
  }

  const getNoteById = async id => {
    try {
      dispatch({ type: NOTES_ACTIONS.SET_LOADING, payload: true })

      const result = await NotesService.getNoteById(id)

      if (result.success) {
        dispatch({ type: NOTES_ACTIONS.SET_NOTE_BY_ID, payload: result })
        console.info('Get Note by ID Success', state.notes)
      } else {
        dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: result.error })
      }
    } catch (error) {
      dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: error.message })
    }
  }

  const addNote = async newNote => {
    try {
      dispatch({ type: NOTES_ACTIONS.SET_LOADING, payload: true })

      const result = await NotesService.postNote(newNote)
      if (result.success) {
        dispatch({ type: NOTES_ACTIONS.NEW_NOTE, payload: result })
        console.info('Add Note Success', state.notes)
      } else {
        dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: result.error })
      }
    } catch (error) {
      dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: error.message })
    }
  }

  const editNote = async (id, data) => {
    try {
      dispatch({ type: NOTES_ACTIONS.SET_LOADING, payload: true })

      const result = await NotesService.putNote(id, data)

      if (result.success) {
        dispatch({ type: NOTES_ACTIONS.SET_LOADING, payload: false })
      } else {
        dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: result.error })
      }
    } catch (error) {
      dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: error.message })
    }
  }

  const deleteNote = async id => {
    try {
      dispatch({ type: NOTES_ACTIONS.SET_LOADING, payload: true })

      const result = await NotesService.removeNote(id)

      if (result.success) {
        dispatch({ type: NOTES_ACTIONS.SET_LOADING, payload: false })
      } else {
        dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: result.error })
      }
    } catch (error) {
      dispatch({ type: NOTES_ACTIONS.SET_ERROR, payload: error.message })
    }
  }

  const value = {
    ...state,
    filteredNotes,
    debouncedSearchQuery,
    searchNote,
    getNotes,
    getNoteById,
    addNote,
    editNote,
    deleteNote,
  }

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
}
