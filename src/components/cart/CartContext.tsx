'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

// Definir tipos
export type Product = {
  id: string
  name: string
  price: number
  image?: string
  category: string
  quantity?: number
}

type CartContextType = {
  cartItems: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
}

// Criar contexto
const CartContext = createContext<CartContextType | undefined>(undefined)

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Product[]>([])
  
  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('obrafacil-cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error)
        localStorage.removeItem('obrafacil-cart')
      }
    }
  }, [])
  
  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('obrafacil-cart', JSON.stringify(cartItems))
  }, [cartItems])
  
  // Adicionar produto ao carrinho
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      
      if (existingItem) {
        // Atualizar quantidade se o produto já estiver no carrinho
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: (item.quantity || 1) + 1 } 
            : item
        )
      } else {
        // Adicionar novo produto com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }
  
  // Remover produto do carrinho
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }
  
  // Atualizar quantidade de um produto
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }
  
  // Limpar carrinho
  const clearCart = () => {
    setCartItems([])
  }
  
  // Calcular total do carrinho
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * (item.quantity || 1))
    }, 0)
  }
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Hook para usar o contexto
export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider')
  }
  return context
}
