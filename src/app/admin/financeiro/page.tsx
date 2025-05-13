'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  DollarSign, 
  CreditCard, 
  BarChart, 
  Download,
  Calendar,
  ArrowUpDown,
  FileText,
  Printer,
  Filter
} from 'lucide-react'

// Dados simulados para relatórios financeiros
const vendasData = [
  {
    id: 'ord-1234',
    usuario: 'João Silva',
    email: 'joao.silva@exemplo.com',
    produto: 'Orçamento Completo de Obras',
    valor: 149.90,
    data: '25/04/2025',
    status: 'Concluído',
    pagamento: 'Cartão de Crédito'
  },
  {
    id: 'ord-1235',
    usuario: 'Maria Oliveira',
    email: 'maria.oliveira@exemplo.com',
    produto: 'Dimensionamento Estrutural',
    valor: 199.90,
    data: '24/04/2025',
    status: 'Concluído',
    pagamento: 'Cartão de Crédito'
  },
  {
    id: 'ord-1236',
    usuario: 'Carlos Santos',
    email: 'carlos.santos@exemplo.com',
    produto: 'Cronograma Físico-Financeiro',
    valor: 129.90,
    data: '23/04/2025',
    status: 'Concluído',
    pagamento: 'Boleto'
  },
  {
    id: 'ord-1237',
    usuario: 'Ana Pereira',
    email: 'ana.pereira@exemplo.com',
    produto: 'Cálculo de Fundações',
    valor: 179.90,
    data: '22/04/2025',
    status: 'Concluído',
    pagamento: 'Pix'
  },
  {
    id: 'ord-1238',
    usuario: 'Roberto Almeida',
    email: 'roberto.almeida@exemplo.com',
    produto: 'Instalações Hidráulicas',
    valor: 159.90,
    data: '21/04/2025',
    status: 'Concluído',
    pagamento: 'Cartão de Crédito'
  },
  {
    id: 'ord-1239',
    usuario: 'Fernanda Costa',
    email: 'fernanda.costa@exemplo.com',
    produto: 'Levantamento de Quantitativos',
    valor: 119.90,
    data: '20/04/2025',
    status: 'Concluído',
    pagamento: 'Pix'
  },
  {
    id: 'ord-1240',
    usuario: 'Ricardo Souza',
    email: 'ricardo.souza@exemplo.com',
    produto: 'Análise de Viabilidade',
    valor: 189.90,
    data: '19/04/2025',
    status: 'Concluído',
    pagamento: 'Cartão de Crédito'
  },
  {
    id: 'ord-1241',
    usuario: 'Juliana Martins',
    email: 'juliana.martins@exemplo.com',
    produto: 'Projeto Elétrico Residencial',
    valor: 149.90,
    data: '18/04/2025',
    status: 'Concluído',
    pagamento: 'Boleto'
  }
]

// Resumo financeiro
const resumoFinanceiro = {
  vendas: {
    hoje: 349.80,
    semana: 1279.20,
    mes: 4850.75,
    ano: 12850.75
  },
  
  metodosPagamento: [
    { metodo: 'Cartão de Crédito', valor: 2850.40, porcentagem: 58.8 },
    { metodo: 'Pix', valor: 1250.25, porcentagem: 25.8 },
    { metodo: 'Boleto', valor: 750.10, porcentagem: 15.4 }
  ],
  
  categorias: [
    { categoria: 'Orçamentos', valor: 1850.75, porcentagem: 38.2 },
    { categoria: 'Estrutural', valor: 1450.50, porcentagem: 29.9 },
    { categoria: 'Gestão', valor: 850.25, porcentagem: 17.5 },
    { categoria: 'Hidráulica', valor: 450.15, porcentagem: 9.3 },
    { categoria: 'Elétrica', valor: 249.10, porcentagem: 5.1 }
  ]
}

// Status e métodos de pagamento disponíveis
const statusOptions = ['Todos', 'Concluído', 'Pendente', 'Cancelado']
const pagamentoOptions = ['Todos', 'Cartão de Crédito', 'Pix', 'Boleto']

export default function AdminFinanceiro() {
  const [periodo, setPeriodo] = useState('mes')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [busca, setBusca] = useState('')
  const [statusFiltro, setStatusFiltro] = useState('Todos')
  const [pagamentoFiltro, setPagamentoFiltro] = useState('Todos')
  const [ordenacao, setOrdenacao] = useState('data-desc')
  
  // Filtrar vendas
  const vendasFiltradas = vendasData.filter(venda => {
    const correspondeAoBusca = venda.usuario.toLowerCase().includes(busca.toLowerCase()) || 
                              venda.email.toLowerCase().includes(busca.toLowerCase()) ||
                              venda.produto.toLowerCase().includes(busca.toLowerCase()) ||
                              venda.id.toLowerCase().includes(busca.toLowerCase())
    
    const correspondeAoStatus = statusFiltro === 'Todos' || venda.status === statusFiltro
    const correspondeAoPagamento = pagamentoFiltro === 'Todos' || venda.pagamento === pagamentoFiltro
    
    return correspondeAoBusca && correspondeAoStatus && correspondeAoPagamento
  })
  
  // Ordenar vendas
  const vendasOrdenadas = [...vendasFiltradas].sort((a, b) => {
    if (ordenacao === 'data-desc') {
      return new Date(b.data.split('/').reverse().join('-')) - 
             new Date(a.data.split('/').reverse().join('-'))
    } else if (ordenacao === 'data-asc') {
      return new Date(a.data.split('/').reverse().join('-')) - 
             new Date(b.data.split('/').reverse().join('-'))
    } else if (ordenacao === 'valor-desc') {
      return b.valor - a.valor
    } else if (ordenacao === 'valor-asc') {
      return a.valor - b.valor
    } else if (ordenacao === 'usuario-asc') {
      return a.usuario.localeCompare(b.usuario)
    } else if (ordenacao === 'produto-asc') {
      return a.produto.localeCompare(b.produto)
    }
    return 0
  })
  
  // Calcular total das vendas filtradas
  const totalVendasFiltradas = vendasOrdenadas.reduce((total, venda) => total + venda.valor, 0)
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Relatórios Financeiros</h2>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Imprimir
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>
      
      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Vendas Hoje</span>
                <span className="text-2xl font-bold">
                  {resumoFinanceiro.vendas.hoje.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Vendas na Semana</span>
                <span className="text-2xl font-bold">
                  {resumoFinanceiro.vendas.semana.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Vendas no Mês</span>
                <span className="text-2xl font-bold">
                  {resumoFinanceiro.vendas.mes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex flex-col space-y-1">
                <span className="text-sm font-medium text-gray-500">Vendas no Ano</span>
                <span className="text-2xl font-bold">
                  {resumoFinanceiro.vendas.ano.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Método de Pagamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumoFinanceiro.metodosPagamento.map((metodo) => (
                <div key={metodo.metodo} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metodo.metodo}</span>
                    <span className="text-sm font-medium">
                      {metodo.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${metodo.porcentagem}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">{metodo.porcentagem}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {resumoFinanceiro.categorias.map((categoria) => (
                <div key={categoria.categoria} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{categoria.categoria}</span>
                    <span className="text-sm font-medium">
                      {categoria.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${categoria.porcentagem}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-right">{categoria.porcentagem}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filtros e busca */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Vendas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="dataInicio">Data Inicial</Label>
                <Input 
                  id="dataInicio" 
                  type="date" 
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dataFim">Data Final</Label>
                <Input 
                  id="dataFim" 
                  type="date" 
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full p-2 border rounded-md"
                  value={statusFiltro}
                  onChange={(e) => setStatusFiltro(e.target.value)}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pagamento">Método de Pagamento</Label>
                <select
                  id="pagamento"
                  className="w-full p-2 border rounded-md"
                  value={pagamentoFiltro}
                  onChange={(e) => setPagamentoFiltro(e.target.value)}
                >
                  {pagamentoOptions.map((pagamento) => (
                    <option key={pagamento} value={pagamento}>
                      {pagamento}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end gap-4">
              <div className="flex-grow space-y-2">
                <Label htmlFor="busca">Buscar</Label>
                <Input
                  id="busca"
                  placeholder="Buscar por cliente, produto ou ID..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>
              
              <div className="space-y-2 md:w-48">
                <Label htmlFor="ordenacao">Ordenar por</Label>
                <select
                  id="ordenacao"
                  className="w-full p-2 border rounded-md"
                  value={ordenacao}
                  onChange={(e) => setOrdenacao(e.target.value)}
                >
                  <option value="data-desc">Data (mais recente)</option>
                  <option value="data-asc">Data (mais antiga)</option>
                  <option value="valor-desc">Valor (maior para menor)</option>
                  <option value="valor-asc">Valor (menor para maior)</option>
                  <option value="usuario-asc">Cliente (A-Z)</option>
                  <option value="produto-asc">Produto (A-Z)</option>
                </select>
              </div>
              
              <Button className="md:mb-0">
                <Filter className="h-4 w-4 mr-2" />
                Aplicar Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Lista de vendas */}
      <Card>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">ID</th>
                  <th className="py-3 text-left font-medium">Cliente</th>
                  <th className="py-3 text-left font-medium">Produto</th>
                  <th className="py-3 text-center font-medium">Status</th>
                  <th className="py-3 text-center font-medium">Pagamento</th>
                  <th className="py-3 text-right font-medium">Valor</th>
                  <th className="py-3 text-right font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {vendasOrdenadas.map((venda) => (
                  <tr key={venda.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-left font-mono text-xs">{venda.id}</td>
                    <td className="py-3 text-left">
                      <div>
                        <div className="font-medium">{venda.usuario}</div>
                        <div className="text-xs text-gray-500">{venda.email}</div>
                      </div>
                    </td>
                    <td className="py-3 text-left">{venda.produto}</td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        venda.status === 'Concluído' 
                          ? 'bg-green-100 text-green-800' 
                          : venda.status === 'Pendente'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {venda.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        venda.pagamento === 'Cartão de Crédito' 
                          ? 'bg-blue-100 text-blue-800' 
                          : venda.pagamento === 'Pix'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {venda.pagamento}
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium">
                      {venda.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="py-3 text-right">{venda.data}</td>
                  </tr>
                ))}
                
                {/* Linha de total */}
                <tr className="bg-gray-50 font-medium">
                  <td colSpan={5} className="py-3 text-right">Total:</td>
                  <td className="py-3 text-right">
                    {totalVendasFiltradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          
          {vendasOrdenadas.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma venda encontrada</h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar os filtros para visualizar as vendas.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
