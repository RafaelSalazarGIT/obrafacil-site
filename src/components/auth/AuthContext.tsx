'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

// Definir tipos
type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  error: string | null
}

// Criar contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  // Verificar se o usuário está logado ao iniciar
  useEffect(() => {
    // Usar sessionStorage em vez de localStorage para maior segurança
    const checkAuth = () => {
      const savedUser = sessionStorage.getItem('obrafacil-user')
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          
          // Verificar se estamos na página de login e redirecionar se necessário
          if (window.location.pathname === '/login') {
            if (userData.role === 'admin') {
              router.push('/admin')
            } else {
              router.push('/conta')
            }
          }
        } catch (error) {
          console.error('Erro ao carregar usuário:', error)
          sessionStorage.removeItem('obrafacil-user')
        }
      }
      setIsLoading(false)
    }
    
    // Verificar autenticação imediatamente e também quando a janela recebe foco
    checkAuth()
    window.addEventListener('focus', checkAuth)
    return () => window.removeEventListener('focus', checkAuth)
  }, [router])
  
  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulação de API - em produção, isso seria uma chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Credenciais de administrador
      if (
        (email === 'admin@obrafacilbr.com.br' && password === 'admin123') ||
        (email === 'admin@obrafacil.com.br' && password === 'admin123') ||
        (email === 'admin@zuhrszsk.manus.space' && password === 'Admin@2025')
      ) {
        const userData: User = {
          id: '1',
          name: 'Administrador',
          email: email,
          role: 'admin'
        }
        
        setUser(userData)
        // Usar sessionStorage em vez de localStorage para maior segurança
        sessionStorage.setItem('obrafacil-user', JSON.stringify(userData))
        setIsLoading(false)
        
        // Redirecionar para o painel administrativo
        router.push('/admin')
        return true
      } else if (email === 'usuario@exemplo.com' && password === 'senha123') {
        const userData: User = {
          id: '2',
          name: 'Usuário Teste',
          email: 'usuario@exemplo.com',
          role: 'user'
        }
        
        setUser(userData)
        // Usar sessionStorage em vez de localStorage para maior segurança
        sessionStorage.setItem('obrafacil-user', JSON.stringify(userData))
        setIsLoading(false)
        
        // Redirecionar para a página de conta do usuário
        router.push('/conta')
        return true
      } else {
        setError('Email ou senha incorretos')
        setIsLoading(false)
        return false
      }
    } catch (error) {
      setError('Erro ao fazer login. Tente novamente.')
      setIsLoading(false)
      return false
    }
  }
  
  // Registro
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulação de API - em produção, isso seria uma chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Verificar se o email já está em uso
      if (email === 'admin@obrafacilbr.com.br' || email === 'admin@obrafacil.com.br' || email === 'usuario@exemplo.com') {
        setError('Este email já está em uso')
        setIsLoading(false)
        return false
      }
      
      // Simulação de registro bem-sucedido
      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user'
      }
      
      setUser(userData)
      // Usar sessionStorage em vez de localStorage para maior segurança
      sessionStorage.setItem('obrafacil-user', JSON.stringify(userData))
      setIsLoading(false)
      
      // Redirecionar para a página de conta do usuário
      router.push('/conta')
      return true
    } catch (error) {
      setError('Erro ao registrar. Tente novamente.')
      setIsLoading(false)
      return false
    }
  }
  
  // Logout
  const logout = () => {
    setUser(null)
    sessionStorage.removeItem('obrafacil-user')
    // Redirecionar para a página inicial após logout
    router.push('/')
  }
  
  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook para usar o contexto
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}
