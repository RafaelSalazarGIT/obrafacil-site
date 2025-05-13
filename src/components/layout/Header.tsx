'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingCart, User, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/components/cart/CartContext'
import { useAuth } from '@/components/auth/AuthContext'
import NotificationBell from '@/components/notification/NotificationBell'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { cartItems } = useCart()
  const { user } = useAuth()
  
  // Detectar scroll para mudar estilo do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white/95'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-[#1A365D]">
              Obra<span className="text-[#C9A959]">Fácil</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-[#1A365D] font-medium">
              Início
            </Link>
            <Link href="/produtos" className="text-gray-700 hover:text-[#1A365D] font-medium">
              Planilhas
            </Link>
            <Link href="/cursos" className="text-gray-700 hover:text-[#1A365D] font-medium">
              Cursos
            </Link>
            <Link href="/sobre" className="text-gray-700 hover:text-[#1A365D] font-medium">
              Sobre
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-[#1A365D] font-medium">
              Contato
            </Link>
          </nav>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-700 hover:text-[#1A365D]">
              <Search className="h-5 w-5" />
            </button>
            
            {/* Notifications */}
            {user && (
              <NotificationBell />
            )}
            
            {/* User account */}
            <Link href={user ? "/conta" : "/login"} className="p-2 text-gray-700 hover:text-[#1A365D]">
              <User className="h-5 w-5" />
            </Link>
            
            {/* Cart */}
            <Link href="/carrinho" className="relative p-2 text-gray-700 hover:text-[#1A365D]">
              <ShoppingCart className="h-5 w-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#C9A959] text-white rounded-full flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-gray-700 hover:text-[#1A365D]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="py-2 text-gray-700 hover:text-[#1A365D] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/produtos" 
                className="py-2 text-gray-700 hover:text-[#1A365D] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Planilhas
              </Link>
              <Link 
                href="/cursos" 
                className="py-2 text-gray-700 hover:text-[#1A365D] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Cursos
              </Link>
              <Link 
                href="/sobre" 
                className="py-2 text-gray-700 hover:text-[#1A365D] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link 
                href="/contato" 
                className="py-2 text-gray-700 hover:text-[#1A365D] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
          </div>
        </div>
      )}
      
      {/* Slogan banner */}
      <div className="bg-[#1A365D] text-white text-center py-2 text-sm">
        <p>Excelência em engenharia ao seu alcance</p>
      </div>
    </header>
  )
}
