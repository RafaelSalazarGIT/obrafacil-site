'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings, 
  Save, 
  Globe, 
  Mail,
  CreditCard,
  Bell,
  Shield,
  Database,
  FileText,
  Upload,
  Download
} from 'lucide-react'

export default function AdminConfiguracoes() {
  const [tabAtiva, setTabAtiva] = useState('geral')
  const [salvando, setSalvando] = useState(false)
  
  // Função simulada para salvar configurações
  const salvarConfiguracoes = () => {
    setSalvando(true)
    setTimeout(() => {
      setSalvando(false)
    }, 1500)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Configurações do Sistema</h2>
      </div>
      
      <Tabs defaultValue="geral" onValueChange={setTabAtiva} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="geral">Geral</TabsTrigger>
          <TabsTrigger value="pagamentos">Pagamentos</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
          <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        
        {/* Configurações Gerais */}
        <TabsContent value="geral" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Site</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nome-site">Nome do Site</Label>
                  <Input 
                    id="nome-site" 
                    defaultValue="Obra Fácil" 
                    placeholder="Nome do seu site"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="descricao-site">Descrição</Label>
                  <Input 
                    id="descricao-site" 
                    defaultValue="Planilhas e cursos para engenharia e construção" 
                    placeholder="Breve descrição do seu site"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email-contato">Email de Contato</Label>
                  <Input 
                    id="email-contato" 
                    type="email"
                    defaultValue="contato@obrafacil.com.br" 
                    placeholder="Email principal de contato"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telefone-contato">Telefone de Contato</Label>
                  <Input 
                    id="telefone-contato" 
                    defaultValue="(11) 98765-4321" 
                    placeholder="Telefone de contato"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input 
                  id="endereco" 
                  defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100" 
                  placeholder="Endereço completo"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="logo">Logo do Site</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 bg-blue-100 rounded-md flex items-center justify-center">
                    <span className="text-blue-600 font-bold">OF</span>
                  </div>
                  <Input 
                    id="logo" 
                    type="file" 
                    accept="image/*"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Configurações de SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-titulo">Meta Título</Label>
                <Input 
                  id="meta-titulo" 
                  defaultValue="Obra Fácil | Planilhas e Cursos para Engenharia e Construção" 
                  placeholder="Título para SEO"
                />
                <p className="text-xs text-gray-500">
                  Recomendado: até 60 caracteres
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="meta-descricao">Meta Descrição</Label>
                <textarea
                  id="meta-descricao"
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  defaultValue="Encontre as melhores planilhas e cursos para engenharia e construção. Orçamentos, cálculos estruturais, cronogramas e muito mais para otimizar seus projetos."
                  placeholder="Descrição para SEO"
                />
                <p className="text-xs text-gray-500">
                  Recomendado: até 160 caracteres
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="palavras-chave">Palavras-chave</Label>
                <Input 
                  id="palavras-chave" 
                  defaultValue="planilhas engenharia, cursos construção, orçamentos obras, cálculos estruturais" 
                  placeholder="Palavras-chave separadas por vírgula"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    defaultValue="https://facebook.com/obrafacil" 
                    placeholder="URL do Facebook"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    defaultValue="https://instagram.com/obrafacil" 
                    placeholder="URL do Instagram"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input 
                    id="linkedin" 
                    defaultValue="https://linkedin.com/company/obrafacil" 
                    placeholder="URL do LinkedIn"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube</Label>
                  <Input 
                    id="youtube" 
                    defaultValue="https://youtube.com/c/obrafacil" 
                    placeholder="URL do YouTube"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Pagamentos */}
        <TabsContent value="pagamentos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium">Cartão de Crédito</h3>
                      <p className="text-sm text-gray-500">Aceite pagamentos com cartão de crédito</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="cartao-credito" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked 
                    />
                    <Label htmlFor="cartao-credito">Ativo</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="M2 17l10 5 10-5"/>
                      <path d="M2 12l10 5 10-5"/>
                    </svg>
                    <div>
                      <h3 className="font-medium">Pix</h3>
                      <p className="text-sm text-gray-500">Aceite pagamentos instantâneos via Pix</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="pix" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked 
                    />
                    <Label htmlFor="pix">Ativo</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                      <rect width="20" height="12" x="2" y="6" rx="2"/>
                      <path d="M22 10H2"/>
                    </svg>
                    <div>
                      <h3 className="font-medium">Boleto Bancário</h3>
                      <p className="text-sm text-gray-500">Aceite pagamentos via boleto bancário</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="boleto" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked 
                    />
                    <Label htmlFor="boleto">Ativo</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Integração com Gateway de Pagamento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gateway">Gateway de Pagamento</Label>
                <select
                  id="gateway"
                  className="w-full p-2 border rounded-md"
                  defaultValue="mercadopago"
                >
                  <option value="mercadopago">Mercado Pago</option>
                  <option value="pagseguro">PagSeguro</option>
                  <option value="paypal">PayPal</option>
                  <option value="stripe">Stripe</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-key">Chave de API</Label>
                <Input 
                  id="api-key" 
                  type="password"
                  defaultValue="TEST_API_KEY_123456789" 
                  placeholder="Sua chave de API"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="api-secret">Chave Secreta</Label>
                <Input 
                  id="api-secret" 
                  type="password"
                  defaultValue="TEST_API_SECRET_987654321" 
                  placeholder="Sua chave secreta"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ambiente">Ambiente</Label>
                <select
                  id="ambiente"
                  className="w-full p-2 border rounded-md"
                  defaultValue="teste"
                >
                  <option value="teste">Teste (Sandbox)</option>
                  <option value="producao">Produção</option>
                </select>
                <p className="text-xs text-gray-500">
                  Use o ambiente de teste para verificar a integração antes de ir para produção.
                </p>
              </div>
              
              <div className="pt-2">
                <Button variant="outline">
                  Testar Conexão
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Emails */}
        <TabsContent value="emails" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de SMTP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">Servidor SMTP</Label>
                  <Input 
                    id="smtp-host" 
                    defaultValue="smtp.gmail.com" 
                    placeholder="Ex: smtp.gmail.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-porta">Porta</Label>
                  <Input 
                    id="smtp-porta" 
                    defaultValue="587" 
                    placeholder="Ex: 587"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-usuario">Usuário</Label>
                  <Input 
                    id="smtp-usuario" 
                    defaultValue="contato@obrafacil.com.br" 
                    placeholder="Seu email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="smtp-senha">Senha</Label>
                  <Input 
                    id="smtp-senha" 
                    type="password"
                    defaultValue="senha_segura_123" 
                    placeholder="Sua senha"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-seguranca">Segurança</Label>
                <select
                  id="smtp-seguranca"
                  className="w-full p-2 border rounded-md"
                  defaultValue="tls"
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="nenhuma">Nenhuma</option>
                </select>
              </div>
              
              <div className="pt-2">
                <Button variant="outline">
                  Testar Conexão
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Modelos de Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modelo-boas-vindas">Email de Boas-vindas</Label>
                <textarea
                  id="modelo-boas-vindas"
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  defaultValue="Olá {nome},\n\nSeja bem-vindo(a) à Obra Fácil! Estamos felizes em tê-lo(a) conosco.\n\nAcesse sua conta para explorar nossas planilhas e cursos.\n\nAtenciosamente,\nEquipe Obra Fácil"
                  placeholder="Modelo de email de boas-vindas"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="modelo-recuperacao">Email de Recuperação de Senha</Label>
                <textarea
                  id="modelo-recuperacao"
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  defaultValue="Olá {nome},\n\nVocê solicitou a recuperação de senha. Clique no link abaixo para criar uma nova senha:\n\n{link_recuperacao}\n\nSe você não solicitou esta alteração, ignore este email.\n\nAtenciosamente,\nEquipe Obra Fácil"
                  placeholder="Modelo de email de recuperação de senha"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="modelo-compra">Email de Confirmação de Compra</Label>
                <textarea
                  id="modelo-compra"
                  className="w-full p-2 border rounded-md min-h-[100px]"
                  defaultValue="Olá {nome},\n\nSua compra foi realizada com sucesso!\n\nDetalhes do pedido:\nProduto: {produto}\nValor: {valor}\nData: {data}\n\nVocê pode acessar seu produto na sua área de cliente.\n\nAtenciosamente,\nEquipe Obra Fácil"
                  placeholder="Modelo de email de confirmação de compra"
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notificar-admin-compra">Notificar Administrador sobre Novas Compras</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="notificar-admin-compra" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked
                    />
                    <span>Ativar</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notificar-admin-cadastro">Notificar Administrador sobre Novos Cadastros</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="notificar-admin-cadastro" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked
                    />
                    <span>Ativar</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notificar-usuario-novidades">Notificar Usuários sobre Novidades</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="notificar-usuario-novidades" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked
                    />
                    <span>Ativar</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Segurança */}
        <TabsContent value="seguranca" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autenticacao-dois-fatores">Autenticação de Dois Fatores</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="autenticacao-dois-fatores" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked
                    />
                    <span>Ativar</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Exigir autenticação de dois fatores para contas administrativas
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tentativas-login">Tentativas de Login</Label>
                <Input 
                  id="tentativas-login" 
                  type="number"
                  defaultValue="5" 
                  placeholder="Número de tentativas"
                />
                <p className="text-sm text-gray-500">
                  Número máximo de tentativas de login antes de bloquear temporariamente
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tempo-bloqueio">Tempo de Bloqueio (minutos)</Label>
                <Input 
                  id="tempo-bloqueio" 
                  type="number"
                  defaultValue="30" 
                  placeholder="Tempo em minutos"
                />
                <p className="text-sm text-gray-500">
                  Tempo de bloqueio após exceder o número máximo de tentativas de login
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Política de Senhas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="tamanho-minimo">Tamanho Mínimo</Label>
                <Input 
                  id="tamanho-minimo" 
                  type="number"
                  defaultValue="8" 
                  placeholder="Número de caracteres"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="exigir-maiusculas">Exigir Letras Maiúsculas</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="exigir-maiusculas" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked
                    />
                    <span>Ativar</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="exigir-numeros">Exigir Números</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="exigir-numeros" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked
                    />
                    <span>Ativar</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="exigir-especiais">Exigir Caracteres Especiais</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="exigir-especiais" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked
                    />
                    <span>Ativar</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="validade-senha">Validade da Senha (dias)</Label>
                <Input 
                  id="validade-senha" 
                  type="number"
                  defaultValue="90" 
                  placeholder="Dias"
                />
                <p className="text-sm text-gray-500">
                  Número de dias antes de solicitar a troca de senha (0 = sem validade)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Configurações de Backup */}
        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="backup-automatico">Backup Automático</Label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="backup-automatico" 
                      className="h-4 w-4 mr-2" 
                      defaultChecked
                    />
                    <span>Ativar</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  Realizar backups automáticos do sistema
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="frequencia-backup">Frequência</Label>
                <select
                  id="frequencia-backup"
                  className="w-full p-2 border rounded-md"
                  defaultValue="diario"
                >
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hora-backup">Hora do Backup</Label>
                <Input 
                  id="hora-backup" 
                  type="time"
                  defaultValue="03:00" 
                />
                <p className="text-sm text-gray-500">
                  Horário para realizar o backup automático
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="retencao-backup">Retenção (dias)</Label>
                <Input 
                  id="retencao-backup" 
                  type="number"
                  defaultValue="30" 
                  placeholder="Dias"
                />
                <p className="text-sm text-gray-500">
                  Número de dias para manter os backups antes de excluí-los
                </p>
              </div>
              
              <div className="pt-4 space-y-4">
                <Button className="w-full md:w-auto">
                  <Database className="h-4 w-4 mr-2" />
                  Realizar Backup Agora
                </Button>
                
                <div className="border rounded-md p-4">
                  <h3 className="font-medium mb-2">Backups Recentes</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>backup_26-04-2025_03-00.zip</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>backup_25-04-2025_03-00.zip</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>backup_24-04-2025_03-00.zip</span>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Restauração</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="arquivo-restauracao">Arquivo de Backup</Label>
                <Input 
                  id="arquivo-restauracao" 
                  type="file" 
                  accept=".zip,.sql"
                />
                <p className="text-sm text-gray-500">
                  Selecione um arquivo de backup para restaurar o sistema
                </p>
              </div>
              
              <div className="pt-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Restaurar Backup
                </Button>
              </div>
              
              <div className="pt-2">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <h3 className="font-medium text-yellow-800 mb-2">Atenção</h3>
                  <p className="text-sm text-yellow-700">
                    A restauração de backup substituirá todos os dados atuais do sistema. 
                    Certifique-se de realizar um backup antes de prosseguir.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Botão de salvar */}
      <div className="flex justify-end">
        <Button onClick={salvarConfiguracoes} disabled={salvando}>
          {salvando ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Salvando...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
