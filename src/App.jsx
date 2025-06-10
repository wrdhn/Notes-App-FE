import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotesProvider } from './context/NotesContext'
import Header from './common/Header'
import Dashboard from './components/Dashboard'
import NoteDetail from './components/NoteDetail'
import NoteList from './components/NoteList'

function App() {
  return (
    <>
      <BrowserRouter>
        <NotesProvider>
          <div className='notes-container bg-primary'>
            <Header />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='note-list' element={<NoteList />} />
              <Route path='note-detail/:id' element={<NoteDetail />} />
            </Routes>
          </div>
        </NotesProvider>
      </BrowserRouter>
    </>
  )
}

export default App
