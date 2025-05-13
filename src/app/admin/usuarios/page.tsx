'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Mail,
  ShoppingBag,
  Shield,
  Ban,
  UserPlus
} from 'lucide-react'

// Dados simulados para usuários
const usuariosData = [
  {
    id: 'usr-1001',
    nome: 'João Silva',
    email: 'joao.silva@exemplo.com',
    dataCadastro: '10/01/2025',
    ultimoAcesso: '25/04/2025',
    compras: 3,
    valorTotal: 479.70,
    status: 'Ativo',
    tipo: 'Cliente'
  },
  {
    id: 'usr-1002',
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@exemplo.com',
    dataCadastro: '15/01/2025',
    ultimoAcesso: '24/04/2025',
    compras: 2,
    valorTotal: 329.80,
    status: 'Ativo',
    tipo: 'Cliente'
  },
  {
    id: 'usr-1003',
    nome: 'Carlos Santos',
    email: 'carlos.santos@exemplo.com',
    dataCadastro: '20/01/2025',
    ultimoAcesso: '23/04/2025',
    compras: 1,
    valorTotal: 129.90,
    status: 'Ativo',
    tipo: 'Cliente'
  },
  {
    id: 'usr-1004',
    nome: 'Ana Pereira',
    email: 'ana.pereira@exemplo.com',
    dataCadastro: '25/01/2025',
    ultimoAcesso: '22/04/2025',
    compras: 1,
    valorTotal: 179.90,
    status: 'Ativo',
    tipo: 'Cliente'
  },
  {
    id: 'usr-1005',
    nome: 'Roberto Almeida',
    email: 'roberto.almeida@exemplo.com',
    dataCadastro: '01/02/2025',
    ultimoAcesso: '21/04/2025',
    compras: 1,
    valorTotal: 159.90,
    status: 'Ativo',
    tipo: 'Cliente'
  },
  {
    id: 'usr-1006',
    nome: 'Fernanda Costa',
    email: 'fernanda.costa@exemplo.com',
    dataCadastro: '05/02/2025',
    ultimoAcesso: '20/04/2025',
    compras: 0,
    valorTotal: 0,
    status: 'Ativo',
    tipo: 'Cliente'
  },
  {
    id: 'usr-1007',
    nome: 'Ricardo Souza',
    email: 'ricardo.souza@exemplo.com',
    dataCadastro: '10/02/2025',
    ultimoAcesso: '19/04/2025',
    compras: 0,
    valorTotal: 0,
    status: 'Inativo',
    tipo: 'Cliente'
  },
  {
    id: 'usr-1008',
    nome: 'Juliana Martins',
    email: 'juliana.martins@exemplo.com',
    dataCadastro: '15/02/2025',
    ultimoAcesso: '18/04/2025',
    compras: 0,
    valorTotal: 0,
    status: 'Ativo',
    tipo: 'Cliente'
  },
  {
    id: 'adm-001',
    nome: 'Admin Principal',
    email: 'admin@engenhariaplus.com',
    dataCadastro: '01/01/2025',
    ultimoAcesso: '26/04/2025',
    compras: 0,
    valorTotal: 0,
    status: 'Ativo',
    tipo: 'Administrador'
  }
]

// Status e tipos disponíveis
const statusOptions = ['Todos', 'Ativo', 'Inativo']
const tiposOptions = ['Todos', 'Cliente', 'Administrador']

export default function AdminUsuarios() {
  const [busca, setBusca] = useState('')
  const [statusFiltro, setStatusFiltro] = useState('Todos')
  const [tipoFiltro, setTipoFiltro] = useState('Todos')
  const [ordenacao, setOrdenacao] = useState('nome-asc')
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
  const [modalAberto, setModalAberto] = useState(false)
  const [visualizacaoDetalhes, setVisualizacaoDetalhes] = useState(false)
  
  // Filtrar usuários
  const usuariosFiltrados = usuariosData.filter(usuario => {
    const correspondeAoBusca = usuario.nome.toLowerCase().includes(busca.toLowerCase()) || 
                              usuario.email.toLowerCase().includes(busca.toLowerCase())
    
    const correspondeAoStatus = statusFiltro === 'Todos' || usuario.status === statusFiltro
    const correspondeAoTipo = tipoFiltro === 'Todos' || usuario.tipo === tipoFiltro
    
    return correspondeAoBusca && correspondeAoStatus && correspondeAoTipo
  })
  
  // Ordenar usuários
  const usuariosOrdenados = [...usuariosFiltrados].sort((a, b) => {
    if (ordenacao === 'nome-asc') {
      return a.nome.localeCompare(b.nome)
    } else if (ordenacao === 'nome-desc') {
      return b.nome.localeCompare(a.nome)
    } else if (ordenacao === 'data-desc') {
      return new Date(b.dataCadastro.split('/').reverse().join('-')) - 
             new Date(a.dataCadastro.split('/').reverse().join('-'))
    } else if (ordenacao === 'data-asc') {
      return new Date(a.dataCadastro.split('/').reverse().join('-')) - 
             new Date(b.dataCadastro.split('/').reverse().join('-'))
    } else if (ordenacao === 'compras-desc') {
      return b.compras - a.compras
    } else if (ordenacao === 'valor-desc') {
      return b.valorTotal - a.valorTotal
    }
    return 0
  })
  
  // Abrir modal para adicionar/editar usuário
  const abrirModal = (usuario = null) => {
    setUsuarioSelecionado(usuario)
    setModalAberto(true)
    setVisualizacaoDetalhes(false)
  }
  
  // Abrir visualização de detalhes do usuário
  const abrirDetalhes = (usuario) => {
    setUsuarioSelecionado(usuario)
    setVisualizacaoDetalhes(true)
  }
  
  // Fechar modal ou visualização de detalhes
  const fechar = () => {
    setUsuarioSelecionado(null)
    setModalAberto(false)
    setVisualizacaoDetalhes(false)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gerenciamento de Usuários</h2>
        <Button onClick={() => abrirModal()} className="mt-4 md:mt-0">
          <UserPlus className="h-4 w-4 mr-2" />
          Adicionar Usuário
        </Button>
      </div>
      
      {/* Filtros e busca */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-10"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="status" className="sr-only">Status</Label>
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
            
            <div>
              <Label htmlFor="tipo" className="sr-only">Tipo</Label>
              <select
                id="tipo"
                className="w-full p-2 border rounded-md"
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
              >
                {tiposOptions.map((tipo) => (
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
              <option value="nome-asc">Nome (A-Z)</option>
              <option value="nome-desc">Nome (Z-A)</option>
              <option value="data-desc">Data de cadastro (mais recente)</option>
              <option value="data-asc">Data de cadastro (mais antigo)</option>
              <option value="compras-desc">Número de compras</option>
              <option value="valor-desc">Valor total gasto</option>
            </select>
          </div>
        </CardContent>
      </Card>
      
      {/* Lista de usuários */}
      <Card>
        <CardHeader>
          <CardTitle>Usuários ({usuariosOrdenados.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Nome</th>
                  <th className="py-3 text-left font-medium">Email</th>
                  <th className="py-3 text-left font-medium">Tipo</th>
                  <th className="py-3 text-center font-medium">Status</th>
                  <th className="py-3 text-center font-medium">Compras</th>
                  <th className="py-3 text-right font-medium">Valor Total</th>
                  <th className="py-3 text-right font-medium">Cadastro</th>
                  <th className="py-3 text-center font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuariosOrdenados.map((usuario) => (
                  <tr key={usuario.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 text-left">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="text-blue-600 font-medium">
                            {usuario.nome.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span className="font-medium">{usuario.nome}</span>
                      </div>
                    </td>
                    <td className="py-3 text-left">{usuario.email}</td>
                    <td className="py-3 text-left">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        usuario.tipo === 'Administrador' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {usuario.tipo}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        usuario.status === 'Ativo' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {usuario.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">{usuario.compras}</td>
                    <td className="py-3 text-right">
                      {usuario.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="py-3 text-right">{usuario.dataCadastro}</td>
                    <td className="py-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Visualizar Detalhes"
                          onClick={() => abrirDetalhes(usuario)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          title="Editar"
                          onClick={() => abrirModal(usuario)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Enviar Email">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {usuariosOrdenados.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum usuário encontrado</h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar os filtros ou adicione um novo usuário.
              </p>
              <Button onClick={() => abrirModal()}>
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Usuário
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Modal para adicionar/editar usuário */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>
                {usuarioSelecionado ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input 
                      id="nome" 
                      defaultValue={usuarioSelecionado?.nome || ''} 
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email"
                      defaultValue={usuarioSelecionado?.email || ''} 
                      placeholder="Ex: joao.silva@exemplo.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="senha">Senha</Label>
                    <Input 
                      id="senha" 
                      type="password"
                      placeholder={usuarioSelecionado ? "Deixe em branco para manter a atual" : "Digite a senha"}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
                    <Input 
                      id="confirmarSenha" 
                      type="password"
                      placeholder={usuarioSelecionado ? "Deixe em branco para manter a atual" : "Confirme a senha"}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo de Usuário</Label>
                    <select
                      id="tipo"
                      className="w-full p-2 border rounded-md"
                      defaultValue={usuarioSelecionado?.tipo || 'Cliente'}
                    >
                      <option value="Cliente">Cliente</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      className="w-full p-2 border rounded-md"
                      defaultValue={usuarioSelecionado?.status || 'Ativo'}
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={fechar}>
                    Cancelar
                  </Button>
                  <Button>
                    {usuarioSelecionado ? 'Salvar Alterações' : 'Adicionar Usuário'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Visualização de detalhes do usuário */}
      {visualizacaoDetalhes && usuarioSelecionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Detalhes do Usuário</CardTitle>
              <Button variant="ghost" size="icon" onClick={fechar}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Informações do usuário */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 text-3xl font-medium">
                        {usuarioSelecionado.nome.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className={`mt-2 px-3 py-1 rounded-full text-xs ${
                      usuarioSelecionado.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {usuarioSelecionado.status}
                    </span>
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold">{usuarioSelecionado.nome}</h3>
                    <p className="text-gray-500">{usuarioSelecionado.email}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Tipo de Usuário</p>
                        <p className="font-medium">{usuarioSelecionado.tipo}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Data de Cadastro</p>
                        <p className="font-medium">{usuarioSelecionado.dataCadastro}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Último Acesso</p>
                        <p className="font-medium">{usuarioSelecionado.ultimoAcesso}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total de Compras</p>
                        <p className="font-medium">{usuarioSelecionado.compras}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Abas para diferentes seções */}
                <Tabs defaultValue="compras">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="compras">Compras</TabsTrigger>
                    <TabsTrigger value="acessos">Acessos</TabsTrigger>
                    <TabsTrigger value="acoes">Ações</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="compras" className="space-y-4">
                    <h4 className="font-medium text-lg mt-4">Histórico de Compras</h4>
                    
                    {usuarioSelecionado.compras > 0 ? (
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="py-2 text-left font-medium">ID</th>
                            <th className="py-2 text-left font-medium">Produto</th>
                            <th className="py-2 text-right font-medium">Valor</th>
                            <th className="py-2 text-right font-medium">Data</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="py-2 text-left">ORD-1234</td>
                            <td className="py-2 text-left">Orçamento Completo de Obras</td>
                            <td className="py-2 text-right">R$ 149,90</td>
                            <td className="py-2 text-right">15/04/2025</td>
                          </tr>
                          {usuarioSelecionado.compras > 1 && (
                            <tr className="border-b">
                              <td className="py-2 text-left">ORD-1235</td>
                              <td className="py-2 text-left">Dimensionamento Estrutural</td>
                              <td className="py-2 text-right">R$ 199,90</td>
                              <td className="py-2 text-right">10/03/2025</td>
                            </tr>
                          )}
                          {usuarioSelecionado.compras > 2 && (
                            <tr className="border-b">
                              <td className="py-2 text-left">ORD-1236</td>
                              <td className="py-2 text-left">Cronograma Físico-Financeiro</td>
                              <td className="py-2 text-right">R$ 129,90</td>
                              <td className="py-2 text-right">05/02/2025</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-6 bg-gray-50 rounded-md">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Este usuário ainda não realizou compras.</p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="acessos" className="space-y-4">
                    <h4 className="font-medium text-lg mt-4">Histórico de Acessos</h4>
                    
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 text-left font-medium">Data</th>
                          <th className="py-2 text-left font-medium">IP</th>
                          <th className="py-2 text-left font-medium">Dispositivo</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 text-left">{usuarioSelecionado.ultimoAcesso} 14:32</td>
                          <td className="py-2 text-left">187.122.45.67</td>
                          <td className="py-2 text-left">Chrome / Windows</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-left">{usuarioSelecionado.ultimoAcesso.split('/')[0]}/
                            {parseInt(usuarioSelecionado.ultimoAcesso.split('/')[1])-1}/
                            {usuarioSelecionado.ultimoAcesso.split('/')[2]} 09:15</td>
                          <td className="py-2 text-left">187.122.45.67</td>
                          <td className="py-2 text-left">Chrome / Windows</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 text-left">{usuarioSelecionado.ultimoAcesso.split('/')[0]}/
                            {parseInt(usuarioSelecionado.ultimoAcesso.split('/')[1])-2}/
                            {usuarioSelecionado.ultimoAcesso.split('/')[2]} 18:45</td>
                          <td className="py-2 text-left">187.122.45.67</td>
                          <td className="py-2 text-left">Safari / iOS</td>
                        </tr>
                      </tbody>
                    </table>
                  </TabsContent>
                  
                  <TabsContent value="acoes" className="space-y-4">
                    <h4 className="font-medium text-lg mt-4">Ações Disponíveis</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Enviar Email
                      </Button>
                      
                      <Button variant="outline" className="justify-start">
                        <Shield className="h-4 w-4 mr-2" />
                        Redefinir Senha
                      </Button>
                      
                      <Button variant="outline" className="justify-start" onClick={() => {
                        fechar();
                        abrirModal(usuarioSelecionado);
                      }}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar Usuário
                      </Button>
                      
                      <Button variant="outline" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                        <Ban className="h-4 w-4 mr-2" />
                        {usuarioSelecionado.status === 'Ativo' ? 'Desativar Conta' : 'Ativar Conta'}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
