'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CreditCard, 
  Landmark, 
  Banknote, 
  Shield, 
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// Componente para o formulário de cartão de crédito
const CartaoCreditoForm = () => {
  const [numeroCartao, setNumeroCartao] = useState('')
  const [nomeCartao, setNomeCartao] = useState('')
  const [validade, setValidade] = useState('')
  const [cvv, setCvv] = useState('')
  const [parcelas, setParcelas] = useState('1')
  
  // Formatar número do cartão
  const formatarNumeroCartao = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '')
    const grupos = apenasNumeros.match(/.{1,4}/g)
    return grupos ? grupos.join(' ').substr(0, 19) : ''
  }
  
  // Formatar validade
  const formatarValidade = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '')
    if (apenasNumeros.length <= 2) return apenasNumeros
    return `${apenasNumeros.substring(0, 2)}/${apenasNumeros.substring(2, 4)}`
  }
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="numero-cartao">Número do Cartão</Label>
        <div className="relative">
          <Input
            id="numero-cartao"
            placeholder="0000 0000 0000 0000"
            value={numeroCartao}
            onChange={(e) => setNumeroCartao(formatarNumeroCartao(e.target.value))}
            maxLength={19}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <CreditCard className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="nome-cartao">Nome no Cartão</Label>
        <Input
          id="nome-cartao"
          placeholder="Nome como aparece no cartão"
          value={nomeCartao}
          onChange={(e) => setNomeCartao(e.target.value.toUpperCase())}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="validade">Validade</Label>
          <Input
            id="validade"
            placeholder="MM/AA"
            value={validade}
            onChange={(e) => setValidade(formatarValidade(e.target.value))}
            maxLength={5}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
            maxLength={3}
            type="password"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="parcelas">Parcelas</Label>
        <select
          id="parcelas"
          className="w-full p-2 border rounded-md"
          value={parcelas}
          onChange={(e) => setParcelas(e.target.value)}
        >
          <option value="1">1x de R$ 249,90 (sem juros)</option>
          <option value="2">2x de R$ 124,95 (sem juros)</option>
          <option value="3">3x de R$ 83,30 (sem juros)</option>
          <option value="4">4x de R$ 62,48 (sem juros)</option>
          <option value="5">5x de R$ 49,98 (sem juros)</option>
          <option value="6">6x de R$ 41,65 (sem juros)</option>
          <option value="7">7x de R$ 35,70 (sem juros)</option>
          <option value="8">8x de R$ 31,24 (sem juros)</option>
          <option value="9">9x de R$ 27,77 (sem juros)</option>
          <option value="10">10x de R$ 24,99 (sem juros)</option>
          <option value="11">11x de R$ 22,72 (sem juros)</option>
          <option value="12">12x de R$ 20,83 (sem juros)</option>
        </select>
      </div>
      
      <div className="pt-4">
        <Button className="w-full">Finalizar Pagamento</Button>
      </div>
      
      <div className="flex items-center justify-center text-sm text-gray-500 pt-2">
        <Shield className="h-4 w-4 mr-2" />
        <span>Pagamento 100% seguro e criptografado</span>
      </div>
    </div>
  )
}

// Componente para o formulário de boleto
const BoletoForm = () => {
  const [cpf, setCpf] = useState('')
  
  // Formatar CPF
  const formatarCPF = (valor) => {
    const apenasNumeros = valor.replace(/\D/g, '')
    if (apenasNumeros.length <= 3) return apenasNumeros
    if (apenasNumeros.length <= 6) return `${apenasNumeros.substring(0, 3)}.${apenasNumeros.substring(3)}`
    if (apenasNumeros.length <= 9) return `${apenasNumeros.substring(0, 3)}.${apenasNumeros.substring(3, 6)}.${apenasNumeros.substring(6)}`
    return `${apenasNumeros.substring(0, 3)}.${apenasNumeros.substring(3, 6)}.${apenasNumeros.substring(6, 9)}-${apenasNumeros.substring(9, 11)}`
  }
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="cpf">CPF</Label>
        <Input
          id="cpf"
          placeholder="000.000.000-00"
          value={cpf}
          onChange={(e) => setCpf(formatarCPF(e.target.value))}
          maxLength={14}
        />
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium text-yellow-700">Informações sobre Boleto</h4>
            <p className="text-sm text-yellow-600 mt-1">
              O boleto será gerado após a confirmação e terá vencimento em 3 dias úteis. O acesso ao curso será liberado após a confirmação do pagamento, o que pode levar até 3 dias úteis.
            </p>
          </div>
        </div>
      </div>
      
      <div className="pt-4">
        <Button className="w-full">Gerar Boleto</Button>
      </div>
      
      <div className="flex items-center justify-center text-sm text-gray-500 pt-2">
        <Shield className="h-4 w-4 mr-2" />
        <span>Pagamento 100% seguro</span>
      </div>
    </div>
  )
}

// Componente para o formulário de PIX
const PixForm = () => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex items-start">
          <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h4 className="font-medium text-blue-700">Pagamento Instantâneo</h4>
            <p className="text-sm text-blue-600 mt-1">
              Ao clicar em "Gerar QR Code", você receberá um código PIX para pagamento. O acesso ao curso será liberado imediatamente após a confirmação do pagamento.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center">
        <div className="h-40 w-40 bg-gray-100 flex items-center justify-center mb-4">
          <span className="text-gray-400">QR Code PIX</span>
        </div>
        <Button>Gerar QR Code</Button>
      </div>
      
      <div className="pt-2 text-center">
        <p className="text-sm text-gray-500">
          Ou copie o código PIX:
        </p>
        <div className="mt-2 p-2 bg-gray-100 rounded-md flex items-center justify-between">
          <code className="text-sm text-gray-700">00020126580014br.gov.bcb.pix0136a1f86...</code>
          <Button variant="ghost" size="sm">
            Copiar
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-center text-sm text-gray-500 pt-2">
        <Shield className="h-4 w-4 mr-2" />
        <span>Pagamento 100% seguro</span>
      </div>
    </div>
  )
}

export default function PaymentService() {
  const [metodoPagamento, setMetodoPagamento] = useState('cartao')
  
  return {
    processarPagamento: async (dadosPagamento) => {
      // Simulação de processamento de pagamento
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulação de sucesso (90% das vezes)
          if (Math.random() < 0.9) {
            resolve({
              success: true,
              transactionId: `TRANS-${Math.floor(Math.random() * 1000000)}`,
              message: 'Pagamento processado com sucesso'
            })
          } else {
            // Simulação de erro
            reject({
              success: false,
              error: 'Falha no processamento do pagamento',
              message: 'Não foi possível processar o pagamento. Verifique os dados e tente novamente.'
            })
          }
        }, 2000) // Simula um atraso de 2 segundos
      })
    },
    
    // Componente de formulário de pagamento
    FormularioPagamento: ({ produto, valorTotal, onSuccess, onError }) => {
      return (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Finalizar Compra</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Resumo da compra */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">Resumo do Pedido</h3>
              <div className="flex justify-between mb-2">
                <span>{produto.titulo}</span>
                <span>R$ {produto.preco.toFixed(2)}</span>
              </div>
              {produto.desconto > 0 && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>Desconto</span>
                  <span>-R$ {produto.desconto.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                <span>Total</span>
                <span>R$ {valorTotal.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Métodos de pagamento */}
            <Tabs defaultValue="cartao" onValueChange={setMetodoPagamento} className="space-y-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="cartao" className="flex items-center justify-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  <span>Cartão</span>
                </TabsTrigger>
                <TabsTrigger value="boleto" className="flex items-center justify-center">
                  <Landmark className="h-4 w-4 mr-2" />
                  <span>Boleto</span>
                </TabsTrigger>
                <TabsTrigger value="pix" className="flex items-center justify-center">
                  <Banknote className="h-4 w-4 mr-2" />
                  <span>PIX</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="cartao">
                <CartaoCreditoForm />
              </TabsContent>
              
              <TabsContent value="boleto">
                <BoletoForm />
              </TabsContent>
              
              <TabsContent value="pix">
                <PixForm />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="w-full text-center text-sm text-gray-500">
              Ao finalizar a compra, você concorda com nossos <a href="/termos" className="text-blue-600 hover:underline">Termos de Uso</a> e <a href="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</a>.
            </div>
          </CardFooter>
        </Card>
      )
    }
  }
}
