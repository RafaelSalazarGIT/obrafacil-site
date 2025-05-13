'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const { login, register, isLoading, error, user } = useAuth()
  const router = useRouter()
  
  // Se o usuário já estiver logado, redirecionar para a página apropriada
  if (user) {
    if (user.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/conta')
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isLogin) {
      const success = await login(email, password)
      if (success) {
        // O redirecionamento agora é tratado dentro da função login no AuthContext
      }
    } else {
      const success = await register(name, email, password)
      if (success) {
        // O redirecionamento agora é tratado dentro da função register no AuthContext
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-[#F2F2F2] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-[#1A365D] p-6 text-white text-center">
            <h1 className="text-2xl font-bold">
              {isLogin ? 'Acesse sua conta' : 'Crie sua conta'}
            </h1>
            <p className="text-gray-300 mt-2">
              {isLogin 
                ? 'Entre para acessar suas planilhas e cursos' 
                : 'Registre-se para começar a usar a ObraFácil'}
            </p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome completo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Seu nome completo"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-[#C9A959] hover:bg-[#b89848] text-white"
                disabled={isLoading}
              >
                {isLoading 
                  ? 'Processando...' 
                  : isLogin 
                    ? 'Entrar' 
                    : 'Criar conta'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                className="text-[#1A365D] hover:text-[#C9A959] text-sm font-medium"
              >
                {isLogin 
                  ? 'Não tem uma conta? Registre-se' 
                  : 'Já tem uma conta? Faça login'}
              </button>
            </div>
            
            {isLogin && (
              <div className="mt-4 text-center">
                <Link href="/recuperar-senha" className="text-[#1A365D] hover:text-[#C9A959] text-sm">
                  Esqueceu sua senha?
                </Link>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t">
            <Link href="/" className="text-[#1A365D] hover:text-[#C9A959] text-sm flex items-center justify-center">
              <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
              Voltar para a página inicial
            </Link>
          </div>
        </div>
        
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>ObraFácil - Excelência em engenharia ao seu alcance</p>
        </div>
      </div>
    </div>
  )
}
