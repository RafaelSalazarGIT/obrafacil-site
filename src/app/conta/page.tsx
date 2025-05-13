'use client'

import { useAuth } from '@/components/auth/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileSpreadsheet, Package, History, User, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Dados simulados de compras do usuário
const compras = [
  {
    id: 'order-1',
    data: '24/04/2025',
    produtos: [
      { id: 'orcamento-obras', nome: 'Orçamento Completo de Obras', preco: 149.90 }
    ],
    total: 149.90,
    status: 'Concluído'
  },
  {
    id: 'order-2',
    data: '15/03/2025',
    produtos: [
      { id: 'dimensionamento-estrutural', nome: 'Dimensionamento Estrutural', preco: 199.90 },
      { id: 'cronograma-fisico-financeiro', nome: 'Cronograma Físico-Financeiro', preco: 129.90 }
    ],
    total: 329.80,
    status: 'Concluído'
  }
]

export default function ContaPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  
  // Redireciona para a página de login se o usuário não estiver autenticado
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])
  
  // Exibe um estado de carregamento enquanto verifica a autenticação
  if (isLoading || !user) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }
  
  const handleLogout = () => {
    logout()
    router.push('/')
  }
  
  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Minha Conta</h1>
          <p className="text-gray-500">Bem-vindo(a), {user.name}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Sair
        </Button>
      </div>
      
      <Tabs defaultValue="downloads" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="downloads">Downloads</TabsTrigger>
          <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
          <TabsTrigger value="perfil">Perfil</TabsTrigger>
        </TabsList>
        
        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle>Meus Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {compras.flatMap(compra => 
                  compra.produtos.map(produto => (
                    <div key={`${compra.id}-${produto.id}`} className="flex items-center justify-between border-b pb-4">
                      <div className="flex items-center">
                        <div className="h-12 w-12 bg-gray-100 rounded-md flex items-center justify-center mr-4">
                          <FileSpreadsheet className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">{produto.nome}</h3>
                          <p className="text-sm text-gray-500">Adquirido em {compra.data}</p>
                        </div>
                      </div>
                      <Button size="sm">
                        Download
                      </Button>
                    </div>
                  ))
                )}
                
                {compras.length === 0 && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum download disponível</h3>
                    <p className="text-gray-500 mb-4">Você ainda não adquiriu nenhuma planilha.</p>
                    <Link href="/produtos">
                      <Button>Ver Produtos</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pedidos">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {compras.map(compra => (
                  <div key={compra.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Pedido #{compra.id}</p>
                        <p className="text-sm text-gray-500">Data: {compra.data}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {compra.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </p>
                        <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                          {compra.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium mb-2">Produtos:</h3>
                      <ul className="space-y-2">
                        {compra.produtos.map(produto => (
                          <li key={produto.id} className="flex justify-between">
                            <span>{produto.nome}</span>
                            <span>
                              {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                
                {compras.length === 0 && (
                  <div className="text-center py-8">
                    <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Nenhum pedido encontrado</h3>
                    <p className="text-gray-500 mb-4">Você ainda não realizou nenhuma compra.</p>
                    <Link href="/produtos">
                      <Button>Ver Produtos</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="perfil">
          <Card>
            <CardHeader>
              <CardTitle>Meu Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mr-6">
                    <User className="h-10 w-10 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">{user.name}</h3>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="font-medium mb-4">Informações da Conta</h3>
                  <dl className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <dt className="text-gray-500">Nome:</dt>
                      <dd>{user.name}</dd>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <dt className="text-gray-500">Email:</dt>
                      <dd>{user.email}</dd>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <dt className="text-gray-500">Membro desde:</dt>
                      <dd>Abril 2025</dd>
                    </div>
                  </dl>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">Editar Perfil</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
