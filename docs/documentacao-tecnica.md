# Documentação Técnica - Obra Fácil

## Sumário

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Arquitetura](#arquitetura)
3. [Tecnologias Utilizadas](#tecnologias-utilizadas)
4. [Estrutura de Diretórios](#estrutura-de-diretórios)
5. [Componentes Principais](#componentes-principais)
6. [Fluxos de Dados](#fluxos-de-dados)
7. [APIs e Integrações](#apis-e-integrações)
8. [Banco de Dados](#banco-de-dados)
9. [Segurança](#segurança)
10. [Implantação](#implantação)
11. [Manutenção](#manutenção)

## Visão Geral do Sistema

O Obra Fácil é uma plataforma completa de e-commerce e ensino online especializada em planilhas e cursos de engenharia e construção civil. O sistema consiste em:

1. **E-commerce de Planilhas**: Loja virtual para venda de planilhas de engenharia
2. **Plataforma de Videoaulas**: Sistema para disponibilização de cursos em vídeo
3. **Painel Administrativo**: Interface para gerenciamento completo do sistema
4. **Sistema de Pagamentos**: Integração com gateways de pagamento
5. **Sistema de Notificações**: Emails automáticos e notificações in-app

## Arquitetura

O sistema foi desenvolvido seguindo uma arquitetura moderna de aplicação web:

- **Frontend**: Aplicação Next.js com React
- **Backend**: API Routes do Next.js
- **Banco de Dados**: Cloudflare D1 (SQLite compatível)
- **Armazenamento**: Cloudflare R2 para arquivos e vídeos
- **Implantação**: Cloudflare Pages

A arquitetura segue o padrão JAMstack (JavaScript, APIs, Markup) com renderização híbrida:
- Server-Side Rendering (SSR) para páginas dinâmicas
- Static Site Generation (SSG) para páginas estáticas
- Client-Side Rendering para componentes interativos

## Tecnologias Utilizadas

### Frontend
- **Next.js 14**: Framework React para renderização híbrida
- **React 18**: Biblioteca para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Shadcn/UI**: Biblioteca de componentes
- **Lucide Icons**: Biblioteca de ícones
- **Recharts**: Biblioteca para visualização de dados

### Backend
- **Next.js API Routes**: Endpoints de API serverless
- **Cloudflare Workers**: Funções serverless para processamento
- **D1 Database**: Banco de dados SQL distribuído da Cloudflare
- **Wrangler**: CLI para desenvolvimento e implantação

### Integrações
- **MercadoPago**: Gateway de pagamento
- **PagSeguro**: Gateway de pagamento alternativo
- **SendGrid**: Serviço de envio de emails
- **Amazon S3/R2**: Armazenamento de arquivos

## Estrutura de Diretórios

```
engenharia-ecommerce/
├── migrations/           # Migrações do banco de dados
├── public/               # Arquivos estáticos
├── src/
│   ├── app/              # Páginas da aplicação (Next.js App Router)
│   │   ├── admin/        # Páginas do painel administrativo
│   │   ├── api/          # Rotas de API
│   │   ├── carrinho/     # Página do carrinho
│   │   ├── checkout/     # Página de checkout
│   │   ├── conta/        # Área do usuário
│   │   ├── cursos/       # Plataforma de videoaulas
│   │   ├── login/        # Autenticação
│   │   ├── produto/      # Página de produto individual
│   │   ├── produtos/     # Catálogo de produtos
│   │   ├── layout.tsx    # Layout principal
│   │   └── page.tsx      # Página inicial
│   ├── components/       # Componentes reutilizáveis
│   │   ├── analytics/    # Componentes de análise
│   │   ├── auth/         # Componentes de autenticação
│   │   ├── cart/         # Componentes do carrinho
│   │   ├── email/        # Serviços de email
│   │   ├── layout/       # Componentes de layout
│   │   ├── notification/ # Sistema de notificações
│   │   ├── payment/      # Serviços de pagamento
│   │   └── ui/           # Componentes de interface
│   ├── hooks/            # Hooks personalizados
│   └── lib/              # Utilitários e funções auxiliares
├── tests/                # Testes automatizados
├── docs/                 # Documentação
├── wrangler.toml         # Configuração do Cloudflare Workers
└── package.json          # Dependências e scripts
```

## Componentes Principais

### Sistema de Autenticação

O sistema de autenticação é implementado usando:
- JWT (JSON Web Tokens) para sessões
- Bcrypt para hash de senhas
- Estratégia de refresh token para manter sessões

Arquivos principais:
- `src/components/auth/AuthContext.tsx`: Contexto de autenticação
- `src/app/api/auth/[...nextauth].ts`: Rotas de API para autenticação

### Carrinho de Compras

O carrinho utiliza:
- Context API do React para estado global
- LocalStorage para persistência
- Sincronização com banco de dados para usuários logados

Arquivos principais:
- `src/components/cart/CartContext.tsx`: Contexto do carrinho
- `src/app/carrinho/page.tsx`: Interface do carrinho

### Sistema de Pagamento

Integração com gateways de pagamento:
- API do MercadoPago para cartão de crédito e PIX
- API do PagSeguro para boleto bancário
- Webhooks para confirmação assíncrona

Arquivos principais:
- `src/components/payment/PaymentService.ts`: Serviço de pagamento
- `src/app/api/webhook/payment/route.ts`: Endpoint para webhooks

### Plataforma de Videoaulas

Sistema de reprodução e gerenciamento de vídeos:
- Player de vídeo personalizado
- Sistema de progresso de aulas
- Controle de acesso baseado em compras

Arquivos principais:
- `src/app/cursos/curso/[id]/page.tsx`: Página do curso
- `src/components/course/VideoPlayer.tsx`: Player de vídeo

### Painel Administrativo

Interface administrativa completa:
- Dashboard com métricas
- CRUD para produtos e cursos
- Gerenciamento de usuários
- Relatórios e análises

Arquivos principais:
- `src/app/admin/page.tsx`: Dashboard administrativo
- `src/app/admin/produtos/page.tsx`: Gerenciamento de produtos

## Fluxos de Dados

### Fluxo de Compra

1. Usuário adiciona produto ao carrinho
2. Usuário acessa o carrinho e prossegue para checkout
3. Sistema verifica se usuário está autenticado
   - Se não, redireciona para login/registro
4. Usuário preenche dados de pagamento
5. Sistema processa pagamento via gateway
6. Após confirmação, sistema:
   - Registra compra no banco de dados
   - Envia email de confirmação
   - Libera acesso ao produto/curso
   - Redireciona para página de sucesso

### Fluxo de Autenticação

1. Usuário acessa página de login/registro
2. Após submissão do formulário:
   - Sistema valida dados
   - Cria/verifica credenciais
   - Gera tokens JWT
3. Usuário é redirecionado para página anterior ou dashboard
4. Token é verificado em cada requisição autenticada
5. Refresh token é usado para manter sessão ativa

## APIs e Integrações

### API Interna

O sistema utiliza API Routes do Next.js para endpoints internos:

- `/api/auth/*`: Autenticação e gerenciamento de usuários
- `/api/products/*`: CRUD de produtos
- `/api/courses/*`: CRUD de cursos
- `/api/orders/*`: Gerenciamento de pedidos
- `/api/payments/*`: Processamento de pagamentos
- `/api/analytics/*`: Dados para relatórios

### Integrações Externas

- **MercadoPago API**: Processamento de pagamentos
  - Endpoints: Criação de preferência, verificação de status
  - Webhooks: Confirmação de pagamento

- **PagSeguro API**: Processamento de pagamentos alternativos
  - Endpoints: Geração de boleto, verificação de status
  - Webhooks: Confirmação de pagamento

- **SendGrid API**: Envio de emails
  - Templates: Confirmação, boas-vindas, recuperação de senha

- **Amazon S3/R2 API**: Armazenamento de arquivos
  - Uploads: Produtos, materiais de curso, vídeos
  - Downloads: Acesso a arquivos comprados

## Banco de Dados

O sistema utiliza Cloudflare D1, um banco de dados SQL distribuído:

### Principais Tabelas

- **users**: Informações de usuários
- **products**: Catálogo de produtos
- **courses**: Cursos disponíveis
- **lessons**: Aulas de cada curso
- **orders**: Pedidos realizados
- **order_items**: Itens de cada pedido
- **payments**: Informações de pagamento
- **user_products**: Relação entre usuários e produtos comprados
- **user_courses**: Relação entre usuários e cursos matriculados
- **course_progress**: Progresso do usuário em cada curso

### Migrações

As migrações são gerenciadas via Wrangler CLI:
- `migrations/0001_initial.sql`: Esquema inicial
- `migrations/0002_add_courses.sql`: Adição de tabelas de cursos

## Segurança

### Autenticação e Autorização

- Senhas armazenadas com hash bcrypt
- JWT com expiração curta (1 hora)
- Refresh tokens com expiração longa (7 dias)
- RBAC (Role-Based Access Control) para permissões

### Proteção de Dados

- HTTPS para todas as comunicações
- Sanitização de inputs para prevenir SQL Injection
- Validação de dados em frontend e backend
- Proteção contra CSRF com tokens
- Rate limiting para APIs sensíveis

### Conformidade

- Cookies com flags Secure e HttpOnly
- Política de privacidade LGPD-compliant
- Termos de uso claros sobre processamento de dados

## Implantação

### Ambiente de Produção

O sistema está implantado na infraestrutura da Cloudflare:
- **Cloudflare Pages**: Hospedagem do frontend
- **Cloudflare Workers**: Funções serverless
- **Cloudflare D1**: Banco de dados
- **Cloudflare R2**: Armazenamento de arquivos

### Processo de Implantação

1. Build do Next.js (`next build`)
2. Implantação via Wrangler CLI (`wrangler pages deploy`)
3. Aplicação de migrações de banco de dados
4. Verificação de integridade pós-implantação

### Domínio e DNS

- Domínio principal: obrafacilbr.com.br
- Certificado SSL: gerenciado automaticamente pela Cloudflare
- Redirecionamentos: www para apex domain

## Manutenção

### Monitoramento

- Logs de erro armazenados no Cloudflare
- Monitoramento de performance via Cloudflare Analytics
- Alertas para erros críticos

### Backup

- Backup diário do banco de dados
- Backup semanal completo (banco de dados + arquivos)
- Retenção de backups por 30 dias

### Atualizações

- Atualizações de segurança: imediatas
- Atualizações de funcionalidades: programadas
- Janela de manutenção: domingos, 02:00-04:00 (horário de Brasília)

---

Esta documentação técnica fornece uma visão geral da arquitetura e implementação do sistema Obra Fácil. Para questões técnicas específicas, entre em contato com a equipe de desenvolvimento.

**Obra Fácil** - Documentação Técnica v1.0
