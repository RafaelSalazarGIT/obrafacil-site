'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  BookOpen, 
  Clock, 
  Award, 
  Star,
  Filter,
  Search,
  ChevronRight,
  CheckCircle
} from 'lucide-react'

// Dados simulados para cursos do usuário
const meusCursos = [
  {
    id: 'curso-1',
    titulo: 'Orçamento Completo de Obras',
    descricao: 'Aprenda a elaborar orçamentos precisos para qualquer tipo de obra civil.',
    instrutor: 'Eng. Carlos Silva',
    duracao: '12 horas',
    nivel: 'Intermediário',
    avaliacoes: 4.8,
    numAvaliacoes: 124,
    progresso: 25,
    ultimoAcesso: '25/04/2025',
    thumbnail: '/placeholder-curso1.jpg',
    categoria: 'Orçamentos'
  },
  {
    id: 'curso-3',
    titulo: 'Gestão de Projetos na Construção Civil',
    descricao: 'Metodologias e ferramentas para gerenciar projetos de construção com eficiência.',
    instrutor: 'Eng. Roberto Almeida',
    duracao: '10 horas',
    nivel: 'Intermediário',
    avaliacoes: 4.7,
    numAvaliacoes: 86,
    progresso: 60,
    ultimoAcesso: '24/04/2025',
    thumbnail: '/placeholder-curso3.jpg',
    categoria: 'Gestão'
  },
  {
    id: 'curso-4',
    titulo: 'Instalações Hidráulicas Residenciais',
    descricao: 'Tudo sobre dimensionamento e execução de instalações hidráulicas em residências.',
    instrutor: 'Eng. Fernanda Costa',
    duracao: '8 horas',
    nivel: 'Básico',
    avaliacoes: 4.6,
    numAvaliacoes: 72,
    progresso: 10,
    ultimoAcesso: '23/04/2025',
    thumbnail: '/placeholder-curso4.jpg',
    categoria: 'Hidráulica'
  }
]

// Dados simulados para certificados
const certificados = [
  {
    id: 'cert-1',
    titulo: 'Gestão de Projetos na Construção Civil',
    dataEmissao: '15/03/2025',
    instrutor: 'Eng. Roberto Almeida',
    cargaHoraria: '10 horas',
    codigo: 'GP-CC-2025-1234'
  }
]

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

// Componente para card de curso
const CursoCard = ({ curso }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="relative h-40 bg-gray-200">
        {/* Placeholder para imagem do curso */}
        <div className="absolute inset-0 flex items-center justify-center bg-blue-100">
          <BookOpen className="h-12 w-12 text-blue-600" />
        </div>
        
        {/* Badge de progresso */}
        <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 text-xs font-medium">
          {curso.progresso}% concluído
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold line-clamp-2">{curso.titulo}</CardTitle>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <span>{curso.instrutor}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{curso.descricao}</p>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <Clock className="h-4 w-4 mr-1" />
          <span>{curso.duracao}</span>
          <span className="mx-2">•</span>
          <span>{curso.nivel}</span>
        </div>
        <div className="flex items-center">
          <AvaliacaoEstrelas avaliacao={curso.avaliacoes} />
          <span className="text-sm text-gray-500 ml-2">
            ({curso.avaliacoes})
          </span>
        </div>
        
        {/* Barra de progresso */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progresso</span>
            <span>{curso.progresso}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${curso.progresso}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex justify-between items-center">
          <span className="text-xs text-gray-500">
            Último acesso: {curso.ultimoAcesso}
          </span>
          <Link href={`/cursos/curso/${curso.id}`}>
            <Button size="sm">
              Continuar
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

// Componente para card de certificado
const CertificadoCard = ({ certificado }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold">{certificado.titulo}</h3>
              <p className="text-sm text-gray-500">{certificado.instrutor}</p>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <span>Emitido em: {certificado.dataEmissao}</span>
                <span className="mx-2">•</span>
                <span>{certificado.cargaHoraria}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Button size="sm" variant="outline">
              Visualizar
            </Button>
            <Button size="sm" variant="outline">
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function MeusCursosPage() {
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')
  const [ordenacao, setOrdenacao] = useState('recentes')
  
  // Filtrar cursos
  const cursosFiltrados = meusCursos.filter(curso => {
    const correspondeAoBusca = curso.titulo.toLowerCase().includes(busca.toLowerCase()) || 
                              curso.descricao.toLowerCase().includes(busca.toLowerCase()) ||
                              curso.instrutor.toLowerCase().includes(busca.toLowerCase())
    
    const correspondeAoFiltro = filtro === 'todos' || 
                               (filtro === 'em-andamento' && curso.progresso > 0 && curso.progresso < 100) ||
                               (filtro === 'concluidos' && curso.progresso === 100) ||
                               (filtro === 'nao-iniciados' && curso.progresso === 0)
    
    return correspondeAoBusca && correspondeAoFiltro
  })
  
  // Ordenar cursos
  const cursosOrdenados = [...cursosFiltrados].sort((a, b) => {
    if (ordenacao === 'recentes') {
      return new Date(b.ultimoAcesso.split('/').reverse().join('-')) - 
             new Date(a.ultimoAcesso.split('/').reverse().join('-'))
    } else if (ordenacao === 'titulo-asc') {
      return a.titulo.localeCompare(b.titulo)
    } else if (ordenacao === 'progresso-desc') {
      return b.progresso - a.progresso
    } else if (ordenacao === 'progresso-asc') {
      return a.progresso - b.progresso
    }
    return 0
  })
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="cursos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cursos">Meus Cursos</TabsTrigger>
          <TabsTrigger value="certificados">Certificados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="cursos" className="space-y-6">
          {/* Filtros e busca */}
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar nos meus cursos..."
                    className="w-full p-2 pl-10 border rounded-md"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select
                    className="flex-grow p-2 border rounded-md"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                  >
                    <option value="todos">Todos os cursos</option>
                    <option value="em-andamento">Em andamento</option>
                    <option value="concluidos">Concluídos</option>
                    <option value="nao-iniciados">Não iniciados</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                    <path d="m3 16 4 4 4-4"/>
                    <path d="M7 20V4"/>
                    <path d="m21 8-4-4-4 4"/>
                    <path d="M17 4v16"/>
                  </svg>
                  <select
                    className="flex-grow p-2 border rounded-md"
                    value={ordenacao}
                    onChange={(e) => setOrdenacao(e.target.value)}
                  >
                    <option value="recentes">Acessados recentemente</option>
                    <option value="titulo-asc">Título (A-Z)</option>
                    <option value="progresso-desc">Maior progresso</option>
                    <option value="progresso-asc">Menor progresso</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Lista de cursos */}
          {cursosOrdenados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cursosOrdenados.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <BookOpen className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nenhum curso encontrado</h3>
                <p className="text-gray-500 mb-6">
                  Não encontramos cursos que correspondam aos seus critérios de busca.
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => { setBusca(''); setFiltro('todos'); }}>
                    Limpar Filtros
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Recomendações */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Recomendados para você</h2>
              <Link href="/cursos" className="text-blue-600 hover:text-blue-800 flex items-center">
                Ver todos
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/4 mb-4 md:mb-0 md:pr-6">
                    <div className="h-40 w-full rounded bg-blue-100 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-blue-600" />
                    </div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold mb-2">Cálculo Estrutural na Prática</h3>
                    <p className="text-gray-600 mb-3">
                      Domine os conceitos e aplicações práticas do cálculo estrutural em edificações.
                    </p>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span>Eng. Ana Pereira</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>16 horas</span>
                      <span className="mx-2">•</span>
                      <span>Avançado</span>
                    </div>
                    <div className="flex items-center mb-4">
                      <AvaliacaoEstrelas avaliacao={4.9} />
                      <span className="text-sm text-gray-500 ml-2">
                        (4.9) 98 avaliações
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">
                        R$ 299,90
                      </span>
                      <Button>
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="certificados" className="space-y-6">
          {certificados.length > 0 ? (
            <div className="space-y-4">
              {certificados.map((certificado) => (
                <CertificadoCard key={certificado.id} certificado={certificado} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="mx-auto h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Award className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nenhum certificado disponível</h3>
                <p className="text-gray-500 mb-6">
                  Complete um curso para receber seu certificado.
                </p>
                <div className="flex justify-center">
                  <Link href="/cursos">
                    <Button>
                      Explorar Cursos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
          
          {certificados.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Informações sobre Certificados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium">Validade</h4>
                      <p className="text-sm text-gray-600">
                        Nossos certificados não possuem data de expiração e são válidos por tempo indeterminado.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium">Autenticidade</h4>
                      <p className="text-sm text-gray-600">
                        Todos os certificados possuem código de verificação para comprovar sua autenticidade.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-medium">Formato</h4>
                      <p className="text-sm text-gray-600">
                        Os certificados estão disponíveis em formato PDF, prontos para impressão ou compartilhamento digital.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
