import { useState } from "react"

interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

interface AuthResponse {
  success: boolean
  token?: string
  user?: { email: string }
}

const mockAuth = async (email: string, password: string): Promise<AuthResponse> => {
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  if (email === 'demo@example.com' && password === 'Password123!') {
    return { success: true, token: 'mock-jwt-token', user: { email } }
  }
  
  if (email === 'blocked@example.com') {
    throw new Error('Account has been temporarily blocked')
  }
  
  throw new Error('Invalid email or password')
}

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)

  const login = async (data: LoginFormData) => {
    setIsLoading(true)
    
    try {
      const response = await mockAuth(data.email, data.password)
      
      if (response.success && response.user) {
        setUser(response.user)
        if (response.token) {
          localStorage.setItem('auth-token', response.token)
        }
        return { success: true, user: response.user }
      }
      
      return { success: false, error: 'Authentication failed' }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred'
      return { success: false, error: message }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth-token')
  }

  return {
    user,
    isLoading,
    login,
    logout,
  }
} 