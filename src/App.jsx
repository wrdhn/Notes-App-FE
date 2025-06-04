import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NotesProvider } from './context/NotesContext'
import Header from './common/Header'
import AddNote from './components/AddNote'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <NotesProvider>
          <div className='notes-container bg-primary'>
            <Header />
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/addNote' element={<AddNote />} />
            </Routes>
          </div>
        </NotesProvider>
      </BrowserRouter>
    </>
  )
}

export default App
