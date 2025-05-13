'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthContext'
import { AdminMiddleware } from '@/components/auth/AdminMiddleware'
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Video, 
  Users, 
  DollarSign, 
  Settings, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

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

  // Usar o AdminMiddleware para proteger a rota
  return (
    <AdminMiddleware>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar para desktop */}
        <aside 
          className={`bg-white shadow-md z-20 transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-0'
          } ${isMobile ? 'fixed h-full' : 'relative'}`}
        >
          {isSidebarOpen && (
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <Link href="/admin" className="font-bold text-xl text-[#1A365D]">
                  ObraFácil Admin
                </Link>
                {isMobile && (
                  <button onClick={() => setIsSidebarOpen(false)} className="p-1">
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-1">
                  {[
                    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
                    { href: '/admin/produtos', label: 'Produtos', icon: <FileSpreadsheet className="h-5 w-5" /> },
                    { href: '/admin/videoaulas', label: 'Videoaulas', icon: <Video className="h-5 w-5" /> },
                    { href: '/admin/usuarios', label: 'Usuários', icon: <Users className="h-5 w-5" /> },
                    { href: '/admin/financeiro', label: 'Financeiro', icon: <DollarSign className="h-5 w-5" /> },
                    { href: '/admin/configuracoes', label: 'Configurações', icon: <Settings className="h-5 w-5" /> },
                  ].map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center px-4 py-3 text-gray-700 hover:bg-[#1A365D]/10 hover:text-[#1A365D] ${
                          pathname === item.href ? 'bg-[#1A365D]/10 text-[#1A365D] border-r-4 border-[#1A365D]' : ''
                        }`}
                      >
                        {item.icon}
                        <span className="ml-3">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t">
                <button
                  onClick={() => logout()}
                  className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="ml-3">Sair</span>
                </button>
              </div>
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
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-1 mr-4 text-gray-700 hover:text-[#1A365D] focus:outline-none"
                >
                  <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-semibold text-gray-800">
                  {pathname === '/admin' ? 'Dashboard' : 
                   pathname === '/admin/produtos' ? 'Produtos' :
                   pathname === '/admin/videoaulas' ? 'Videoaulas' :
                   pathname === '/admin/usuarios' ? 'Usuários' :
                   pathname === '/admin/financeiro' ? 'Financeiro' :
                   pathname === '/admin/configuracoes' ? 'Configurações' : 'Admin'}
                </h1>
              </div>
              <div className="flex items-center">
                <div className="mr-4 text-right">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">Administrador</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-[#1A365D] flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Conteúdo da página */}
          <div className="flex-1 overflow-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </AdminMiddleware>
  )
}
