'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthContext'
import { 
  Home, 
  BookOpen, 
  FileSpreadsheet, 
  ShoppingCart, 
  User, 
  LogOut, 
  Menu, 
  X,
  Search
} from 'lucide-react'

export default function CursosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [busca, setBusca] = useState('')

  // Verificar se é uma visualização móvel
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const navItems = [
    { href: '/cursos', label: 'Início', icon: <Home className="h-5 w-5" /> },
    { href: '/cursos/meus-cursos', label: 'Meus Cursos', icon: <BookOpen className="h-5 w-5" /> },
    { href: '/cursos/planilhas', label: 'Planilhas', icon: <FileSpreadsheet className="h-5 w-5" /> },
    { href: '/carrinho', label: 'Carrinho', icon: <ShoppingCart className="h-5 w-5" /> },
    { href: '/conta', label: 'Minha Conta', icon: <User className="h-5 w-5" /> },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar para desktop */}
      <aside 
        className={`bg-white shadow-md z-20 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-0'
        } ${isMobile ? 'fixed h-full' : 'relative'}`}
      >
        {isSidebarOpen && (
          <div className="h-full flex flex-col">
            <div className="p-4 border-b flex items-center justify-between">
              <Link href="/cursos" className="font-bold text-xl text-blue-600">
                Engenharia Plus
              </Link>
              {isMobile && (
                <button onClick={toggleSidebar} className="p-1">
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  className="w-full p-2 pl-9 border rounded-md"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
            
            <nav className="flex-1 overflow-y-auto py-4">
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 ${
                        pathname === item.href ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-600' : ''
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {user ? (
              <div className="p-4 border-t">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">
                      {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.name || 'Usuário'}</p>
                    <p className="text-xs text-gray-500">{user.email || 'usuario@exemplo.com'}</p>
                  </div>
                </div>
                <button
                  onClick={() => logout()}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-3">Sair</span>
                </button>
              </div>
            ) : (
              <div className="p-4 border-t">
                <Link
                  href="/login"
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Entrar
                </Link>
                <Link
                  href="/registro"
                  className="flex items-center justify-center w-full px-4 py-2 mt-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                >
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="p-1 mr-4 text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                {pathname === '/cursos' ? 'Plataforma de Cursos' : 
                 pathname === '/cursos/meus-cursos' ? 'Meus Cursos' :
                 pathname === '/cursos/planilhas' ? 'Planilhas' :
                 'Cursos'}
              </h1>
            </div>
            
            {/* Versão mobile da busca */}
            {isMobile && (
              <div className="relative w-full max-w-xs mx-4 hidden md:block">
                <input
                  type="text"
                  placeholder="Buscar cursos..."
                  className="w-full p-2 pl-9 border rounded-md"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            )}
            
            <div className="flex items-center">
              <Link href="/carrinho" className="p-2 relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                <span className="absolute top-0 right-0 h-5 w-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                  3
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Conteúdo da página */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
