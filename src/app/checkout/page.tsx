'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'
import { useAuth } from '@/components/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CreditCard, CheckCircle, AlertCircle } from 'lucide-react'

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  
  const total = getCartTotal()
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      // Simulação de processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulação de sucesso
      clearCart()
      setIsSuccess(true)
    } catch (error) {
      setError('Ocorreu um erro ao processar o pagamento. Por favor, tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A365D] mb-2">Pedido Confirmado!</h1>
          <p className="text-gray-600 mb-6">
            Seu pedido foi processado com sucesso. Você receberá um email com os detalhes da compra.
          </p>
          <div className="space-y-4">
            <Button asChild className="w-full bg-[#1A365D] hover:bg-[#132744] text-white">
              <Link href="/conta">
                Acessar Minha Conta
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/">
                Voltar para a Página Inicial
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }
  
  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
          <h1 className="text-2xl font-bold text-[#1A365D] mb-2">Carrinho Vazio</h1>
          <p className="text-gray-600 mb-6">
            Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.
          </p>
          <Button asChild className="bg-[#C9A959] hover:bg-[#b89848] text-white">
            <Link href="/produtos">
              Ver Planilhas
            </Link>
          </Button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-[#1A365D] mb-8">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-[#1A365D] mb-4">Informações Pessoais</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome completo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                      Endereço
                    </label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        Estado
                      </label>
                      <Input
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                        CEP
                      </label>
                      <Input
                        id="zip"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-[#1A365D] mb-4">Método de Pagamento</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment-method"
                      value="credit-card"
                      checked={paymentMethod === 'credit-card'}
                      onChange={() => setPaymentMethod('credit-card')}
                      className="h-4 w-4 text-[#1A365D] focus:ring-[#1A365D]"
                    />
                    <label htmlFor="credit-card" className="ml-2 flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
                      <span>Cartão de Crédito</span>
                    </label>
                  </div>
                </div>
                
                {paymentMethod === 'credit-card' && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                          Número do Cartão
                        </label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nome no Cartão
                        </label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="Nome como está no cartão"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700 mb-1">
                          Data de Validade
                        </label>
                        <Input
                          id="cardExpiry"
                          name="cardExpiry"
                          placeholder="MM/AA"
                          value={formData.cardExpiry}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cardCvv" className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <Input
                          id="cardCvv"
                          name="cardCvv"
                          placeholder="123"
                          value={formData.cardCvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-[#C9A959] hover:bg-[#b89848] text-white py-3 text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processando...' : `Finalizar Compra - R$ ${total.toFixed(2)}`}
            </Button>
          </form>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-[#1A365D] mb-4">Resumo do Pedido</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                      <FileSpreadsheet className="h-5 w-5 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">Qtd: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-medium">
                    R$ {((item.price) * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-3">
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
          </div>
          
          <div className="mt-6 bg-[#1A365D]/5 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-[#1A365D]">ObraFácil</span> - Excelência em engenharia ao seu alcance
            </p>
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
