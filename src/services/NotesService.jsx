import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

const notesApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const NotesService = {
  postNote: async note => {
    try {
      const response = await notesApi.post(`/notes`, note)
      return {
        success: true,
        response: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  getNotes: async () => {
    try {
      const response = await notesApi.get('/notes')
      return {
        success: true,
        response: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  getNoteById: async id => {
    try {
      const response = await notesApi.get(`/notes/${id}`)
      return {
        success: true,
        response: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  putNote: async (id, note) => {
    try {
      const response = await notesApi.put(`/notes/${id}`, note)
      return {
        success: true,
        response: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },

  removeNote: async id => {
    try {
      const response = await notesApi.delete(`/notes/${id}`)
      return {
        success: true,
        response: response.data,
      }
    } catch (error) {
      return {
        success: false,
        error: error.message,
      }
    }
  },
}
