'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EmailService from '@/components/email/EmailService'
import { useAuth } from '@/components/auth/AuthContext'

// Tipos para as notificações
export type NotificationType = 
  | 'payment_success'
  | 'payment_pending'
  | 'order_shipped'
  | 'course_access'
  | 'new_content'
  | 'price_drop'
  | 'system'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  link?: string
  read: boolean
  createdAt: Date
}

export default function NotificationService() {
  const router = useRouter()
  const { user } = useAuth()
  const emailService = EmailService()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  
  // Carregar notificações do usuário
  useEffect(() => {
    if (user?.id) {
      // Em um ambiente real, isso seria uma chamada à API
      // Simulação de notificações para demonstração
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'payment_success',
          title: 'Pagamento confirmado',
          message: 'Seu pagamento para o curso "Orçamento Completo de Obras" foi confirmado.',
          link: '/cursos/curso/curso-1',
          read: false,
          createdAt: new Date(Date.now() - 3600000) // 1 hora atrás
        },
        {
          id: '2',
          type: 'new_content',
          title: 'Novo conteúdo disponível',
          message: 'Uma nova aula foi adicionada ao curso "Gestão de Projetos na Construção Civil".',
          link: '/cursos/curso/curso-3',
          read: true,
          createdAt: new Date(Date.now() - 86400000) // 1 dia atrás
        },
        {
          id: '3',
          type: 'system',
          title: 'Manutenção programada',
          message: 'O sistema estará indisponível para manutenção no dia 30/04/2025 das 02:00 às 04:00.',
          read: false,
          createdAt: new Date(Date.now() - 172800000) // 2 dias atrás
        }
      ]
      
      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter(n => !n.read).length)
    }
  }, [user?.id])
  
  // Marcar notificação como lida
  const markAsRead = async (notificationId: string) => {
    // Em um ambiente real, isso seria uma chamada à API
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true } 
          : notification
      )
    )
    
    // Atualizar contador de não lidas
    setUnreadCount(prev => Math.max(0, prev - 1))
  }
  
  // Marcar todas as notificações como lidas
  const markAllAsRead = async () => {
    // Em um ambiente real, isso seria uma chamada à API
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
    
    // Zerar contador de não lidas
    setUnreadCount(0)
  }
  
  // Excluir notificação
  const deleteNotification = async (notificationId: string) => {
    // Em um ambiente real, isso seria uma chamada à API
    const notificationToDelete = notifications.find(n => n.id === notificationId)
    
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    )
    
    // Atualizar contador de não lidas se necessário
    if (notificationToDelete && !notificationToDelete.read) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
  }
  
  // Criar nova notificação
  const createNotification = async (
    type: NotificationType,
    title: string,
    message: string,
    link?: string,
    sendEmail: boolean = false
  ) => {
    if (!user?.id) return null
    
    // Criar nova notificação
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      type,
      title,
      message,
      link,
      read: false,
      createdAt: new Date()
    }
    
    // Em um ambiente real, isso seria uma chamada à API
    setNotifications(prev => [newNotification, ...prev])
    setUnreadCount(prev => prev + 1)
    
    // Enviar email se solicitado
    if (sendEmail && user.email) {
      try {
        // Mapear tipo de notificação para template de email
        let emailTemplate: any
        let emailData: any = {
          email: user.email,
          name: user.name || 'Cliente'
        }
        
        switch (type) {
          case 'payment_success':
            emailTemplate = 'payment_received'
            emailData = {
              ...emailData,
              orderId: 'ORD-' + Date.now(),
              amount: 249.90,
              paymentMethod: 'Cartão de Crédito',
              accessUrl: link
            }
            break
            
          case 'payment_pending':
            emailTemplate = 'payment_pending'
            emailData = {
              ...emailData,
              orderId: 'ORD-' + Date.now(),
              amount: 249.90,
              paymentMethod: 'Boleto',
              paymentUrl: link,
              expirationDate: new Date(Date.now() + 259200000).toLocaleDateString('pt-BR') // 3 dias
            }
            break
            
          case 'course_access':
            emailTemplate = 'course_access'
            emailData = {
              ...emailData,
              courseName: title.replace('Acesso liberado: ', ''),
              courseUrl: link || 'https://engenhariaplus.com.br/cursos'
            }
            break
            
          case 'new_content':
            emailTemplate = 'new_content'
            emailData = {
              ...emailData,
              contentType: 'course',
              contentName: title.replace('Novo conteúdo: ', ''),
              contentUrl: link || 'https://engenhariaplus.com.br/cursos'
            }
            break
            
          default:
            // Para outros tipos, usar template genérico
            emailTemplate = 'welcome' // Usando welcome como template genérico
            emailData = {
              ...emailData,
              templateData: {
                notification_title: title,
                notification_message: message,
                notification_link: link
              }
            }
        }
        
        // Enviar email correspondente
        if (emailTemplate === 'payment_received') {
          await emailService.sendPaymentReceivedEmail(emailData)
        } else if (emailTemplate === 'payment_pending') {
          await emailService.sendPaymentPendingEmail(emailData)
        } else if (emailTemplate === 'course_access') {
          await emailService.sendCourseAccessEmail(emailData)
        } else if (emailTemplate === 'new_content') {
          await emailService.sendNewContentEmail(emailData)
        } else {
          await emailService.sendEmail(emailTemplate, {
            to: emailData.email,
            name: emailData.name,
            subject: title,
            templateData: emailData.templateData
          })
        }
        
        console.log('Email de notificação enviado com sucesso')
      } catch (error) {
        console.error('Erro ao enviar email de notificação:', error)
      }
    }
    
    return newNotification
  }
  
  // Notificar sobre pagamento bem-sucedido
  const notifyPaymentSuccess = async (
    orderId: string,
    productName: string,
    amount: number,
    accessUrl: string
  ) => {
    return createNotification(
      'payment_success',
      'Pagamento confirmado',
      `Seu pagamento de R$ ${amount.toFixed(2)} para "${productName}" foi confirmado. Você já pode acessar o conteúdo.`,
      accessUrl,
      true // Enviar email
    )
  }
  
  // Notificar sobre pagamento pendente
  const notifyPaymentPending = async (
    orderId: string,
    productName: string,
    amount: number,
    paymentUrl: string,
    expirationDate: string
  ) => {
    return createNotification(
      'payment_pending',
      'Pagamento pendente',
      `Seu pedido para "${productName}" está aguardando pagamento. O boleto vence em ${expirationDate}.`,
      paymentUrl,
      true // Enviar email
    )
  }
  
  // Notificar sobre acesso ao curso
  const notifyCourseAccess = async (
    courseName: string,
    courseUrl: string
  ) => {
    return createNotification(
      'course_access',
      `Acesso liberado: ${courseName}`,
      `Seu acesso ao curso "${courseName}" foi liberado. Você já pode começar a assistir às aulas.`,
      courseUrl,
      true // Enviar email
    )
  }
  
  // Notificar sobre novo conteúdo
  const notifyNewContent = async (
    contentType: 'curso' | 'planilha',
    contentName: string,
    contentUrl: string
  ) => {
    return createNotification(
      'new_content',
      `Novo conteúdo: ${contentName}`,
      `Um novo ${contentType === 'curso' ? 'módulo' : 'arquivo'} foi adicionado a "${contentName}". Confira agora!`,
      contentUrl,
      true // Enviar email
    )
  }
  
  // Notificar sobre queda de preço
  const notifyPriceDrop = async (
    productName: string,
    oldPrice: number,
    newPrice: number,
    productUrl: string
  ) => {
    return createNotification(
      'price_drop',
      `Preço reduzido: ${productName}`,
      `O preço de "${productName}" foi reduzido de R$ ${oldPrice.toFixed(2)} para R$ ${newPrice.toFixed(2)}. Aproveite!`,
      productUrl,
      true // Enviar email
    )
  }
  
  // Notificar sobre mensagem do sistema
  const notifySystem = async (
    title: string,
    message: string,
    link?: string
  ) => {
    return createNotification(
      'system',
      title,
      message,
      link,
      false // Não enviar email por padrão para notificações do sistema
    )
  }
  
  return {
    // Estado
    notifications,
    unreadCount,
    
    // Métodos de gerenciamento
    markAsRead,
    markAllAsRead,
    deleteNotification,
    createNotification,
    
    // Métodos específicos
    notifyPaymentSuccess,
    notifyPaymentPending,
    notifyCourseAccess,
    notifyNewContent,
    notifyPriceDrop,
    notifySystem
  }
}
