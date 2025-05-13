'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthContext'

// Middleware para proteger rotas administrativas
export function AdminMiddleware({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Aguardar o carregamento da autenticação
    if (!isLoading) {
      // Verificar se o usuário está logado
      if (!user) {
        router.push('/login')
        return
      }
      
      // Verificar se o usuário tem papel de administrador
      if (user.role !== 'admin') {
        // Redirecionar usuários não-administradores para a página inicial
        router.push('/')
      }
    }
  }, [user, isLoading, router])

  // Mostrar tela de carregamento enquanto verifica autenticação
  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#1A365D] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Verificando credenciais...</p>
        </div>
      </div>
    )
  }

  // Se o usuário não for administrador, não renderizar o conteúdo
  if (user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-[#1A365D] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Redirecionando...</p>
        </div>
      </div>
    )
  }

  // Se o usuário for administrador, renderizar o conteúdo
  return <>{children}</>
}
