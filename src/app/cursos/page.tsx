'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Play, 
  Clock, 
  BarChart, 
  Award,
  Star,
  ChevronRight,
  Users,
  BookOpen,
  FileSpreadsheet
} from 'lucide-react'

// Dados simulados para cursos em destaque
const cursosDestaque = [
  {
    id: 'curso-1',
    titulo: 'Orçamento Completo de Obras',
    descricao: 'Aprenda a elaborar orçamentos precisos para qualquer tipo de obra civil.',
    instrutor: 'Eng. Carlos Silva',
    duracao: '12 horas',
    nivel: 'Intermediário',
    avaliacoes: 4.8,
    numAvaliacoes: 124,
    alunos: 1250,
    thumbnail: '/placeholder-curso1.jpg',
    preco: 249.90,
    categoria: 'Orçamentos'
  },
  {
    id: 'curso-2',
    titulo: 'Cálculo Estrutural na Prática',
    descricao: 'Domine os conceitos e aplicações práticas do cálculo estrutural em edificações.',
    instrutor: 'Eng. Ana Pereira',
    duracao: '16 horas',
    nivel: 'Avançado',
    avaliacoes: 4.9,
    numAvaliacoes: 98,
    alunos: 870,
    thumbnail: '/placeholder-curso2.jpg',
    preco: 299.90,
    categoria: 'Estrutural'
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
    alunos: 950,
    thumbnail: '/placeholder-curso3.jpg',
    preco: 199.90,
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
    alunos: 780,
    thumbnail: '/placeholder-curso4.jpg',
    preco: 179.90,
    categoria: 'Hidráulica'
  }
]

// Dados simulados para categorias
const categorias = [
  { id: 'cat-1', nome: 'Orçamentos', cursos: 12, icone: <BarChart className="h-6 w-6" /> },
  { id: 'cat-2', nome: 'Estrutural', cursos: 8, icone: <Award className="h-6 w-6" /> },
  { id: 'cat-3', nome: 'Gestão', cursos: 10, icone: <Users className="h-6 w-6" /> },
  { id: 'cat-4', nome: 'Hidráulica', cursos: 6, icone: <FileSpreadsheet className="h-6 w-6" /> },
  { id: 'cat-5', nome: 'Elétrica', cursos: 5, icone: <BookOpen className="h-6 w-6" /> }
]

// Dados simulados para cursos mais populares
const cursosMaisPopulares = [
  {
    id: 'curso-5',
    titulo: 'Cronograma Físico-Financeiro',
    descricao: 'Elaboração e controle de cronogramas para obras de qualquer porte.',
    instrutor: 'Eng. Ricardo Souza',
    duracao: '6 horas',
    nivel: 'Intermediário',
    avaliacoes: 4.7,
    numAvaliacoes: 65,
    alunos: 620,
    thumbnail: '/placeholder-curso5.jpg',
    preco: 149.90,
    categoria: 'Gestão'
  },
  {
    id: 'curso-6',
    titulo: 'Fundações e Contenções',
    descricao: 'Projetos e execução de fundações e estruturas de contenção.',
    instrutor: 'Eng. Juliana Martins',
    duracao: '14 horas',
    nivel: 'Avançado',
    avaliacoes: 4.9,
    numAvaliacoes: 78,
    alunos: 540,
    thumbnail: '/placeholder-curso6.jpg',
    preco: 279.90,
    categoria: 'Estrutural'
  },
  {
    id: 'curso-7',
    titulo: 'Instalações Elétricas Prediais',
    descricao: 'Dimensionamento e execução de instalações elétricas em edificações.',
    instrutor: 'Eng. Paulo Mendes',
    duracao: '9 horas',
    nivel: 'Intermediário',
    avaliacoes: 4.6,
    numAvaliacoes: 59,
    alunos: 480,
    thumbnail: '/placeholder-curso7.jpg',
    preco: 189.90,
    categoria: 'Elétrica'
  },
  {
    id: 'curso-8',
    titulo: 'Levantamento de Quantitativos',
    descricao: 'Técnicas precisas para levantamento de quantitativos em projetos.',
    instrutor: 'Eng. Mariana Santos',
    duracao: '7 horas',
    nivel: 'Básico',
    avaliacoes: 4.5,
    numAvaliacoes: 48,
    alunos: 390,
    thumbnail: '/placeholder-curso8.jpg',
    preco: 159.90,
    categoria: 'Orçamentos'
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
            ({curso.avaliacoes}) {curso.numAvaliacoes} avaliações
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <span className="font-bold text-lg">
          {curso.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </span>
        <Button size="sm">
          Ver Curso
        </Button>
      </CardFooter>
    </Card>
  )
}

// Componente para card de categoria
const CategoriaCard = ({ categoria }) => {
  return (
    <Link href={`/cursos/categoria/${categoria.id}`}>
      <Card className="hover:shadow-md transition-shadow h-full">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            {categoria.icone}
          </div>
          <h3 className="font-bold mb-1">{categoria.nome}</h3>
          <p className="text-sm text-gray-500">{categoria.cursos} cursos</p>
        </CardContent>
      </Card>
    </Link>
  )
}

export default function CursosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  
  return (
    <div className="space-y-8">
      {/* Banner principal */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Aprimore suas habilidades em engenharia e construção
          </h1>
          <p className="text-lg mb-6">
            Cursos e planilhas desenvolvidos por especialistas para otimizar seus projetos e aumentar sua produtividade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-white text-blue-700 hover:bg-gray-100">
              Explorar Cursos
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-blue-700">
              Ver Planilhas
            </Button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10">
          <svg width="300" height="300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" stroke="currentColor" strokeWidth="2" />
            <path d="M8 7h8m-8 5h6m-6 5h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      
      {/* Categorias */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Categorias</h2>
          <Link href="/cursos/categorias" className="text-blue-600 hover:text-blue-800 flex items-center">
            Ver todas
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categorias.map((categoria) => (
            <CategoriaCard key={categoria.id} categoria={categoria} />
          ))}
        </div>
      </section>
      
      {/* Cursos em destaque */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Cursos em Destaque</h2>
          <Link href="/cursos/destaque" className="text-blue-600 hover:text-blue-800 flex items-center">
            Ver todos
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cursosDestaque.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      </section>
      
      {/* Banner intermediário */}
      <div className="bg-gray-100 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-2">Pacote Completo de Engenharia</h2>
            <p className="text-gray-700 mb-4">
              Acesso a todos os cursos e planilhas por um preço especial. Economize mais de 60% comparado à compra individual.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-blue-600">
                R$ 799,90
              </span>
              <span className="text-lg text-gray-500 line-through">
                R$ 1.999,90
              </span>
            </div>
            <Button className="mt-4">
              Saiba Mais
            </Button>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="h-40 w-40 rounded-full bg-blue-100 flex items-center justify-center">
              <Award className="h-20 w-20 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Cursos mais populares */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Mais Populares</h2>
          <Link href="/cursos/populares" className="text-blue-600 hover:text-blue-800 flex items-center">
            Ver todos
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cursosMaisPopulares.map((curso) => (
            <CursoCard key={curso.id} curso={curso} />
          ))}
        </div>
      </section>
      
      {/* Depoimentos */}
      <section className="bg-gray-50 rounded-xl p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">O que dizem nossos alunos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <AvaliacaoEstrelas avaliacao={5} />
              </div>
              <p className="italic mb-4">
                "Os cursos são extremamente práticos e me ajudaram a otimizar meus projetos. O material é de excelente qualidade e os instrutores são muito didáticos."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">M</span>
                </div>
                <div>
                  <p className="font-medium">Marcos Oliveira</p>
                  <p className="text-sm text-gray-500">Engenheiro Civil</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <AvaliacaoEstrelas avaliacao={5} />
              </div>
              <p className="italic mb-4">
                "As planilhas são muito bem estruturadas e economizam um tempo precioso. Já implementei em minha empresa e os resultados foram excelentes."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">C</span>
                </div>
                <div>
                  <p className="font-medium">Carla Mendes</p>
                  <p className="text-sm text-gray-500">Arquiteta</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <AvaliacaoEstrelas avaliacao={5} />
              </div>
              <p className="italic mb-4">
                "Investimento que valeu cada centavo. O conhecimento adquirido me permitiu aumentar minha produtividade e a qualidade dos meus projetos."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">R</span>
                </div>
                <div>
                  <p className="font-medium">Rafael Santos</p>
                  <p className="text-sm text-gray-500">Engenheiro de Produção</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA final */}
      <section className="bg-blue-600 text-white rounded-xl p-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Pronto para elevar seus conhecimentos em engenharia?
        </h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Junte-se a milhares de profissionais que já transformaram sua carreira com nossos cursos e planilhas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-blue-700 hover:bg-gray-100">
            Começar Agora
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-blue-700">
            Ver Planos
          </Button>
        </div>
      </section>
    </div>
  )
}
