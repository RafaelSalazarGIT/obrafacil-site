'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileSpreadsheet, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  ArrowUpDown,
  Download
} from 'lucide-react'

// Dados simulados para produtos
const produtosData = [
  {
    id: 'prod-001',
    nome: 'Orçamento Completo de Obras',
    descricao: 'Planilha completa para orçamentos de obras com composições de custos.',
    categoria: 'Orçamentos',
    preco: 149.90,
    vendas: 42,
    arquivo: 'orcamento-obras.xlsx',
    dataCriacao: '10/01/2025',
    dataAtualizacao: '15/03/2025',
  },
  {
    id: 'prod-002',
    nome: 'Dimensionamento Estrutural',
    descricao: 'Cálculos estruturais para vigas, pilares e lajes conforme normas ABNT.',
    categoria: 'Estrutural',
    preco: 199.90,
    vendas: 38,
    arquivo: 'dimensionamento-estrutural.xlsx',
    dataCriacao: '15/01/2025',
    dataAtualizacao: '20/02/2025',
  },
  {
    id: 'prod-003',
    nome: 'Cronograma Físico-Financeiro',
    descricao: 'Controle de prazos e custos para gerenciamento eficiente de projetos.',
    categoria: 'Gestão',
    preco: 129.90,
    vendas: 35,
    arquivo: 'cronograma-fisico-financeiro.xlsx',
    dataCriacao: '20/01/2025',
    dataAtualizacao: '05/03/2025',
  },
  {
    id: 'prod-004',
    nome: 'Cálculo de Fundações',
    descricao: 'Dimensionamento de fundações rasas e profundas com memorial de cálculo.',
    categoria: 'Estrutural',
    preco: 179.90,
    vendas: 29,
    arquivo: 'calculo-fundacoes.xlsx',
    dataCriacao: '25/01/2025',
    dataAtualizacao: '10/03/2025',
  },
  {
    id: 'prod-005',
    nome: 'Instalações Hidráulicas',
    descricao: 'Dimensionamento de sistemas hidráulicos residenciais e comerciais.',
    categoria: 'Hidráulica',
    preco: 159.90,
    vendas: 25,
    arquivo: 'instalacoes-hidraulicas.xlsx',
    dataCriacao: '01/02/2025',
    dataAtualizacao: '25/03/2025',
  },
  {
    id: 'prod-006',
    nome: 'Levantamento de Quantitativos',
    descricao: 'Planilha para levantamento preciso de materiais em obras.',
    categoria: 'Orçamentos',
    preco: 119.90,
    vendas: 22,
    arquivo: 'levantamento-quantitativos.xlsx',
    dataCriacao: '05/02/2025',
    dataAtualizacao: '01/04/2025',
  },
  {
    id: 'prod-007',
    nome: 'Análise de Viabilidade',
    descricao: 'Estudo de viabilidade econômica para empreendimentos imobiliários.',
    categoria: 'Gestão',
    preco: 189.90,
    vendas: 18,
    arquivo: 'analise-viabilidade.xlsx',
    dataCriacao: '10/02/2025',
    dataAtualizacao: '05/04/2025',
  },
  {
    id: 'prod-008',
    nome: 'Projeto Elétrico Residencial',
    descricao: 'Dimensionamento de instalações elétricas para residências.',
    categoria: 'Elétrica',
    preco: 149.90,
    vendas: 15,
    arquivo: 'projeto-eletrico-residencial.xlsx',
    dataCriacao: '15/02/2025',
    dataAtualizacao: '10/04/2025',
  }
]

// Categorias disponíveis
const categorias = [
  'Todas',
  'Orçamentos',
  'Estrutural',
  'Gestão',
  'Hidráulica',
  'Elétrica'
]

export default function AdminProdutos() {
  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [ordenacao, setOrdenacao] = useState('nome-asc')
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  
  // Filtrar produtos
  const produtosFiltrados = produtosData.filter(produto => {
    const correspondeAoBusca = produto.nome.toLowerCase().includes(busca.toLowerCase()) || 
                              produto.descricao.toLowerCase().includes(busca.toLowerCase())
    
    const correspondeACategoria = categoriaFiltro === 'Todas' || produto.categoria === categoriaFiltro
    
    return correspondeAoBusca && correspondeACategoria
  })
  
  // Ordenar produtos
  const produtosOrdenados = [...produtosFiltrados].sort((a, b) => {
    if (ordenacao === 'nome-asc') {
      return a.nome.localeCompare(b.nome)
    } else if (ordenacao === 'nome-desc') {
      return b.nome.localeCompare(a.nome)
    } else if (ordenacao === 'preco-asc') {
      return a.preco - b.preco
    } else if (ordenacao === 'preco-desc') {
      return b.preco - a.preco
    } else if (ordenacao === 'vendas-desc') {
      return b.vendas - a.vendas
    } else if (ordenacao === 'data-desc') {
      return new Date(b.dataAtualizacao.split('/').reverse().join('-')) - 
             new Date(a.dataAtualizacao.split('/').reverse().join('-'))
    }
    return 0
  })
  
  // Abrir modal para adicionar/editar produto
  const abrirModal = (produto = null) => {
    setProdutoSelecionado(produto)
    setModalAberto(true)
  }
  
  // Fechar modal
  const fecharModal = () => {
    setProdutoSelecionado(null)
    setModalAberto(false)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Produtos</h2>
        <Button onClick={() => abrirModal()} className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Produto
        </Button>
      </div>
      
      {/* Filtros e busca */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar produtos..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="categoria" className="sr-only">Categoria</Label>
              <select
                id="categoria"
                className="w-full p-2 border rounded-md"
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="ordenacao" className="sr-only">Ordenar por</Label>
              <select
                id="ordenacao"
                className="w-full p-2 border rounded-md"
                value={ordenacao}
                onChange={(e) => setOrdenacao(e.target.value)}
              >
                <option value="nome-asc">Nome (A-Z)</option>
                <option value="nome-desc">Nome (Z-A)</option>
                <option value="preco-asc">Preço (menor para maior)</option>
                <option value="preco-desc">Preço (maior para menor)</option>
                <option value="vendas-desc">Mais vendidos</option>
                <option value="data-desc">Mais recentes</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Lista de produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos ({produtosOrdenados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Nome</th>
                  <th className="py-3 text-left font-medium">Categoria</th>
                  <th className="py-3 text-right font-medium">Preço</th>
                  <th className="py-3 text-right font-medium">Vendas</th>
                  <th className="py-3 text-right font-medium">Última Atualização</th>
                  <th className="py-3 text-center font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {produtosOrdenados.map((produto) => (
                  <tr key={produto.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-left">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center mr-3">
                          <FileSpreadsheet className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{produto.nome}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">{produto.descricao}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-left">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {produto.categoria}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="py-3 text-right">{produto.vendas}</td>
                    <td className="py-3 text-right">{produto.dataAtualizacao}</td>
                    <td className="py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button variant="ghost" size="icon" title="Visualizar">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Editar"
                          onClick={() => abrirModal(produto)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Excluir">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Download">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {produtosOrdenados.length === 0 && (
            <div className="text-center py-8">
              <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar os filtros ou adicione um novo produto.
              </p>
              <Button onClick={() => abrirModal()}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Modal para adicionar/editar produto (simulado) */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {produtoSelecionado ? 'Editar Produto' : 'Adicionar Novo Produto'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome do Produto</Label>
                    <Input 
                      id="nome" 
                      defaultValue={produtoSelecionado?.nome || ''} 
                      placeholder="Ex: Orçamento Completo de Obras"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <select
                      id="categoria"
                      className="w-full p-2 border rounded-md"
                      defaultValue={produtoSelecionado?.categoria || ''}
                    >
                      {categorias.filter(c => c !== 'Todas').map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input 
                      id="preco" 
                      type="number" 
                      step="0.01" 
                      defaultValue={produtoSelecionado?.preco || ''} 
                      placeholder="Ex: 149.90"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="arquivo">Arquivo</Label>
                    <div className="flex">
                      <Input 
                        id="arquivo" 
                        type="file" 
                        className="flex-1"
                      />
                    </div>
                    {produtoSelecionado?.arquivo && (
                      <p className="text-xs text-gray-500">
                        Arquivo atual: {produtoSelecionado.arquivo}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <textarea
                    id="descricao"
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    defaultValue={produtoSelecionado?.descricao || ''}
                    placeholder="Descreva o produto em detalhes..."
                  />
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={fecharModal}>
                    Cancelar
                  </Button>
                  <Button>
                    {produtoSelecionado ? 'Salvar Alterações' : 'Adicionar Produto'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
