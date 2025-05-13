'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#1A365D] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">
                Obra<span className="text-[#C9A959]">Fácil</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Soluções em planilhas e cursos para engenharia e construção civil. Otimize seus projetos com ferramentas profissionais.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[#C9A959]">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#C9A959]">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#C9A959]">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#C9A959]">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-gray-300 hover:text-[#C9A959]">
                  Planilhas
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="text-gray-300 hover:text-[#C9A959]">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-[#C9A959]">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-gray-300 hover:text-[#C9A959]">
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/produtos?categoria=orcamentos" className="text-gray-300 hover:text-[#C9A959]">
                  Orçamentos
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=estrutural" className="text-gray-300 hover:text-[#C9A959]">
                  Estrutural
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=gestao" className="text-gray-300 hover:text-[#C9A959]">
                  Gestão
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=hidraulica" className="text-gray-300 hover:text-[#C9A959]">
                  Hidráulica
                </Link>
              </li>
              <li>
                <Link href="/produtos?categoria=eletrica" className="text-gray-300 hover:text-[#C9A959]">
                  Elétrica
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-[#C9A959]" />
                <span className="text-gray-300">contato@obrafacilbr.com.br</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-[#C9A959]" />
                <span className="text-gray-300">(XX) XXXX-XXXX</span>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">Inscreva-se na nossa newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="px-4 py-2 w-full text-gray-900 rounded-l-md focus:outline-none"
                />
                <button className="bg-[#C9A959] hover:bg-[#b89848] px-4 py-2 rounded-r-md">
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; {currentYear} ObraFácil. Todos os direitos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/termos" className="text-sm text-gray-400 hover:text-[#C9A959]">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="text-sm text-gray-400 hover:text-[#C9A959]">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
