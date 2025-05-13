'use client'

import { useState } from 'react'

// Tipos para os emails
export type EmailTemplate = 
  | 'welcome'
  | 'order_confirmation'
  | 'payment_received'
  | 'payment_pending'
  | 'course_access'
  | 'password_reset'
  | 'account_verification'
  | 'abandoned_cart'
  | 'course_completion'
  | 'new_content'

export interface EmailData {
  to: string
  name: string
  subject?: string
  templateData?: Record<string, any>
}

// Simulação de integração com SendGrid
const sendGridIntegration = {
  sendEmail: async (data: {
    to: string
    from: string
    subject: string
    templateId: string
    dynamicTemplateData: Record<string, any>
  }) => {
    console.log('Enviando email via SendGrid:', data)
    
    // Em um ambiente real, isso seria uma chamada fetch para a API do SendGrid
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.95) {
          resolve({
            status: 'success',
            messageId: `sg-${Math.floor(Math.random() * 1000000)}`,
            response: [
              {
                statusCode: 202,
                headers: {},
                body: {}
              }
            ]
          })
        } else {
          reject({
            status: 'error',
            message: 'Falha ao enviar email',
            code: 'SEND_FAILED'
          })
        }
      }, 1000)
    })
  }
}

// Simulação de integração com Amazon SES
const sesIntegration = {
  sendEmail: async (data: {
    Destination: {
      ToAddresses: string[]
    }
    Message: {
      Subject: {
        Data: string
      }
      Body: {
        Html: {
          Data: string
        }
        Text: {
          Data: string
        }
      }
    }
    Source: string
  }) => {
    console.log('Enviando email via Amazon SES:', data)
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.95) {
          resolve({
            MessageId: `ses-${Math.floor(Math.random() * 1000000)}`
          })
        } else {
          reject({
            code: 'MessageRejected',
            message: 'Email address is not verified'
          })
        }
      }, 800)
    })
  }
}

// Mapeamento de templates para IDs do SendGrid
const templateIds: Record<EmailTemplate, string> = {
  welcome: 'd-123456789abcdef',
  order_confirmation: 'd-abcdef123456789',
  payment_received: 'd-987654321abcdef',
  payment_pending: 'd-abcdef987654321',
  course_access: 'd-123abcdef456789',
  password_reset: 'd-456789123abcdef',
  account_verification: 'd-789abcdef123456',
  abandoned_cart: 'd-abcdef456789123',
  course_completion: 'd-123456abcdef789',
  new_content: 'd-789123abcdef456'
}

// Mapeamento de templates para assuntos padrão
const defaultSubjects: Record<EmailTemplate, string> = {
  welcome: 'Bem-vindo à Engenharia Plus!',
  order_confirmation: 'Confirmação do seu pedido',
  payment_received: 'Pagamento recebido com sucesso',
  payment_pending: 'Pagamento pendente - Instruções',
  course_access: 'Acesso liberado ao seu curso',
  password_reset: 'Redefinição de senha',
  account_verification: 'Verifique sua conta',
  abandoned_cart: 'Você esqueceu algo no carrinho',
  course_completion: 'Parabéns pela conclusão do curso!',
  new_content: 'Novo conteúdo disponível para você'
}

export default function EmailService() {
  const [lastSentStatus, setLastSentStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [lastError, setLastError] = useState<string | null>(null)
  
  // Função principal para enviar emails
  const sendEmail = async (template: EmailTemplate, emailData: EmailData) => {
    setLastSentStatus('sending')
    setLastError(null)
    
    try {
      const subject = emailData.subject || defaultSubjects[template]
      const templateData = {
        name: emailData.name,
        ...emailData.templateData
      }
      
      // Usar SendGrid para envio de emails transacionais
      const result = await sendGridIntegration.sendEmail({
        to: emailData.to,
        from: 'contato@engenhariaplus.com.br',
        subject,
        templateId: templateIds[template],
        dynamicTemplateData: templateData
      })
      
      console.log('Email enviado com sucesso:', result)
      setLastSentStatus('success')
      return result
      
    } catch (error) {
      console.error('Erro ao enviar email:', error)
      setLastSentStatus('error')
      setLastError(error.message || 'Erro desconhecido ao enviar email')
      throw error
    }
  }
  
  // Função para enviar emails em massa (marketing)
  const sendBulkEmails = async (template: EmailTemplate, recipients: EmailData[]) => {
    setLastSentStatus('sending')
    setLastError(null)
    
    try {
      const results = await Promise.allSettled(
        recipients.map(recipient => 
          sendEmail(template, recipient)
        )
      )
      
      const successful = results.filter(r => r.status === 'fulfilled').length
      const failed = results.filter(r => r.status === 'rejected').length
      
      console.log(`Emails em massa enviados: ${successful} com sucesso, ${failed} falhas`)
      
      if (failed > 0) {
        setLastSentStatus('error')
        setLastError(`${failed} emails não puderam ser enviados`)
      } else {
        setLastSentStatus('success')
      }
      
      return {
        successful,
        failed,
        total: recipients.length,
        results
      }
      
    } catch (error) {
      console.error('Erro ao enviar emails em massa:', error)
      setLastSentStatus('error')
      setLastError(error.message || 'Erro desconhecido ao enviar emails em massa')
      throw error
    }
  }
  
  // Função para enviar email de boas-vindas
  const sendWelcomeEmail = async (userData: { email: string, name: string }) => {
    return sendEmail('welcome', {
      to: userData.email,
      name: userData.name,
      templateData: {
        login_url: 'https://engenhariaplus.com.br/login'
      }
    })
  }
  
  // Função para enviar confirmação de pedido
  const sendOrderConfirmationEmail = async (orderData: {
    email: string
    name: string
    orderId: string
    items: Array<{ name: string, price: number }>
    total: number
    paymentMethod: string
  }) => {
    return sendEmail('order_confirmation', {
      to: orderData.email,
      name: orderData.name,
      templateData: {
        order_id: orderData.orderId,
        order_date: new Date().toLocaleDateString('pt-BR'),
        items: orderData.items,
        total: orderData.total.toFixed(2),
        payment_method: orderData.paymentMethod,
        order_url: `https://engenhariaplus.com.br/conta/pedidos/${orderData.orderId}`
      }
    })
  }
  
  // Função para enviar confirmação de pagamento
  const sendPaymentReceivedEmail = async (paymentData: {
    email: string
    name: string
    orderId: string
    amount: number
    paymentMethod: string
    accessUrl?: string
  }) => {
    return sendEmail('payment_received', {
      to: paymentData.email,
      name: paymentData.name,
      templateData: {
        order_id: paymentData.orderId,
        payment_date: new Date().toLocaleDateString('pt-BR'),
        amount: paymentData.amount.toFixed(2),
        payment_method: paymentData.paymentMethod,
        access_url: paymentData.accessUrl || 'https://engenhariaplus.com.br/conta/cursos'
      }
    })
  }
  
  // Função para enviar instruções de pagamento pendente
  const sendPaymentPendingEmail = async (paymentData: {
    email: string
    name: string
    orderId: string
    amount: number
    paymentMethod: string
    paymentUrl?: string
    expirationDate?: string
  }) => {
    return sendEmail('payment_pending', {
      to: paymentData.email,
      name: paymentData.name,
      templateData: {
        order_id: paymentData.orderId,
        amount: paymentData.amount.toFixed(2),
        payment_method: paymentData.paymentMethod,
        payment_url: paymentData.paymentUrl,
        expiration_date: paymentData.expirationDate || 'Não especificado',
        order_url: `https://engenhariaplus.com.br/conta/pedidos/${paymentData.orderId}`
      }
    })
  }
  
  // Função para enviar notificação de acesso ao curso
  const sendCourseAccessEmail = async (courseData: {
    email: string
    name: string
    courseName: string
    courseUrl: string
  }) => {
    return sendEmail('course_access', {
      to: courseData.email,
      name: courseData.name,
      templateData: {
        course_name: courseData.courseName,
        course_url: courseData.courseUrl
      }
    })
  }
  
  // Função para enviar email de redefinição de senha
  const sendPasswordResetEmail = async (userData: {
    email: string
    name: string
    resetToken: string
  }) => {
    return sendEmail('password_reset', {
      to: userData.email,
      name: userData.name,
      templateData: {
        reset_url: `https://engenhariaplus.com.br/redefinir-senha?token=${userData.resetToken}`
      }
    })
  }
  
  // Função para enviar email de verificação de conta
  const sendAccountVerificationEmail = async (userData: {
    email: string
    name: string
    verificationToken: string
  }) => {
    return sendEmail('account_verification', {
      to: userData.email,
      name: userData.name,
      templateData: {
        verification_url: `https://engenhariaplus.com.br/verificar-conta?token=${userData.verificationToken}`
      }
    })
  }
  
  // Função para enviar lembrete de carrinho abandonado
  const sendAbandonedCartEmail = async (cartData: {
    email: string
    name: string
    items: Array<{ name: string, price: number }>
    total: number
  }) => {
    return sendEmail('abandoned_cart', {
      to: cartData.email,
      name: cartData.name,
      templateData: {
        items: cartData.items,
        total: cartData.total.toFixed(2),
        cart_url: 'https://engenhariaplus.com.br/carrinho'
      }
    })
  }
  
  // Função para enviar parabéns por conclusão de curso
  const sendCourseCompletionEmail = async (completionData: {
    email: string
    name: string
    courseName: string
    certificateUrl: string
  }) => {
    return sendEmail('course_completion', {
      to: completionData.email,
      name: completionData.name,
      templateData: {
        course_name: completionData.courseName,
        certificate_url: completionData.certificateUrl,
        courses_url: 'https://engenhariaplus.com.br/cursos'
      }
    })
  }
  
  // Função para notificar sobre novo conteúdo
  const sendNewContentEmail = async (contentData: {
    email: string
    name: string
    contentType: 'course' | 'spreadsheet'
    contentName: string
    contentUrl: string
  }) => {
    return sendEmail('new_content', {
      to: contentData.email,
      name: contentData.name,
      templateData: {
        content_type: contentData.contentType === 'course' ? 'curso' : 'planilha',
        content_name: contentData.contentName,
        content_url: contentData.contentUrl
      }
    })
  }
  
  return {
    // Status
    lastSentStatus,
    lastError,
    
    // Métodos gerais
    sendEmail,
    sendBulkEmails,
    
    // Métodos específicos
    sendWelcomeEmail,
    sendOrderConfirmationEmail,
    sendPaymentReceivedEmail,
    sendPaymentPendingEmail,
    sendCourseAccessEmail,
    sendPasswordResetEmail,
    sendAccountVerificationEmail,
    sendAbandonedCartEmail,
    sendCourseCompletionEmail,
    sendNewContentEmail
  }
}
