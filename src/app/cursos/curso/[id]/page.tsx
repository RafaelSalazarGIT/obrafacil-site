'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  Clock, 
  Award, 
  Star,
  Download,
  FileText,
  MessageSquare,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Share2,
  ThumbsUp
} from 'lucide-react'

// Dados simulados para o curso
const cursoData = {
  id: 'curso-1',
  titulo: 'Orçamento Completo de Obras',
  descricao: 'Aprenda a elaborar orçamentos precisos para qualquer tipo de obra civil, desde residências até grandes empreendimentos. Este curso aborda todas as etapas do processo orçamentário, desde o levantamento de quantitativos até a composição final de custos, incluindo BDI e encargos sociais.',
  instrutor: {
    nome: 'Eng. Carlos Silva',
    bio: 'Engenheiro Civil com mais de 15 anos de experiência em orçamentação de obras. Especialista em gestão de custos e planejamento financeiro para construção civil.',
    foto: '/placeholder-instrutor.jpg'
  },
  duracao: '12 horas',
  nivel: 'Intermediário',
  avaliacoes: 4.8,
  numAvaliacoes: 124,
  alunos: 1250,
  thumbnail: '/placeholder-curso1.jpg',
  preco: 249.90,
  categoria: 'Orçamentos',
  ultimaAtualizacao: '15/03/2025',
  idioma: 'Português',
  certificado: true,
  modulos: [
    {
      id: 'mod-1',
      titulo: 'Introdução à Orçamentação',
      descricao: 'Conceitos fundamentais e visão geral do processo orçamentário.',
      duracao: '1h 30min',
      aulas: [
        {
          id: 'aula-1-1',
          titulo: 'Boas-vindas e Apresentação do Curso',
          duracao: '10min',
          tipo: 'video',
          concluida: true
        },
        {
          id: 'aula-1-2',
          titulo: 'Conceitos Básicos de Orçamentação',
          duracao: '25min',
          tipo: 'video',
          concluida: true
        },
        {
          id: 'aula-1-3',
          titulo: 'Tipos de Orçamentos',
          duracao: '20min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-1-4',
          titulo: 'Etapas do Processo Orçamentário',
          duracao: '25min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-1-5',
          titulo: 'Exercício Prático - Módulo 1',
          duracao: '10min',
          tipo: 'exercicio',
          concluida: false
        }
      ]
    },
    {
      id: 'mod-2',
      titulo: 'Levantamento de Quantitativos',
      descricao: 'Técnicas e metodologias para levantamento preciso de quantitativos.',
      duracao: '2h 45min',
      aulas: [
        {
          id: 'aula-2-1',
          titulo: 'Leitura e Interpretação de Projetos',
          duracao: '30min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-2-2',
          titulo: 'Levantamento de Quantitativos de Fundações',
          duracao: '35min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-2-3',
          titulo: 'Levantamento de Quantitativos de Estruturas',
          duracao: '40min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-2-4',
          titulo: 'Levantamento de Quantitativos de Acabamentos',
          duracao: '35min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-2-5',
          titulo: 'Planilha de Levantamento de Quantitativos',
          duracao: '15min',
          tipo: 'material',
          concluida: false
        },
        {
          id: 'aula-2-6',
          titulo: 'Exercício Prático - Módulo 2',
          duracao: '10min',
          tipo: 'exercicio',
          concluida: false
        }
      ]
    },
    {
      id: 'mod-3',
      titulo: 'Composição de Custos',
      descricao: 'Elaboração de composições de custos unitários e análise de insumos.',
      duracao: '3h 15min',
      aulas: [
        {
          id: 'aula-3-1',
          titulo: 'Conceitos de Composição de Custos',
          duracao: '25min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-3-2',
          titulo: 'Composição de Custos Unitários',
          duracao: '40min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-3-3',
          titulo: 'Análise de Produtividade',
          duracao: '35min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-3-4',
          titulo: 'Cotação de Insumos',
          duracao: '30min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-3-5',
          titulo: 'Banco de Dados de Composições',
          duracao: '25min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-3-6',
          titulo: 'Planilha de Composição de Custos',
          duracao: '15min',
          tipo: 'material',
          concluida: false
        },
        {
          id: 'aula-3-7',
          titulo: 'Exercício Prático - Módulo 3',
          duracao: '25min',
          tipo: 'exercicio',
          concluida: false
        }
      ]
    },
    {
      id: 'mod-4',
      titulo: 'BDI e Encargos Sociais',
      descricao: 'Cálculo e aplicação de BDI e encargos sociais em orçamentos.',
      duracao: '2h',
      aulas: [
        {
          id: 'aula-4-1',
          titulo: 'Conceito de BDI',
          duracao: '20min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-4-2',
          titulo: 'Componentes do BDI',
          duracao: '25min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-4-3',
          titulo: 'Cálculo do BDI',
          duracao: '30min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-4-4',
          titulo: 'Encargos Sociais',
          duracao: '25min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-4-5',
          titulo: 'Planilha de Cálculo de BDI',
          duracao: '10min',
          tipo: 'material',
          concluida: false
        },
        {
          id: 'aula-4-6',
          titulo: 'Exercício Prático - Módulo 4',
          duracao: '10min',
          tipo: 'exercicio',
          concluida: false
        }
      ]
    },
    {
      id: 'mod-5',
      titulo: 'Orçamento Final e Análises',
      descricao: 'Elaboração do orçamento final e análises de viabilidade.',
      duracao: '2h 30min',
      aulas: [
        {
          id: 'aula-5-1',
          titulo: 'Montagem do Orçamento Final',
          duracao: '35min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-5-2',
          titulo: 'Curva ABC de Insumos',
          duracao: '25min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-5-3',
          titulo: 'Análise de Viabilidade',
          duracao: '30min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-5-4',
          titulo: 'Apresentação do Orçamento ao Cliente',
          duracao: '20min',
          tipo: 'video',
          concluida: false
        },
        {
          id: 'aula-5-5',
          titulo: 'Planilha de Orçamento Completo',
          duracao: '15min',
          tipo: 'material',
          concluida: false
        },
        {
          id: 'aula-5-6',
          titulo: 'Projeto Final',
          duracao: '25min',
          tipo: 'projeto',
          concluida: false
        }
      ]
    }
  ],
  materiais: [
    {
      id: 'mat-1',
      titulo: 'Planilha de Levantamento de Quantitativos',
      tipo: 'excel',
      tamanho: '1.2 MB'
    },
    {
      id: 'mat-2',
      titulo: 'Planilha de Composição de Custos',
      tipo: 'excel',
      tamanho: '1.5 MB'
    },
    {
      id: 'mat-3',
      titulo: 'Planilha de Cálculo de BDI',
      tipo: 'excel',
      tamanho: '0.8 MB'
    },
    {
      id: 'mat-4',
      titulo: 'Planilha de Orçamento Completo',
      tipo: 'excel',
      tamanho: '2.3 MB'
    },
    {
      id: 'mat-5',
      titulo: 'Apostila do Curso',
      tipo: 'pdf',
      tamanho: '5.7 MB'
    }
  ],
  comentarios: [
    {
      id: 'com-1',
      usuario: 'João Silva',
      data: '20/04/2025',
      avaliacao: 5,
      comentario: 'Excelente curso! O conteúdo é muito completo e o instrutor explica de forma clara e objetiva. As planilhas fornecidas são de grande utilidade e já estou aplicando no meu trabalho.'
    },
    {
      id: 'com-2',
      usuario: 'Maria Oliveira',
      data: '15/04/2025',
      avaliacao: 4,
      comentario: 'Curso muito bom, com conteúdo prático e aplicável. As planilhas são excelentes ferramentas. Só senti falta de mais exemplos de obras comerciais.'
    },
    {
      id: 'com-3',
      usuario: 'Pedro Santos',
      data: '10/04/2025',
      avaliacao: 5,
      comentario: 'O melhor curso de orçamentação que já fiz. O instrutor tem grande conhecimento prático e compartilha dicas valiosas. Recomendo fortemente!'
    }
  ]
}

// Componente para exibir estrelas de avaliação
const AvaliacaoEstrelas = ({ avaliacao }) => {
  const estrelas = []
  for (let i = 1; i <= 5; i++) {
    estrelas.push(
      <Star 
        key={i} 
        className={`h-4 w-4 ${i <= Math.round(avaliacao) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    )
  }
  return <div className="flex">{estrelas}</div>
}

// Componente para o player de vídeo
const VideoPlayer = ({ aula }) => {
  const videoRef = useRef(null)
  
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
      {/* Placeholder para o vídeo */}
      <div className="absolute inset-0 flex items-center justify-center bg-blue-900">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4">
            <Play className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-white font-medium">{aula.titulo}</h3>
          <p className="text-blue-200 text-sm">{aula.duracao}</p>
        </div>
      </div>
      
      {/* Controles do vídeo (simulados) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            <button className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              <Play className="h-4 w-4" />
            </button>
            <span className="text-sm">00:00 / {aula.duracao}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
              </svg>
            </button>
            <button className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full h-1 bg-white/30 rounded-full mt-2">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '0%' }}></div>
        </div>
      </div>
    </div>
  )
}

export default function CursoDetalhesPage() {
  const { id } = useParams()
  const [tabAtiva, setTabAtiva] = useState('conteudo')
  const [moduloAberto, setModuloAberto] = useState('mod-1')
  const [aulaAtual, setAulaAtual] = useState('aula-1-1')
  
  // Encontrar a aula atual
  const aula = cursoData.modulos
    .flatMap(modulo => modulo.aulas)
    .find(aula => aula.id === aulaAtual)
  
  // Calcular progresso do curso
  const totalAulas = cursoData.modulos.reduce((total, modulo) => total + modulo.aulas.length, 0)
  const aulasCompletas = cursoData.modulos.reduce((total, modulo) => 
    total + modulo.aulas.filter(aula => aula.concluida).length, 0)
  const progresso = Math.round((aulasCompletas / totalAulas) * 100)
  
  return (
    <div className="space-y-6">
      {/* Navegação do curso */}
      <div className="flex items-center justify-between">
        <Link href="/cursos/meus-cursos" className="flex items-center text-blue-600 hover:text-blue-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para Meus Cursos
        </Link>
        <div className="flex items-center space-x-3">
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <Bookmark className="h-5 w-5 mr-1" />
            <span className="hidden md:inline">Salvar</span>
          </button>
          <button className="flex items-center text-gray-700 hover:text-blue-600">
            <Share2 className="h-5 w-5 mr-1" />
            <span className="hidden md:inline">Compartilhar</span>
          </button>
        </div>
      </div>
      
      {/* Título do curso e progresso */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{cursoData.titulo}</h1>
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 mb-4">
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {cursoData.duracao}
          </span>
          <span className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            {cursoData.nivel}
          </span>
          <span className="flex items-center">
            <AvaliacaoEstrelas avaliacao={cursoData.avaliacoes} />
            <span className="ml-1">({cursoData.avaliacoes})</span>
          </span>
          <span className="flex items-center">
            <FileText className="h-4 w-4 mr-1" />
            {totalAulas} aulas
          </span>
        </div>
        
        <div className="bg-gray-100 rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">Seu progresso</span>
            <span className="text-sm">{progresso}% concluído</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${progresso}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal - Player e conteúdo */}
        <div className="lg:col-span-2 space-y-6">
          {/* Player de vídeo */}
          <VideoPlayer aula={aula} />
          
          {/* Título da aula atual */}
          <div>
            <h2 className="text-xl font-bold">{aula.titulo}</h2>
            <p className="text-gray-600">{aula.duracao}</p>
          </div>
          
          {/* Tabs de conteúdo */}
          <Tabs defaultValue="conteudo" onValueChange={setTabAtiva} className="space-y-4">
            <TabsList className="grid grid-cols-3 md:w-auto">
              <TabsTrigger value="conteudo">Conteúdo</TabsTrigger>
              <TabsTrigger value="materiais">Materiais</TabsTrigger>
              <TabsTrigger value="comentarios">Comentários</TabsTrigger>
            </TabsList>
            
            {/* Tab de conteúdo do curso */}
            <TabsContent value="conteudo" className="space-y-4">
              {cursoData.modulos.map((modulo) => (
                <Card key={modulo.id} className={moduloAberto === modulo.id ? 'border-blue-300' : ''}>
                  <CardHeader 
                    className="cursor-pointer"
                    onClick={() => setModuloAberto(moduloAberto === modulo.id ? null : modulo.id)}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{modulo.titulo}</CardTitle>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{modulo.duracao}</span>
                        <ChevronRight className={`h-5 w-5 ml-2 transition-transform ${
                          moduloAberto === modulo.id ? 'rotate-90' : ''
                        }`} />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{modulo.descricao}</p>
                  </CardHeader>
                  
                  {moduloAberto === modulo.id && (
                    <CardContent>
                      <ul className="space-y-2">
                        {modulo.aulas.map((aula) => (
                          <li 
                            key={aula.id}
                            className={`p-3 rounded-md flex items-center justify-between cursor-pointer ${
                              aulaAtual === aula.id 
                                ? 'bg-blue-50 border border-blue-200' 
                                : 'hover:bg-gray-50'
                            }`}
                            onClick={() => setAulaAtual(aula.id)}
                          >
                            <div className="flex items-center">
                              {aula.concluida ? (
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                              ) : (
                                <div className={`h-5 w-5 rounded-full border ${
                                  aulaAtual === aula.id ? 'border-blue-600' : 'border-gray-300'
                                } mr-3`}></div>
                              )}
                              <div>
                                <div className="font-medium">{aula.titulo}</div>
                                <div className="flex items-center text-xs text-gray-500">
                                  {aula.tipo === 'video' && <Play className="h-3 w-3 mr-1" />}
                                  {aula.tipo === 'material' && <FileText className="h-3 w-3 mr-1" />}
                                  {aula.tipo === 'exercicio' && <MessageSquare className="h-3 w-3 mr-1" />}
                                  {aula.tipo === 'projeto' && <Award className="h-3 w-3 mr-1" />}
                                  <span>{aula.duracao}</span>
                                </div>
                              </div>
                            </div>
                            
                            {aulaAtual === aula.id && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                Assistindo
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  )}
                </Card>
              ))}
            </TabsContent>
            
            {/* Tab de materiais */}
            <TabsContent value="materiais" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Materiais do Curso</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {cursoData.materiais.map((material) => (
                      <li 
                        key={material.id}
                        className="p-3 border rounded-md flex items-center justify-between hover:bg-gray-50"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded bg-blue-100 flex items-center justify-center mr-3">
                            {material.tipo === 'excel' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <path d="M8 13h2"/>
                                <path d="M8 17h2"/>
                                <path d="M14 13h2"/>
                                <path d="M14 17h2"/>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-600">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="9" y1="15" x2="15" y2="15"/>
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{material.titulo}</div>
                            <div className="text-xs text-gray-500">
                              {material.tipo.toUpperCase()} • {material.tamanho}
                            </div>
                          </div>
                        </div>
                        
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tab de comentários */}
            <TabsContent value="comentarios" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Comentários e Avaliações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Resumo de avaliações */}
                  <div className="flex flex-col md:flex-row md:items-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-center md:w-1/4 mb-4 md:mb-0">
                      <div className="text-5xl font-bold text-blue-600">{cursoData.avaliacoes}</div>
                      <div className="flex justify-center mt-2">
                        <AvaliacaoEstrelas avaliacao={cursoData.avaliacoes} />
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{cursoData.numAvaliacoes} avaliações</div>
                    </div>
                    
                    <div className="md:w-3/4 md:pl-6">
                      {/* Barras de avaliação */}
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((estrela) => (
                          <div key={estrela} className="flex items-center">
                            <div className="w-12 text-sm text-gray-600">{estrela} estrelas</div>
                            <div className="flex-grow mx-3">
                              <div className="h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-full bg-yellow-400 rounded-full" 
                                  style={{ 
                                    width: `${estrela === 5 ? 75 : 
                                            estrela === 4 ? 20 : 
                                            estrela === 3 ? 3 : 
                                            estrela === 2 ? 1 : 1}%` 
                                  }}
                                ></div>
                              </div>
                            </div>
                            <div className="w-8 text-sm text-gray-600 text-right">
                              {estrela === 5 ? 75 : 
                               estrela === 4 ? 20 : 
                               estrela === 3 ? 3 : 
                               estrela === 2 ? 1 : 1}%
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Lista de comentários */}
                  <div className="space-y-4">
                    {cursoData.comentarios.map((comentario) => (
                      <div key={comentario.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <span className="text-blue-600 font-medium">
                                {comentario.usuario.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{comentario.usuario}</div>
                              <div className="text-xs text-gray-500">{comentario.data}</div>
                            </div>
                          </div>
                          <AvaliacaoEstrelas avaliacao={comentario.avaliacao} />
                        </div>
                        <p className="text-gray-700">{comentario.comentario}</p>
                        <div className="flex items-center mt-2">
                          <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Útil
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Formulário de comentário */}
                  <div className="pt-4">
                    <h3 className="font-medium mb-2">Deixe sua avaliação</h3>
                    <div className="flex items-center mb-3">
                      <span className="mr-2">Sua nota:</span>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((estrela) => (
                          <Star 
                            key={estrela} 
                            className="h-6 w-6 text-gray-300 cursor-pointer hover:text-yellow-400" 
                          />
                        ))}
                      </div>
                    </div>
                    <textarea
                      className="w-full p-3 border rounded-md min-h-[100px]"
                      placeholder="Compartilhe sua experiência com este curso..."
                    ></textarea>
                    <Button className="mt-3">
                      Enviar Avaliação
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Coluna lateral - Informações do curso */}
        <div className="space-y-6">
          {/* Card do instrutor */}
          <Card>
            <CardHeader>
              <CardTitle>Sobre o Instrutor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <span className="text-blue-600 text-xl font-medium">
                    {cursoData.instrutor.nome.split(' ')[1].charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold">{cursoData.instrutor.nome}</h3>
                </div>
              </div>
              <p className="text-gray-700 text-sm">{cursoData.instrutor.bio}</p>
            </CardContent>
          </Card>
          
          {/* Detalhes do curso */}
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Curso</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Duração Total:</span>
                <span className="font-medium">{cursoData.duracao}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nível:</span>
                <span className="font-medium">{cursoData.nivel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Alunos:</span>
                <span className="font-medium">{cursoData.alunos}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Idioma:</span>
                <span className="font-medium">{cursoData.idioma}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Última Atualização:</span>
                <span className="font-medium">{cursoData.ultimaAtualizacao}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Certificado:</span>
                <span className="font-medium">{cursoData.certificado ? 'Sim' : 'Não'}</span>
              </div>
            </CardContent>
          </Card>
          
          {/* Navegação entre aulas */}
          <Card>
            <CardHeader>
              <CardTitle>Navegação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" disabled={aulaAtual === 'aula-1-1'}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Aula Anterior
              </Button>
              <Button className="w-full justify-start">
                Próxima Aula
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Concluída
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
