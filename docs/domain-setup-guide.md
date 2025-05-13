# Guia de Configuração de Domínio Personalizado

Este documento fornece instruções detalhadas para configurar um domínio personalizado para o e-commerce de planilhas de engenharia.

## Opções de Domínio

### 1. Registrar um Novo Domínio

Se você ainda não possui um domínio, recomendamos registrar um que reflita sua marca e seja fácil de lembrar. Algumas sugestões:

- engenhariaplus.com.br
- planilhasengenharia.com.br
- engenhariacustos.com.br
- planilhasconstrucao.com.br

### 2. Usar um Domínio Existente

Se você já possui um domínio, pode utilizá-lo para o e-commerce.

## Provedores de Registro de Domínio Recomendados

- **Registro.br**: Para domínios .br (recomendado para empresas brasileiras)
- **GoDaddy**: Ampla variedade de domínios
- **Namecheap**: Bom custo-benefício
- **Hostgator Brasil**: Suporte em português

## Passos para Configuração

### 1. Registrar o Domínio

1. Acesse o site do provedor escolhido
2. Verifique a disponibilidade do domínio desejado
3. Complete o processo de registro e pagamento
4. Aguarde a confirmação do registro (pode levar até 24 horas)

### 2. Configurar Registros DNS

Após o domínio estar ativo, você precisará configurar os registros DNS para apontar para nosso servidor:

#### Configuração para Domínio Raiz (exemplo.com.br)

Adicione os seguintes registros no painel de controle do seu provedor de domínio:

```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600 (ou Auto)
```

#### Configuração para Subdomínio www (www.exemplo.com.br)

```
Tipo: CNAME
Nome: www
Valor: cname.vercel-dns.com.
TTL: 3600 (ou Auto)
```

### 3. Verificar Propagação DNS

A propagação dos registros DNS pode levar até 48 horas, mas geralmente é mais rápida. Você pode verificar o status usando ferramentas como:

- https://www.whatsmydns.net/
- https://dnschecker.org/

### 4. Configurar SSL/HTTPS

O certificado SSL será configurado automaticamente após a propagação DNS. Isso garantirá que seu site seja acessado de forma segura via HTTPS.

### 5. Testar o Acesso

Após a propagação DNS, teste o acesso ao seu site através do novo domínio:
- https://seudominio.com.br
- https://www.seudominio.com.br

## Solução de Problemas Comuns

### O domínio não está funcionando após 48 horas

Verifique se:
- Os registros DNS foram configurados corretamente
- Não há conflitos com outros registros DNS
- O domínio está ativo e não expirado

### O site carrega, mas sem HTTPS

Aguarde mais algumas horas para a emissão do certificado SSL. Se o problema persistir, entre em contato conosco.

### Redirecionamento não funciona corretamente

Verifique se ambos os registros (A e CNAME) foram configurados corretamente.

## Suporte

Se precisar de assistência adicional com a configuração do domínio, entre em contato pelo email suporte@engenhariaplus.com.br ou pelo telefone (XX) XXXX-XXXX.
