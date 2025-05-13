'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FileSpreadsheet, ShoppingCart, ArrowLeft, Check } from 'lucide-react'
import { useCart } from '@/components/cart/CartContext'

// Dados simulados de produtos
const produtos = {
  'orcamento-obras': {
    id: 'orcamento-obras',
    nome: 'Orçamento Completo de Obras',
    descricao: 'Planilha completa para orçamentos de obras com composições de custos.',
    descricaoLonga: 'Esta planilha de orçamento completo para obras foi desenvolvida por engenheiros experientes para facilitar a elaboração de orçamentos precisos e detalhados. Inclui composições de custos unitários, banco de dados de insumos, cálculo de BDI, cronograma físico-financeiro integrado e relatórios personalizáveis. Ideal para construtoras, engenheiros autônomos e empresas de consultoria.',
    preco: 149.90,
    categoria: 'orcamentos',
    recursos: [
      'Composições de custos unitários baseadas em tabelas SINAPI e SICRO',
      'Banco de dados com mais de 5.000 insumos pré-cadastrados',
      'Cálculo automático de BDI conforme acórdão TCU',
      'Cronograma físico-financeiro integrado',
      'Curva ABC de insumos e serviços',
      'Relatórios personalizáveis para apresentação ao cliente',
      'Compatível com Excel 2016 ou superior'
    ]
  },
  'dimensionamento-estrutural': {
    id: 'dimensionamento-estrutural',
    nome: 'Dimensionamento Estrutural',
    descricao: 'Cálculos estruturais para vigas, pilares e lajes conforme normas ABNT.',
    descricaoLonga: 'A planilha de dimensionamento estrutural é uma ferramenta completa para engenheiros civis e projetistas estruturais. Desenvolvida de acordo com as normas ABNT NBR 6118:2014 e NBR 8681:2003, permite o dimensionamento preciso de elementos estruturais como vigas, pilares e lajes. Economize tempo em seus projetos estruturais com cálculos automatizados e verificações de segurança.',
    preco: 199.90,
    categoria: 'estrutural',
    recursos: [
      'Dimensionamento de vigas retangulares e T',
      'Cálculo de pilares com flexão composta',
      'Dimensionamento de lajes maciças e nervuradas',
      'Verificação de estados limites de serviço',
      'Detalhamento automático de armaduras',
      'Memorial de cálculo detalhado',
      'Compatível com Excel 2016 ou superior'
    ]
  },
  'cronograma-fisico-financeiro': {
    id: 'cronograma-fisico-financeiro',
    nome: 'Cronograma Físico-Financeiro',
    descricao: 'Controle de prazos e custos para gerenciamento eficiente de projetos.',
    descricaoLonga: 'O cronograma físico-financeiro é essencial para o planejamento e controle de obras. Esta planilha permite o gerenciamento eficiente de prazos e custos, com visualização clara do andamento do projeto. Ideal para engenheiros, arquitetos e gestores de obras que precisam de uma ferramenta prática para acompanhamento de projetos e prestação de contas a clientes e investidores.',
    preco: 129.90,
    categoria: 'gestao',
    recursos: [
      'Cronograma de Gantt integrado',
      'Controle de desembolso financeiro mensal',
      'Curva S para acompanhamento de progresso',
      'Histograma de recursos',
      'Indicadores de desempenho (CPI e SPI)',
      'Relatórios gráficos para apresentações',
      'Compatível com Excel 2016 ou superior'
    ]
  }
}

export default function ProdutoPage({ params }: { params: { id: string } }) {
  const [adicionadoAoCarrinho, setAdicionadoAoCarrinho] = useState(false)
  const router = useRouter()
  const { addItem } = useCart()
  
  // Busca o produto pelo ID
  const produto = produtos[params.id as keyof typeof produtos]
  
  // Se o produto não existir, poderia redirecionar para uma página 404
  if (!produto) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/produtos">
          <Button>Voltar para produtos</Button>
        </Link>
      </div>
    )
  }

  const handleAdicionarAoCarrinho = () => {
    // Adiciona o produto ao carrinho usando o contexto
    addItem(produto.id)
    setAdicionadoAoCarrinho(true)
    
    // Após um tempo, redireciona para o carrinho ou reseta o estado
    setTimeout(() => {
      // router.push('/carrinho')
      setAdicionadoAoCarrinho(false)
    }, 3000)
  }

  return (
    <div className="container py-12">
      <Link href="/produtos" className="flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para produtos
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem do produto */}
        <div className="bg-gray-100 rounded-lg flex items-center justify-center p-8 h-[400px]">
          <FileSpreadsheet className="h-32 w-32 text-blue-600" />
        </div>
        
        {/* Informações do produto */}
        <div>
          <h1 className="text-3xl font-bold">{produto.nome}</h1>
          <p className="text-xl font-bold text-blue-600 mt-2">
            {produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
          
          <div className="mt-6">
            <p className="text-gray-700">{produto.descricaoLonga}</p>
          </div>
          
          <div className="mt-8">
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAdicionarAoCarrinho}
              disabled={adicionadoAoCarrinho}
            >
              {adicionadoAoCarrinho ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Adicionado ao Carrinho
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Adicionar ao Carrinho
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Recursos do produto */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recursos</h2>
        <Card>
          <CardContent className="p-6">
            <ul className="space-y-2">
              {produto.recursos.map((recurso, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{recurso}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Produtos relacionados */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Produtos Relacionados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Object.values(produtos)
            .filter(p => p.id !== produto.id)
            .slice(0, 3)
            .map((produtoRelacionado) => (
              <Link href={`/produto/${produtoRelacionado.id}`} key={produtoRelacionado.id} className="group">
                <Card className="overflow-hidden border-0 shadow-lg transition-all duration-200 hover:shadow-xl">
                  <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center">
                    <FileSpreadsheet className="h-16 w-16 text-blue-600" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">
                      {produtoRelacionado.nome}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                      {produtoRelacionado.descricao}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-bold text-lg">
                        {produtoRelacionado.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
    </div>
  )
}
