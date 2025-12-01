import axios from 'axios'

const API_BASE_URL = 'https://travel-app-api-41c3.onrender.com'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is due to unauthorized (401) - token expired
    if (error.response && error.response.status === 401) {
      // Clear token and user data
      tokenService.removeToken()
      localStorage.removeItem('displayName')

      // Redirect to homepage
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const authAPI = {
  async register(email, password, displayName) {
    try {
      console.log('Sending registration request:', { email, displayName })
      const response = await axiosInstance.post('/auth/register', {
        email,
        password,
        displayName,
      })
      console.log('Registration response:', response.data)
      return response.data
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Registration failed')
    }
  },

  async login(email, password) {
    try {
      console.log('Sending login request:', { email })
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      })
      console.log('Login response:', response.data)
      return response.data.token
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Login failed')
    }
  },
}

export const tripsAPI = {
  async getAllTrips() {
    try {
      const response = await axiosInstance.get('/api/trips')
      return response.data
    } catch (error) {
      console.error('Failed to fetch trips:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to fetch trips')
    }
  },

  async getMyTrips() {
    try {
      const token = tokenService.getToken()
      const response = await axiosInstance.get('/api/trips/mine', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch my trips:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to fetch your trips')
    }
  },

  async getTripById(id) {
    try {
      const response = await axiosInstance.get(`/api/trips/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch trip:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to fetch trip')
    }
  },

  async searchTrips(query) {
    try {
      const response = await axiosInstance.get('/api/trips', {
        params: { query }
      })
      return response.data
    } catch (error) {
      console.error('Failed to search trips:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to search trips')
    }
  },

  async deleteTrip(id) {
    try {
      const token = tokenService.getToken()
      const response = await axiosInstance.delete(`/api/trips/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Failed to delete trip:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to delete trip')
    }
  },

  async createTrip(tripData) {
    try {
      const token = tokenService.getToken()
      const response = await axiosInstance.post('/api/trips', tripData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Failed to create trip:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to create trip')
    }
  },
}

export const userAPI = {
  async getProfile() {
    try {
      const token = tokenService.getToken()
      const response = await axiosInstance.get('/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch profile:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to fetch profile')
    }
  },

  async updateProfile(displayName, password) {
    try {
      const token = tokenService.getToken()
      const payload = {}
      if (displayName !== undefined && displayName !== null) {
        payload.displayName = displayName
      }
      if (password !== undefined && password !== null && password !== '') {
        payload.password = password
      }

      const response = await axiosInstance.put('/auth/profile', payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      console.error('Failed to update profile:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to update profile')
    }
  },
}

export const fileAPI = {
  async uploadFile(file) {
    try {
      const token = tokenService.getToken()
      const formData = new FormData()
      formData.append('file', file)

      const response = await axiosInstance.post('/api/files/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      return response.data.url
    } catch (error) {
      console.error('Failed to upload file:', error.response?.data || error.message)
      throw new Error(error.response?.data?.message || 'Failed to upload file')
    }
  },
}

export const tokenService = {
  saveToken(token) {
    localStorage.setItem('authToken', token)
  },

  getToken() {
    return localStorage.getItem('authToken')
  },

  removeToken() {
    localStorage.removeItem('authToken')
  },

  isAuthenticated() {
    return !!this.getToken()
  },
}
