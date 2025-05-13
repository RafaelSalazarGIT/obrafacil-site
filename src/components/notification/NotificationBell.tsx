'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Bell, 
  Check, 
  Trash2, 
  CreditCard, 
  AlertCircle, 
  BookOpen, 
  FileText,
  Info,
  Tag,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover'
import { useAuth } from '@/components/auth/AuthContext'
import NotificationService, { Notification, NotificationType } from '@/components/notification/NotificationService'

// Componente para ícone de notificação baseado no tipo
const NotificationIcon = ({ type }: { type: NotificationType }) => {
  switch (type) {
    case 'payment_success':
      return <CreditCard className="h-5 w-5 text-green-500" />
    case 'payment_pending':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />
    case 'order_shipped':
      return <FileText className="h-5 w-5 text-blue-500" />
    case 'course_access':
      return <BookOpen className="h-5 w-5 text-purple-500" />
    case 'new_content':
      return <FileText className="h-5 w-5 text-blue-500" />
    case 'price_drop':
      return <Tag className="h-5 w-5 text-orange-500" />
    case 'system':
      return <Info className="h-5 w-5 text-gray-500" />
    default:
      return <Bell className="h-5 w-5 text-gray-500" />
  }
}

// Formatar data relativa
const formatRelativeTime = (date: Date) => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSec = Math.floor(diffMs / 1000)
  const diffMin = Math.floor(diffSec / 60)
  const diffHour = Math.floor(diffMin / 60)
  const diffDay = Math.floor(diffHour / 24)
  
  if (diffSec < 60) {
    return 'agora'
  } else if (diffMin < 60) {
    return `${diffMin} min atrás`
  } else if (diffHour < 24) {
    return `${diffHour} h atrás`
  } else if (diffDay < 30) {
    return `${diffDay} dias atrás`
  } else {
    return date.toLocaleDateString('pt-BR')
  }
}

export default function NotificationBell() {
  const { user } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  
  // Inicializar serviço de notificações
  const notificationService = NotificationService()
  
  // Carregar notificações
  useEffect(() => {
    if (user?.id) {
      setNotifications(notificationService.notifications)
      setUnreadCount(notificationService.unreadCount)
    }
  }, [user?.id, notificationService.notifications, notificationService.unreadCount])
  
  // Marcar como lida ao clicar
  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.read) {
      await notificationService.markAsRead(notification.id)
    }
    
    // Se tiver link, fechar popover após um pequeno delay
    if (notification.link) {
      setTimeout(() => {
        setIsOpen(false)
      }, 100)
    }
  }
  
  // Marcar todas como lidas
  const handleMarkAllAsRead = async () => {
    await notificationService.markAllAsRead()
  }
  
  // Excluir notificação
  const handleDeleteNotification = async (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation()
    await notificationService.deleteNotification(notificationId)
  }
  
  // Renderizar item de notificação
  const renderNotificationItem = (notification: Notification) => {
    const NotificationContent = () => (
      <div 
        className={`p-3 ${notification.read ? 'bg-white' : 'bg-blue-50'} hover:bg-gray-50 border-b last:border-b-0 cursor-pointer`}
        onClick={() => handleNotificationClick(notification)}
      >
        <div className="flex items-start">
          <div className="mr-3 mt-1">
            <NotificationIcon type={notification.type} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h4 className={`text-sm font-medium ${notification.read ? 'text-gray-900' : 'text-blue-700'}`}>
                {notification.title}
              </h4>
              <button 
                className="ml-2 text-gray-400 hover:text-gray-600"
                onClick={(e) => handleDeleteNotification(e, notification.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {notification.message}
            </p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">
                {formatRelativeTime(notification.createdAt)}
              </span>
              {!notification.read && (
                <span className="inline-block h-2 w-2 rounded-full bg-blue-600"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
    
    return notification.link ? (
      <Link href={notification.link} key={notification.id}>
        <NotificationContent />
      </Link>
    ) : (
      <div key={notification.id}>
        <NotificationContent />
      </div>
    )
  }
  
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-gray-700 hover:text-blue-600 focus:outline-none">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 max-h-[70vh] flex flex-col">
        <div className="p-3 border-b flex justify-between items-center">
          <h3 className="font-medium">Notificações</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-8"
              onClick={handleMarkAllAsRead}
            >
              <Check className="h-3 w-3 mr-1" />
              Marcar todas como lidas
            </Button>
          )}
        </div>
        
        <div className="overflow-y-auto flex-1">
          {notifications.length > 0 ? (
            notifications.map(renderNotificationItem)
          ) : (
            <div className="p-6 text-center text-gray-500">
              <div className="mx-auto h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-gray-400" />
              </div>
              <p>Nenhuma notificação</p>
            </div>
          )}
        </div>
        
        <div className="p-2 border-t text-center">
          <Link href="/conta/notificacoes">
            <Button variant="ghost" size="sm" className="text-xs w-full">
              Ver todas as notificações
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}
