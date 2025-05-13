# Guia de Configuração do Domínio obrafacilbr.com.br

Este guia fornece instruções detalhadas para configurar o domínio personalizado obrafacilbr.com.br para o seu e-commerce de planilhas de engenharia.

## 1. Registro do Domínio

### Opções de Registro
Recomendamos os seguintes registradores de domínio:
- [Registro.br](https://registro.br) - Registrador oficial de domínios .br
- [Hostgator Brasil](https://www.hostgator.com.br)
- [Locaweb](https://www.locaweb.com.br)

### Processo de Registro
1. Acesse o site do registrador escolhido
2. Pesquise pela disponibilidade do domínio "obrafacilbr.com.br"
3. Siga o processo de checkout para adquirir o domínio
4. Você precisará fornecer informações de contato e documentação (CPF/CNPJ)
5. O período mínimo de registro geralmente é de 1 ano

## 2. Configuração de DNS

Após registrar o domínio, você precisará configurar os registros DNS para apontar para o servidor onde o site está hospedado.

### Registros DNS Necessários

#### Registros A (Endereço)
```
Tipo: A
Nome: @
Valor: 76.76.21.21
TTL: 3600
```

```
Tipo: A
Nome: www
Valor: 76.76.21.21
TTL: 3600
```

#### Registros CNAME (Canônico)
```
Tipo: CNAME
Nome: *
Valor: cname.vercel-dns.com.
TTL: 3600
```

### Instruções para Configuração
1. Acesse o painel de controle do seu registrador de domínio
2. Localize a seção "Gerenciar DNS" ou "Configurar DNS"
3. Adicione os registros A e CNAME conforme especificado acima
4. Salve as alterações

## 3. Verificação de Propagação DNS

A propagação DNS pode levar de 15 minutos a 48 horas para ser concluída globalmente.

### Como Verificar a Propagação
1. Use ferramentas online como [DNSChecker](https://dnschecker.org) ou [WhatsMyDNS](https://www.whatsmydns.net)
2. Digite seu domínio (obrafacilbr.com.br) e verifique se os registros A estão apontando para o IP correto
3. Você também pode usar o comando `dig` ou `nslookup` no terminal:
   ```
   dig obrafacilbr.com.br
   ```

## 4. Configuração SSL/HTTPS

O certificado SSL será configurado automaticamente pelo nosso provedor de hospedagem assim que os registros DNS estiverem propagados.

### Verificação do SSL
1. Acesse https://obrafacilbr.com.br após a propagação DNS
2. Verifique se o navegador mostra o cadeado de segurança
3. Se o SSL não for configurado automaticamente em 24 horas, entre em contato conosco

## 5. Redirecionamento do Domínio Temporário

Após a configuração do novo domínio, configuraremos um redirecionamento do domínio temporário (roqdluut.manus.space) para o novo domínio (obrafacilbr.com.br).

## 6. Solução de Problemas Comuns

### Problema: O site não carrega no novo domínio
**Solução:** Verifique se a propagação DNS foi concluída. Pode levar até 48 horas.

### Problema: Erro de certificado SSL
**Solução:** Aguarde até 24 horas após a propagação DNS para a emissão automática do certificado.

### Problema: Redirecionamento não funciona
**Solução:** Verifique se os registros CNAME estão configurados corretamente.

## 7. Suporte

Se você encontrar qualquer problema durante o processo de configuração do domínio, entre em contato conosco:

- Email: suporte@obrafacilbr.com.br
- Telefone: (XX) XXXX-XXXX

Estamos à disposição para ajudar com qualquer dúvida ou dificuldade técnica.
