'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Video, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Play,
  ArrowUpDown,
  Upload,
  FileText
} from 'lucide-react'

// Dados simulados para videoaulas
const videoaulasData = [
  {
    id: 'vid-001',
    titulo: 'Introdução ao Orçamento de Obras',
    descricao: 'Aprenda os conceitos básicos para elaborar orçamentos precisos para obras civis.',
    categoria: 'Orçamentos',
    duracao: '45:30',
    visualizacoes: 185,
    concluidas: 120,
    arquivo: 'intro-orcamento-obras.mp4',
    thumbnail: 'thumb-orcamento.jpg',
    dataCriacao: '15/02/2025',
    dataAtualizacao: '20/03/2025',
    modulo: 'Orçamentos de Obras',
    ordem: 1,
    acesso: 'Pago'
  },
  {
    id: 'vid-002',
    titulo: 'Cálculo de Vigas e Pilares',
    descricao: 'Metodologia completa para dimensionamento estrutural de vigas e pilares em concreto armado.',
    categoria: 'Estrutural',
    duracao: '52:15',
    visualizacoes: 165,
    concluidas: 95,
    arquivo: 'calculo-vigas-pilares.mp4',
    thumbnail: 'thumb-estrutural.jpg',
    dataCriacao: '20/02/2025',
    dataAtualizacao: '25/03/2025',
    modulo: 'Dimensionamento Estrutural',
    ordem: 1,
    acesso: 'Pago'
  },
  {
    id: 'vid-003',
    titulo: 'Elaboração de Cronogramas',
    descricao: 'Como criar cronogramas físico-financeiros eficientes para gerenciamento de projetos.',
    categoria: 'Gestão',
    duracao: '38:45',
    visualizacoes: 150,
    concluidas: 85,
    arquivo: 'elaboracao-cronogramas.mp4',
    thumbnail: 'thumb-cronograma.jpg',
    dataCriacao: '25/02/2025',
    dataAtualizacao: '30/03/2025',
    modulo: 'Gestão de Projetos',
    ordem: 1,
    acesso: 'Pago'
  },
  {
    id: 'vid-004',
    titulo: 'Dimensionamento de Fundações',
    descricao: 'Técnicas para dimensionamento de fundações rasas e profundas conforme normas ABNT.',
    categoria: 'Estrutural',
    duracao: '49:20',
    visualizacoes: 130,
    concluidas: 70,
    arquivo: 'dimensionamento-fundacoes.mp4',
    thumbnail: 'thumb-fundacoes.jpg',
    dataCriacao: '01/03/2025',
    dataAtualizacao: '05/04/2025',
    modulo: 'Dimensionamento Estrutural',
    ordem: 2,
    acesso: 'Pago'
  },
  {
    id: 'vid-005',
    titulo: 'Projeto de Instalações Hidráulicas',
    descricao: 'Dimensionamento completo de sistemas hidráulicos para edificações residenciais e comerciais.',
    categoria: 'Hidráulica',
    duracao: '56:10',
    visualizacoes: 120,
    concluidas: 65,
    arquivo: 'projeto-hidraulico.mp4',
    thumbnail: 'thumb-hidraulica.jpg',
    dataCriacao: '05/03/2025',
    dataAtualizacao: '10/04/2025',
    modulo: 'Instalações Hidráulicas',
    ordem: 1,
    acesso: 'Pago'
  },
  {
    id: 'vid-006',
    titulo: 'Composição de Custos Unitários',
    descricao: 'Metodologia para elaboração de composições de custos unitários para orçamentos de obras.',
    categoria: 'Orçamentos',
    duracao: '42:35',
    visualizacoes: 110,
    concluidas: 60,
    arquivo: 'composicao-custos.mp4',
    thumbnail: 'thumb-custos.jpg',
    dataCriacao: '10/03/2025',
    dataAtualizacao: '15/04/2025',
    modulo: 'Orçamentos de Obras',
    ordem: 2,
    acesso: 'Pago'
  },
  {
    id: 'vid-007',
    titulo: 'Análise de Viabilidade Econômica',
    descricao: 'Como realizar estudos de viabilidade econômica para empreendimentos imobiliários.',
    categoria: 'Gestão',
    duracao: '47:50',
    visualizacoes: 95,
    concluidas: 50,
    arquivo: 'viabilidade-economica.mp4',
    thumbnail: 'thumb-viabilidade.jpg',
    dataCriacao: '15/03/2025',
    dataAtualizacao: '20/04/2025',
    modulo: 'Gestão de Projetos',
    ordem: 2,
    acesso: 'Pago'
  },
  {
    id: 'vid-008',
    titulo: 'Dimensionamento de Reservatórios',
    descricao: 'Cálculo e dimensionamento de reservatórios de água para diferentes tipos de edificações.',
    categoria: 'Hidráulica',
    duracao: '35:25',
    visualizacoes: 85,
    concluidas: 45,
    arquivo: 'dimensionamento-reservatorios.mp4',
    thumbnail: 'thumb-reservatorios.jpg',
    dataCriacao: '20/03/2025',
    dataAtualizacao: '25/04/2025',
    modulo: 'Instalações Hidráulicas',
    ordem: 2,
    acesso: 'Gratuito'
  }
]

// Categorias e módulos disponíveis
const categorias = [
  'Todas',
  'Orçamentos',
  'Estrutural',
  'Gestão',
  'Hidráulica',
  'Elétrica'
]

const modulos = [
  'Todos',
  'Orçamentos de Obras',
  'Dimensionamento Estrutural',
  'Gestão de Projetos',
  'Instalações Hidráulicas'
]

const tiposAcesso = ['Todos', 'Gratuito', 'Pago']

export default function AdminVideoaulas() {
  const [busca, setBusca] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')
  const [moduloFiltro, setModuloFiltro] = useState('Todos')
  const [acessoFiltro, setAcessoFiltro] = useState('Todos')
  const [ordenacao, setOrdenacao] = useState('titulo-asc')
  const [videoaulaSelecionada, setVideoaulaSelecionada] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  
  // Filtrar videoaulas
  const videoaulasFiltradas = videoaulasData.filter(videoaula => {
    const correspondeAoBusca = videoaula.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                              videoaula.descricao.toLowerCase().includes(busca.toLowerCase())
    
    const correspondeACategoria = categoriaFiltro === 'Todas' || videoaula.categoria === categoriaFiltro
    const correspondeAoModulo = moduloFiltro === 'Todos' || videoaula.modulo === moduloFiltro
    const correspondeAoAcesso = acessoFiltro === 'Todos' || videoaula.acesso === acessoFiltro
    
    return correspondeAoBusca && correspondeACategoria && correspondeAoModulo && correspondeAoAcesso
  })
  
  // Ordenar videoaulas
  const videoaulasOrdenadas = [...videoaulasFiltradas].sort((a, b) => {
    if (ordenacao === 'titulo-asc') {
      return a.titulo.localeCompare(b.titulo)
    } else if (ordenacao === 'titulo-desc') {
      return b.titulo.localeCompare(a.titulo)
    } else if (ordenacao === 'visualizacoes-desc') {
      return b.visualizacoes - a.visualizacoes
    } else if (ordenacao === 'concluidas-desc') {
      return b.concluidas - a.concluidas
    } else if (ordenacao === 'data-desc') {
      return new Date(b.dataAtualizacao.split('/').reverse().join('-')) - 
             new Date(a.dataAtualizacao.split('/').reverse().join('-'))
    } else if (ordenacao === 'modulo-ordem') {
      // Ordenar por módulo e depois por ordem dentro do módulo
      if (a.modulo === b.modulo) {
        return a.ordem - b.ordem
      }
      return a.modulo.localeCompare(b.modulo)
    }
    return 0
  })
  
  // Abrir modal para adicionar/editar videoaula
  const abrirModal = (videoaula = null) => {
    setVideoaulaSelecionada(videoaula)
    setModalAberto(true)
  }
  
  // Fechar modal
  const fecharModal = () => {
    setVideoaulaSelecionada(null)
    setModalAberto(false)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Videoaulas</h2>
        <Button onClick={() => abrirModal()} className="mt-4 md:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Videoaula
        </Button>
      </div>
      
      {/* Filtros e busca */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar videoaulas..."
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
              <Label htmlFor="modulo" className="sr-only">Módulo</Label>
              <select
                id="modulo"
                className="w-full p-2 border rounded-md"
                value={moduloFiltro}
                onChange={(e) => setModuloFiltro(e.target.value)}
              >
                {modulos.map((modulo) => (
                  <option key={modulo} value={modulo}>
                    {modulo}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="acesso" className="sr-only">Tipo de Acesso</Label>
              <select
                id="acesso"
                className="w-full p-2 border rounded-md"
                value={acessoFiltro}
                onChange={(e) => setAcessoFiltro(e.target.value)}
              >
                {tiposAcesso.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="ordenacao" className="sr-only">Ordenar por</Label>
            <select
              id="ordenacao"
              className="w-full md:w-auto p-2 border rounded-md"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value)}
            >
              <option value="titulo-asc">Título (A-Z)</option>
              <option value="titulo-desc">Título (Z-A)</option>
              <option value="visualizacoes-desc">Mais visualizadas</option>
              <option value="concluidas-desc">Mais concluídas</option>
              <option value="data-desc">Mais recentes</option>
              <option value="modulo-ordem">Por módulo e ordem</option>
            </select>
          </div>
        </CardContent>
      </Card>
      
      {/* Lista de videoaulas */}
      <Card>
        <CardHeader>
          <CardTitle>Videoaulas ({videoaulasOrdenadas.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {videoaulasOrdenadas.map((videoaula) => (
              <Card key={videoaula.id} className="overflow-hidden">
                <div className="relative aspect-video bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                    {videoaula.duracao}
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      videoaula.acesso === 'Gratuito' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {videoaula.acesso}
                    </span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">{videoaula.titulo}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{videoaula.descricao}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>{videoaula.modulo} • Aula {videoaula.ordem}</span>
                    <span>{videoaula.visualizacoes} visualizações</span>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => abrirModal(videoaula)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-1" />
                      Visualizar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {videoaulasOrdenadas.length === 0 && (
            <div className="text-center py-8">
              <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhuma videoaula encontrada</h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar os filtros ou adicione uma nova videoaula.
              </p>
              <Button onClick={() => abrirModal()}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Videoaula
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Modal para adicionar/editar videoaula (simulado) */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {videoaulaSelecionada ? 'Editar Videoaula' : 'Adicionar Nova Videoaula'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="titulo">Título da Videoaula</Label>
                    <Input 
                      id="titulo" 
                      defaultValue={videoaulaSelecionada?.titulo || ''} 
                      placeholder="Ex: Introdução ao Orçamento de Obras"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <select
                      id="categoria"
                      className="w-full p-2 border rounded-md"
                      defaultValue={videoaulaSelecionada?.categoria || ''}
                    >
                      {categorias.filter(c => c !== 'Todas').map((categoria) => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="modulo">Módulo</Label>
                    <select
                      id="modulo"
                      className="w-full p-2 border rounded-md"
                      defaultValue={videoaulaSelecionada?.modulo || ''}
                    >
                      {modulos.filter(m => m !== 'Todos').map((modulo) => (
                        <option key={modulo} value={modulo}>
                          {modulo}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="ordem">Ordem no Módulo</Label>
                    <Input 
                      id="ordem" 
                      type="number" 
                      min="1"
                      defaultValue={videoaulaSelecionada?.ordem || '1'} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duracao">Duração (MM:SS)</Label>
                    <Input 
                      id="duracao" 
                      defaultValue={videoaulaSelecionada?.duracao || ''} 
                      placeholder="Ex: 45:30"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="acesso">Tipo de Acesso</Label>
                    <select
                      id="acesso"
                      className="w-full p-2 border rounded-md"
                      defaultValue={videoaulaSelecionada?.acesso || 'Pago'}
                    >
                      <option value="Gratuito">Gratuito</option>
                      <option value="Pago">Pago</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricao">Descrição</Label>
                  <textarea
                    id="descricao"
                    className="w-full p-2 border rounded-md min-h-[100px]"
                    defaultValue={videoaulaSelecionada?.descricao || ''}
                    placeholder="Descreva a videoaula em detalhes..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="video">Arquivo de Vídeo</Label>
                  <div className="flex">
                    <Input 
                      id="video" 
                      type="file" 
                      accept="video/*"
                      className="flex-1"
                    />
                  </div>
                  {videoaulaSelecionada?.arquivo && (
                    <p className="text-xs text-gray-500">
                      Arquivo atual: {videoaulaSelecionada.arquivo}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Thumbnail</Label>
                  <div className="flex">
                    <Input 
                      id="thumbnail" 
                      type="file" 
                      accept="image/*"
                      className="flex-1"
                    />
                  </div>
                  {videoaulaSelecionada?.thumbnail && (
                    <p className="text-xs text-gray-500">
                      Thumbnail atual: {videoaulaSelecionada.thumbnail}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Materiais Complementares</Label>
                  <div className="border rounded-md p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Adicionar materiais complementares</span>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      {videoaulaSelecionada ? (
                        <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-600" />
                            <span className="text-sm">Material de apoio.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-2">
                          Nenhum material complementar adicionado
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={fecharModal}>
                    Cancelar
                  </Button>
                  <Button>
                    {videoaulaSelecionada ? 'Salvar Alterações' : 'Adicionar Videoaula'}
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
