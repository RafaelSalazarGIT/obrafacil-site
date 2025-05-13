'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  Users, 
  ShoppingCart, 
  FileSpreadsheet, 
  Video,
  DollarSign,
  TrendingUp,
  Eye
} from 'lucide-react'

// Dados simulados para o dashboard
const dashboardData = {
  totalVendas: 12850.75,
  totalUsuarios: 256,
  totalProdutos: 18,
  totalVideoaulas: 24,
  
  vendasRecentes: [
    { id: 'ord-1234', usuario: 'João Silva', produto: 'Orçamento Completo de Obras', valor: 149.90, data: '25/04/2025' },
    { id: 'ord-1235', usuario: 'Maria Oliveira', produto: 'Dimensionamento Estrutural', valor: 199.90, data: '24/04/2025' },
    { id: 'ord-1236', usuario: 'Carlos Santos', produto: 'Cronograma Físico-Financeiro', valor: 129.90, data: '23/04/2025' },
    { id: 'ord-1237', usuario: 'Ana Pereira', produto: 'Cálculo de Fundações', valor: 179.90, data: '22/04/2025' },
    { id: 'ord-1238', usuario: 'Roberto Almeida', produto: 'Instalações Hidráulicas', valor: 159.90, data: '21/04/2025' },
  ],
  
  usuariosRecentes: [
    { id: 'usr-1001', nome: 'Fernanda Costa', email: 'fernanda@exemplo.com', data: '25/04/2025' },
    { id: 'usr-1002', nome: 'Ricardo Souza', email: 'ricardo@exemplo.com', data: '24/04/2025' },
    { id: 'usr-1003', nome: 'Juliana Martins', email: 'juliana@exemplo.com', data: '23/04/2025' },
    { id: 'usr-1004', nome: 'Eduardo Ferreira', email: 'eduardo@exemplo.com', data: '22/04/2025' },
    { id: 'usr-1005', nome: 'Camila Rodrigues', email: 'camila@exemplo.com', data: '21/04/2025' },
  ],
  
  produtosPopulares: [
    { id: 'prod-001', nome: 'Orçamento Completo de Obras', vendas: 42, visualizacoes: 320 },
    { id: 'prod-002', nome: 'Dimensionamento Estrutural', vendas: 38, visualizacoes: 285 },
    { id: 'prod-003', nome: 'Cronograma Físico-Financeiro', vendas: 35, visualizacoes: 260 },
    { id: 'prod-004', nome: 'Cálculo de Fundações', vendas: 29, visualizacoes: 210 },
    { id: 'prod-005', nome: 'Instalações Hidráulicas', vendas: 25, visualizacoes: 195 },
  ],
  
  videoaulasPopulares: [
    { id: 'vid-001', nome: 'Introdução ao Orçamento de Obras', visualizacoes: 185, concluidas: 120 },
    { id: 'vid-002', nome: 'Cálculo de Vigas e Pilares', visualizacoes: 165, concluidas: 95 },
    { id: 'vid-003', nome: 'Elaboração de Cronogramas', visualizacoes: 150, concluidas: 85 },
    { id: 'vid-004', nome: 'Dimensionamento de Fundações', visualizacoes: 130, concluidas: 70 },
    { id: 'vid-005', nome: 'Projeto de Instalações Hidráulicas', visualizacoes: 120, concluidas: 65 },
  ],
  
  vendasPorMes: [
    { mes: 'Jan', valor: 5200 },
    { mes: 'Fev', valor: 5800 },
    { mes: 'Mar', valor: 6500 },
    { mes: 'Abr', valor: 7200 },
    { mes: 'Mai', valor: 8100 },
    { mes: 'Jun', valor: 7800 },
    { mes: 'Jul', valor: 8500 },
    { mes: 'Ago', valor: 9200 },
    { mes: 'Set', valor: 9800 },
    { mes: 'Out', valor: 10500 },
    { mes: 'Nov', valor: 11200 },
    { mes: 'Dez', valor: 12000 },
  ],
  
  vendasPorCategoria: [
    { categoria: 'Orçamentos', valor: 4850 },
    { categoria: 'Estrutural', valor: 3950 },
    { categoria: 'Gestão', valor: 2250 },
    { categoria: 'Hidráulica', valor: 1800 },
  ]
}

export default function AdminDashboard() {
  const [periodo, setPeriodo] = useState('mes')
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <Tabs defaultValue="mes" className="w-full md:w-auto" onValueChange={setPeriodo}>
          <TabsList>
            <TabsTrigger value="hoje">Hoje</TabsTrigger>
            <TabsTrigger value="semana">Semana</TabsTrigger>
            <TabsTrigger value="mes">Mês</TabsTrigger>
            <TabsTrigger value="ano">Ano</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Vendas Totais</span>
                <span className="text-2xl font-bold">
                  {dashboardData.totalVendas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12% a mais que o período anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Usuários</span>
                <span className="text-2xl font-bold">{dashboardData.totalUsuarios}</span>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>8% a mais que o período anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Produtos</span>
                <span className="text-2xl font-bold">{dashboardData.totalProdutos}</span>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FileSpreadsheet className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>3 novos produtos este mês</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Videoaulas</span>
                <span className="text-2xl font-bold">{dashboardData.totalVideoaulas}</span>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Video className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>5 novas videoaulas este mês</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Gráfico de vendas por período</p>
                <p className="text-xs text-gray-400">Dados simulados para demonstração</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <PieChart className="h-16 w-16 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Gráfico de vendas por categoria</p>
                <p className="text-xs text-gray-400">Dados simulados para demonstração</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabelas */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-medium">ID</th>
                    <th className="py-3 text-left font-medium">Usuário</th>
                    <th className="py-3 text-left font-medium">Produto</th>
                    <th className="py-3 text-right font-medium">Valor</th>
                    <th className="py-3 text-right font-medium">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.vendasRecentes.map((venda) => (
                    <tr key={venda.id} className="border-b">
                      <td className="py-3 text-left">{venda.id}</td>
                      <td className="py-3 text-left">{venda.usuario}</td>
                      <td className="py-3 text-left">{venda.produto}</td>
                      <td className="py-3 text-right">
                        {venda.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="py-3 text-right">{venda.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Produtos Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 text-left font-medium">Produto</th>
                    <th className="py-3 text-right font-medium">Vendas</th>
                    <th className="py-3 text-right font-medium">Visualizações</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.produtosPopulares.map((produto) => (
                    <tr key={produto.id} className="border-b">
                      <td className="py-3 text-left">{produto.nome}</td>
                      <td className="py-3 text-right">{produto.vendas}</td>
                      <td className="py-3 text-right">{produto.visualizacoes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Videoaulas populares */}
      <Card>
        <CardHeader>
          <CardTitle>Videoaulas Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Videoaula</th>
                  <th className="py-3 text-right font-medium">Visualizações</th>
                  <th className="py-3 text-right font-medium">Concluídas</th>
                  <th className="py-3 text-right font-medium">Taxa de Conclusão</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.videoaulasPopulares.map((video) => (
                  <tr key={video.id} className="border-b">
                    <td className="py-3 text-left">{video.nome}</td>
                    <td className="py-3 text-right">{video.visualizacoes}</td>
                    <td className="py-3 text-right">{video.concluidas}</td>
                    <td className="py-3 text-right">
                      {Math.round((video.concluidas / video.visualizacoes) * 100)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
