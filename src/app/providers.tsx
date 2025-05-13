'use client'

import { CartProvider } from '@/components/cart/CartContext'
import { AuthProvider } from '@/components/auth/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  )
}
