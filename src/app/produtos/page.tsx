'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileSpreadsheet, Filter } from 'lucide-react'
import { useState } from 'react'

// Dados simulados de produtos
const produtos = [
  {
    id: 'orcamento-obras',
    nome: 'Orçamento Completo de Obras',
    descricao: 'Planilha completa para orçamentos de obras com composições de custos.',
    preco: 149.90,
    categoria: 'orcamentos'
  },
  {
    id: 'dimensionamento-estrutural',
    nome: 'Dimensionamento Estrutural',
    descricao: 'Cálculos estruturais para vigas, pilares e lajes conforme normas ABNT.',
    preco: 199.90,
    categoria: 'estrutural'
  },
  {
    id: 'cronograma-fisico-financeiro',
    nome: 'Cronograma Físico-Financeiro',
    descricao: 'Controle de prazos e custos para gerenciamento eficiente de projetos.',
    preco: 129.90,
    categoria: 'gestao'
  },
  {
    id: 'calculo-fundacoes',
    nome: 'Cálculo de Fundações',
    descricao: 'Dimensionamento de fundações rasas e profundas com memorial de cálculo.',
    preco: 179.90,
    categoria: 'estrutural'
  },
  {
    id: 'instalacoes-hidraulicas',
    nome: 'Instalações Hidráulicas',
    descricao: 'Dimensionamento de sistemas hidráulicos residenciais e comerciais.',
    preco: 159.90,
    categoria: 'hidraulica'
  },
  {
    id: 'levantamento-quantitativos',
    nome: 'Levantamento de Quantitativos',
    descricao: 'Planilha para levantamento preciso de materiais em obras.',
    preco: 119.90,
    categoria: 'orcamentos'
  },
  {
    id: 'gestao-equipes',
    nome: 'Gestão de Equipes',
    descricao: 'Controle de produtividade e alocação de recursos humanos em obras.',
    preco: 139.90,
    categoria: 'gestao'
  },
  {
    id: 'calculo-estruturas-metalicas',
    nome: 'Cálculo de Estruturas Metálicas',
    descricao: 'Dimensionamento de perfis e ligações para estruturas metálicas.',
    preco: 189.90,
    categoria: 'estrutural'
  },
  {
    id: 'orcamento-reformas',
    nome: 'Orçamento para Reformas',
    descricao: 'Planilha especializada para orçamentos de reformas residenciais.',
    preco: 99.90,
    categoria: 'orcamentos'
  }
]

// Categorias disponíveis
const categorias = [
  { id: 'todos', nome: 'Todos' },
  { id: 'orcamentos', nome: 'Orçamentos' },
  { id: 'estrutural', nome: 'Estrutural' },
  { id: 'gestao', nome: 'Gestão' },
  { id: 'hidraulica', nome: 'Hidráulica' }
]

export default function Produtos() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  
  // Filtra produtos por categoria
  const produtosFiltrados = categoriaAtiva === 'todos' 
    ? produtos 
    : produtos.filter(produto => produto.categoria === categoriaAtiva)

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Planilhas e Custos para Engenharia
        </h1>
        <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed">
          Encontre a solução ideal para seus projetos de engenharia e construção civil.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <Filter className="h-5 w-5 mr-2" />
        <span className="font-medium">Filtrar por:</span>
        {categorias.map((categoria) => (
          <Button
            key={categoria.id}
            variant={categoriaAtiva === categoria.id ? "default" : "outline"}
            size="sm"
            onClick={() => setCategoriaAtiva(categoria.id)}
          >
            {categoria.nome}
          </Button>
        ))}
      </div>

      {/* Lista de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtosFiltrados.map((produto) => (
          <Link href={`/produto/${produto.id}`} key={produto.id} className="group">
            <Card className="overflow-hidden border-0 shadow-lg transition-all duration-200 hover:shadow-xl h-full">
              <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
                <FileSpreadsheet className="h-16 w-16 text-blue-600" />
              </div>
              <CardContent className="p-6 flex flex-col h-[calc(100%-33.33%)]">
                <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                  {produto.nome}
                </h3>
                <p className="text-sm text-gray-500 mt-2 flex-grow">
                  {produto.descricao}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-bold text-lg">
                    {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <Button variant="outline" size="sm" className="group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
