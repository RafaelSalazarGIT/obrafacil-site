'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'
import { Button } from '@/components/ui/button'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [total, setTotal] = useState(0)
  
  useEffect(() => {
    setTotal(getCartTotal())
  }, [cartItems, getCartTotal])
  
  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-[#1A365D] mb-2">Seu carrinho está vazio</h1>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Parece que você ainda não adicionou nenhum produto ao seu carrinho.
        </p>
        <Button asChild className="bg-[#C9A959] hover:bg-[#b89848] text-white">
          <Link href="/produtos">
            Ver Planilhas
          </Link>
        </Button>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1A365D] mb-8">Seu Carrinho</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-6">
                <span className="font-medium text-gray-700">Produto</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-medium text-gray-700">Preço</span>
              </div>
              <div className="col-span-2 text-center">
                <span className="font-medium text-gray-700">Quantidade</span>
              </div>
              <div className="col-span-2 text-right">
                <span className="font-medium text-gray-700">Subtotal</span>
              </div>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.id} className="border-b last:border-b-0 p-4">
                <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                  <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                    <div className="h-16 w-16 bg-gray-100 rounded flex items-center justify-center mr-4">
                      <FileSpreadsheet className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 md:text-center mb-4 md:mb-0">
                    <span className="md:hidden text-sm text-gray-500 mr-2">Preço:</span>
                    <span>R$ {item.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="md:col-span-2 md:text-center mb-4 md:mb-0">
                    <span className="md:hidden text-sm text-gray-500 mr-2">Quantidade:</span>
                    <div className="inline-flex items-center">
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-l flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="w-10 h-8 bg-gray-50 flex items-center justify-center border-y">
                        {item.quantity || 1}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                        className="w-8 h-8 bg-gray-100 rounded-r flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 md:text-right flex justify-between items-center">
                    <span className="md:hidden text-sm text-gray-500">Subtotal:</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">
                        R$ {((item.price) * (item.quantity || 1)).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#1A365D] mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Desconto</span>
                <span>R$ 0,00</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-[#1A365D]">R$ {total.toFixed(2)}</span>
              </div>
            </div>
            
            <Button asChild className="w-full bg-[#C9A959] hover:bg-[#b89848] text-white">
              <Link href="/checkout">
                Finalizar Compra
              </Link>
            </Button>
            
            <div className="mt-6">
              <Link href="/produtos" className="text-[#1A365D] hover:text-[#C9A959] text-sm flex items-center justify-center">
                <ArrowRight className="h-4 w-4 mr-2 rotate-180" />
                Continuar Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente FileSpreadsheet para ícone de planilha
function FileSpreadsheet(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M8 13h2" />
      <path d="M8 17h2" />
      <path d="M14 13h2" />
      <path d="M14 17h2" />
    </svg>
  )
}
