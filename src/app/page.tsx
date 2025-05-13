'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, BarChart3, FileSpreadsheet, Video, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#1A365D] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Planilhas e cursos para engenharia e construção
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Otimize seus projetos com ferramentas profissionais e conhecimento especializado. Economize tempo e aumente a precisão dos seus trabalhos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-[#C9A959] hover:bg-[#b89848] text-white">
                <Link href="/produtos">
                  Ver Planilhas
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/cursos">
                  Explorar Cursos
                </Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative h-80">
            {/* Placeholder for hero image */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A365D]/50 to-transparent rounded-lg flex items-center justify-center">
              <div className="w-full h-full bg-gray-300/20 rounded-lg flex items-center justify-center">
                <FileSpreadsheet className="h-24 w-24 text-[#C9A959]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-[#F2F2F2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1A365D] mb-4">Por que escolher a ObraFácil?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos soluções completas para profissionais da construção civil e engenharia, com foco em qualidade e praticidade.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-[#1A365D]/10 rounded-full flex items-center justify-center mb-4">
                <FileSpreadsheet className="h-6 w-6 text-[#1A365D]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A365D] mb-2">Planilhas Profissionais</h3>
              <p className="text-gray-600">
                Planilhas desenvolvidas por especialistas, prontas para uso e totalmente personalizáveis para seus projetos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-[#1A365D]/10 rounded-full flex items-center justify-center mb-4">
                <Video className="h-6 w-6 text-[#1A365D]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A365D] mb-2">Videoaulas Detalhadas</h3>
              <p className="text-gray-600">
                Cursos em vídeo com explicações passo a passo e exemplos práticos para aprimorar seus conhecimentos.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-[#1A365D]/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-[#1A365D]" />
              </div>
              <h3 className="text-xl font-semibold text-[#1A365D] mb-2">Suporte Especializado</h3>
              <p className="text-gray-600">
                Equipe de engenheiros prontos para ajudar com dúvidas e orientações sobre o uso das ferramentas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-[#1A365D]">Planilhas Populares</h2>
            <Link href="/produtos" className="text-[#1A365D] hover:text-[#C9A959] flex items-center">
              Ver todas <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Product cards would be dynamically generated */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <FileSpreadsheet className="h-16 w-16 text-gray-400" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">Planilha de Orçamento Completo</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Orçamento detalhado com composições de custo, BDI e cronograma físico-financeiro.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-[#1A365D] font-bold">R$ 197,00</span>
                    <Button asChild size="sm" className="bg-[#1A365D] hover:bg-[#132744]">
                      <Link href="/produto/1">
                        Ver Detalhes
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#1A365D]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">O que dizem nossos clientes</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Centenas de profissionais já otimizaram seus projetos com nossas soluções.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg">
                <div className="flex items-center text-[#C9A959] mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "As planilhas da ObraFácil revolucionaram meu fluxo de trabalho. Economizo horas em cada projeto e consigo entregar orçamentos mais precisos."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-semibold">Ricardo Oliveira</h4>
                    <p className="text-sm text-gray-500">Engenheiro Civil</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#F2F2F2]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1A365D] mb-4">Pronto para otimizar seus projetos?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Junte-se a milhares de profissionais que já transformaram sua forma de trabalhar com nossas soluções.
          </p>
          <Button asChild size="lg" className="bg-[#C9A959] hover:bg-[#b89848] text-white">
            <Link href="/produtos">
              Começar Agora
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
